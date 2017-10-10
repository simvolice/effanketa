/**
 * Created by simvolice on 29.08.2017 17:24
 */





const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;


module.exports = {


    initialNameYear: async () => {

        const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
        try {




            const col = db.collection('name_year');

            col.createIndex({ name : 1 }, {unique: true});



            const result = await col.insertMany([{

                    name: "2017",
                codeName: Int32(2017)

                },


                    {

                        name: "2016",
                        codeName: Int32(2016)
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


            const col = dbConnect.getConnect().collection('name_year');





            const result = await col.find({}).toArray();




            return result;


        }catch(err) {




            return err;


        }





    },


    getYearById: async (id) => {


        try {


            const col = dbConnect.getConnect().collection('name_year');





            const result = await col.findOne({_id: ObjectId(id)});




            return result;


        }catch(err) {




            return err;


        }





    },


};