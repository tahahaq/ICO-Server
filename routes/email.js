let express = require('express'),
    router = express.Router(),
    constants = require('../utils/constant'),
    db_insert = require('../db-functions/insert'),
    db_delete = require('../db-functions/delete'),
    db_read = require('../db-functions/read'),
    db_update = require('../db-functions/update'),
    utilsFunction = require('../utils/functions'),
    emailModel = require('../models/email');


////////////////////////////////////////////////////  EMAIL  /////////////////////////////////////////////////////////////


// POST

/**
 * @api {post} /email/subscribe Subscribe to email updates
 * @apiGroup Email
 *  * @apiParamExample {json} Input
 *{
 *	"email" : "email@example.com"
 *  }
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 201,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": Success
 *              }
 *          }
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */

router.post("/subscribe", function (req, res) {
    db_insert.insertEmailForSubscription(req.body).then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 201,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result: response
                }
            }
        )
    }).catch((error) => {
        //ERROR
        res.status(500).send(
            {
                responseCode: 500,
                responseMessage: error.message
            }
        )
    });
});



/**
 * @api {post} /email/send-message Send message
 * @apiGroup Email
 * @apiParamExample {json} Input
 *{
  *  "email" : "ali@gmail.com",
  *   "name" :  "ali",
  *   "message" : "Please Contact me!"
 *
 *  }
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 200,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": Success
 *              }
 *          }
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */

router.post("/send-message", function (req, res) {
    utilsFunction.sendContactMail(req.body).then((response) => {
        //SUCCESS
        res.status(200).send(
            {
                responseCode: 200,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result: response
                }
            }
        )
    }).catch((error) => {
        //ERROR
        res.status(500).send(
            {
                responseCode: 500,
                responseMessage: error.message
            }
        )
    });
});


module.exports = router;
