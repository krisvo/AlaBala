const mongoose = require('mongoose');

let profileSchema = mongoose.Schema({
    person: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    profilePicture: {type: String},
    age: {type: String},
    town: {type: String},
    about: {type:String}
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = mongoose.model('Profile',profileSchema);