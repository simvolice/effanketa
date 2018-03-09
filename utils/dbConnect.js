/**
 * Created by simvolice on 07.05.2017 18:13
 */


const MongoClient = require('mongodb').MongoClient;

const Logger = require('mongodb').Logger;
Logger.setLevel(process.env.MONGODB_LEVEL_LOG);


let state = {
    db: null
};


module.exports = {


    connect: async () => {


        try {


            let client = await MongoClient.connect(process.env.DB_HOST);

            state.db = client.db(process.env.DB_NAME);




        } catch (err) {

            state.db = err;


        }


    },


    getConnect: () => {

        return state.db;


    }


};

