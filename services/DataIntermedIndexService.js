/**
 * Created by simvolice on 07.09.2017 19:27
 */







const dbConnect = require('../utils/dbConnect');



const NameYear = require('../services/NameYear');


module.exports = {

    getAllForm: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('events');



            let nameYear = await NameYear.getYearById(yearId);


            const result = await col.aggregate([




                {


                    $facet:

                        {

                            "getAllGoodTestResult":  [


                                {

                                    $match: {}

                                },

                                {
                                    $addFields:
                                        {
                                            year: { $year: "$myDate" },

                                        }
                                },


                                {

                                    $match: {year: nameYear.codeName, nameTypeEvent: "Обучающий"}

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
                                    $match : {


                                        $or: [


                                            {"ques12": 5},

                                            {"ques12": 4}

                                        ]


                                    }
                                },

                                {
                                    $count : "countAll"
                                }





                            ],


                            "getAllCount":  [


                                {

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
                                    $count : "countAll"
                                }




                            ]



                        }








                }




                        ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },


    getReportSumGenderEvent: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('events');



            let nameYear = await NameYear.getYearById(yearId);


            const result = await col.aggregate([




                {

                    $match: {}

                },

                {
                    $addFields:
                        {
                            year: { $year: "$myDate" },

                        }
                },


                {

                    $match: {year: nameYear.codeName, nameTypeEvent: "Обучающий",


                        $or: [{nameSubTypeEvent: "Частично"},
                            {nameSubTypeEvent: "Полностью"}

                        ]


                    }

                },



                {
                    $count : "countAll"
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
            const colEvents = dbConnect.getConnect().collection('events');



            let nameYear = await NameYear.getYearById(yearId);



            const resultEvents = await colEvents.aggregate([


                {

                    $facet: {

                        allEventSumPeople: [

                            {

                                $match: {}

                            },

                            {
                                $addFields:
                                    {
                                        year: {$year: "$createAt"},

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, nameTypeEvent: "Обучающий"}

                            },


                            {
                                $group: {

                                    _id: null,
                                    all_countPeopleEventCommon: {$sum: "$countPeopleEventCommon"}


                                }
                            }


                        ],


                        allEventSumWomen: [

                            {

                                $match: {}

                            },

                            {
                                $addFields:
                                    {
                                        year: {$year: "$createAt"},

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName, nameTypeEvent: "Обучающий"}

                            },


                            {
                                $group: {

                                    _id: null,
                                    all_countWomanEventCommon: {$sum: "$countWomanEventCommon"}


                                }
                            }


                        ]


                    }

                }





        ]).toArray();


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

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

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

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

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


                        categByAllWomen: [


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
                                    all_benificiar: {$sum: "$DirectBeneficiariesFemale"}


                                }
                            }


                        ],




                        categByTjWomen: [

                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

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
                                    all_benificiar: {$sum: "$DirectBeneficiariesFemale"}


                                }
                            }



                        ],
                        categByUzWomen: [


                            {

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

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
                                    all_benificiar: {$sum: "$DirectBeneficiariesFemale"}


                                }
                            }







                        ],



                    }


                }






            ]).toArray();




            result.push(resultEvents);


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

                                    all_gaproject: {$sum: "$CreatePowerPlan"}


                                }
                            }



                        ],



                        categByTj:[

                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

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

                                    all_gaproject: {$sum: "$CreatePowerPlan"}


                                }
                            }




                        ],
                        categByUz:[


                            {

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

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

                                    all_gaproject: {$sum: "$CreatePowerPlan"}


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

                                $match: {}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },


                            {
                                $count : "all_completegrm"
                            }


                        ],




                        "categorizedByWithTimeOfSatisfaction": [

                            {

                                $match: {}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {

                                    year: nameYear.codeName,

                                    timeOfSatisfaction: "В срок",


                                    $or: [{assessmentQualitySatisfactionComplaint: 5}, {assessmentQualitySatisfactionComplaint: 4}]

                                }

                            },





                            {
                                $count : "all_completegrmWithTimeOfSatisfaction"
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