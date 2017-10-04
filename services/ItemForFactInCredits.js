/**
 * Created by simvolice on 04.08.2017 15:00
 */



const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


module.exports = {

  initialItemFactForCredits: async () => {

      const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
      try {




          const col = db.collection('credits_fact_item');
          col.createIndex({ name : 1 }, {unique: true});


          const result = await col.insertMany([




              {

              name: "Ирригация/дренаж каналы"


              },




              {

                  name: "Водосберегающие технологии"



              },


              {

                  name: "Садоводство, виноградство"



              },




              {

                  name: "Семеноводство"



              },






              {

                  name: "Животноводство/племеноводство"



              }


          ]);



          db.close();

          return result;


      }catch(err) {


          db.close();

          return err;


      }






  },





    getAllCreditsFact: async () => {

        try {


            const col = dbConnect.getConnect().collection('credits_fact_item');





            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },


    insertCreditsFact: async (name) => {

        try {


            const col = dbConnect.getConnect().collection('credits_fact_item');





            const result = await col.insertOne({name: name});





            return result;

        } catch (err){


            return err;

        }







    }






};