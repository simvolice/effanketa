/**
 * Created by simvolice on 09.08.2017 1:12
 */

const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');

const FormService = require('../services/FormService');




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


module.exports = router;