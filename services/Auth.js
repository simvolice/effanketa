/**
 * Created by Admin on 06.01.2017.
 */
const dbConnect = require('../utils/dbConnect');


const ObjectId = require('mongodb').ObjectId;

const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;






module.exports = {






    saveCsrfToken: async (tokencsrf) => {





            try {







            const col = dbConnect.getConnect().collection('tokencsrf');

              col.createIndex({ createAt : 1 }, {expireAfterSeconds: 86400});
              col.createIndex({ tokencsrf : 1 }, {unique: true});





            const result = await col.insertOne({tokencsrf: tokencsrf, createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )});





            return result;

    }catch(err) {

                return err;


            }



    },

    getCsrfToken: async (tokencsrf) => {

        try {




          const col = dbConnect.getConnect().collection('tokencsrf');




          const result = await col.findOne({tokencsrf: tokencsrf});




            return result;


        }catch(err) {



            return err;


        }


    },



    checkUserById: async (id) => {

      try {



        const col = dbConnect.getConnect().collection('users');





        const result = await col.findOne({_id: ObjectId(id)});





        return result;


      }catch(err) {




        return err;


      }


    },



    login: async (login) => {

    try {



      const col = dbConnect.getConnect().collection('users');





      const result = await col.findOne({login: login});





      return result;


    }catch(err) {




      return err;


    }


  },



    createUserSuperRoot: async (hash) => {


        const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

        try {




            const col = db.collection('users');




            const result = await col.insertOne({login: "admin", pass: hash});




            db.close();

            return result;


        }catch(err) {


            db.close();

            return err;


        }


    }





};