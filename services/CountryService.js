/**
 * Created by simvolice on 04.08.2017 15:00
 */



const dbConnect = require('../utils/dbConnect');


const ObjectId = require('mongodb').ObjectId;


module.exports = {

  initialCountry: async () => {


      try {






          const col = dbConnect.getConnect().collection('countrys');


          col.createIndex({ name : 1 }, {unique: true});


          const result = await col.insertMany([


              {

              name: "РКГ, Региональный компонент 1"


              },

              {

                  name: "НКГ Таджикистана, Компонент 2"

              },

              {

                  name: "НКГ Узбекистана, Компонент 2"

              },

              {

                  name: "НКГ Кыргызстана, Компонент 2"
              }
              ]

          );





          return result;


      }catch(err) {




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