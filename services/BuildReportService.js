/**
 * Created by simvolice on 29.08.2017 20:04
 */




const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;



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
                                    ques13: {$push: "$ques13"},
                                    ques14: {$push: "$ques14"},
                                    ques15: {$push: "$ques15"},
                                    ques16: {$push: "$ques16"},
                                    ques17: {$push: "$ques17"},
                                    ques18: {$push: "$ques18"},
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
                                            inputs: ["$ques13", "$email"]
                                        }
                                    },

                                    transposed14: {
                                        $zip: {
                                            inputs: ["$ques14", "$email"]
                                        }
                                    },


                                    transposed15: {
                                        $zip: {
                                            inputs: ["$ques15", "$email"]
                                        }
                                    },

                                    transposed16: {
                                        $zip: {
                                            inputs: ["$ques16", "$email"]
                                        }
                                    },


                                    transposed18: {
                                        $zip: {
                                            inputs: ["$ques18", "$email"]
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



            let dateFromYear = new Date(objParams.dateFrom).getFullYear();
            let dateFromMonth = new Date(objParams.dateFrom).getMonth() + 1;
            let dateFromDay = new Date(objParams.dateFrom).getDate();


            let dateToYear = new Date(objParams.dateTo).getFullYear();
            let dateToMonth = new Date(objParams.dateTo).getMonth() + 1;
            let dateToDay = new Date(objParams.dateTo).getDate();



            const result = await col.aggregate([

                {
                    $facet: {
                        "categorizedByDatePeriodCountry": [


                            {

                            $match: {country: {$in: objParams.country}}

                            },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },
                                        day: { $dayOfMonth: "$myDate" },

                                    }
                            },


                            {

                                $match: {

                                    $and: [


                                        {year: {$gte: dateFromYear}},

                                        {year: {$lte: dateToYear}}


                                    ]


                                }


                            },


                            {

                                $match: {

                                    $and: [


                                        {month: {$gte: dateFromMonth}},

                                        {month: {$lte: dateToMonth}}


                                    ]


                                }


                            },
                            {

                                $match: {

                                    $and: [


                                        {day: {$gte: dateFromDay}},

                                        {day: {$lte: dateToDay}}


                                    ]


                                }


                            },



                            {
                                $count : "all_event"
                            }


                        ],


                        "countSatisfaction": [

                            {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },
                                        day: { $dayOfMonth: "$myDate" }

                                    }
                            },


                            {

                                $match: {

                                    $and: [


                                        {year: {$gte: dateFromYear}},

                                        {year: {$lte: dateToYear}}


                                    ]


                                }


                            },


                            {

                                $match: {

                                    $and: [


                                        {month: {$gte: dateFromMonth}},

                                        {month: {$lte: dateToMonth}}


                                    ]


                                }


                            },
                            {

                                $match: {

                                    $and: [


                                        {day: {$gte: dateFromDay}},

                                        {day: {$lte: dateToDay}}


                                    ]


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
                                $group : {
                                    _id : null,
                                    average: { $avg: "$ques12" }


                                }
                            }


                        ],



                        "countSatisfactionWomen": [


                            {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },
                                        day: { $dayOfMonth: "$myDate" },

                                    }
                            },


                            {

                                $match: {

                                    $and: [


                                        {year: {$gte: dateFromYear}},

                                        {year: {$lte: dateToYear}}


                                    ]


                                }


                            },


                            {

                                $match: {

                                    $and: [


                                        {month: {$gte: dateFromMonth}},

                                        {month: {$lte: dateToMonth}}


                                    ]


                                }


                            },
                            {

                                $match: {

                                    $and: [


                                        {day: {$gte: dateFromDay}},

                                        {day: {$lte: dateToDay}}


                                    ]


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


                            {$match: {ques20: "Женский"}},


                            {
                                $group : {
                                    _id : null,
                                    average: { $avg: "$ques12" }


                                }
                            }


                        ],




                        "categorizedBySum": [


                            {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },
                                        day: { $dayOfMonth: "$myDate" },

                                    }
                            },


                            {

                                $match: {

                                    $and: [


                                        {year: {$gte: dateFromYear}},

                                        {year: {$lte: dateToYear}}


                                    ]


                                }


                            },


                            {

                                $match: {

                                    $and: [


                                        {month: {$gte: dateFromMonth}},

                                        {month: {$lte: dateToMonth}}


                                    ]


                                }


                            },
                            {

                                $match: {

                                    $and: [


                                        {day: {$gte: dateFromDay}},

                                        {day: {$lte: dateToDay}}


                                    ]


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

                        ],



                        "countForms": [

                            {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },
                                        day: { $dayOfMonth: "$myDate" },

                                    }
                            },


                            {

                                $match: {

                                    $and: [


                                        {year: {$gte: dateFromYear}},

                                        {year: {$lte: dateToYear}}


                                    ]


                                }


                            },


                            {

                                $match: {

                                    $and: [


                                        {month: {$gte: dateFromMonth}},

                                        {month: {$lte: dateToMonth}}


                                    ]


                                }


                            },
                            {

                                $match: {

                                    $and: [


                                        {day: {$gte: dateFromDay}},

                                        {day: {$lte: dateToDay}}


                                    ]


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

                        "allEvents": [

                            {

                            $match: {country: {$in: objParams.country}}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$myDate" },
                                        month: { $month: "$myDate" },
                                        day: { $dayOfMonth: "$myDate" },

                                    }
                            },


                            {

                                $match: {

                                    $and: [


                                        {year: {$gte: dateFromYear}},

                                        {year: {$lte: dateToYear}}


                                    ]


                                }


                            },


                            {

                                $match: {

                                    $and: [


                                        {month: {$gte: dateFromMonth}},

                                        {month: {$lte: dateToMonth}}


                                    ]


                                }


                            },
                            {

                                $match: {

                                    $and: [


                                        {day: {$gte: dateFromDay}},

                                        {day: {$lte: dateToDay}}


                                    ]


                                }


                            },


                        ],


                    }
                },








            ]).toArray();



            return result;


        }catch(err) {


            console.log("\x1b[42m", err);

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

                                $match: {"status.name": "Не релевантно"}

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

                                $match: {"status.name": {$in: ["Принято", "Не релевантно", "Завершен", "Просрочено"]}}

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


                overallNarrative: objParams.overallNarrative,

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
                plannedBudget: Int32(objParams.plannedBudget),


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


                    overallNarrative: objParams.overallNarrative,
                    participantsStated: objParams.participantsStated,
                    comments: objParams.comments,

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


    updreportYearNCU: async (objParams, arrAllFiles) => {




        try {


            const col = dbConnect.getConnect().collection('build_report');




            const result = await col.updateOne({_id: ObjectId(objParams.id)}, {

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    finstatus: objParams.finstatus,
                    arrAllFiles: arrAllFiles,


                    projectPerformance: objParams.projectPerformance,
                    projectPerformanceComments: objParams.projectPerformanceComments,
                    detailedProject: objParams.detailedProject,
                    risks: objParams.risks,
                    lessonsLearned: objParams.lessonsLearned,
                    recommendations: objParams.recommendations,
                    plannedBudget: objParams.plannedBudget

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

                                $match: {typePeriod: "Годовой", country: "Таджикистан"}

                            },





                            {
                                $group : {
                                    _id : null,
                                    plannedBudget: { $sum: "$plannedBudget" }

                                }
                            }






                        ],


                        "getUzbekNCUYear": [


                            {

                                $match: {typePeriod: "Годовой", country: "Узбекистан"}

                            },





                            {
                                $group : {
                                    _id : null,
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