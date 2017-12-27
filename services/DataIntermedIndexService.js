/**
 * Created by simvolice on 07.09.2017 19:27
 */







const dbConnect = require('../utils/dbConnect');

const ObjectId = require('mongodb').ObjectId;

const NameYear = require('../services/NameYear');
const GrmStatusService = require('../services/GrmStatusService');


module.exports = {

    getUserSatisfaction: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('events');



            let nameYear = await NameYear.getYearById(yearId);


            const result = await col.aggregate([{

                            $match: {}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

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


                        ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },



    getReportCountProgramm: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('project');



            let nameYear = await NameYear.getYearById(yearId);


            const result = await col.aggregate([{

                $match: {}

            },

                {
                    $addFields:
                        {
                            year: { $year: "$createAt" },

                        }
                },


                {

                    $match: {year: nameYear.codeName}

                },



                {
                    $count : "all_programm"
                }


            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },



    getReportCountRegeonalInvest: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('regional_invest');



            let nameYear = await NameYear.getYearById(yearId);


            const result = await col.aggregate([{

                $match: {}

            },

                {
                    $addFields:
                        {
                            year: { $year: "$createAt" },

                        }
                },


                {

                    $match: {year: nameYear.codeName}

                },



                {
                    $count : "all_invest"
                }


            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },


    getReportSumMobileAmount: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('mobile_resurse');



            let nameYear = await NameYear.getYearById(yearId);


            const result = await col.aggregate([{

                $match: {}

            },

                {
                    $addFields:
                        {
                            year: { $year: "$createAt" },

                        }
                },


                {

                    $match: {year: nameYear.codeName}

                },



                {
                    $group : {

                        _id: null,
                        all_mobileresurs: {$sum: "$amountFinance"}


                    }
                }


            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },


    getReportCountPlatform: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('platform_network');



            let nameYear = await NameYear.getYearById(yearId);


            const result = await col.aggregate([{

                $match: {}

            },

                {
                    $addFields:
                        {
                            year: { $year: "$createAt" },

                        }
                },


                {

                    $match: {year: nameYear.codeName}

                },



                {
                    $count : "all_platform"
                }


            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },




    getReportSumBenificiarProject: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('credits');



            let nameYear = await NameYear.getYearById(yearId);


            const result = await col.aggregate([


                {
                    $facet: {

                        categByAll: [


                            {

                                $match: {}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },



                            {
                                $group : {

                                    _id: null,
                                    all_benificiar: {$sum: "$DirectBeneficiariesAll"}


                                }
                            }


                        ],




                        categByTj: [

                            {

                                $match: {nameCountry: "Таджикистан"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },



                            {
                                $group : {

                                    _id: null,
                                    all_benificiar: {$sum: "$DirectBeneficiariesAll"}


                                }
                            }



                        ],
                        categByUz: [


                            {

                                $match: {nameCountry: "Узбекистан"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },



                            {
                                $group : {

                                    _id: null,
                                    all_benificiar: {$sum: "$DirectBeneficiariesAll"}


                                }
                            }







                        ],






                    }}






            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },




    getReportSumGAProject: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('credits');



            let nameYear = await NameYear.getYearById(yearId);


            const result = await col.aggregate([


                {
                    $facet: {

                        categByAll: [

                            {

                                $match: {}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },



                            {
                                $group : {

                                    _id: null,

                                    all_gaproject: {$sum: "$CreatePowerFact"}


                                }
                            }



                        ],



                        categByTj:[

                            {

                                $match: {nameCountry: "Таджикистан"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },



                            {
                                $group : {

                                    _id: null,

                                    all_gaproject: {$sum: "$CreatePowerFact"}


                                }
                            }




                        ],
                        categByUz:[


                            {

                                $match: {nameCountry: "Узбекистан"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },



                            {
                                $group : {

                                    _id: null,

                                    all_gaproject: {$sum: "$CreatePowerFact"}


                                }
                            }






                        ],




                    }}












            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },


    getReportCountCompleteGRM: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('grm');



            let nameYear = await NameYear.getYearById(yearId);



            const result = await col.aggregate([



                {
                    $facet: {



                        "categorizedByAllCompletegrm": [


                            {

                                $match: {statusName: "Завершен"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },


                            {
                                $count : "all_completegrm"
                            }


                        ],




                        "categorizedByWithYes": [

                            {

                                $match: {satisfiedMeasuresTaken: "Да", statusName: "Завершен"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },





                            {
                                $count : "all_completegrmWithYes"
                            }

                        ],



                        "categorizedByAllCompletegrmTj": [


                            {

                                $match: {statusName: "Завершен", nameCountry: "Таджикистан"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },


                            {
                                $count : "all_completegrm"
                            }


                        ],




                        "categorizedByWithYesTj": [

                            {

                                $match: {statusName: "Завершен", satisfiedMeasuresTaken: "Да", nameCountry: "Таджикистан"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },





                            {
                                $count : "all_completegrmWithYes"
                            }

                        ],




                        "categorizedByAllCompletegrmUz": [


                            {

                                $match: {statusName: "Завершен", nameCountry: "Узбекистан"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },


                            {
                                $count : "all_completegrm"
                            }


                        ],




                        "categorizedByWithYesUz": [

                            {

                                $match: {statusName: "Завершен", satisfiedMeasuresTaken: "Да", nameCountry: "Узбекистан"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },





                            {
                                $count : "all_completegrmWithYes"
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


};