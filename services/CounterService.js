/**
 * Created by simvolice on 04.08.2017 1:27
 */

const dbConnect = require('../utils/dbConnect');





module.exports = {



    initialCounter: async () => {


        try {


            const col = dbConnect.getConnect().collection('counters');




            const result = await col.insertMany([
                {
                _id: "userid",
                seq: 1
            },

                {
                    _id: "eventid",
                    seq: 1
                },

                {
                    _id: "creditid",
                    seq: 1
                },


                {
                    _id: "table5id",
                    seq: 1
                },

                    {
                        _id: "grmid",
                        seq: 1
                    },


                {
                    _id: "finansial_statusid",
                    seq: 1
                },



                    {
                        _id: "platform_network_id",
                        seq: 1
                    },


                {
                    _id: "project_id",
                    seq: 1
                },

                {
                    _id: "regional_invest_id",
                    seq: 1
                },


                {
                    _id: "mobile_resurse_id",
                    seq: 1
                },


                {
                    _id: "strategic_id",
                    seq: 1
                },

                {
                    _id: "build_report_id",
                    seq: 1
                },


                ]

            );





            return result;


        }catch(err) {




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