/**
 * Created by simvolice on 20.04.2017 17:57
 */



const validator = require('../utils/validator');
const AuthService = require('../services/Auth');
const jsonwebtoken = require('jsonwebtoken');


module.exports = async (req, res, next) => {







  let SeesionToken = req.body.sessionToken || req.get('sessionToken') || req.query.sessionToken;



  if (validator.checkProps(SeesionToken)) {

    try {

        let userId= jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);

        let result = await AuthService.checkUserById(userId);

        if (validator.checkProps(result)) {

            next();

        } else {

            res.json({"code": 1});


        }

    } catch (err) {

        res.json({"code": 1});


    }









  } else {



    res.json({"code": 1});



  }
















};



