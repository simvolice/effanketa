/**
 * Created by simvolice on 29.08.2017 17:20
 */



const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

module.exports = {


    initialTypePeriod: async () => {

        const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
        try {




            const col = db.collection('type_period');


            col.createIndex({ name : 1 }, {unique: true});


            const result = await col.insertMany([{

                name: "Квартал 1",
                codeName: [1,2,3]

                },


                {

                    name: "Квартал 2",
                    codeName: [4,5,6]
                },

                {

                    name: "Квартал 3",
                    codeName: [7,8,9]

                },

                {

                    name: "Квартал 4",
                    codeName: [10,11,12]

                },

                {

                    name: "Полугодие 1",
                    codeName: [1,2,3,4,5,6]

                },

                {

                    name: "Полугодие 2",
                    codeName: [7,8,9,10,11,12]

                },

                {

                    name: "Год",
                    codeName: [1,2,3,4,5,6,7,8,9,10,11,12]

                }

                ]

            );



            db.close();

            return result;


        }catch(err) {


            db.close();

            return err;


        }





    },




    getAll: async () => {


        try {


            const col = dbConnect.getConnect().collection('type_period');





            const result = await col.find({}).toArray();




            return result;


        }catch(err) {




            return err;


        }





    },



    getTypePeriodById: async (id) => {


        try {


            const col = dbConnect.getConnect().collection('type_period');





            const result = await col.findOne({_id: ObjectId(id)});




            return result;


        }catch(err) {




            return err;


        }





    },



};