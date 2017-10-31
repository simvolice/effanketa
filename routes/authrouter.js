const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const nodemailer = require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');
const Busboy = require('async-busboy');
const fs = require('fs');
const path = require('path');

const config = require('../utils/devConfig');
const validator = require('../utils/validator');
const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');

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





      res.json({"code": 0, "sessionToken": jsonwebtoken.sign(result._id.toString(), config.SECRETJSONWEBTOKEN), "fio": result.fio});


    }else {

      res.json({"code": 1});


    }
















});



router.post('/register', checkSeesionToken, async (req, res, next) =>{



    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");




    files[0].pipe(fs.createWriteStream(pathForWrite + path.basename(files[0].path)));


    let urlImg = "uploads/" + path.basename(files[0].path);






  let pass = generator.generate({numbers: true, symbols: true});
  const hash = bcrypt.hashSync(pass, 10);
  let mail = {
        from: "simvolice@gmail.com",
        to: fields.email, //TODO после тестирования надо поменять на переменную
        subject: "Ваш логин и пароль для входа в систему EFFORM",

        html: '<h4>Логин: '+ fields.email +'</h4> <br> <h4>Пароль: '+ pass +'</h4>'
    };

    transporter.sendMail(mail);




    let objParams = {


    email: fields.email,
    pass: hash,
    country: fields.country,
    role: fields.role,
    fio: fields.fio,
    urlImg: urlImg,


        //TODO Только для отладки, потом удалить
        passClear: pass



  };





let result =  await AuthService.register(objParams);



if (result.hasOwnProperty("result")) {

    res.json({"code": 0, "resultFromDb": result.ops[0]});

} else {

    res.json({"code": 1});

}








});

router.post('/updregister', checkSeesionToken, async (req, res, next) =>{



    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");


    console.log("\x1b[42m", fields);

    let objParams = {

        _id: fields._id,
        email: fields.email,

        country: fields.country,

        role: fields.role,
        fio: fields.fio,
        urlImg: fields.urlImg



    };



    if (files.length !== 0) {

        files[0].pipe(fs.createWriteStream(pathForWrite + path.basename(files[0].path)));


        let urlImg = "uploads/" + path.basename(files[0].path);

        objParams.urlImg = urlImg;

    }








    let result =  await AuthService.updUser(objParams);



    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }





});



router.post('/deleteuser', checkSeesionToken, async (req, res, next) =>{






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


router.post('/recoverypass', checkSeesionToken, async (req, res, next) =>{

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

router.post('/getallusers', checkSeesionToken, async (req, res, next) =>{




  let result = await checkRole.forUsers(req.body.sessionToken);


  if (result === false){

    res.json({"code": 1});

  } else {


    res.json({"code": 0, "resultFromDb": result});

  }



});



router.post('/getmainpage', checkSeesionToken, async (req, res, next) =>{

    let result = await checkRole.forMainPage(req.body.sessionToken);


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }



});

module.exports = router;
