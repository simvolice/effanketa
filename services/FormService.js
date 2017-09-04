/**
 * Created by simvolice on 09.08.2017 1:12
 */

const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;


module.exports = {



    addForm: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('forms');

            col.createIndex({ parentId : 1 });



            const result = await col.insertOne({

                icon: "subdirectory_arrow_right",
                parentId: ObjectId(objParams.parentId) ,
                dateOfEvent: new Date( new Date(objParams.myDate).getTime() -  ( new Date(objParams.myDate).getTimezoneOffset() * 60000 ) ),
                nameOfCountry: objParams.nameCountry,
                nameEvent: "Анкета-опросник",
                nameOfEvent: objParams.nameEvent,

                email: objParams.email,
                question1: objParams.question1,
                ques1: objParams.ques1,

                question2: objParams.question2,
                ques2: objParams.ques2,

                question3: objParams.question3,
                ques3: objParams.ques3,

                question4: objParams.question4,
                ques4: objParams.ques4,

                question5: objParams.question5,
                ques5: objParams.ques5,

                question6: objParams.question6,
                ques6: objParams.ques6,


                question7: objParams.question7,
                ques7: objParams.ques7,


                question8: objParams.question8,
                ques8: objParams.ques8,


                question9: objParams.question9,
                ques9: objParams.ques9,

                question10: objParams.question10,
                ques10: objParams.ques10,

                question11: objParams.question11,
                ques11: objParams.ques11,

                question12: objParams.question12,
                ques12: Int32(objParams.ques12),



                question13: objParams.question13,
                ques13: objParams.ques13,


                question14: objParams.question14,
                ques14: objParams.ques14,


                question15:objParams.question15,
                ques15: objParams.ques15,


                question16: objParams.question16,
                ques16: objParams.ques16,



                question17: objParams.question17,
                ques17: objParams.ques17,


                question18: objParams.question18,
                ques18: objParams.ques18,


                question19: objParams.question19,
                ques19: objParams.ques19,



                question20: objParams.question20,
                ques20: objParams.ques20,



                question21: objParams.question21,
                ques21: objParams.ques21




            });





            return result;

        } catch (err){


            return err;

        }







    },




    getForms: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('forms');





            const result = await col.find({parentId: ObjectId(id)}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },



    deleteForms: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('forms');





            const result = await col.deleteOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }







    },



    updForm: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('forms');




            const result = await col.updateOne({

                _id: ObjectId(objParams.id)


            },

                {
                    $currentDate:

                    {

                    lastModified: true


                    },

                    $set: {



                email: objParams.email,
                question1: objParams.question1,
                ques1: objParams.ques1,

                question2: objParams.question2,
                ques2: objParams.ques2,

                question3: objParams.question3,
                ques3: objParams.ques3,

                question4: objParams.question4,
                ques4: objParams.ques4,

                question5: objParams.question5,
                ques5: objParams.ques5,

                question6: objParams.question6,
                ques6: objParams.ques6,


                question7: objParams.question7,
                ques7: objParams.ques7,


                question8: objParams.question8,
                ques8: objParams.ques8,


                question9: objParams.question9,
                ques9: objParams.ques9,

                question10: objParams.question10,
                ques10: objParams.ques10,

                question11: objParams.question11,
                ques11: objParams.ques11,

                question12: objParams.question12,
                ques12: objParams.ques12,



                question13: objParams.question13,
                ques13: objParams.ques13,


                question14: objParams.question14,
                ques14: objParams.ques14,


                question15:objParams.question15,
                ques15: objParams.ques15,


                question16: objParams.question16,
                ques16: objParams.ques16,



                question17: objParams.question17,
                ques17: objParams.ques17,


                question18: objParams.question18,
                ques18: objParams.ques18,


                question19: objParams.question19,
                ques19: objParams.ques19,



                question20: objParams.question20,
                ques20: objParams.ques20,



                question21: objParams.question21,
                ques21: objParams.ques21


            }





            });





            return result;

        } catch (err){


            return err;

        }







    },



    getFormById: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('forms');





            const result = await col.findOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }







    },




};