/**
 * Created by 450 G4 on 3/27/2017.
 */

const mongoose = require('mongoose');

module.exports = (config) =>{
    mongoose.connect(config.connectionString);


    let database = mongoose.connection;
    database.once('open', (error) =>{
        if (error){
            console.log (error);
            return;
        }
        console.log('MongoDB ready!')
    });
    require('./../models/Role').initialize();
    require('./../models/User').seedAdmin();
    require('./../models/Article');
    require('./../models/Comment');
    require('./../models/Profile');
};
