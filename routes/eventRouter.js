/**
 * Created by simvolice on 09.08.2017 1:12
 */

const express = require('express');
const router = express.Router();

const checkRole = require('../utils/checkRole');
const checkSeesionToken = require('../utils/checkSeesionToken');

const EventService = require('../services/EventService');


router.post('/addevent', checkSeesionToken, async (req, res, next) =>{





    let result =  await EventService.addEvent(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});




router.post('/delevent', checkSeesionToken, async (req, res, next) =>{

    let result =  await EventService.delEvent(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});

router.post('/getevent', checkSeesionToken, async (req, res, next) =>{


    let result = await checkRole.forEvents(req.body.sessionToken);


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }



});




router.post('/updevent', checkSeesionToken, async (req, res, next) =>{

    let result =  await EventService.updEvent(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});







module.exports = router;