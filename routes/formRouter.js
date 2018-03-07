/**
 * Created by simvolice on 09.08.2017 1:12
 */

const express = require('express');
const router = express.Router();
const config = require('../utils/devConfig');
const checkSeesionToken = require('../utils/checkSeesionToken');
const querystring = require('querystring');
const path = require('path');
const FormService = require('../services/FormService');
const SendFormService = require('../services/SendFormService');
const nodemailer = require('nodemailer');
const nodemailerHBS = require('nodemailer-express-handlebars');
let transporter = nodemailer.createTransport(config.smtpServer);

const formatter = new Intl.DateTimeFormat("ru");


const optionsHBS = {

    viewEngine: ".hbs",
    viewPath: path.join(__dirname, "../template")

};

transporter.use('compile', nodemailerHBS(optionsHBS));




router.post('/addform', checkSeesionToken, async (req, res, next) =>{

    let result =  await FormService.addForm(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});



router.post('/getform', checkSeesionToken, async (req, res, next) =>{


    let result =  await FormService.getForms(req.body.data);




    res.json({"code": 0, "resultFromDb": result});



});




router.post('/delform', checkSeesionToken, async (req, res, next) =>{

    let result =  await FormService.deleteForms(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});




router.post('/updform', checkSeesionToken, async (req, res, next) =>{

    let result =  await FormService.updForm(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});



router.post('/getoneform', checkSeesionToken, async (req, res, next) =>{

    let result =  await FormService.getFormById(req.body.data);




    res.json({"code": 0, "resultFromDb": result});

});





router.post('/sendformforemail', checkSeesionToken, async (req, res, next) =>{

    await SendFormService.sendFormEmails(req.body.data);


   let urlToPublicForm = querystring.stringify({ parentId: req.body.data.parentId, country: req.body.data.country, dateOfEvent: req.body.data.dateOfEvent, nameEvent: req.body.data.nameEvent,
   nameCountry: req.body.data.nameCountry});




    for (let item of req.body.data.emails) {
        let mail = {
            from: "simvolice@gmail.com",
            to: item,
            subject: "Уважаемый участник, просим Вас заполнить анкету для системы CAMP4ASB",


            template: 'mail_send_form',
            context: {
                nameEvent: req.body.data.nameEvent,
                dateEvent: formatter.format(new Date(req.body.data.dateOfEvent)),
                nameCountry: req.body.data.nameCountry,
                url: `${req.protocol}://${req.get('host')}/?#!/publicform?${urlToPublicForm}`
            }


        };

        transporter.sendMail(mail);
    }




    res.json({"code": 0});

});



router.post('/addpublicform', async (req, res, next) =>{


    let resultEmail = await FormService.getFormByParentIdAndEmail(req.body.data);


    if (resultEmail === null) {

        let result = await FormService.addForm(req.body.data);




        if (result.hasOwnProperty("result")) {

            res.json({"code": 0});

        } else {

            res.json({"code": 1});

        }

    } else {


        res.json({"code": 1});

    }








});



module.exports = router;