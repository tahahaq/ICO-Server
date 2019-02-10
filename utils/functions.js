var exports = module.exports = {},
    constants = require('../utils/constant'),
    userModel = require('../models/user'),
    nodeMailer = require('nodemailer');



exports.sendPasswordChangedMail = (email) => {
    try {
        const mailOptions = {
            from: constants.email, // sender address
            to: email, // list of receivers
            subject: 'Your Password has been changed for FoodFunShop', // Subject line
            text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + email + ' has just been changed.\n'


        };
        mailTransporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                throw new Error(err);
            }
            else{
            }
        });

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


exports.sendForgotPasswordMail = (email,token) => {
    try {
        const mailOptions = {
            from: constants.email, // sender address
            to: email, // list of receivers
            subject: 'Password Reset FoodFunShop', // Subject line
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + 'foodfunshop.com' + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'

        };
        mailTransporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                throw new Error(err);
            }
            else{
            }
        });

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};
// giving access to nodeMailer for logging into mail account
let mailTransporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: "haqtaha@gmail.com",
        pass: 'mvibckbmjwpddzsj'
    }
});

exports.sendContactMail = async (details) => {
    try {
        const mailOptions = {
            from: constants.email, // sender address
            to: constants.email, // list of receivers
            subject: "Empty", // Subject line
            text: `This message was send by ${details.name} using email : ${details.email} the message was ${details.message}`

        };
        mailTransporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                throw new Error(err);
            }
            else {
                console.log(constants.responseMessages.Success)
                return constants.responseMessages.Success
            }
        });

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


exports.isDuplicateUser = async (user) => {
    let duplicateUser = await userModel.find({email: user.email});
    return !Array.isArray(duplicateUser) || !duplicateUser.length;
};


exports.isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};



exports.isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

exports.generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};