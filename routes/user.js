let express = require('express'),
    router = express.Router(),
    constants = require('../utils/constant'),
    db_insert = require('../db-functions/insert'),
    db_delete = require('../db-functions/delete'),
    db_read = require('../db-functions/read'),
    db_update = require('../db-functions/update'),
    jwt = require('jsonwebtoken');



////////////////////////---------------------------------------------  USER ROUTES -----------------------------------------------/////////////////////////


/**
 * @api {post} /user-login  Signs In The EndUser
 * @apiGroup Auth
 *@apiName Sign In
 *  @apiParamExample {json} Input
 *    {
 *      "email": "email@example.com",
 *      "password" : "12345678"
 *    }
 *
 *
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 201,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": {
 *                      "auth": true,
 *                      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMjFkZTIyZWQ5MzA2MDAxNjRhYzkzYSIsImlhdCI6MTU0NTcyMzQ1MywiZXhwIjoxNTQ1ODA4MDUzfQ.82kXmuOOZAx2Yjt-oJev7dELQ3IyLTntqezVcDVf6eo",
 *                      "user": {
 *                          "_id": "5c21de22ed930600164ac93a",
 *                          "name": "ahshq",
 *                          "email": "123@123.com",
 *                          "dateOfBirth": "Fri Jan 01 1999 00:00:00 GMT+0500 (Pakistan Standard Time)",
 *                          "gender": "Male",
 *                          "profile_photo_url": "https://firebasestorage.googleapis.com/v0/b/rough-2f8bc.appspot.com/o/1.jpg?alt=media&token=ddacd543-dfab-4697-bc44-c7f49e74bd0d",
 *                          "time": "2018-12-25T07:37:05.415Z",
 *                          "uuid": "764ba4bc-67ba-40bf-8d91-843c2351b3aa",
 *                          "__v": 0
 *                      }
 *                  }
 *              }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */



router.post('/user-login', function (req, res) {
    db_read.authenticateUser(req.body).then((response) => {

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

router.get('/logout', function (req, res) {
    res.status(200).send(
        {
            auth: false,
            token: null
        }
    )
});


/**
 * @api {post} /admin/forgot-password  Sends email for password reset
 * @apiGroup Auth
 *@apiName Forgot Password
 *  * @apiParamExample {json} Input
 *    {
 *      "email": "email@example.com"
 *    }
 *
 *
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 201,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": {
 *
 *                  }
 *              }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */


router.post('/forgot-password', function (req, res) {
    db_insert.forgotPassword(req.body).then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 201,
                responseMessage: constants.responseMessages.Success,
                data: {
                    results: response
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
 * @api {get} /admin/reset/:token Token validation for password reset
 * @apiGroup Auth
 * @apiName Checks if token is valid
 * @apiParam {id} token user token from email
 *
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 201,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": {
 *
 *                  }
 *              }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */


router.get('/reset/:token',  function (req, res) {
    db_insert.ifValidResetPassword(req.params.token).then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 201,
                responseMessage: constants.responseMessages.Success,
                data: {
                    results: response
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
 * @api {post} /admin/reset/:token Resets the password
 * @apiGroup Auth
 * @apiParam {id} token user token from email
 *  * @apiParamExample {json} Input
 *    {
 *      "password" : "anyPassword"
 *    }
 *
 *
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 201,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": {
 *
 *                  }
 *              }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */


router.post('/reset/:token',  function (req, res) {
    db_insert.resetPassword(req.params.token , req.body.password).then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 201,
                responseMessage: constants.responseMessages.Success,
                data: {
                    results: response
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


router.post('/get-all-users', verifyToken, function (req, res) {
    db_read.getAllUsers().then((response) => {
        //SUCCESS
        res.status(201).send(
            {
                responseCode: 201,
                responseMessage: constants.responseMessages.Success,
                data: {
                    results: response
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
 * @api {post} /admin/user-register Register a new User
 * @apiGroup Auth
 *  * @apiParamExample {json} Input
 *    {
 *      "password" : "anyPassword"
 *    }
 *
 *
 * @apiSuccessExample {json} Success
 *         {
 *            "responseCode": 201,
 *              "responseMessage": "Success",
 *              "data": {
 *                  "result": {
 *
 *                  }
 *              }
 *          }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 503 Internal Server Error
 */

router.post('/user-register', function (req, res) {
    db_insert.insertUser(req.body).then((response) => {
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

module.exports = router;
