/**
 * Created by simvolice on 07.05.2017 18:13
 */

const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;

const Logger = require('mongodb').Logger;
Logger.setLevel('debug');


let state = {
    db: null
};


module.exports = {


    connect: async () => {


        try {


            state.db = await MongoClient.connect(config.urlToMongoDBLocalhost);


        } catch (err) {

            state.db = err;


        }


    },


    getConnect: () => {

        return state.db;


    }


};

