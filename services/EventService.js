/**
 * Created by simvolice on 09.08.2017 1:38
 */


const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;
const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');

module.exports = {



    addEvent: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('events');


            let nameCountry = await CountryService.getCountryById(objParams.country);

            let seq = await CounterService.getNextSequence("eventid");


            const result = await col.insertOne({


                id: seq,
                icon: "add",
                formIcon: "attach_file",

                country: ObjectId(objParams.country),
                nameCountry: nameCountry.name,
                myDate: new Date( new Date(objParams.myDate).getTime() -  ( new Date(objParams.myDate).getTimezoneOffset() * 60000 ) ),

                nameEvent: objParams.nameEvent,
                typeEvent: objParams.typeEvent,
                subTypeEvent: objParams.subTypeEvent,
                countPeopleEventCommon: objParams.countPeopleEventCommon,
                countWomanEventCommon: objParams.countWomanEventCommon,

                countFacilatatorEventCommon: objParams.countFacilatatorEventCommon,
                countFacilatatorWomanEventCommon: objParams.countFacilatatorWomanEventCommon,

                countSpeakerEventCommon: objParams.countSpeakerEventCommon,
                countSpeakerWomanEventCommon: objParams.countSpeakerWomanEventCommon


            });





            return result;

        } catch (err){


            return err;

        }







    },




    delEvent: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('events');





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
                        typeEvent: objParams.typeEvent,
                        subTypeEvent: objParams.subTypeEvent,
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




};