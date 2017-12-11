/**
 * Created by simvolice on 29.08.2017 17:35
 */


const express = require('express');
const router = express.Router();
const checkSeesionToken = require('../utils/checkSeesionToken');
const checkRole = require('../utils/checkRole');
const Busboy = require('async-busboy');
const TypePeriod = require('../services/TypePeriod');
const NameYear = require('../services/NameYear');
const BuildReportService = require('../services/BuildReportService');
const path = require('path');
const fs = require('fs');

router.post('/gettypeperiod', checkSeesionToken, async (req, res, next) =>{

    let result = await TypePeriod.getAll();

    res.json({"code": "ok", "resultFromDb": result});


});


router.post('/getyearname', checkSeesionToken, async (req, res, next) =>{


    let result = await NameYear.getAll();

    res.json({"code": "ok", "resultFromDb": result});

});



router.post('/getgrowpotencialnewver', checkSeesionToken, async (req, res, next) =>{


    let result = await BuildReportService.getgrowpotencialNewVersion(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});

});


router.post('/getgrowpotencial', checkSeesionToken, async (req, res, next) =>{



    let result = await BuildReportService.getgrowpotencial(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});

});

router.post('/getreportcredits', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.getreportcredits(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});

});




router.post('/getreportgrm', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.getreportgrm(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});


});



router.post('/getreportfinansialstatus', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.getreportfinansialstatus(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});


});


router.post('/addnewreport', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.addnewreport(req.body.data);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});

router.post('/getreport', checkSeesionToken, async (req, res, next) =>{
    let result = await checkRole.forBuildReport(req.body.sessionToken);


    if (result === false){

        res.json({"code": 1});

    } else {


        res.json({"code": 0, "resultFromDb": result});

    }
});



router.post('/updreport', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.updreport(req.body.data);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});



router.post('/delreport', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.delreport(req.body.data);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});





router.post('/getreportforevent', checkSeesionToken, async (req, res, next) =>{





    let result = await BuildReportService.getreportforevent(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});

});


router.post('/reportyearsave', checkSeesionToken, async (req, res, next) =>{



    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    let arrAllFiles = [];


    for (let filesItem of files) {
        filesItem.pipe(fs.createWriteStream(pathForWrite + path.basename(filesItem.path)));
        arrAllFiles.push({url: "uploads/" + path.basename(filesItem.path), name: path.basename(filesItem.path).substr(14)});
    }




    let result = await BuildReportService.addnewreportYear(JSON.parse(fields.data), arrAllFiles);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});




router.post('/updreportyearncu', checkSeesionToken, async (req, res, next) =>{


    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    let arrAllFiles = [];




    if (files.length === 0) {

        arrAllFiles = JSON.parse(fields.data).arrAllFiles;
        if (arrAllFiles.length !== 0){

            delete arrAllFiles[0].$$hashKey;
        }
    } else {

        for (let filesItem of files) {
            filesItem.pipe(fs.createWriteStream(pathForWrite + path.basename(filesItem.path)));
            arrAllFiles.push({url: "uploads/" + path.basename(filesItem.path), name: path.basename(filesItem.path).substr(14)});
        }

    }











    let result = await BuildReportService.updreportYearNCU(JSON.parse(fields.data), arrAllFiles);






    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});



router.post('/reporthalfyearrcusave', checkSeesionToken, async (req, res, next) =>{



    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    let arrAllFiles = [];


    for (let filesItem of files) {
        filesItem.pipe(fs.createWriteStream(pathForWrite + path.basename(filesItem.path)));
        arrAllFiles.push({url: "uploads/" + path.basename(filesItem.path), name: path.basename(filesItem.path).substr(14)});
    }




    let result = await BuildReportService.addHalfYearrcusave(JSON.parse(fields.data), arrAllFiles);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});




router.post('/updreporthalfyearrcu', checkSeesionToken, async (req, res, next) =>{


    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    let arrAllFiles = [];








    if (files.length === 0) {

        arrAllFiles = JSON.parse(fields.data).arrAllFiles;


        if (arrAllFiles.length !== 0){

            delete arrAllFiles[0].$$hashKey;
        }


    } else {

        for (let filesItem of files) {
            filesItem.pipe(fs.createWriteStream(pathForWrite + path.basename(filesItem.path)));
            arrAllFiles.push({url: "uploads/" + path.basename(filesItem.path), name: path.basename(filesItem.path).substr(14)});
        }

    }




    let result = await BuildReportService.updreportHalfYearRCU(JSON.parse(fields.data), arrAllFiles);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});




router.post('/reportyearrcusave', checkSeesionToken, async (req, res, next) =>{


    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    let arrAllFiles = [];


    for (let filesItem of files) {
        filesItem.pipe(fs.createWriteStream(pathForWrite + path.basename(filesItem.path)));
        arrAllFiles.push({url: "uploads/" + path.basename(filesItem.path), name: path.basename(filesItem.path).substr(14)});
    }





    let result = await BuildReportService.addYearRCUsave(JSON.parse(fields.data), arrAllFiles);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});




router.post('/updreportyearrcu', checkSeesionToken, async (req, res, next) =>{





    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    let arrAllFiles = [];




    if (files.length === 0) {

        arrAllFiles = JSON.parse(fields.data).arrAllFiles;
        if (arrAllFiles.length !== 0){

            delete arrAllFiles[0].$$hashKey;
        }
    } else {

        for (let filesItem of files) {
            filesItem.pipe(fs.createWriteStream(pathForWrite + path.basename(filesItem.path)));
            arrAllFiles.push({url: "uploads/" + path.basename(filesItem.path), name: path.basename(filesItem.path).substr(14)});
        }

    }






    let result = await BuildReportService.updreportYearRCU(JSON.parse(fields.data), arrAllFiles);

    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }

});




router.get('/gettadjickuzbekncuyear', async (req, res, next) =>{

    let result = await BuildReportService.getTadjickUzbekNCUyear();

    res.json({"code": "ok", "resultFromDb": result});

});




router.post('/getreportfinansialstatusyearncu', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.getReportFinansialStatusYearNcu(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});

});




router.post('/getreportfinansialstatusforyearrcu', checkSeesionToken, async (req, res, next) =>{

    let result = await BuildReportService.getReportFinansialStatusForYearRCU(req.body.data);

    res.json({"code": "ok", "resultFromDb": result});

});

module.exports = router;



