/**
 * Created by simvolice on 20.04.2017 17:57
 */


const config = require('../utils/devConfig');
const validator = require('../utils/validator');
const AuthService = require('../services/Auth');
const jsonwebtoken = require('jsonwebtoken');


module.exports = async (req, res, next) => {







  let SeesionToken = req.body.sessionToken || req.get('sessionToken') || req.query.sessionToken;



  if (validator.checkProps(SeesionToken)) {

    let userId = jsonwebtoken.verify(SeesionToken, config.SECRETJSONWEBTOKEN);



    let result = await AuthService.checkUserById(userId);

    if (validator.checkProps(result)) {

      next();

    } else {

      res.json({"code": "userNotFound"});


    }


  } else {



    res.json({"code": "sessionNot"});



  }
















};



