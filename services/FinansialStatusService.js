/**
 * Created by simvolice on 17.08.2017 16:39
 */



const dbConnect = require('../utils/dbConnect');

const searchQuarter = require('../utils/searchQuarter');

const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;
const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');
const TypePeriod = require('../services/TypePeriod');







module.exports = {


    addFinansialStatus: async (objParams) => {

        try {




            const col = dbConnect.getConnect().collection('finansial_status');
            let nameCountry = await CountryService.getCountryById(objParams.country);

            let seq = await CounterService.getNextSequence("finansial_statusid");



            const result = await col.insertOne({


                id: seq,
                categFinStatusBudgetBisbursement: "BudgetBisbursement",
                categFinStatusServices: "Services",
                categFinStatusCreditLine: "CreditLine",
                categFinStatusOperatingExpenses: "OperatingExpenses",


                BudgetBisbursementPlan: Int32(objParams.BudgetBisbursementPlan),
                BudgetBisbursementFact: Int32(objParams.BudgetBisbursementFact),
                BudgetBisbursementComment: objParams.BudgetBisbursementComment,
                ServicesPlan: Int32(objParams.ServicesPlan),
                ServicesFact: Int32(objParams.ServicesFact),
                ServicesComment: objParams.ServicesComment,
                CreditLinePlan: Int32(objParams.CreditLinePlan),
                CreditLineFact: Int32(objParams.CreditLineFact),
                CreditLineComment: objParams.CreditLineComment,
                OperatingExpensesPlan: Int32(objParams.OperatingExpensesPlan),
                OperatingExpensesFact: Int32(objParams.OperatingExpensesFact),
                OperatingExpensesComment: objParams.OperatingExpensesComment,
                country: ObjectId(objParams.country),
                nameCountry: nameCountry.name,





                nameQuarter: objParams.nameQuarter,
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
            let nameCountry = await CountryService.getCountryById(objParams.country);




            const result = await col.updateOne({_id: ObjectId(objParams._id)},{


                $currentDate: {
                    lastModified: true
                },


                $set: {


                    BudgetBisbursementPlan: Int32(objParams.BudgetBisbursementPlan),
                    BudgetBisbursementFact: Int32(objParams.BudgetBisbursementFact),
                    BudgetBisbursementComment: objParams.BudgetBisbursementComment,
                    ServicesPlan: Int32(objParams.ServicesPlan),
                    ServicesFact: Int32(objParams.ServicesFact),
                    ServicesComment: objParams.ServicesComment,
                    CreditLinePlan: Int32(objParams.CreditLinePlan),
                    CreditLineFact: Int32(objParams.CreditLineFact),
                    CreditLineComment: objParams.CreditLineComment,
                    OperatingExpensesPlan: Int32(objParams.OperatingExpensesPlan),
                    OperatingExpensesFact: Int32(objParams.OperatingExpensesFact),
                    OperatingExpensesComment: objParams.OperatingExpensesComment,
                    country: ObjectId(objParams.country),
                    nameCountry: nameCountry.name



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