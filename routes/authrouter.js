const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const url = require('url');
const config = require('../utils/devConfig');
const validator = require('../utils/validator');
const checkSeesionToken = require('../utils/checkSeesionToken');

const AuthService = require('../services/Auth');
const RoleService = require('../services/RoleService');


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






    let result = await AuthService.login(req.body.email);




    if (validator.checkProps(result) && bcrypt.compareSync(req.body.pass, result.pass)) {



      let menuItems = await RoleService.getRoleByRole(result.role);

      res.json({"code": 0, "sessionToken": jsonwebtoken.sign(result._id.toString(), config.SECRETJSONWEBTOKEN), "menuItems": menuItems.mainPageHtml, "fio": result.fio});


    }else {

      res.json({"code": 1});


    }
















});



router.post('/register', checkSeesionToken, async (req, res, next) =>{

  const hash = bcrypt.hashSync(req.body.pass, 10);

  let objParams = {


    email: req.body.email,
    pass: hash,
    country: req.body.country,
    role: req.body.role,
    fio: req.body.fio,



  };





await AuthService.register(objParams);


res.json({"code": 0});





});




router.get('/getallusers', async (req, res, next) =>{

  let result = await AuthService.getAllUsers();

  res.json({"code": 0, "resultFromDb": result});

});


module.exports = router;
