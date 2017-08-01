const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const url = require('url');
const config = require('../utils/devConfig');
const validator = require('../utils/validator');
const checkSeesionToken = require('../utils/checkSeesionToken');

const AuthService = require('../services/Auth');


const uuidV4 = require('uuid/v4');





/**
 * Идет проверка по токену.
 */
router.use(async (req, res, next) => {


  if (req.method === "GET") {


    next();


  } else {


    let tokenFromClient = req.body.tokenCSRF || req.get('tokenCSRF') || req.query.tokenCSRF;


    if (validator.checkReqBody(req)) {

      let result = await AuthService.getCsrfToken(tokenFromClient);



      if (validator.checkProps(result) && result.tokencsrf === tokenFromClient) {


        next();

      } else {


        res.json({"code": 1});

      }


    } else {


      res.json({"code": 1});




    }


  }





});








router.get("/gettokencsrf", async (req, res, next) => {




  let result = await AuthService.saveCsrfToken(uuidV4());




  res.json({"code": 0, "tokenCSRF": result.ops[0].tokencsrf});


});



router.post('/auth', async (req, res, next) =>{





    let result = await AuthService.login(req.body.login);




    if (validator.checkProps(result) && bcrypt.compareSync(req.body.pass, result.pass)) {


      res.json({"code": 0, "sessionToken": jsonwebtoken.sign(result._id.toString(), config.SECRETJSONWEBTOKEN)});


    }else {

      res.json({"code": 1});


    }
















});








module.exports = router;
