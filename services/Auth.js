/**
 * Created by Admin on 06.01.2017.
 */
const dbConnect = require('../utils/dbConnect');


const ObjectId = require('mongodb').ObjectId;

const config = require('../utils/devConfig');
const CounterService = require('../services/CounterService');
const RoleService = require('../services/RoleService');
const CountryService = require('../services/CountryService');

const MongoClient = require('mongodb').MongoClient;




module.exports = {






    saveCsrfToken: async (tokencsrf) => {





            try {







            const col = dbConnect.getConnect().collection('tokencsrf');

              col.createIndex({ createAt : 1 }, {expireAfterSeconds: 3.154e+7});
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



    login: async (email) => {

    try {



      const col = dbConnect.getConnect().collection('users');





      const result = await col.findOne({email: email});





      return result;


    }catch(err) {




      return err;


    }


  },


    register: async (objParam) => {

        try {



            const col = dbConnect.getConnect().collection('users');
            col.createIndex({ email : 1 }, {unique: true});



            let seq = await CounterService.getNextSequence("userid");

            const result = await col.insertOne({pass: objParam.pass, email: objParam.email, role: ObjectId(objParam.role), fio: objParam.fio, country: ObjectId(objParam.country), id: seq, createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ), passClear: objParam.passClear, urlImg: objParam.urlImg});





            return result;


        }catch(err) {




            return err;


        }


    },



    updUser: async (objParam) => {

        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.updateOne({_id: ObjectId(objParam._id)} ,{ $set: {


                email: objParam.email,


                role: ObjectId(objParam.role),

                fio: objParam.fio,


                country: ObjectId(objParam.country),

                urlImg: objParam.urlImg,


                updateAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )}




            });





            return result;


        }catch(err) {




            return err;


        }


    },


    delUser: async (objParam) => {

        try {



            const col = dbConnect.getConnect().collection('users');




            const result = await col.deleteOne({_id: ObjectId(objParam._id)});





            return result;


        }catch(err) {




            return err;


        }


    },



    recoveryUser: async (objParam) => {

        try {



            const col = dbConnect.getConnect().collection('users');



            const result = await col.updateOne({_id: ObjectId(objParam._id)}, { $set: {pass: objParam.pass, updateAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )}});





            return result;


        }catch(err) {




            return err;


        }


    },



    getAllUsers: async () => {

        try {


            const col = dbConnect.getConnect().collection('users');





            const result = await col.aggregate([
                { $match : { } },

                {$project: {pass: 0}},
                { $addFields: {
                    allRoles : await RoleService.getAllRoles(),
                    allCountrys: await CountryService.getAllCountrys()
                }}





            ]).toArray();





            return result;

        } catch (err){


            return err;

        }







    },


    getUsersForAdmin2: async (idCountry) => {

        try {




            const col = dbConnect.getConnect().collection('users');

            let allRoles = await RoleService.getAllRoles();
            let oneCoutry = await CountryService.getCountryById(idCountry);
            let arrCoutry = [];
            arrCoutry.push(oneCoutry);






            const result = await col.aggregate([
                { $match : {role: ObjectId(allRoles[2]._id),  country: ObjectId(idCountry)} },

                {$project: {pass: 0}},
                { $addFields: {
                    allRoles : allRoles.slice(2, 3),
                    allCountrys: arrCoutry
                }}




            ]).toArray();





            return result;

        } catch (err){


            return err;

        }







    },

    createUserSuperRoot: async (hash) => {


        const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

        try {




            const col = db.collection('users');
            col.createIndex({ email : 1 }, {unique: true});


            let rootRole = await RoleService.getAllRoles();
            let countryForRoot = await CountryService.getAllCountrys();

            let seq = await CounterService.getNextSequence("userid");

            const result = await col.insertOne({


                pass: hash,
                email: "simvolice@gmail.com",
                role: ObjectId(rootRole[0]._id),
                fio: "Админ первый",
                id: seq,
                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) ),
                country: ObjectId(countryForRoot[0]._id),
                urlImg: "assets/img/user.png"


            });




            db.close();

            return result;


        }catch(err) {


            db.close();

            return err;


        }


    }





};