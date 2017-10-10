/**
 * Created by simvolice on 29.08.2017 20:04
 */




const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;



const TypePeriod = require('../services/TypePeriod');
const NameYear = require('../services/NameYear');
const CountryService = require('../services/CountryService');
const GrmStatusService = require('../services/GrmStatusService');
const CounterService = require('../services/CounterService');




module.exports = {




    getgrowpotencial: async (objParams) => {

          if (objParams.country === 0) {
              objParams.allCountrys.pop();
              objParams.country = [];
              for (let item of objParams.allCountrys) {
                  objParams.country.push(ObjectId(item._id));
              }



          } else {
              let tempCountry = objParams.country;
              objParams.country = [];
              objParams.country.push(ObjectId(tempCountry));


          }

        try {


            const col = dbConnect.getConnect().collection('events');



            let nameYear = await NameYear.getYearById(objParams.yearname);
            let period = await TypePeriod.getTypePeriodById(objParams.period);





            const result = await col.aggregate([

                {
                    $facet: {
                        "categorizedByDatePeriodCountry": [{

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            }


                        ],


                        "countSatisfaction": [ {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },

                            {
                            $lookup:
                                {
                                    from: "forms",
                                    localField: "_id",
                                    foreignField: "parentId",
                                    as: "forms_docs"
                                }
                        },
                            { $unwind : "$forms_docs" },

                            {
                                $replaceRoot: { newRoot: "$forms_docs" }
                            },



                            {
                                $group : {
                                    _id : null,
                                    average: { $avg: "$ques12" }


                                }
                            }


                        ],



                        "countSatisfactionWomen": [ {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },

                            {
                                $lookup:
                                    {
                                        from: "forms",
                                        localField: "_id",
                                        foreignField: "parentId",
                                        as: "forms_docs"
                                    }
                            },
                            { $unwind : "$forms_docs" },

                            {
                                $replaceRoot: { newRoot: "$forms_docs" }
                            },


                            {$match: {ques20: "Женский"}},


                            {
                                $group : {
                                    _id : null,
                                    average: { $avg: "$ques12" }


                                }
                            }


                        ],




                        "categorizedBySum": [ {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },
                            {
                                $group : {
                                    _id : null,
                                    countPeopleEventCommon: { $sum: "$countPeopleEventCommon" },
                                    countWomanEventCommon: { $sum: "$countWomanEventCommon" },
                                    countFacilatatorEventCommon: { $sum: "$countFacilatatorEventCommon" },
                                    countFacilatatorWomanEventCommon: { $sum: "$countFacilatatorWomanEventCommon" },
                                    countSpeakerEventCommon: { $sum: "$countSpeakerEventCommon" },
                                    countSpeakerWomanEventCommon: { $sum: "$countSpeakerWomanEventCommon" },

                                }
                            }

                        ],



                        "countForms": [ {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },

                            {
                                $lookup:
                                    {
                                        from: "forms",
                                        localField: "_id",
                                        foreignField: "parentId",
                                        as: "forms_docs"
                                    }
                            },
                            { $unwind : "$forms_docs" },

                            {
                                $replaceRoot: { newRoot: "$forms_docs" }
                            },



                            {
                                $count : "all_form"
                            }


                        ],





                    }
                },








            ]).toArray();


            console.log("\x1b[42m", result);


            return result;


        }catch(err) {




            return err;


        }










    },


    getreportcredits: async (objParams) => {


        if (objParams.country === 0) {
            objParams.allCountrys.pop();
            objParams.country = [];
            for (let item of objParams.allCountrys) {
                objParams.country.push(ObjectId(item._id));
            }



        } else {
            let tempCountry = objParams.country;
            objParams.country = [];
            objParams.country.push(ObjectId(tempCountry));


        }


        try {


            const col = dbConnect.getConnect().collection('credits');



            let nameYear = await NameYear.getYearById(objParams.yearname);
            let period = await TypePeriod.getTypePeriodById(objParams.period);


            const result = await col.aggregate([


                        {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },
                                        month: { $month: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },





                            {
                                $group : {
                                    _id : "$categcredits",

                                    countsubproject: { $sum: "$countsubproject" },
                                    commonAmountInDollors: { $sum: "$commonAmountInDollors" },
                                    commonAmountInNatCurrency: { $sum: "$commonAmountInNatCurrency" },
                                    DirectBeneficiariesAll: { $sum: "$DirectBeneficiariesAll" },
                                    DirectBeneficiariesMale: { $sum: "$DirectBeneficiariesMale" },
                                    DirectBeneficiariesFemale: { $sum: "$DirectBeneficiariesFemale" },
                                    NonDirectBeneficiariesMemberFamilyAll: { $sum: "$NonDirectBeneficiariesMemberFamilyAll" },
                                    NonDirectBeneficiariesMemberFamilyMale: { $sum: "$NonDirectBeneficiariesMemberFamilyMale" },
                                    NonDirectBeneficiariesMemberFamilyFemale: { $sum: "$NonDirectBeneficiariesMemberFamilyFemale" },
                                    NonDirectBeneficiariesHiredAll: { $sum: "$NonDirectBeneficiariesHiredAll" },
                                    NonDirectBeneficiariesHiredMale: { $sum: "$NonDirectBeneficiariesHiredMale" },
                                    NonDirectBeneficiariesHiredFemale: { $sum: "$NonDirectBeneficiariesHiredFemale" },
                                    CreatePowerPlan: { $sum: "$CreatePowerPlan" },
                                    CreatePowerFact: { $sum: "$CreatePowerFact" }


                                }


                            }










            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },

    getreportgrm: async (objParams) => {


        if (objParams.country === 0) {
            objParams.allCountrys.pop();
            objParams.country = [];
            for (let item of objParams.allCountrys) {
                objParams.country.push(ObjectId(item._id));
            }



        } else {
            let tempCountry = objParams.country;
            objParams.country = [];
            objParams.country.push(ObjectId(tempCountry));


        }


        try {


            const col = dbConnect.getConnect().collection('grm');



            let nameYear = await NameYear.getYearById(objParams.yearname);
            let period = await TypePeriod.getTypePeriodById(objParams.period);


            const result = await col.aggregate([

                {
                    $facet: {




                        "categorizedByAllComplaints": [

                            {

                                $match: {country: {$in: objParams.country}}

                             },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },
                                        month: { $month: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },

                            {
                                $count: "countAll"
                            }




                        ],



                        "categorizedByLowLevel": [
                            {

                                $match: {country: {$in: objParams.country}}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },
                                        month: { $month: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },

                            {
                                $lookup:
                                    {
                                        from: "grmstatus",
                                        localField: "statusId",
                                        foreignField: "_id",
                                        as: "status"
                                    }
                            },


                            { $unwind : "$status" },


                            {

                                $match: {"status.name": "Отказано"}

                            },

                            {
                                $count: "countAll"
                            }



                        ],

                        "categorizedByAccept": [
                            {

                                $match: {country: {$in: objParams.country}}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },
                                        month: { $month: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },

                            {
                                $lookup:
                                    {
                                        from: "grmstatus",
                                        localField: "statusId",
                                        foreignField: "_id",
                                        as: "status"
                                    }
                            },


                            { $unwind : "$status" },


                            {

                                $match: {"status.name": "Принято"}

                            },

                            {
                                $count: "countAll"
                            }



                        ],


                        "categorizedByComplete": [
                            {

                                $match: {country: {$in: objParams.country}}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },
                                        month: { $month: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },

                            {
                                $lookup:
                                    {
                                        from: "grmstatus",
                                        localField: "statusId",
                                        foreignField: "_id",
                                        as: "status"
                                    }
                            },


                            { $unwind : "$status" },


                            {

                                $match: {"status.name": "Завершен"}

                            },

                            {
                                $count: "countAll"
                            }



                        ],



                        "categorizedByType": [
                            {

                                $match: {country: {$in: objParams.country}}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },
                                        month: { $month: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                            },


                            {
                                $lookup:
                                    {
                                        from: "grmstatus",
                                        localField: "statusId",
                                        foreignField: "_id",
                                        as: "status"
                                    }
                            },


                            { $unwind : "$status" },


                            {

                                $match: {"status.name": {$in: ["Принято", "Отказано", "Переделать", "Просрочено"]}}

                            },



                            {
                                $group : {
                                    _id : "$categComplaint",

                                    takeAction: {$push: "$takeAction"},


                                    totalTakeTime: { $sum: "$timeToCheckComplaint" },

                                    count: { $sum: 1 }
                                }


                            }




                        ],









                    }
                },








            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },

    getreportfinansialstatus: async (objParams) => {


        if (objParams.country === 0) {
            objParams.allCountrys.pop();
            objParams.country = [];
            for (let item of objParams.allCountrys) {
                objParams.country.push(ObjectId(item._id));
            }



        } else {
            let tempCountry = objParams.country;
            objParams.country = [];
            objParams.country.push(ObjectId(tempCountry));


        }


        try {


            const col = dbConnect.getConnect().collection('finansial_status');



            let nameYear = await NameYear.getYearById(objParams.yearname);
            let period = await TypePeriod.getTypePeriodById(objParams.period);


            const result = await col.aggregate([


                {

                    $match: {country: {$in: objParams.country}}

                },

                {
                    $addFields:
                        {
                            year: { $year: "$createAt" },
                            month: { $month: "$createAt" },

                        }
                },


                {

                    $match: {year: nameYear.codeName, month: {$in: period.codeName}}

                },





                {
                    $facet: {



                        "categorizedByBudgetBisbursement": [
                            {
                                $group: {
                                    _id: "$BudgetBisbursement",

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                            {
                                $addFields: {
                                    name: "Budget Bisbursement"
                                }
                            }




                        ],



                        "categorizedByServices": [
                            {
                                $group: {
                                    _id: "$Services",
                                    totalPlan: { $sum: "$ServicesPlan" } ,
                                    totalFact: { $sum: "$ServicesFact" }
                                }
                            },


                            {
                                $addFields: {
                                    name: "Services"
                                }
                            }
                        ],



                        "categorizedByCreditLine": [
                            {
                                $group: {
                                    _id: "$CreditLine",
                                    totalPlan: { $sum: "$CreditLinePlan" } ,
                                    totalFact: { $sum: "$CreditLineFact" }
                                }
                            },


                            {
                                $addFields: {
                                    name: "Credit Line"
                                }
                            }
                        ],


                        "categorizedByOperatingExpenses": [
                            {
                                $group: {
                                    _id: "$OperatingExpenses",
                                    totalPlan: { $sum: "$OperatingExpensesPlan" } ,
                                    totalFact: { $sum: "$OperatingExpensesFact" }
                                }
                            },


                            {
                                $addFields: {
                                    name: "Operating Expenses"
                                }
                            }
                        ],


                    }
                },









            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },



    addnewreport: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('build_report');


            let seq = await CounterService.getNextSequence("build_report_id");



            const result = await col.insertOne({


                id: seq,
                typePeriod: objParams.typePeriod,
                year: objParams.year,
                country: objParams.country,

                idcountry: ObjectId(objParams.idcountry),



                capacityBuilding: objParams.capacityBuilding,
                credits: objParams.credits,
                grm: objParams.grm,
                finstatus: objParams.finstatus,

                tableContentsDescription: objParams.tableContentsDescription,
                overallNarrative: objParams.overallNarrative,
                participantsStated: objParams.participantsStated,
                comments: objParams.comments,
                creditsDescription: objParams.creditsDescription,
                grmSourceInformation: objParams.grmSourceInformation,
                projectRisksIssuesQuestion: objParams.projectRisksIssuesQuestion,
                projectRisksPotentialRisksQuestion: objParams.projectRisksPotentialRisksQuestion,


                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )




            });





            return result;

        } catch (err){


            return err;

        }







    },



    getAll: async () => {

        try {


            const col = dbConnect.getConnect().collection('build_report');




            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    },



    getByCountryId: async (id) => {

    try {


        const col = dbConnect.getConnect().collection('build_report');




        const result = await col.find({idcountry: ObjectId(id)}).toArray();





        return result;

    } catch (err){


        return err;

    }







},


    updreport: async (objParams) => {

        try {


            const col = dbConnect.getConnect().collection('build_report');




            const result = await col.updateOne({_id: ObjectId(objParams.id)}, {

                $currentDate: {
                    lastModified: true
                },

                $set: {

                    capacityBuilding: objParams.capacityBuilding,
                    credits: objParams.credits,
                    grm: objParams.grm,
                    finstatus: objParams.finstatus,

                    tableContentsDescription: objParams.tableContentsDescription,
                    overallNarrative: objParams.overallNarrative,
                    participantsStated: objParams.participantsStated,
                    comments: objParams.comments,
                    creditsDescription: objParams.creditsDescription,
                    grmSourceInformation: objParams.grmSourceInformation,
                    projectRisksIssuesQuestion: objParams.projectRisksIssuesQuestion,
                    projectRisksPotentialRisksQuestion: objParams.projectRisksPotentialRisksQuestion,


                }




            });





            return result;

        } catch (err){


            return err;

        }







    },


    delreport: async (id) => {

        try {


            const col = dbConnect.getConnect().collection('build_report');




            const result = await col.deleteOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }







    },

};