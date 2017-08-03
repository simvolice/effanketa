/**
 * Created by simvolice on 04.08.2017 1:27
 */

const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;







module.exports = {



    initialCounter: async () => {

        const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
        try {




            const col = db.collection('counters');




            const result = await col.insertOne(
                {
                    _id: "userid",
                    seq: 1
                }
            );



            db.close();

            return result;


        }catch(err) {


            db.close();

            return err;


        }





    },



    getNextSequence: async (name) => {

        try {


            const col = dbConnect.getConnect().collection('counters');





            const result = await col.findOneAndUpdate(
                { _id : name },
                { $inc: { seq : 1 } },

                {returnNewDocument : true}
            );





            return result.value.seq;

        } catch (err){


            return err;

        }







    }









};