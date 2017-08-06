const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const nodemailer = require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');
const url = require('url');
const config = require('../utils/devConfig');
const validator = require('../utils/validator');
const checkSeesionToken = require('../utils/checkSeesionToken');

const AuthService = require('../services/Auth');
const RoleService = require('../services/RoleService');


const uuidV4 = require('uuid/v4');

let transporter = nodemailer.createTransport(config.smtpServer);



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


  let pass = generator.generate({numbers: true, symbols: true});
  const hash = bcrypt.hashSync(pass, 10);
  let mail = {
        from: "simvolice@gmail.com",
        to: req.body.data.email, //TODO после тестирования надо поменять на переменную
        subject: "Ваш логин и пароль для входа в систему EFFORM",

        html: '<h4>Логин: '+ req.body.data.email +'</h4> <br> <h4>Пароль: '+ pass +'</h4>'
    };

    transporter.sendMail(mail);




    let objParams = {


    email: req.body.data.email,
    pass: hash,
    country: req.body.data.country,
    role: req.body.data.role,
    fio: req.body.data.fio



  };





let result =  await AuthService.register(objParams);


if (result.hasOwnProperty("result")) {

    res.json({"code": 0, "resultFromDb": result.ops[0]});

} else {

    res.json({"code": 1});

}









});

router.post('/updregister', async (req, res, next) =>{

    let objParams = {

        _id: req.body.data._id,
        email: req.body.data.email,

        country: req.body.data.country,
        role: req.body.data.role,
        fio: req.body.data.fio



    };





    let result =  await AuthService.updUser(objParams);



    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }





});



router.post('/deleteuser', async (req, res, next) =>{






    let objParams = {

        _id: req.body.data,


    };





    let result =  await AuthService.delUser(objParams);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }






});


router.post('/recoverypass', async (req, res, next) =>{

    let objParams = {

        _id: req.body.data,


    };





    let result =  await AuthService.checkUserById(objParams._id);







    if (validator.checkProps(result)) {


        let pass = generator.generate({numbers: true, symbols: true});
        const hash = bcrypt.hashSync(pass, 10);
        let mail = {
            from: "simvolice@gmail.com",
            to: result.email, //TODO после тестирования надо поменять на переменную
            subject: "Ваш новый логин и пароль для входа в систему EFFORM",

            html: '<h4>Логин: '+ result.email +'</h4> <br> <h4>Пароль: '+ pass +'</h4>'
        };

        transporter.sendMail(mail);

        objParams.pass = hash;

        await AuthService.recoveryUser(objParams);






        res.json({"code": 0});


    } else {


        res.json({"code": 1});


    }








});

router.get('/getallusers', async (req, res, next) =>{

  let result = await AuthService.getAllUsers();

  res.json({"code": 0, "resultFromDb": result});

});


module.exports = router;
