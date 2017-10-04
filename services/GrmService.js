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

            let statusAll = await GrmStatusService.getAllStatus();


            const result = await col.insertOne({

                //По умолчанию будет всегда статус "Принят"
                statusId: statusAll[0]._id,

                dateInGo: new Date( new Date(objParams.dateInGo).getTime() -  ( new Date(objParams.dateInGo).getTimezoneOffset() * 60000 ) ),
                sourceTake: ObjectId(objParams.sourceTake),
                declarerFIO: objParams.declarerFIO,
                country: ObjectId(objParams.country),

                contacDeclarer: objParams.contacDeclarer,
                categComplaint: objParams.categComplaint,
                raisedQuestion: objParams.raisedQuestion,
                responsibleConsideration: objParams.responsibleConsideration,
                reviewStatus: objParams.reviewStatus,
                takeAction: objParams.takeAction,
                lastDateAnswer: new Date( new Date(objParams.lastDateAnswer).getTime() -  ( new Date(objParams.lastDateAnswer).getTimezoneOffset() * 60000 ) ),
                dateNotifDeclarer: new Date( new Date(objParams.dateNotifDeclarer).getTime() -  ( new Date(objParams.dateNotifDeclarer).getTimezoneOffset() * 60000 ) ),
                timeToCheckComplaint: Int32(objParams.timeToCheckComplaint),


                id: seq,
                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )




            });





            return result;

        } catch (err){


            return err;

        }







    },



    getByStatusId: async (statusId) => {
        const col = dbConnect.getConnect().collection('grm');
        let statusAll = await GrmStatusService.getAllStatus();
        let statusOne = await GrmStatusService.getStatusById(statusId);
        if (statusOne.name !== "Просрочено") {
            statusAll = statusAll.filter(function (value, index, array) {
                return (value.name !== "Просрочено");
            });
        }

        const result = await col.aggregate([
            {$match: {statusId: ObjectId(statusId)}},
            {
                $addFields: {
                    allStatus: statusAll,
                    nameStatus: statusOne.name
                }
            },
            {
                $lookup:
                    {
                        from: "countrys",
                        localField: "country",
                        foreignField: "_id",
                        as: "countryName"
                    }
            },
            {$unwind: "$countryName"}
        ]).toArray();
        return result;
    },
    getByStatusIdAndCountryId: async (countryId, statusId) => {

        try {


            const col = dbConnect.getConnect().collection('grm');
            let statusOne = await GrmStatusService.getStatusById(statusId);



            const result = await col.aggregate([




                { $match: {country: ObjectId(countryId), statusId: ObjectId(statusId)}},

                { $addFields: {


                    nameStatus: statusOne.name
                }}








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



            const result = await col.updateOne({ _id: ObjectId(objParams._id) },
                {
                    $currentDate: {
                        lastModified: true
                    },
                    $set: {

                        dateInGo: new Date( new Date(objParams.dateInGo).getTime() -  ( new Date(objParams.dateInGo).getTimezoneOffset() * 60000 ) ),
                        sourceTake: ObjectId(objParams.sourceTake),
                        declarerFIO: objParams.declarerFIO,
                        country: ObjectId(objParams.country),

                        contacDeclarer: objParams.contacDeclarer,
                        categComplaint: objParams.categComplaint,
                        raisedQuestion: objParams.raisedQuestion,
                        responsibleConsideration: objParams.responsibleConsideration,
                        reviewStatus: objParams.reviewStatus,
                        takeAction: objParams.takeAction,
                        lastDateAnswer: new Date( new Date(objParams.lastDateAnswer).getTime() -  ( new Date(objParams.lastDateAnswer).getTimezoneOffset() * 60000 ) ),
                        dateNotifDeclarer: new Date( new Date(objParams.dateNotifDeclarer).getTime() -  ( new Date(objParams.dateNotifDeclarer).getTimezoneOffset() * 60000 ) ),
                        timeToCheckComplaint: Int32(objParams.timeToCheckComplaint),

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