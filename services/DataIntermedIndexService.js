/**
 * Created by simvolice on 07.09.2017 19:27
 */







const dbConnect = require('../utils/dbConnect');


const Int32 = require('mongodb').Int32;


function calculatePercent(numberBase, value) {


    if (value === 0) {

        return 0;

    } else {

        let result = value * 100 / numberBase;
        return Number.parseInt(result.toFixed(0));

    }


};


module.exports = {

    getAllForm: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('events');





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

                                    $match: {year: yearId, nameTypeEvent: "Обучающий"}

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
                                    $match : {}
                                },


                                {
                                    $group : {
                                        _id: null,
                                        all_countSatisfaction_yes: {$avg: "$ques12"}


                                    }
                                }






                            ],

                            "countCommonOk": [

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

                                    $match: {year: yearId, nameTypeEvent: "Обучающий"}

                                },



                                {
                                    $group:
                                        {
                                            _id: null,

                                            avg: { $avg: "$common_ok_persent" }
                                        }
                                }

                            ],


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

                    $match: {year: yearId, nameTypeEvent: "Обучающий",


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

                    $match: {year: yearId}

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

                    $match: {year: yearId}

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

                    $match: {year: yearId}

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

                    $match: {year: yearId}

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





            const resultEvents = await colEvents.aggregate([


                {

                    $facet: {

                        allEventSumPeople: [

                            {

                                $match: {nameCountry: "РКГ, Региональный компонент 1"}

                            },

                            {
                                $addFields:
                                    {
                                        year: {$year: "$myDate"},

                                    }
                            },


                            {

                                $match: {year: yearId, nameTypeEvent: "Обучающий"}

                            },


                            {
                                $group: {

                                    _id: null,
                                    all_countPeopleEventCommon: {$sum: "$countPeopleEventCommon"}


                                }
                            }


                        ],


                        allEventSumPeopleUZ: [

                            {

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

                            },

                            {
                                $addFields:
                                    {
                                        year: {$year: "$myDate"},

                                    }
                            },


                            {

                                $match: {year: yearId, nameTypeEvent: "Обучающий"}

                            },


                            {
                                $group: {

                                    _id: null,
                                    all_countPeopleEventCommon: {$sum: "$countPeopleEventCommon"}


                                }
                            }


                        ],
                        allEventSumPeopleTJ: [

                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

                            },

                            {
                                $addFields:
                                    {
                                        year: {$year: "$myDate"},

                                    }
                            },


                            {

                                $match: {year: yearId, nameTypeEvent: "Обучающий"}

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
                                        year: {$year: "$myDate"},

                                    }
                            },


                            {

                                $match: {year: yearId, nameTypeEvent: "Обучающий"}

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

                                $match: {nameCountry: "РКГ, Региональный компонент 1"}


                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: yearId}

                            },



                            {
                                $group : {

                                    _id: null,
                                    all_benificiar: {$sum: "CreatePowerPlan"}


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

                                $match: {year: yearId}

                            },



                            {
                                $group : {

                                    _id: null,
                                    all_benificiar: {$sum: "$CreatePowerPlan"}


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

                                $match: {year: yearId}

                            },



                            {
                                $group : {

                                    _id: null,
                                    all_benificiar: {$sum: "$CreatePowerPlan"}


                                }
                            }







                        ],


                        categByAllWomen: [


                            {

                                $match: {nameCountry: "РКГ, Региональный компонент 1"}


                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },

                                    }
                            },


                            {

                                $match: {year: yearId}

                            },



                            {
                                $group : {

                                    _id: null,
                                    all_benificiar: {$sum: "$CreatePowerFact"}


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

                                $match: {year: yearId}

                            },



                            {
                                $group : {

                                    _id: null,
                                    all_benificiar: {$sum: "$CreatePowerFact"}


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

                                $match: {year: yearId}

                            },



                            {
                                $group : {

                                    _id: null,
                                    all_benificiar: {$sum: "$CreatePowerFact"}


                                }
                            }







                        ],



                    }


                }






            ]).toArray();




            result.push(...resultEvents);



            return result;


        }catch(err) {




            return err;


        }










    },




    getReportSumGAProject: async (yearId) => {





        try {


            const col = dbConnect.getConnect().collection('credits');





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

                                $match: {year: yearId}

                            },



                            {
                                $group : {

                                    _id: null,

                                    all_gaproject: {$sum: "$power_ha"}


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

                                $match: {year: yearId}

                            },



                            {
                                $group : {

                                    _id: null,

                                    all_gaproject: {$sum: "$power_ha"}


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

                                $match: {year: yearId}

                            },



                            {
                                $group : {

                                    _id: null,

                                    all_gaproject: {$sum: "$power_ha"}


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






            const result = await col.aggregate([



                {
                    $facet: {



                        "categorizedByAllCompletegrmAVG": [


                            {

                                $match: {nameCountry: "РКГ, Региональный компонент 1"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {year: yearId}

                            },


                            {

                                $group: {

                                    _id: null,
                                    avg: {$avg: "$assessmentQualitySatisfactionComplaint"}



                                }

                            }



                        ],




                        "categorizedByAllCompletegrmAVG_TJ": [


                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {year: yearId}

                            },


                            {

                                $group: {

                                    _id: null,
                                    avg: {$avg: "$assessmentQualitySatisfactionComplaint"}



                                }

                            }



                        ],




                        "categorizedByAllCompletegrmAVG_UZ": [


                            {

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$dateInGo" },

                                    }
                            },


                            {

                                $match: {year: yearId}

                            },


                            {

                                $group: {

                                    _id: null,
                                    avg: {$avg: "$assessmentQualitySatisfactionComplaint"}



                                }

                            }



                        ],








                    }
                },






            ]).toArray();





            if (result[0].categorizedByAllCompletegrmAVG.length !== 0) {



                    result[0].categorizedByAllCompletegrmAVG[0].percent = calculatePercent(5, result[0].categorizedByAllCompletegrmAVG[0].avg);



            } else {



                result[0].categorizedByAllCompletegrmAVG.push({percent : 0});



            }




            if (result[0].categorizedByAllCompletegrmAVG_TJ.length !== 0) {


                result[0].categorizedByAllCompletegrmAVG_TJ[0].percent = calculatePercent(5, result[0].categorizedByAllCompletegrmAVG_TJ[0].avg);




            } else {

                result[0].categorizedByAllCompletegrmAVG_TJ.push({percent : 0});

            }






            if (result[0].categorizedByAllCompletegrmAVG_UZ.length !== 0) {

                result[0].categorizedByAllCompletegrmAVG_UZ[0].percent = calculatePercent(5, result[0].categorizedByAllCompletegrmAVG_UZ[0].avg);



            } else {


                result[0].categorizedByAllCompletegrmAVG_UZ.push({percent : 0});

            }











            return result;


        }catch(err) {





            return err;


        }










    },


    insertNewVal: async (data) => {



        try {





            const col = dbConnect.getConnect().collection('matrix_values');



            const result = await col.insertOne({


                ipr112016: Int32(data.ipr112016),
                ipr112017: Int32(data.ipr112017),
                ipr112018: Int32(data.ipr112018),
                ipr112019: Int32(data.ipr112019),
                ipr112020: Int32(data.ipr112020),
                ipr112021: Int32(data.ipr112021),
                ipr122016: Int32(data.ipr122016),
                ipr122017: Int32(data.ipr122017),
                ipr122018: Int32(data.ipr122018),
                ipr122019: Int32(data.ipr122019),
                ipr122020: Int32(data.ipr122020),
                ipr122021: Int32(data.ipr122021)


            });






            return result;


        }catch(err) {




            return err;


        }


    },

    getNewval: async () => {



        try {





            const col = dbConnect.getConnect().collection('matrix_values');



            const result = await col.find().toArray();






            return result;


        }catch(err) {




            return err;


        }


    },


};
