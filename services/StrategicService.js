/**
 * Created by simvolice on 25.08.2017 18:47
 */




const dbConnect = require('../utils/dbConnect');


const ObjectId = require('mongodb').ObjectId;

const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');
const NameYear = require('../services/NameYear');



module.exports = {


    addStrategy: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');
            let seq = await CounterService.getNextSequence("strategic_id");
            let nameCountry = await CountryService.getCountryById(objParams.country);
            let nameYear = await NameYear.getYearById(objParams.yearName);

            const result = await col.insertOne({

                id: seq,
                country: ObjectId(objParams.country),
                nameCountry: nameCountry.name,
                year: ObjectId(objParams.yearName),
                nameYear: nameYear.name,
                urlExcel: objParams.urlExcel,




                 createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )




            });



            return result;

        } catch (err){


            return err;

        }











    },

    getAll: async ()=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');

            const result = await col.aggregate([
                { $match : { } },




                {
                    $addFields:
                        {

                            allCountrys: await CountryService.getAllCountrys()

                        }
                },








            ]).toArray();




            return result;

        } catch (err){


            return err;

        }











    },

    updStrategic: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');
            let nameCountry = await CountryService.getCountryById(objParams.country);
            let nameYear = await NameYear.getYearById(objParams.yearName);


            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    country: ObjectId(objParams.country),
                    nameCountry: nameCountry.name,
                    year: ObjectId(objParams.yearName),
                    nameYear: nameYear.name,
                    urlExcel: objParams.urlExcel,



                }



            });



            return result;

        } catch (err){


            return err;

        }











    },

    delStrategic: async (id)=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');


            const result = await col.deleteOne({_id: ObjectId(id)});



            return result;

        } catch (err){


            return err;

        }











    }



};