/**
 * Created by 450 G4 on 3/27/2017.
 */
const path = require('path');

module.exports={
    development:{
        rootFolder: path.normalize(path.join(__dirname,'/../')),
        connectionString: 'mongodb://localhost:27017/blog'
    },
    production:{}
};
