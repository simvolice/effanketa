/**
 * Created by simvolice on 29.08.2017 20:04
 */




const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;
const Double = require('mongodb').Double;
const Timestamp = require('mongodb').Timestamp;



const TypePeriod = require('../services/TypePeriod');
const NameYear = require('../services/NameYear');
const CountryService = require('../services/CountryService');
const GrmStatusService = require('../services/GrmStatusService');
const CounterService = require('../services/CounterService');



module.exports = {



    getreportforevent: async (id) => {





        try {


            const col = dbConnect.getConnect().collection('events');

            const result = await col.aggregate([

                {
                    $facet: {


                        "getAnswerAndNotAnswer": [


                            {

                            $match: {_id: ObjectId(id)}

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




                            {
                                $project:
                                    {
                                        countAllAnswer: { $size: "$forms_docs" },
                                        countAllNotAnswer: { $subtract: [ "$countPeopleEventCommon", { $size: "$forms_docs" } ] }

                                    }
                            },







                        ],

                        "allQues": [


                            {

                                $match: {_id: ObjectId(id)}

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
                                $group: {
                                    _id: null,
                                    email: {$push: "$email"},
                                    ques1: {$push: "$ques1"},
                                    ques2: {$push: "$ques2"},
                                    ques3: {$push: "$ques3"},
                                    ques4: {$push: "$ques4"},
                                    ques5: {$push: "$ques5"},
                                    ques6: {$push: "$ques6"},
                                    ques7: {$push: "$ques7"},
                                    ques8: {$push: "$ques8"},
                                    ques9: {$push: "$ques9"},
                                    ques10: {$push: "$ques10"},
                                    ques11: {$push: "$ques11"},
                                    ques12: {$push: "$ques12"},
                                    ques13: {$push: { $ifNull: [ "$ques13", "Не предоставлена ответа" ] }},
                                    ques14: {$push: { $ifNull: [ "$ques14", "Не предоставлена ответа" ] }},
                                    ques15: {$push: { $ifNull: [ "$ques15", "Не предоставлена ответа" ] }},
                                    ques16: {$push: { $ifNull: [ "$ques16", "Не предоставлена ответа" ] }},
                                    ques17: {$push: "$ques17"},
                                    ques18: {$push: { $ifNull: [ "$ques18", "Не предоставлена ответа" ] }},
                                    ques19: {$push: "$ques19"},
                                    ques20: {$push: "$ques20"},
                                    ques21: {$push: "$ques21"}



                                }



                            },


                            {
                                $project: {


                                    _id: 0,

                                    ques1: 1,
                                    ques2: 1,
                                    ques3: 1,
                                    ques4: 1,
                                    ques5: 1,
                                    ques6: 1,
                                    ques7: 1,
                                    ques8: 1,
                                    ques9: 1,
                                    ques10: 1,
                                    ques11: 1,
                                    ques12: 1,
                                    ques17: 1,

                                    ques19: 1,
                                    ques20: 1,
                                    ques21: 1,


                                    transposed13: {
                                        $zip: {
                                            inputs: ["$email", "$ques13"]
                                        }
                                    },

                                    transposed14: {
                                        $zip: {
                                            inputs: ["$email", "$ques14"]
                                        }
                                    },


                                    transposed15: {
                                        $zip: {
                                            inputs: ["$email", "$ques15"]
                                        }
                                    },

                                    transposed16: {
                                        $zip: {
                                            inputs: ["$email","$ques16" ]
                                        }
                                    },


                                    transposed18: {
                                        $zip: {
                                            inputs: ["$email", "$ques18"]
                                        }
                                    },


                                }
                            },


                            {
                                $project: {


                                    ques1: 1,
                                    ques2: 1,
                                    ques3: 1,
                                    ques4: 1,
                                    ques5: 1,
                                    ques6: 1,
                                    ques7: 1,
                                    ques8: 1,
                                    ques9: 1,
                                    ques10: 1,
                                    ques11: 1,
                                    ques12: 1,
                                    ques17: 1,
                                    ques19: 1,
                                    ques20: 1,
                                    ques21: 1,

                                    dimensions13: { $arrayToObject: "$transposed13" },
                                    dimensions14: { $arrayToObject: "$transposed14" },
                                    dimensions15: { $arrayToObject: "$transposed15" },
                                    dimensions16: { $arrayToObject: "$transposed16" },
                                    dimensions18: { $arrayToObject: "$transposed18" },
                                }
                            }




                        ],




                    }
                },








            ]).toArray();



            /*
            Введется подсчет количества ответов
             */
            let countedNames = [];
            for (let item of result[0].allQues) {

                for (let itemObj in item) {

                    if (Array.isArray(item[itemObj])) {

                       let countedNamesTempObj = item[itemObj].reduce(function (allNames, name) {

                           if (name in allNames) {

                                allNames[name]++;
                            }
                            else {


                                allNames[name] = 1;


                            }
                            return allNames;
                        }, {});
                        countedNames.push(countedNamesTempObj);


                    }
                }



            }



            /*
            Считаем сумму ответов на каждый вопрос
             */
            for (let item of countedNames) {


                let allObjValue = Object.values(item);
                const total = allObjValue.reduce((sum, value) => sum + value);
                item["totalAnswer"] = total;


            }

           /*
           Присваеваем результат на новый массив
            */
            for (let item of result[0].allQues) {

                for (let itemObj in item) {

                    if (Array.isArray(item[itemObj])) {


                       item[itemObj] = countedNames.shift();

                    }
                }



            }





            return result;


        }catch(err) {



            return err;


        }














    },




    getgrowpotencialNewVersion: async (objParams) => {

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




            let period = await TypePeriod.getTypePeriodById(objParams.period);





            const result = await col.aggregate([

                {
                    $facet: {
                        "categorizedByDatePeriodCountry": [

                            {

                            $match: {

                                country: {$in: objParams.country},


                                $and: [

                                    {

                                        myDate: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                    },

                                    {

                                        myDate: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                    },


                                ],





                            }




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


                        "countSatisfaction": [ {

                            $match: {


                                country: {$in: objParams.country},


                                $and: [

                                    {

                                        myDate: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                    },

                                    {

                                        myDate: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                    },


                                ],




                            }

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


                                    ques12: { $gte: 3 }


                                }
                            },


                            {
                                $count : "all_countSatisfaction_yes"
                            }


                        ],



                        "countSatisfactionWomen": [ {

                            $match: {

                                country: {$in: objParams.country},


                                $and: [

                                    {

                                        myDate: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                    },

                                    {

                                        myDate: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                    },


                                ],




                            }

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

                                    ques20: "Женский",
                                    ques12: { $gte: 3 }


                                }
                            },


                            {
                                $count : "all_countSatisfaction_women_yes"
                            }



                        ],




                        "categorizedBySum": [ {

                            $match: {
                                country: {$in: objParams.country},

                                $and: [

                                    {

                                        myDate: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                    },

                                    {

                                        myDate: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                    },


                                ],


                            }

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

                        ]
                    }
                },











            ]).toArray();



            return result;


        }catch(err) {




            return err;


        }










    },





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






            const result = await col.aggregate([

                {
                    $facet: {




                        "categorizedByDatePeriodCountry": [


                            {

                            $match: {


                                country: {$in: objParams.country},


                                $and: [

                                    {

                                        myDate: {$gte: new Date(objParams.dateFrom)}
                                    },

                                    {

                                        myDate: {$lte: new Date(objParams.dateTo)}
                                    },


                                ],




                            }

                            },



                            {
                                $count : "all_event"
                            }


                        ],


                        "countSatisfaction": [

                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


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

                                    $or: [{ques12: 5},
                                        {ques12: 4}
                                    ]

                                }
                            },



                            {$count: "countAll"}


                        ],

                        "countNoSatisfaction": [


                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


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

                                    $or: [{ques12: 3},
                                        {ques12: 2},
                                        {ques12: 1}
                                    ]

                                }
                            },



                            {$count: "countAll"}


                        ],

                        "countSatisfactionWomen": [


                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


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
                                $match : {

                                    $or: [{ques12: 5},
                                        {ques12: 4}
                                    ]

                                }
                            },



                            {$count: "countAll"}




                        ],


                        "countNoSatisfactionWomen": [


                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


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
                                $match : {

                                    $or: [{ques12: 3},
                                        {ques12: 2},
                                        {ques12: 1}
                                    ]

                                }
                            },


                            {$count: "countAll"},







                        ],


                        "countSatisfactionCommonAll": [


                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


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
                                $group: {



                                    _id: null,

                                    ques19: {$push: "$ques19"},
                                    ques20: {$push: "$ques20"},
                                    ques21: {$push: "$ques21"}



                                }



                            }




                        ],



                        "categorizedBySum": [


                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


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



                        "categorizedByLearningEvent": [


                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


                            },



                            {

                                $match: { nameTypeEvent: "Обучающий" }


                            },




                            {
                                $count : "all_learning_event"
                            }


                        ],

                        "categorizedByGenderEvent": [


                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


                            },



                            {

                                $match:  { $or: [


                                    {nameSubTypeEvent: "Частично"},
                                    {nameSubTypeEvent: "Полностью"}


                                    ] }


                            },




                            {
                                $count : "all_gender_event"
                            }


                        ],


                        "countForms": [

                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


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

                        "allEvents": [

                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            myDate: {$gte: new Date(objParams.dateFrom)}
                                        },

                                        {

                                            myDate: {$lte: new Date(objParams.dateTo)}
                                        },


                                    ],


                                },


                            },





                        ]


                    }
                }








            ]).toArray();




            /*
           Введется подсчет количества ответов
            */
            let countedNames = [];
            for (let item of result[0].countSatisfactionCommonAll) {

                for (let itemObj in item) {

                    if (Array.isArray(item[itemObj])) {

                        let countedNamesTempObj = item[itemObj].reduce(function (allNames, name) {

                            if (name in allNames) {
                                allNames[name]++;
                            }
                            else {
                                allNames[name] = 1;
                            }
                            return allNames;
                        }, {});
                        countedNames.push(countedNamesTempObj);


                    }
                }



            }

            /*
            Считаем сумму ответов на каждый вопрос
             */
            for (let item of countedNames) {


                let allObjValue = Object.values(item);
                const total = allObjValue.reduce((sum, value) => sum + value);
                item["totalAnswer"] = total;


            }

            /*
            Присваеваем результат на новый массив
             */
            for (let item of result[0].countSatisfactionCommonAll) {

                for (let itemObj in item) {

                    if (Array.isArray(item[itemObj])) {


                        item[itemObj] = countedNames.shift();

                    }
                }



            }






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




            let period = await TypePeriod.getTypePeriodById(objParams.period);


            const result = await col.aggregate([


                        {

                            $match: {

                                country: {$in: objParams.country},

                                $and: [

                                    {

                                        createAt: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                    },

                                    {

                                        createAt: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
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







            let period = await TypePeriod.getTypePeriodById(objParams.period);





            const result = await col.aggregate([

                {
                    $facet: {




                        "categorizedByAllComplaints": [

                            {

                                $match: {

                                    country: {$in: objParams.country},




                                    $and: [

                                    {

                                        createAt: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                    },

                                    {

                                        createAt: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                    },


                                        ]





                                    },





                             },






                            {
                                $count: "countAll"
                            }




                        ],



                        "categorizedByLowLevel": [
                            {

                                $match: {



                                    country: {$in: objParams.country},



                                    $and: [

                                        {

                                            dateInGo: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                        },

                                        {

                                            dateInGo: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                        },


                                    ],






                                },



                            },





                            {

                                $match: {"timeToCheckComplaint": 1}

                            },

                            {
                                $count: "countAll"
                            }



                        ],



                        "categorizedByInvestiginationStarted": [
                            {

                                $match: {

                                    country: {$in: objParams.country},



                                    $and: [

                                        {

                                            dateStartInvestegment: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                        },

                                        {

                                            dateStartInvestegment: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                        },


                                    ]



                                }




                            },






                            {
                                $count: "countAll"
                            }



                        ],


                        "categorizedByInvestiginationCompleted": [
                            {

                                $match: {


                                    country: {$in: objParams.country},



                                    $and: [

                                        {

                                            dateStartInvestegment: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                        },

                                        {

                                            dateStartInvestegment: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                        },


                                    ]



                                }



                            },




                            {

                                $match: {"statusName": "Завершен"}

                            },





                            {
                                $count: "countAll"
                            }



                        ],






                        "categorizedByAccept": [
                            {

                                $match: {

                                    country: {$in: objParams.country},

                                    $and: [

                                        {

                                            dateInGo: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                        },

                                        {

                                            dateInGo: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                        },


                                    ]

                                    }





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

                                $match: {

                                    country: {$in: objParams.country},



                                    $and: [

                                        {

                                            dateInGo: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                        },

                                        {

                                            dateInGo: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                        },


                                    ]


                                    }




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

                                $match: {


                                    country: {$in: objParams.country},


                                    $and: [

                                        {

                                            dateInGo: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                        },

                                        {

                                            dateInGo: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                        },


                                    ]


                                    }





                            },






                            {
                                $group : {
                                    _id : "$categName",






                                    totalTakeTime: { $sum: "$timeToCheckComplaint" },

                                    countComplaintInWork: { $push: "$statusName" },






                                }


                            },


                            {
                                $project: {

                                    totalTakeTime: 1,
                                    countComplaintInWorkFilter:
                                    {
                                        $filter: {
                                            input: "$countComplaintInWork",
                                            as: "item",
                                            cond: { $eq: [ "$$item", "В работе" ] }
                                        }
                                    }


                                }},


                            {
                                $project: {




                                    countComplaintInWorkFilter:1,
                                    totalTakeTime: 1,
                                    count: { $size: "$countComplaintInWorkFilter" }


                                }},


                            {
                                $addFields:
                                    {
                                        solutionResult: "",


                                    }
                            }





                        ],


                        "categorizedBySatisfiedInPercent": [
                            {

                                $match: {

                                    country: {$in: objParams.country},


                                    $and: [

                                        {

                                            dateInGo: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                                        },

                                        {

                                            dateInGo: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                                        },


                                    ]



                                }



                            },



                            {

                                $group: {

                                    _id: null,
                                    avg: {$avg: "$assessmentQualitySatisfactionComplaint"}



                                }

                            }





                        ]









                    }
                }








            ]).toArray();




            if (result[0].categorizedBySatisfiedInPercent.length !== 0) {
                if (Math.round(result[0].categorizedBySatisfiedInPercent[0].avg) === 1) {

                    result[0].categorizedBySatisfiedInPercent[0].percent = "0%";

                } else if(Math.round(result[0].categorizedBySatisfiedInPercent[0].avg) === 2){

                    result[0].categorizedBySatisfiedInPercent[0].percent = "25%";


                }else if(Math.round(result[0].categorizedBySatisfiedInPercent[0].avg) === 3){
                    result[0].categorizedBySatisfiedInPercent[0].percent = "50%";


                }else if(Math.round(result[0].categorizedBySatisfiedInPercent[0].avg) === 4){

                    result[0].categorizedBySatisfiedInPercent[0].percent = "75%";

                }else if(Math.round(result[0].categorizedBySatisfiedInPercent[0].avg) === 5){
                    result[0].categorizedBySatisfiedInPercent[0].percent = "100%";


                } else {

                    result[0].categorizedBySatisfiedInPercent[0].percent = "0%";


                }


            } else {


                result[0].categorizedBySatisfiedInPercent.push({percent : "0%"})

            }







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



            let period = await TypePeriod.getTypePeriodById(objParams.period);



            const result = await col.aggregate([


                {

                    $match: {

                        country: {$in: objParams.country},

                        $and: [

                            {

                                nameQuarter: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                            },

                            {

                                nameQuarter: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                            },


                        ],



                    }

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
                                    name: "Services",
                                    comments: ""
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
                                    name: "Credit Line",
                                    comments: ""
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
                                    name: "Operating Expenses",
                                    comments: ""
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


















    /*
    Это годовой NCU
     */
    getReportFinansialStatusYearNcu: async (objParams) => {


        /*
        Чтобы отловить все страны
         */
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




            let period = await TypePeriod.getTypePeriodById(objParams.period);


            const result = await col.aggregate([


                {

                    $match: {
                        country: {$in: objParams.country},

                        $and: [

                            {

                                createAt: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                            },

                            {

                                createAt: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                            },


                        ],


                    }

                },

                {
                    $addFields:
                        {
                            year: { $year: "$createAt" },
                            month: { $month: "$createAt" },

                        }
                },







                {
                    $facet: {



                        "categorizedByBudgetBisbursementPlanYear": [
                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" }

                                }
                            }




                        ],



                        "categorizedByBalanceYear": [
                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                            {
                                $project: {

                                    totalPlan: 1,
                                    totalFact: 1,


                                    totalBalance: { $subtract: [ "$totalPlan", "$totalFact" ] },
                                }
                            },



                        ],


                        "categorizedByFirstQuarter": [


                            {

                                $match: {month: {$in: [1,2,3]}}

                            },



                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                        ],



                        "categorizedBySecondQuarter": [


                            {

                                $match: {month: {$in: [4,5,6]}}

                            },



                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                        ],


                        "categorizedByThirdQuarter": [


                            {

                                $match: {month: {$in: [7,8,9]}}

                            },



                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                        ],


                        "categorizedByForthQuarter": [


                            {

                                $match: {month: {$in: [10,11,12]}}

                            },



                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                        ],








                    }
                },









            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },




    /*
   Это годовой RCU
    */
    getReportFinansialStatusForYearRCU: async (objParams) => {


        /*
        Чтобы отловить все страны
         */
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



            let period = await TypePeriod.getTypePeriodById(objParams.period);


            const result = await col.aggregate([







                {

                    $match: {

                        $and: [

                            {

                                nameQuarter: {$gte: new Date(`${period.dateFrom}.${objParams.year}`)}
                            },

                            {

                                nameQuarter: {$lte: new Date(`${period.dateTo}.${objParams.year}`)}
                            },


                        ]
                    }

                },





                {
                    $facet: {



                        "categorizedByBudgetBisbursementPlanYearTadzhik": [

                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" }

                                }
                            }




                        ],


                        "categorizedByBudgetBisbursementFactYearTadzhik": [

                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalFact: { $sum: "$BudgetBisbursementFact" }

                                }
                            }




                        ],



                        "categorizedByBalanceYearTadzhik": [


                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

                            },



                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                            {
                                $project: {

                                    totalPlan: 1,
                                    totalFact: 1,


                                    totalBalance: { $subtract: [ "$totalPlan", "$totalFact" ] },
                                }
                            },



                        ],




                        "categorizedByBudgetBisbursementPlanYearUzbeck": [

                            {

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" }

                                }
                            }




                        ],


                        "categorizedByBudgetBisbursementFactYearUzbeck": [

                            {

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalFact: { $sum: "$BudgetBisbursementFact" }

                                }
                            }




                        ],



                        "categorizedByBalanceYearUzbeck": [


                            {

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

                            },



                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                            {
                                $project: {

                                    totalPlan: 1,
                                    totalFact: 1,


                                    totalBalance: { $subtract: [ "$totalPlan", "$totalFact" ] },
                                }
                            },



                        ],












                    }
                },









            ]).toArray();




            return result;


        }catch(err) {




            return err;


        }










    },






    /*
    Это полугодовой RCU
     */
    getReportFinansialStatusForHalfYearRCU: async (objParams) => {


        /*
        Чтобы отловить все страны
         */
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
            const buildReport = dbConnect.getConnect().collection('build_report');



            let period = await TypePeriod.getTypePeriodById(objParams.period);


            const result = await col.aggregate([






                {

                    $match: {

                        $and: [

                            {

                                nameQuarter: {$gte: new Date(`01.02.${objParams.year}`)}
                            },

                            {

                                nameQuarter: {$lte: new Date(`12.31.${objParams.year}`)}
                            },


                        ],



                    }

                },





                {
                    $facet: {



                        "categorizedByBudgetBisbursementPlanYearTadzhik": [

                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" }

                                }
                            }




                        ],




                        "categorizedByBalanceYearTadzhik": [


                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2"}

                            },



                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                            {
                                $project: {

                                    totalPlan: 1,
                                    totalFact: 1,


                                    totalBalance: { $subtract: [ "$totalPlan", "$totalFact" ] },
                                }
                            },



                        ],





                        "categorizedByBudgetBisbursementPlanHalfYearTadzhik": [

                            {

                                $match: {

                                    nameCountry: "НКГ Таджикистана, Компонент 2",


                                    $and: [

                                        {

                                            nameQuarter: {$gte: new Date(`01.02.${objParams.year}`)}
                                        },

                                        {

                                            nameQuarter: {$lte: new Date(`06.30.${objParams.year}`)}
                                        },


                                    ]



                                }

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" }

                                }
                            }




                        ],


                        "categorizedByBudgetBisbursementFactHalfYearTadzhik": [

                            {

                                $match: {nameCountry: "НКГ Таджикистана, Компонент 2",


                                    $and: [

                                        {

                                            nameQuarter: {$gte: new Date(`01.02.${objParams.year}`)}
                                        },

                                        {

                                            nameQuarter: {$lte: new Date(`06.30.${objParams.year}`)}
                                        },


                                    ]


                                }

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalFact: { $sum: "$BudgetBisbursementFact" }

                                }
                            }




                        ],






                        "categorizedByBudgetBisbursementPlanYearUzbeck": [

                            {

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" }

                                }
                            }




                        ],




                        "categorizedByBalanceYearUzbeck": [


                            {

                                $match: {nameCountry: "НКГ Узбекистана, Компонент 2"}

                            },



                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" } ,
                                    totalFact: { $sum: "$BudgetBisbursementFact" }
                                }
                            },


                            {
                                $project: {

                                    totalPlan: 1,
                                    totalFact: 1,


                                    totalBalance: { $subtract: [ "$totalPlan", "$totalFact" ] },
                                }
                            },



                        ],


                        "categorizedByBudgetBisbursementPlanHalfYearUzbeck": [

                            {

                                $match: {


                                    nameCountry: "НКГ Узбекистана, Компонент 2",

                                    $and: [

                                        {

                                            nameQuarter: {$gte: new Date(`01.02.${objParams.year}`)}
                                        },

                                        {

                                            nameQuarter: {$lte: new Date(`06.30.${objParams.year}`)}
                                        },


                                    ]


                                }

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$BudgetBisbursementPlan" }

                                }
                            }




                        ],


                        "categorizedByBudgetBisbursementFactHalfYearUzbeck": [

                            {

                                $match: {


                                    nameCountry: "НКГ Узбекистана, Компонент 2",

                                    $and: [

                                        {

                                            nameQuarter: {$gte: new Date(`01.02.${objParams.year}`)}
                                        },

                                        {

                                            nameQuarter: {$lte: new Date(`06.30.${objParams.year}`)}
                                        },


                                    ]


                                }

                            },



                            {
                                $group: {
                                    _id: null,

                                    totalFact: { $sum: "$BudgetBisbursementFact" }

                                }
                            }




                        ],











                    }
                },









            ]).toArray();


            const resultBuildReport = await buildReport.aggregate([










                {
                    $facet: {



                        "PlanForNextPeriodTadzhik": [

                            {

                                $match: {country: "НКГ Таджикистана, Компонент 2"}

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$plansNextHalfYearPeriod" }

                                }
                            }




                        ],








                        "PlanForNextPeriodUzbek": [

                            {

                                $match: {country: "НКГ Узбекистана, Компонент 2"}

                            },


                            {
                                $group: {
                                    _id: null,

                                    totalPlan: { $sum: "$plansNextHalfYearPeriod" }

                                }
                            }




                        ],










                    }
                },









            ]).toArray();






           result[0].PlanForNextPeriodTadzhik = resultBuildReport[0].PlanForNextPeriodTadzhik;
           result[0].PlanForNextPeriodUzbek = resultBuildReport[0].PlanForNextPeriodUzbek;




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


                country: objParams.country,



                typePeriod: objParams.typePeriod,


                year: objParams.year,
                comments: objParams.comments,

                idcountry: ObjectId(objParams.idcountry),



                capacityBuilding: objParams.capacityBuilding,
                credits: objParams.credits,
                grm: objParams.grm,
                finstatus: objParams.finstatus,

                plansNextPeriod: Double(objParams.plansNextPeriod),
                plansNextHalfYearPeriod: Double(objParams.plansNextHalfYearPeriod),


                overallNarrative: objParams.overallNarrative,

                grmSourceInformation: objParams.grmSourceInformation,
                satisfiedComplaintsInPercentage: objParams.satisfiedComplaintsInPercentage,
                projectRisksIssuesQuestion: objParams.projectRisksIssuesQuestion,
                projectRisksPotentialRisksQuestion: objParams.projectRisksPotentialRisksQuestion,


                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )




            });





            return result;

        } catch (err){


            return err;

        }







    },


    addnewreportYear: async (objParams, arrAllFiles) => {



        try {


            const col = dbConnect.getConnect().collection('build_report');


            let seq = await CounterService.getNextSequence("build_report_id");



            const result = await col.insertOne({


                id: seq,
                typePeriod: objParams.typePeriod,
                year: objParams.year,
                country: objParams.country,

                idcountry: ObjectId(objParams.idcountry),




                projectPerformance: objParams.projectPerformance,
                projectPerformanceComments: objParams.projectPerformanceComments,
                detailedProject: objParams.detailedProject,
                risks: objParams.risks,
                lessonsLearned: objParams.lessonsLearned,
                recommendations: objParams.recommendations,
                plannedBudget: Double(objParams.plannedBudget),


                finstatus: objParams.finstatus,
                arrAllFiles: arrAllFiles,



                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )




            });





            return result;

        } catch (err){


            return err;

        }







    },


    addHalfYearrcusave: async (objParams, arrAllFiles) => {




        try {


            const col = dbConnect.getConnect().collection('build_report');


            let seq = await CounterService.getNextSequence("build_report_id");



            const result = await col.insertOne({


                id: seq,
                typePeriod: objParams.typePeriod,
                year: objParams.year,
                country: objParams.country,

                idcountry: ObjectId(objParams.idcountry),



                arrAllFiles: arrAllFiles,




                introductionScopeReport: objParams.introductionScopeReport,
                resultsSummary: objParams.resultsSummary,
                overallNarrativeProgress: objParams.overallNarrativeProgress,
                resultsImpactSummary: objParams.resultsImpactSummary,
                overallNarrativeProgressClimateInvestments: objParams.overallNarrativeProgressClimateInvestments,
                resultsImpactSummaryClimateInvestments: objParams.resultsImpactSummaryClimateInvestments,
                overallNarrativeProgressRegionalNationalCoordination: objParams.overallNarrativeProgressRegionalNationalCoordination,
                risks: objParams.risks,
                lessonsLearned: objParams.lessonsLearned,
                recommendations: objParams.recommendations,
                NCUTajikistan: objParams.NCUTajikistan,
                NCUUzbekistan: objParams.NCUUzbekistan,
                rcu: objParams.rcu,
                nextHalfYearNCUTajikistan: objParams.nextHalfYearNCUTajikistan,
                nextHalfYearNCUUzbekistan: objParams.nextHalfYearNCUUzbekistan,
                nextHalfYearrcu: objParams.nextHalfYearrcu,

                finstatus: objParams.finstatus,



                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )




            });





            return result;

        } catch (err){


            return err;

        }







    },


    addYearRCUsave: async (objParams, arrAllFiles) => {




        try {


            const col = dbConnect.getConnect().collection('build_report');


            let seq = await CounterService.getNextSequence("build_report_id");



            const result = await col.insertOne({


                id: seq,
                typePeriod: objParams.typePeriod,
                year: objParams.year,
                country: objParams.country,

                idcountry: ObjectId(objParams.idcountry),

                arrAllFiles: arrAllFiles,




                introductionScopeReport: objParams.introductionScopeReport,
                projectPerformance: objParams.projectPerformance,
                resultsSummary: objParams.resultsSummary,
                overallNarrativeProgressRegionalClimateKnowledge: objParams.overallNarrativeProgressRegionalClimateKnowledge,
                resultsImpactSummaryRegionalClimateKnowledge: objParams.resultsImpactSummaryRegionalClimateKnowledge,
                overallNarrativeProgressClimateInvestments: objParams.overallNarrativeProgressClimateInvestments,
                resultsImpactSummaryClimateInvestments: objParams.resultsImpactSummaryClimateInvestments,
                overallNarrativeProgressRegionalNationalCoordination: objParams.overallNarrativeProgressRegionalNationalCoordination,
                risks: objParams.risks,
                lessonsLearned: objParams.lessonsLearned,
                recommendations: objParams.recommendations,
                NCUTajikistan: objParams.NCUTajikistan,
                NCUUzbekistan: objParams.NCUUzbekistan,
                rcu: objParams.rcu,

                finstatus: objParams.finstatus,



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


                    plansNextPeriod: Double(objParams.plansNextPeriod),
                    plansNextHalfYearPeriod: Double(objParams.plansNextHalfYearPeriod),



                    overallNarrative: objParams.overallNarrative,
                    participantsStated: objParams.participantsStated,
                    comments: objParams.comments,

                    grmSourceInformation: objParams.grmSourceInformation,
                    satisfiedComplaintsInPercentage: objParams.satisfiedComplaintsInPercentage,
                    projectRisksIssuesQuestion: objParams.projectRisksIssuesQuestion,
                    projectRisksPotentialRisksQuestion: objParams.projectRisksPotentialRisksQuestion,


                }




            });





            return result;

        } catch (err){


            return err;

        }







    },


    updreportYearNCU: async (objParams, arrAllFiles) => {




        try {


            const col = dbConnect.getConnect().collection('build_report');




            const result = await col.updateOne({_id: ObjectId(objParams.id)}, {

                $currentDate: {
                    lastModified: true
                },

                $set: {



                    arrAllFiles: arrAllFiles,


                    projectPerformance: objParams.projectPerformance,
                    projectPerformanceComments: objParams.projectPerformanceComments,
                    detailedProject: objParams.detailedProject,
                    risks: objParams.risks,
                    lessonsLearned: objParams.lessonsLearned,
                    recommendations: objParams.recommendations,
                    plannedBudget: Double(objParams.plannedBudget)

                }




            });





            return result;

        } catch (err){


            return err;

        }







    },



    updreportHalfYearRCU: async (objParams, arrAllFiles) => {

        try {


            const col = dbConnect.getConnect().collection('build_report');




            const result = await col.updateOne({_id: ObjectId(objParams.id)}, {

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    finstatus: objParams.finstatus,

                    arrAllFiles: arrAllFiles,


                    introductionScopeReport: objParams.introductionScopeReport,
                    resultsSummary: objParams.resultsSummary,
                    overallNarrativeProgress: objParams.overallNarrativeProgress,
                    resultsImpactSummary: objParams.resultsImpactSummary,
                    overallNarrativeProgressClimateInvestments: objParams.overallNarrativeProgressClimateInvestments,
                    resultsImpactSummaryClimateInvestments: objParams.resultsImpactSummaryClimateInvestments,
                    overallNarrativeProgressRegionalNationalCoordination: objParams.overallNarrativeProgressRegionalNationalCoordination,
                    risks: objParams.risks,
                    lessonsLearned: objParams.lessonsLearned,
                    recommendations: objParams.recommendations,
                    NCUTajikistan: objParams.NCUTajikistan,
                    NCUUzbekistan: objParams.NCUUzbekistan,
                    rcu: objParams.rcu,
                    nextHalfYearNCUTajikistan: objParams.nextHalfYearNCUTajikistan,
                    nextHalfYearNCUUzbekistan: objParams.nextHalfYearNCUUzbekistan,
                    nextHalfYearrcu: objParams.nextHalfYearrcu

                }




            });





            return result;

        } catch (err){


            return err;

        }







    },

    updreportYearRCU: async (objParams, arrAllFiles) => {

        try {


            const col = dbConnect.getConnect().collection('build_report');




            const result = await col.updateOne({_id: ObjectId(objParams.id)}, {

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    finstatus: objParams.finstatus,

                    arrAllFiles: arrAllFiles,


                    introductionScopeReport: objParams.introductionScopeReport,
                    projectPerformance: objParams.projectPerformance,
                    resultsSummary: objParams.resultsSummary,
                    overallNarrativeProgressRegionalClimateKnowledge: objParams.overallNarrativeProgressRegionalClimateKnowledge,
                    resultsImpactSummaryRegionalClimateKnowledge: objParams.resultsImpactSummaryRegionalClimateKnowledge,
                    overallNarrativeProgressClimateInvestments: objParams.overallNarrativeProgressClimateInvestments,
                    resultsImpactSummaryClimateInvestments: objParams.resultsImpactSummaryClimateInvestments,
                    overallNarrativeProgressRegionalNationalCoordination: objParams.overallNarrativeProgressRegionalNationalCoordination,
                    risks: objParams.risks,
                    lessonsLearned: objParams.lessonsLearned,
                    recommendations: objParams.recommendations,
                    NCUTajikistan: objParams.NCUTajikistan,
                    NCUUzbekistan: objParams.NCUUzbekistan,
                    rcu: objParams.rcu,

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



    getTadjickUzbekNCUyear: async () => {




        try {


            const col = dbConnect.getConnect().collection('build_report');




            const result = await col.aggregate([

                {
                    $facet: {


                        "getTadzhikNCUYear": [


                            {

                                $match: {typePeriod: "Годовой (янв-дек)", country: "НКГ Таджикистана, Компонент 2"}

                            },





                            {
                                $group : {
                                    _id : null,
                                    risks: { $push: "$risks"},
                                    lessonsLearned: { $push: "$lessonsLearned"},
                                    recommendations: { $push: "$recommendations"},
                                    projectPerformanceComments: { $push: "$projectPerformanceComments"},
                                    plannedBudget: { $sum: "$plannedBudget" }

                                }
                            }






                        ],


                        "getUzbekNCUYear": [


                            {

                                $match: {typePeriod: "Годовой (янв-дек)", country: "НКГ Узбекистана, Компонент 2"}

                            },





                            {
                                $group : {
                                    _id : null,
                                    risks: { $push: "$risks"},
                                    lessonsLearned: { $push: "$lessonsLearned"},
                                    recommendations: { $push: "$recommendations"},
                                    projectPerformanceComments: { $push: "$projectPerformanceComments"},
                                    plannedBudget: { $sum: "$plannedBudget" }

                                }
                            }






                        ],






                    }
                },


            ]).toArray();





            return result;

        } catch (err){


            return err;

        }








    }

};
