/**
 * Created by simvolice on 04.08.2017 16:24
 */



const express = require('express');
const router = express.Router();

const CountryService = require('../services/CountryService');




router.get('/getcountry', async (req, res, next) =>{

res.json({"code": 0, "resultFromDb": await CountryService.getAllCountrys()});

});






module.exports = router;