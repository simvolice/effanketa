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

                  name: "Принято"

              },

              {

                  name: "Отказано"

              },

              {

                  name: "Переделать"

              },


              {

                  name: "Просрочено"

              },


              {

                  name: "Завершен"

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







    }











};