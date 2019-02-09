var exports = module.exports = {},
    constant = require('../utils/constant'),
    nodeMailer = require('nodemailer');



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
            from: "haqtaha@gmail.com", // sender address
            to: "haqtaha@gmail.com", // list of receivers
            subject: "Empty", // Subject line
            text: `This message was send by ${details.name} using email : ${details.email} the message was ${details.message}`

        };
        mailTransporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                throw new Error(err);
            }
            else {
                console.log(constant.responseMessages.Success)
                return constant.responseMessages.Success
            }
        });

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
};


//
//
// exports.isDuplicateAdmin = async (user) => {
//     let duplicateUser = await adminModel.find({email: user.email});
//     return !Array.isArray(duplicateUser) || !duplicateUser.length;
// };
//
// exports.isDuplicateUser = async (user) => {
//     let duplicateUser = await userModel.find({email: user.email});
//     return !Array.isArray(duplicateUser) || !duplicateUser.length;
// };

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