/**
 * Created by 450 G4 on 4/26/2017.
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let profileSchema = mongoose.Schema({
    profilePicture: {type: String},
    age: {type: String},
    town: {type: String},
    date: {type: Date, default:Date.now()}
});

const Comment = mongoose.model('Profile', profileSchema);

module.exports = Profile;