/**
 * Created by 450 G4 on 3/27/2017.
 */

const crypto = require('crypto');
module.exports = {
    generateSalt: () => {
        let salt = crypto.randomBytes(128).toString('base64');
        return salt;
    },
    hashPassword: (password, salt) => {
        let passwordHash = crypto.createHmac('sha256', salt).update (password).digest('hex');
        return passwordHash;
    }
};
