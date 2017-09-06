/**
 * Created by simvolice on 06.09.2017 16:13
 */




const express = require('express');
const router = express.Router();

const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');
const MainScoreReportService = require('../services/MainScoreReportService');



router.post('/getreportmainscore', checkSeesionToken, async (req, res, next) =>{



    let result = await MainScoreReportService.getReport(req.body.data);


    res.json({"code": "ok", "resultFromDb": result});

});







module.exports = router;