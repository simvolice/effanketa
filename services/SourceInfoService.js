/**
 * Created by simvolice on 04.08.2017 15:00
 */



const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


module.exports = {

  initialSourceInfo: async () => {

      const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
      try {




          const col = db.collection('sourceinfos');
          col.createIndex({ name : 1 }, {unique: true});


          const result = await col.insertMany([




              {

              name: "кредитная заявка",


              },




              {

                  name: "анкета по окончанию суб-проекта",



              },


              {

                  name: "выборочная внешняя оценка инвестиций",



              }


          ]);



          db.close();

          return result;


      }catch(err) {


          db.close();

          return err;


      }






  },





    getAllSourceInfo: async () => {

        try {


            const col = dbConnect.getConnect().collection('sourceinfos');





            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    }






};