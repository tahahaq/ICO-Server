var exports = module.exports = {},
    utilsFunctions = require('../utils/functions'),
    userModel = require('../models/user'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    constants = require('../utils/constant');


exports.authenticateUser = async (user) => {
    try {
        let dbUser = await userModel.find({email: user.email});
        if (utilsFunctions.isEmpty(dbUser)) {
            throw new Error(constants.responseMessages.emailNotFound)
        }
        let match = await bcrypt.compare(user.password, dbUser[0].password);
        if (!match) {
            throw new Error(constants.responseMessages.passwordNotMatch);
        }

        let token = jwt.sign({id: dbUser[0]._id}, constants.secret, {
            expiresIn: 84600
        });

        let returningUser = dbUser[0].toObject();
        delete returningUser.password;


        return {auth: true, token: token, user: returningUser}

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};