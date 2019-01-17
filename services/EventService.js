/**
 * Created by simvolice on 09.08.2017 1:38
 */


const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;
const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');

const dbUtilsHelpMethods = require('../utils/dbUtilsHelpMethods');

module.exports = {

    initialStatus: async () => {


        try {





            const col = dbConnect.getConnect().collection('event_statuses');

            col.createIndex({ name : 1 }, {unique: true});




            const result = await col.insertMany([

                {
                    name: "Обучающий"
                },

                {
                    name: "Другое"
                }

                ]

            );





            return result;


        }catch(err) {




            return err;


        }





    },


    initialSubStatus: async () => {


        try {





            const col = dbConnect.getConnect().collection('event_sub_statuses');

            col.createIndex({ name : 1 }, {unique: true});




            const result = await col.insertMany([

                    {
                        name: "Нет"
                    },

                    {
                        name: "Частично"
                    },

                    {
                    name: "Полностью"
                    }

                ]

            );





            return result;


        }catch(err) {




            return err;


        }





    },


    getAllEventStatuses: async () => {

        try {


            const col = dbConnect.getConnect().collection('event_statuses');



            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },


    getAllEventSubStatuses: async () => {

        try {


            const col = dbConnect.getConnect().collection('event_sub_statuses');



            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },




    addEvent: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('events');


            let nameCountry = await CountryService.getCountryById(objParams.country);
            let nameTypeEvent = await dbUtilsHelpMethods.getOneObjById(objParams.typeEvent, "event_statuses");
            let nameSubTypeEvent = await dbUtilsHelpMethods.getOneObjById(objParams.subTypeEvent, "event_sub_statuses");

            let seq = await CounterService.getNextSequence("eventid");


            const result = await col.insertOne({


                id: seq,
                icon: "add",
                formIcon: "attach_file",
                iconSend: "send",

                country: ObjectId(objParams.country),
                nameCountry: nameCountry.name,
                myDate: new Date( new Date(objParams.myDate).getTime() -  ( new Date(objParams.myDate).getTimezoneOffset() * 60000 ) ),

                nameEvent: objParams.nameEvent,
                typeEvent: ObjectId(objParams.typeEvent),
                nameTypeEvent: nameTypeEvent.name,
                subTypeEvent: ObjectId(objParams.subTypeEvent),
                nameSubTypeEvent: nameSubTypeEvent.name,

                common_ok_persent: Int32(objParams.common_ok_persent),
                common_women_persent: Int32(objParams.common_women_persent),

                countPeopleEventCommon: objParams.countPeopleEventCommon,
                countWomanEventCommon: objParams.countWomanEventCommon,

                countFacilatatorEventCommon: objParams.countFacilatatorEventCommon,
                countFacilatatorWomanEventCommon: objParams.countFacilatatorWomanEventCommon,

                countSpeakerEventCommon: objParams.countSpeakerEventCommon,
                countSpeakerWomanEventCommon: objParams.countSpeakerWomanEventCommon,
                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )




            });





            return result;

        } catch (err){


            return err;

        }







    },




    delEvent: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('events');

            const colForms = dbConnect.getConnect().collection('forms');





            await colForms.deleteMany({parentId: ObjectId(id)});





            const result = await col.deleteOne({

                _id: ObjectId(id)

            });





            return result;

        } catch (err){


            return err;

        }







    },


    getEvent: async () => {

        try {


            const col = dbConnect.getConnect().collection('events');





            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },



    getEventByCountryId: async (countryId) => {

        try {


            const col = dbConnect.getConnect().collection('events');





            const result = await col.find({country: ObjectId(countryId)}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },




    updEvent: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('events');

            let nameCountry = await CountryService.getCountryById(objParams.country);
            let nameTypeEvent = await dbUtilsHelpMethods.getOneObjById(objParams.typeEvent, "event_statuses");
            let nameSubTypeEvent = await dbUtilsHelpMethods.getOneObjById(objParams.subTypeEvent, "event_sub_statuses");



            const result = await col.updateOne({ _id: ObjectId(objParams._id) },
                {
                    $currentDate: {
                        lastModified: true
                    },
                    $set: {
                        country: ObjectId(objParams.country),
                        myDate: new Date( new Date(objParams.myDate).getTime() -  ( new Date(objParams.myDate).getTimezoneOffset() * 60000 ) ),
                        nameCountry: nameCountry.name,


                        nameEvent: objParams.nameEvent,
                        typeEvent: ObjectId(objParams.typeEvent),

                        nameTypeEvent: nameTypeEvent.name,
                        subTypeEvent: ObjectId(objParams.subTypeEvent),
                        nameSubTypeEvent: nameSubTypeEvent.name,

                        common_ok_persent: Int32(objParams.common_ok_persent),
                        common_women_persent: Int32(objParams.common_women_persent),

                        countPeopleEventCommon: objParams.countPeopleEventCommon,
                        countWomanEventCommon: objParams.countWomanEventCommon,
                        countFacilatatorEventCommon: objParams.countFacilatatorEventCommon,
                        countFacilatatorWomanEventCommon: objParams.countFacilatatorWomanEventCommon,
                        countSpeakerEventCommon: objParams.countSpeakerEventCommon,
                        countSpeakerWomanEventCommon: objParams.countSpeakerWomanEventCommon,
                    }
                });





            return result;

        } catch (err){


            return err;

        }







    },



    getPublicEvent: async () => {

    try {


        const col = dbConnect.getConnect().collection('events');





        const result = await col.aggregate([
            { $match : {} },

            { $project : { country : 1 , myDate: 1, nameEvent: 1 } },
            {
                $lookup:
                    {
                        from: "countrys",
                        localField: "country",
                        foreignField: "_id",
                        as: "country_docs"
                    }
            },

            { $unwind : "$country_docs" },

            { $project : { country : 0 , "country_docs._id": 0} }






        ]).toArray();





        return result;

    } catch (err){


        return err;

    }







},




    getEventByID: async (id) => {






        try {


            const col = dbConnect.getConnect().collection('events');





            const result = await col.findOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }








    }




};