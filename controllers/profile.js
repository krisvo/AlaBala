/**
 * Created by 450 G4 on 4/26/2017.
 */
const User = require('mongoose').model('User');
const Article = require('mongoose').model('Article');
const Comment = require('mongoose').model('Comment');
const Profile = require('mongoose').model('Profile');


module.exports= {

    /**profileRead:(req,res) =>{
        if(!req.payload._id){
            res.status(401).json({ "message": "UnauthorizedError: private profile"});
        }else{
            User.findById(req.payload._id)
                .exec(function (err,user) {
                    res.status(200).json(user);
                });
        }
    },*/

    profileGet: (req, res) => {
        res.render('user/profile');
    },

    profilePost: (req, res) => {
        let profileArgs = req.body;

        if (!req.isAuthenticated()) {
            errorMsg = 'You should be logged in to update your profile!';
        }

        else {
            let profilePicture = req.files.image;

            if (profilePicture) {
                let filename = profilePicture.name;
                profilePicture.mv(`/images/${filename}`, err => {
                    if (err) {
                        console.log(err.message);
                    }
                });
                profileArgs.profilePicture = `/images/${profilePicture.name}`;

                profileArgs.person = req.user.fullName;

                let profileObject = {
                    person: profileArgs.person,
                    profilePicture: profileArgs.profilePicture,
                    age: profileArgs.age,
                    town: profileArgs.town,
                    about: profileArgs.about,
                };

                Profile.create(profileObject).then(profile => {
                    req.profile.push(profile.id);
                    req.profile.save(err => {
                        if (err) {
                            res.redirect('/', {error: err.message});
                        }
                        else {
                            return(res.redirect('/'));
                        }
                    });

                    return(res.redirect('user/details'));
                })
            }
        }
    },

    detailsGet: (req, res) => {

        res.render('user/details');
    },

    detailsPost: (req, res) => {
        res.render('user/details');
    }
};