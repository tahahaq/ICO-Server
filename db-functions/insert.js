var exports = module.exports = {},
    constants = require('../utils/constant'),
    utilsFunctions = require('../utils/functions'),
    emailModel = require('../models/email'),
    db_read = require('./read');




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
