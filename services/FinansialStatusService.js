/**
 * Created by simvolice on 17.08.2017 16:39
 */



const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');

const ObjectId = require('mongodb').ObjectId;
const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');




module.exports = {


    addFinansialStatus: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('finansial_status');


            let seq = await CounterService.getNextSequence("finansial_statusid");



            const result = await col.insertOne({


                id: seq,
                BudgetBisbursementPlan: objParams.BudgetBisbursementPlan,
                BudgetBisbursementFact: objParams.BudgetBisbursementFact,
                BudgetBisbursementComment: objParams.BudgetBisbursementComment,
                ServicesPlan: objParams.ServicesPlan,
                ServicesFact: objParams.ServicesFact,
                ServicesComment: objParams.ServicesComment,
                CreditLinePlan: objParams.CreditLinePlan,
                CreditLineFact: objParams.CreditLineFact,
                CreditLineComment: objParams.CreditLineComment,
                OperatingExpensesPlan: objParams.OperatingExpensesPlan,
                OperatingExpensesFact: objParams.OperatingExpensesFact,
                OperatingExpensesComment: objParams.OperatingExpensesComment,
                country: ObjectId(objParams.country),



                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )







            });





            return result;

        } catch (err){


            return err;

        }







    },




    getAll: async () => {

        try {


            const col = dbConnect.getConnect().collection('finansial_status');


            let allCountrys = await CountryService.getAllCountrys();



            const result = await col.aggregate([

                {$match: {}},




                {$addFields: {


                    allCountrys: allCountrys

                }}



            ]).toArray();





            return result;

        } catch (err){


            return err;

        }







    },



    getByCountryId: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('finansial_status');


            let oneCountrys = await CountryService.getCountryById(id);

            let allCountrys = [];

            allCountrys.push(oneCountrys);


            const result = await col.aggregate([

                {$match: {country: ObjectId(id)}},




                {$addFields: {


                    allCountrys: allCountrys

                }}



            ]).toArray();





            return result;

        } catch (err){


            return err;

        }







    },



    updFinansialStatus: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('finansial_status');




            const result = await col.updateOne({_id: ObjectId(objParams._id)},{


                $currentDate: {
                    lastModified: true
                },


                $set: {


                    BudgetBisbursementPlan: objParams.BudgetBisbursementPlan,
                    BudgetBisbursementFact: objParams.BudgetBisbursementFact,
                    BudgetBisbursementComment: objParams.BudgetBisbursementComment,
                    ServicesPlan: objParams.ServicesPlan,
                    ServicesFact: objParams.ServicesFact,
                    ServicesComment: objParams.ServicesComment,
                    CreditLinePlan: objParams.CreditLinePlan,
                    CreditLineFact: objParams.CreditLineFact,
                    CreditLineComment: objParams.CreditLineComment,
                    OperatingExpensesPlan: objParams.OperatingExpensesPlan,
                    OperatingExpensesFact: objParams.OperatingExpensesFact,
                    OperatingExpensesComment: objParams.OperatingExpensesComment,
                    country: ObjectId(objParams.country),



                }










            });





            return result;

        } catch (err){


            return err;

        }







    },




    delFinansialStatus: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('finansial_status');




            const result = await col.deleteOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }







    },



};