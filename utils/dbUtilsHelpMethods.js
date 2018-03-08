/**
 * Created by simvolice on 08.03.2018 15:50
 */



const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;



module.exports = {




    getOneObjById: async (id, table) => {

        try {

            const col = dbConnect.getConnect().collection(table);

            let result = col.findOne({_id: ObjectId(id)});


            return result;



        } catch (err) {




            return err;








        }








    }





};