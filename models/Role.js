/**
 * Created by 450 G4 on 3/29/2017.
 */

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let roleSchema = mongoose.Schema({
    name: {type: String,require: true, unique:true},
    users:[{ type: mongoose.Schema.Types.ObjectId, ref:'User'}]
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

module.exports.initialize = () => {
    Role.findOne({name:'User'}).then (role => {
        if (!role){
            Role.create({name: 'User'});
        }
    });

    Role.findOne({ name:'Admin'}).then (role => {
        if (!role){
            Role.create({name:'Admin'});
        }
    });
};

