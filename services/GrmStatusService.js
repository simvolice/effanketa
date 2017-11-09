/**
 * Created by simvolice on 04.08.2017 15:00
 */



const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


module.exports = {

    initialGrmStatus: async () => {

      const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
      try {




          const col = db.collection('grmstatus');

          col.createIndex({ name : 1 }, {unique: true});


          const result = await col.insertMany([

              {

                  name: "Не относится к действиям проекта"

              },

              {

                  name: "На рассмотрении"

              },




              {

                  name: "Закрыта"

              }



              ]);



          db.close();

          return result;


      }catch(err) {


          db.close();

          return err;


      }






  },


    initialGrmCanalsRequest: async () => {

        const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
        try {




            const col = db.collection('grmstatus_canals_request');

            col.createIndex({ name : 1 }, {unique: true});


            const result = await col.insertMany([

                {

                    name: "Телефон"

                },

                {

                    name: "Email"

                },




                {

                    name: "Устно"

                },


                {

                    name: "Бумажный носитель"

                },


                {

                    name: "Интернет"

                }



            ]);



            db.close();

            return result;


        }catch(err) {


            db.close();

            return err;


        }






    },


    initialGrmCategGRM: async () => {

        const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
        try {




            const col = db.collection('grm_categ');

            col.createIndex({ name : 1 }, {unique: true});


            const result = await col.insertMany([

                {

                    name: "Меры по охране окружающей среды и социальные вопросы, в т.ч. гендерные особенности, трудовые ресурсы, переселение"

                },

                {

                    name: "Отзыв по поводу нарушений правил, руководящих принципов и процедур"

                },




                {

                    name: "Отзыв по поводу нарушений контракта"

                },


                {

                    name: "Отзыв по поводу нецелевого расходования денежных средств/отсутствия прозрачности или других проблем финансового управления"

                },


                {

                    name: "Отзыв по поводу злоупотребления полномочиям/вмешательства со стороны проекта или правительственных чиновников"

                },


                {

                    name: "Отзыв по поводу эффективности работы персонала РКГ"

                },


                {

                    name: "Отчеты о форс-мажорных обстоятельствах"

                },


                {

                    name: "Предложения"

                },


                {

                    name: "Благоприятный отзыв/Благодарность"

                }





            ]);



            db.close();

            return result;


        }catch(err) {


            db.close();

            return err;


        }






    },




    getAllStatus: async () => {

        try {


            const col = dbConnect.getConnect().collection('grmstatus');




            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },




    getStatusById: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('grmstatus');




            const result = await col.findOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }







    },



    getStatusByName: async (name) => {

        try {


            const col = dbConnect.getConnect().collection('grmstatus');




            const result = await col.findOne({name: name});





            return result;

        } catch (err){


            return err;

        }







    },





    getAllCanalsRequest: async () => {

        try {


            const col = dbConnect.getConnect().collection('grmstatus_canals_request');




            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },



    getCanalById: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('grmstatus_canals_request');




            const result = await col.findOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }







    },


    insertCanalsRequest: async (name) => {

        try {


            const col = dbConnect.getConnect().collection('grmstatus_canals_request');




            const result = await col.insertOne({name: name});





            return result;

        } catch (err){


            return err;

        }







    },



    getAllCategGRM: async () => {

        try {


            const col = dbConnect.getConnect().collection('grm_categ');




            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },


    getCategById: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('grm_categ');




            const result = await col.findOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }







    },


    insertCategGRM: async (name) => {

        try {


            const col = dbConnect.getConnect().collection('grm_categ');




            const result = await col.insertOne({name: name});





            return result;

        } catch (err){


            return err;

        }







    },







};