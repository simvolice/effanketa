/**
 * Created by simvolice on 29.08.2017 17:20
 */



const dbConnect = require('../utils/dbConnect');


const ObjectId = require('mongodb').ObjectId;

module.exports = {


    initialTypePeriod: async () => {


        try {





            const col = dbConnect.getConnect().collection('type_period');
            col.createIndex({ name : 1 }, {unique: true});


            const result = await col.insertMany([



                {

                name: "Квартальный (1-вый квартал, янв-март)",
                codeName: [1, 2, 3]

                },



                {

                    name: "Квартальный (2-ий квартал, апр-июнь)",
                    codeName: [4, 5, 6]

                },


                {

                    name: "Квартальный (3-ий квартал, июль-сент)",
                    codeName: [7, 8, 9]

                },

                {

                    name: "Квартальный (4-ий квартал, окт-дек)",
                    codeName: [10, 11, 12]

                },





                {

                    name: "Полугодовой (1-ое полугодие, янв-июнь)",
                    codeName: [1, 2, 3, 4, 5, 6]

                },



                {

                    name: "Годовой (янв-дек)",
                    codeName: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

                }
                ]

            );





            return result;


        }catch(err) {




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


    getOnlyQurters: async () => {


        try {


            const col = dbConnect.getConnect().collection('type_period');





            const result = await col.find({



                name: { $regex: /квартал/ }




            }).toArray();




            return result;


        }catch(err) {




            return err;


        }





    }



};