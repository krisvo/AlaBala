/**
 * Created by 450 G4 on 4/26/2017.
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let profileSchema = mongoose.Schema({
    person: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    profilePicture: {type: String},
    age: {type: String},
    town: {type: String},
    about: {type:String}
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;