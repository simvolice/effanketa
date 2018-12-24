/**
 * Created by simvolice on 17.08.2017 16:39
 */



const dbConnect = require('../utils/dbConnect');

const searchQuarter = require('../utils/searchQuarter');

const ObjectId = require('mongodb').ObjectId;

const Double = require('mongodb').Double;
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

                nameCountry: nameCountry.name,





                nameQuarter: new Date( new Date(objParams.nameQuarter).getTime() -  ( new Date(objParams.nameQuarter).getTimezoneOffset() * 60000 ) ),


                categFinStatusBudgetBisbursement: "BudgetBisbursement",
                categFinStatusServices: "Services",
                categFinStatusCreditLine: "CreditLine",
                categFinStatusOperatingExpenses: "OperatingExpenses",


                BudgetBisbursementPlan: Double(objParams.BudgetBisbursementPlan),
                BudgetBisbursementFact: Double(objParams.BudgetBisbursementFact),
                BudgetBisbursementComment: objParams.BudgetBisbursementComment,
                ServicesPlan: Double(objParams.ServicesPlan),
                ServicesFact: Double(objParams.ServicesFact),
                ServicesComment: objParams.ServicesComment,
                CreditLinePlan: Double(objParams.CreditLinePlan),
                CreditLineFact: Double(objParams.CreditLineFact),
                CreditLineComment: objParams.CreditLineComment,
                OperatingExpensesPlan: Double(objParams.OperatingExpensesPlan),
                OperatingExpensesFact: Double(objParams.OperatingExpensesFact),
                OperatingExpensesComment: objParams.OperatingExpensesComment,
                country: ObjectId(objParams.country),
               createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )







            });





            return result;

        } catch (err){


            console.error(err);
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


                    BudgetBisbursementPlan: Double(objParams.BudgetBisbursementPlan),
                    BudgetBisbursementFact: Double(objParams.BudgetBisbursementFact),
                    BudgetBisbursementComment: objParams.BudgetBisbursementComment,
                    ServicesPlan: Double(objParams.ServicesPlan),
                    ServicesFact: Double(objParams.ServicesFact),
                    ServicesComment: objParams.ServicesComment,
                    CreditLinePlan: Double(objParams.CreditLinePlan),
                    CreditLineFact: Double(objParams.CreditLineFact),
                    CreditLineComment: objParams.CreditLineComment,
                    OperatingExpensesPlan: Double(objParams.OperatingExpensesPlan),
                    OperatingExpensesFact: Double(objParams.OperatingExpensesFact),
                    OperatingExpensesComment: objParams.OperatingExpensesComment,
                    country: ObjectId(objParams.country),
                    nameCountry: nameCountry.name,
                    nameQuarter: new Date( new Date(objParams.nameQuarter).getTime() -  ( new Date(objParams.nameQuarter).getTimezoneOffset() * 60000 ) ),




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