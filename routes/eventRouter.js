/**
 * Created by simvolice on 09.08.2017 1:12
 */

const express = require('express');
const router = express.Router();

const checkRole = require('../utils/checkRole');
const checkSeesionToken = require('../utils/checkSeesionToken');

const EventService = require('../services/EventService');
const FormService = require('../services/FormService');


const Busboy = require('async-busboy');
const fs = require('fs');
const path = require('path');

const XLSX = require('xlsx');



router.post('/addevent', checkSeesionToken, async (req, res, next) =>{


    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    let urlImg = null;



    if (files.length !== 0) {

        files[0].pipe(fs.createWriteStream(pathForWrite + path.basename(files[0].path)));


        urlImg = "uploads/" + path.basename(files[0].path);



    } else {


        urlImg = "";


    }



    let copyFields = JSON.parse(fields.data);

    copyFields["urlFile"] = urlImg;


    let result =  await EventService.addEvent(copyFields);




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



    const {files, fields} = await Busboy(req);
    let pathForWrite = path.join(__dirname, "../public/uploads/");
    let urlImg = null;

    let copyFields = JSON.parse(fields.data);

    if (files.length !== 0) {

        files[0].pipe(fs.createWriteStream(pathForWrite + path.basename(files[0].path)));


        urlImg = "uploads/" + path.basename(files[0].path);



    } else {


        urlImg = copyFields.urlFile;


    }





    copyFields["urlFile"] = urlImg;






    let result =  await EventService.updEvent(copyFields);




    if (result.hasOwnProperty("result")) {

        res.json({"code": 0});

    } else {

        res.json({"code": 1});

    }



});



router.get('/getalleventstatuses', async (req, res, next) =>{

    let result =  await EventService.getAllEventStatuses();




    res.json({"code": 0, "resultFromDb": result});

});



router.get('/getalleventsubstatuses', async (req, res, next) =>{

    let result =  await EventService.getAllEventSubStatuses();




    res.json({"code": 0, "resultFromDb": result});

});



function trimObj(obj) {
    if (!Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce(function(acc, key) {
        acc[key.trim()] = typeof obj[key] == 'string' ? obj[key].trim() : trimObj(obj[key]);
        return acc;
    }, Array.isArray(obj)? []:{});
}

router.post('/formfromexcel', async (req, res, next) =>{

    const {files, fields} = await Busboy(req);




    if (files.length !== 0) {


        const workbook = XLSX.readFile(files[0].path);


        let allList = workbook.SheetNames;


        let onlyFirst = workbook.Sheets[allList[0]];


        let allArrResult = XLSX.utils.sheet_to_json(onlyFirst);


        let newArr = [];


        for (let oneObj of allArrResult) {

           newArr.push(trimObj(oneObj))
        }






      let eventOne = await EventService.getEventByID(fields.selectedEvent);


        for (const oneItemExcel of newArr) {





            let objParam = {


                parentId: eventOne._id,
                myDate: eventOne.myDate,
                nameCountry: eventOne.nameCountry,
                nameEvent: eventOne.nameEvent,
                email: oneItemExcel["Адрес электронной почты"] === undefined ? "" : oneItemExcel["Адрес электронной почты"],



                question1: "Цели данного мероприятия были четко определены",
                ques1: oneItemExcel["Цели данного мероприятия были четко определены"],

                question2: "Взаимодействие между участниками поощрялось",
                ques2: oneItemExcel["Взаимодействие между участниками поощрялось"],
                question3: "Темы имели отношение к тому, чем я занимаюсь",
                ques3: oneItemExcel["Темы имели отношение к тому, чем я занимаюсь"],
                question4: "Содержание было хорошо структурировано и понятно",
                ques4: oneItemExcel["Содержание было хорошо структурировано и понятно"],
                question5: "Раздаточные материалы были полезны",
                ques5: oneItemExcel["Раздаточные материалы были полезны"],
                question6: "Полученная информация/знания и навыки будут полезны мне в работе",
                ques6: oneItemExcel["Полученная информация/знания и навыки будут полезны мне в работе"],
                question7: "Тренер/модератор хорошо знал тему",
                ques7: oneItemExcel["Тренер/модератор хорошо знал тему"],
                question8: "Тренер/модератор был хорошо подготовлен",
                ques8: oneItemExcel["Тренер/модератор был хорошо подготовлен"],
                question9: "Цели мероприятия были достигнуты",
                ques9: oneItemExcel["Цели мероприятия были достигнуты"],
                question10: "Время выделенное для мероприятия было достаточным",
                ques10: oneItemExcel["Время выделенное для мероприятия было достаточным"],
                question11: "Помещения для проведения мероприятия и используемая участниками инфраструктура были удобными",
                ques11: oneItemExcel["Помещения для проведения мероприятия и используемая участниками инфраструктура были удобными"],
                question12: "Оцените свою общую удовлетворенность проведенным мероприятием используя 5-бальную шкалу",
                ques12: oneItemExcel["Оцените свою общую удовлетворенность проведенным мероприятием используя 5-бальную шкалу"],
                question13: "Что вам понравилось больше всего?",
                ques13: oneItemExcel["Что вам понравилось больше всего?"],
                question14: "Что можно было бы улучшить?",
                ques14: oneItemExcel["Что можно было бы улучшить?"],
                question15: "Как вы планируете использовать полученные знания/информацию?",
                ques15: oneItemExcel["Как вы планируете использовать полученные знания/информацию?"],
                question16: "В каких темах вы заинтересованы и хотели бы пройти обучение/получать информацию в дальнейшем?",
                ques16: oneItemExcel["В каких темах вы заинтересованы и хотели бы пройти обучение/получать информацию в дальнейшем?"],
                question17: "Как вы оцениваете организацию мероприятия?",
                ques17: oneItemExcel["Как вы оцениваете организацию мероприятия?"],
                question18: "Пожалуйста, отметьте, есть ли у Вас замечания или пожелания в целом по организации мероприятия?",
                ques18: oneItemExcel["Пожалуйста, отметьте, есть ли у Вас замечания или пожелания в целом по организации мероприятия?"],
                question19: "Вы представляете",
                ques19: oneItemExcel["Вы представляете"],
                question20: "Пол",
                ques20: oneItemExcel["Пол"],
                question21: "Возрастная группа",
                ques21: oneItemExcel["Возрастная группа"]


            };
            await FormService.addForm(objParam);



        }





       res.json({"code": 0});



    } else {


        res.json({"code": 1});


    }




});


module.exports = router;