/**
 * Created by 450 G4 on 3/27/2017.
 */

const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('./../models/User');

const authenticateUser = (username, password,done) =>{
    User.findOne({email: username}).then (user => {
        if(!user){
            return done(null,false);
        }

        if (!user.authenticate(password)){
            return done(null, false);
        }
        return done(null,user);
    });
};

module.exports = () => {
    passport.use(new LocalPassport({
        usernameField:'email',
        passwordField:'password'
    },authenticateUser));

    passport.serializeUser((user, done) =>{
        if (!user){
            return done(null,false);
        }

        return done(null,user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            if (!user){
                return done(null, false);
            }

            return done (null,user);
        })
    })
};

/*userSchema.method({
 autenticate: function (password) {
 let inputPasswordHash = encryption.hashPassword(password, this.salt);
 let isSamePasswordHash = inputPasswordHash === this.passwordHash;
 return isSamePasswordHash;
 }
 });
const User = mongoose.model('User', userSchema);
*/
