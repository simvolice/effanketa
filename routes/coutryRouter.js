/**
 * Created by simvolice on 04.08.2017 16:24
 */



const express = require('express');
const router = express.Router();

const checkRole = require('../utils/checkRole');





router.post('/getcountry', async (req, res, next) =>{

    let result = await checkRole.forCountrys(req.body.sessionToken);


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }
});






module.exports = router;