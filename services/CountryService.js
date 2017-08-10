/**
 * Created by simvolice on 04.08.2017 15:00
 */



const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


module.exports = {

  initialCountry: async () => {

      const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
      try {




          const col = db.collection('countrys');

          col.createIndex({ name : 1 }, {unique: true});


          const result = await col.insertMany([{

              name: "Казахстан",
              flag: "assets/img/Flag_of_Kazakhstan.svg"
          }, {

                  name: "Таджикистан",
              flag: "assets/img/Flag_of_Tajikistan.svg"
              },

              {

                  name: "Узбекистан",
                  flag: "assets/img/Flag_of_Uzbekistan.svg"
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







  },

  getCountryById: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('countrys');





            const result = await col.findOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }







    }




};