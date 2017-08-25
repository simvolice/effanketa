/**
 * Created by simvolice on 25.08.2017 18:34
 */




const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');

const StrategicService = require('../services/StrategicService');






router.post('/addstrategic', checkSeesionToken, async (req, res, next) =>{

    let result =  await StrategicService.addStrategy(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0, "resultFromDb": result.ops[0]});

    } else {

        res.json({"code": 1});

    }

});


router.post('/getstrategic', checkSeesionToken, async (req, res, next) =>{

    let result = await checkRole.forStrategic(req.body.sessionToken);



    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }


});

router.post('/updstrategic', checkSeesionToken, async (req, res, next) =>{

    let result =  await StrategicService.updStrategic(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});


router.post('/delstrategic', checkSeesionToken, async (req, res, next) =>{

    let result =  await StrategicService.delStrategic(req.body.data);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});


module.exports = router;