var exports = module.exports = {},
    constants = require('../utils/constant'),
    utilsFunctions = require('../utils/functions'),
    emailModel = require('../models/email'),
    userModel = require('../models/user'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    db_read = require('./read');


exports.forgotPassword = async (user) => {
    try {

        if(await utilsFunctions.isDuplicateUser(user)){
            throw new Error("No email found");
        }
        let requiredUser = await userModel.findOne({email: user.email});
        let token = jwt.sign({id : requiredUser._id } , constants.secret.secret , {
            expiresIn: 84600
        });

        requiredUser.reset_password_token = token;
        requiredUser.reset_password_expires = Date.now() + 3600000; // 1 hour

        await requiredUser.save();


        await utilsFunctions.sendForgotPasswordMail(requiredUser.email , token);
        return constants.responseMessages.Success;

    }catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

exports.resetPassword = async (token , password) => {
    try {
        let resetPasswordUser = await  userModel.findOne({ reset_password_token: token, reset_password_expires: { $gt: Date.now() } });
        if (!resetPasswordUser) {
            throw new Error ('Password reset token is invalid or has expired.');
        }
        resetPasswordUser.password = await bcrypt.hash(password, constants.SALT);
        resetPasswordUser.reset_password_token = undefined;
        resetPasswordUser.reset_password_expires = undefined;

        await resetPasswordUser.save();
        await utilsFunctions.sendPasswordChangedMail(resetPasswordUser.email);

        return constants.responseMessages.Success;


    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

exports.ifValidResetPassword = async (token) => {
    try {
        let resetPasswordUser = await  userModel.findOne({ reset_password_token: token, reset_password_expires: { $gt: Date.now() } });
        if (!resetPasswordUser) {
            throw new Error ('Password reset token is invalid or has expired.');
        }
        return true;

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


exports.insertUser = async (user) => {
    try {
        if (await utilsFunctions.isDuplicateUser(user)) {
            let hashOfPassword = await bcrypt.hash(user.password, constants.SALT);

            let insertedUser = await userModel.create({
                name: user.name,
                password: hashOfPassword,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                time : user.time,
            });

            let token = jwt.sign({id : insertedUser._id } , constants.secret , {
                expiresIn: 84600
            });

            let returningUser = insertedUser.toObject();
            delete returningUser.password;

            return {auth : true  , token : token , user : returningUser};
        }
        throw new Error(constants.responseMessages.emailAlreadyExists)

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }

};




exports.insertEmailForSubscription = async (email) => {
  try {
      let ifDuplicate = await emailModel.findOne(email);
      if(!utilsFunctions.isEmpty(ifDuplicate)){
            throw new Error("Email is already subscribed");
        }
      await emailModel.create(email);
     return constants.responseMessages.Success;

  }  catch (e) {
      console.log(e);
      throw new Error(e)
  }
};
