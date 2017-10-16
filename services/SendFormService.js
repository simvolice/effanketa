/**
 * Created by simvolice on 16.10.2017 17:24
 */


const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;

module.exports = {


    sendFormEmails: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('send_forms_emails');





            const result = await col.insertOne({parentId: ObjectId(objParams.parentId),

            emails: objParams.emails,


                country: objParams.country,
                dateOfEvent: objParams.dateOfEvent,
                nameEvent: objParams.nameEvent,
                nameCountry: objParams.nameCountry,

            });





            return result;

        } catch (err){


            return err;

        }







    },



    getAllFormEmails: async () => {

        try {


            const col = dbConnect.getConnect().collection('send_forms_emails');





            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },


    updFormEmails: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('send_forms_emails');





            const result = await col.updateOne({parentId: ObjectId(objParams.parentId)},



                { $set: {emails: objParams.emails},



            }


            );





            return result;

        } catch (err){


            return err;

        }







    },






};