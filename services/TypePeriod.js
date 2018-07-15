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
                dateFrom: "01.02",
                dateTo: "03.30"

                },



                {

                    name: "Квартальный (2-ий квартал, апр-июнь)",
                    dateFrom: "04.02",
                    dateTo: "06.30"

                },


                {

                    name: "Квартальный (3-ий квартал, июль-сент)",
                    dateFrom: "07.02",
                    dateTo: "09.30"

                },

                {

                    name: "Квартальный (4-ий квартал, окт-дек)",
                    dateFrom: "10.02",
                    dateTo: "12.30"

                },





                {

                    name: "Полугодовой (1-ое полугодие, янв-июнь)",
                    dateFrom: "01.02",
                    dateTo: "06.30"
                },



                {

                    name: "Годовой (янв-дек)",
                    dateFrom: "01.02",
                    dateTo: "12.30"

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
