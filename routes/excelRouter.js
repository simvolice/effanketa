/**
 * Created by simvolice on 06.11.2017 12:29
 */
const express = require('express');
const router = express.Router();

let XLSX = require('xlsx');
let AllTableService = require('../services/AllTableService');



function createDataForSheetJS(data) {

    let resultArr = [];

    let nameColumns = Object.keys(data[0]);



    resultArr.push(nameColumns);



    for (let itemData of data) {


        resultArr.push(Object.values(itemData));
    }

    return resultArr;

}



function make_book(data, titleSheet) {

   let dataAlreadyForWork = createDataForSheetJS(data);
    let ws = XLSX.utils.aoa_to_sheet(dataAlreadyForWork);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, titleSheet.substring(0, 29));
    return wb;
}


function get_file(req, res, type, data, titleSheet) {


    let wb = make_book(data, titleSheet);



    res.status(200).send(XLSX.write(wb, {type:'buffer', bookType:type}));
}





router.get('/generateexcel.xlsx', async (req, res, next) =>{


    let allDataFromTable = await AllTableService.getAllData(req.query.data);

    get_file(req, res, "xlsx", allDataFromTable, req.query.titleSheet);



});










module.exports = router;