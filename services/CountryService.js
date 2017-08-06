/**
 * Created by simvolice on 04.08.2017 15:00
 */



const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;


module.exports = {

  initialCountry: async () => {

      const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
      try {




          const col = db.collection('countrys');

          col.createIndex({ name : 1 }, {unique: true});


          const result = await col.insertMany([{

              name: "Казахстан"
          }, {

                  name: "Таджикистан"
              },

              {

                  name: "Узбекистан"
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




  getAllCountrys: async () => {

      try {


          const col = dbConnect.getConnect().collection('countrys');





          const result = await col.find({}).toArray();





          return result;

      } catch (err){


          return err;

      }







  }




};