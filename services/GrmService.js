/**
 * Created by simvolice on 16.08.2017 0:41
 */






const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;

const CounterService = require('../services/CounterService');
const GrmStatusService = require('../services/GrmStatusService');
const CountryService = require('../services/CountryService');

module.exports = {




    addGrm: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('grm');

            let nameCountry = await CountryService.getCountryById(objParams.country);

            let seq = await CounterService.getNextSequence("grmid");



            let categName = await GrmStatusService.getCategById(objParams.categComplaint);
            let canalName = await GrmStatusService.getCanalById(objParams.canalRequest);
            let statusName = await GrmStatusService.getStatusById(objParams.statusId);



            const result = await col.insertOne({



                id: seq,
                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),
                nameCountry: nameCountry.name,
                categName: categName.name,
                canalName: canalName.name,
                statusName: statusName.name,


                dateInGo: new Date( new Date(objParams.dateInGo).getTime() -  ( new Date(objParams.dateInGo).getTimezoneOffset() * 60000 ) ),
                canalRequest: ObjectId(objParams.canalRequest),
                country: ObjectId(objParams.country),
                declarerFIO: objParams.declarerFIO,
                categComplaint: ObjectId(objParams.categComplaint),
                raisedQuestion: objParams.raisedQuestion,
                responsibleConsideration: objParams.responsibleConsideration,
                statusId: ObjectId(objParams.statusId),
                takeAction: objParams.takeAction,
                lastDateAnswer: new Date( new Date(objParams.lastDateAnswer).getTime() -  ( new Date(objParams.lastDateAnswer).getTimezoneOffset() * 60000 ) ),
                dateNotifDeclarer: new Date( new Date(objParams.dateNotifDeclarer).getTime() -  ( new Date(objParams.dateNotifDeclarer).getTimezoneOffset() * 60000 ) ),
                timeToCheckComplaint: objParams.timeToCheckComplaint



            });





            return result;

        } catch (err){


            return err;

        }







    },



    getAllGrm: async () => {

        try {


            const col = dbConnect.getConnect().collection('grm');

            let allCountry = await CountryService.getAllCountrys();


            let allCateg = await GrmStatusService.getAllCategGRM();
            let allCanal = await GrmStatusService.getAllCanalsRequest();
            let allStatus = await GrmStatusService.getAllStatus();


            const result = await col.aggregate([
                {$match: {}},

                {
                    $addFields:
                        {
                            allCanalRequestStatus: allCanal,
                            allCountrys: allCountry,
                            allCategComplaint: allCateg,
                            allStatus: allStatus,

                        }
                }




            ]).toArray();



            return result;

        } catch (err){


            return err;

        }







    },




    getByCountryId: async (countryId) => {

        try {


            const col = dbConnect.getConnect().collection('grm');
            let allCateg = await GrmStatusService.getAllCategGRM();
            let allCanal = await GrmStatusService.getAllCanalsRequest();
            let allStatus = await GrmStatusService.getAllStatus();


            const result = await col.aggregate([
                {$match: {country: ObjectId(countryId)}},

                {
                    $addFields:
                        {
                            allCanalRequestStatus: allCanal,

                            allCategComplaint: allCateg,
                            allStatus: allStatus,

                        }
                }




            ]).toArray();



            return result;

        } catch (err){


            return err;

        }







    },








    changeSatatus: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('grm');



            const result = await col.updateOne({ _id: ObjectId(objParams.id) },
                {
                    $currentDate: {
                        lastModified: true
                    },
                    $set: {
                        statusId: ObjectId(objParams.statusId)
                    }
                });



            return result;

        } catch (err){


            return err;

        }







    },




    delGrm: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('grm');



            const result = await col.deleteOne({ _id: ObjectId(id) });



            return result;

        } catch (err){


            return err;

        }







    },


    updateGrm: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('grm');


            let nameCountry = await CountryService.getCountryById(objParams.country);
            let categName = await GrmStatusService.getCategById(objParams.categComplaint);
            let canalName = await GrmStatusService.getCanalById(objParams.canalRequest);
            let statusName = await GrmStatusService.getStatusById(objParams.statusId);




            const result = await col.updateOne({ _id: ObjectId(objParams._id) },
                {
                    $currentDate: {
                        lastModified: true
                    },
                    $set: {

                        nameCountry: nameCountry.name,
                        categName: categName.name,
                        canalName: canalName.name,
                        statusName: statusName.name,


                        dateInGo: new Date( new Date(objParams.dateInGo).getTime() -  ( new Date(objParams.dateInGo).getTimezoneOffset() * 60000 ) ),
                        canalRequest: ObjectId(objParams.canalRequest),
                        country: ObjectId(objParams.country),
                        declarerFIO: objParams.declarerFIO,
                        categComplaint: ObjectId(objParams.categComplaint),
                        raisedQuestion: objParams.raisedQuestion,
                        responsibleConsideration: objParams.responsibleConsideration,
                        statusId: ObjectId(objParams.statusId),
                        takeAction: objParams.takeAction,
                        lastDateAnswer: new Date( new Date(objParams.lastDateAnswer).getTime() -  ( new Date(objParams.lastDateAnswer).getTimezoneOffset() * 60000 ) ),
                        dateNotifDeclarer: new Date( new Date(objParams.dateNotifDeclarer).getTime() -  ( new Date(objParams.dateNotifDeclarer).getTimezoneOffset() * 60000 ) ),
                        timeToCheckComplaint: objParams.timeToCheckComplaint

                    }
                });







            return result;

        } catch (err){


            return err;

        }







    },




    checkLastDateAnswer: async (date) => {

        try {


            const col = dbConnect.getConnect().collection('grm');


            const result = await col.find({lastDateAnswer: {$lt: date}}).toArray();



            return result;

        } catch (err){


            return err;

        }







    }





};