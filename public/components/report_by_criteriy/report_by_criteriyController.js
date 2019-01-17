/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('Report_by_criteriyAppCtrl', function ( $scope, GetYearName, GetTypePeriod, GetAllCoutrys, $mdToast, GetGrowPotencial, GetReportForEvent, $window) {

    /*
   Поиск 100 процентов
    */
    $scope.calculatePercent = function (numberBase, value) {


        if (value === 0) {

            return 0;

        } else {


            let result = value * 100 / numberBase;
            return result.toFixed(1);

        }


    };


    $scope.eventShow = false;


    $scope.chartAllVariable = [];

    $scope.data = {


        country: "",
        selectEvent: "",
        dateFrom: new Date(),
        dateTo: new Date()


    };

    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;


    });






    $scope.createPdf = function () {

        $("#printableArea").print();

    };



    $scope.createReport = function () {


        $scope.eventShow = true;



        $scope.data.selectEvent = null;


        GetGrowPotencial.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(entry) {




            for (let obj of entry.resultFromDb) {
                $scope.data.categorizedByDatePeriodCountry = obj.categorizedByDatePeriodCountry;
                $scope.data.categorizedBySum = obj.categorizedBySum;
                $scope.data.categorizedByLearningEvent = obj.categorizedByLearningEvent;
                $scope.data.categorizedByGenderEvent = obj.categorizedByGenderEvent;
                $scope.data.countSatisfaction = obj.countSatisfaction;
                $scope.data.countNoSatisfaction = obj.countNoSatisfaction;
                $scope.data.countSatisfactionCommonAll = obj.countSatisfactionCommonAll;

                $scope.data.countSatisfactionWomen = obj.countSatisfactionWomen;
                $scope.data.countNoSatisfactionWomen = obj.countNoSatisfactionWomen;
                $scope.data.countForms = obj.countForms;
                $scope.data.allEvents = obj.allEvents;

                $scope.data.countCommonOk = obj.countCommonOk;
                $scope.data.countCommonOkWomen = obj.countCommonOkWomen;




            }



            if ($scope.data.allEvents.length !== 0) {

                $scope.data.selectEvent = $scope.data.allEvents[0]._id;

            } else {

                $scope.data.allEvents.push({_id: 0, nameEvent: "Мероприятий нет"});
                $scope.data.selectEvent = $scope.data.allEvents[0]._id;

            }







               let chartAverage = bb.generate({

                    bindto: '#chartCommon',
                    data: {

                        columns: [
                            ['Общая удовлетворенность участников', $scope.data.countSatisfaction.length === 0 ? $scope.data.countCommonOk[0].avg.toFixed(0) : $scope.data.countSatisfaction[0].countAll],
                            ['Не удовлетворены участием', $scope.data.countNoSatisfaction.length === 0 ? 100 - $scope.data.countCommonOk[0].avg.toFixed(0) : $scope.data.countNoSatisfaction[0].countAll]


                        ],
                        type : 'pie',



                    },

                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {

                                return value;
                            }

                        }
                    }

                });


            $scope.chartAllVariable.push(chartAverage);


           let chartWomen = bb.generate({

                bindto: '#chartWomen',
                data: {

                    columns: [
                        ['Общая удовлетворенность мероприятиями среди женщин', $scope.data.countSatisfactionWomen.length === 0 ? $scope.data.countCommonOkWomen[0].avg.toFixed(0) : $scope.data.countSatisfactionWomen[0].countAll],
                        ['Общая не удовлетворенность мероприятиями среди женщин', $scope.data.countNoSatisfactionWomen.length === 0 ? 100 - $scope.data.countCommonOkWomen[0].avg.toFixed(0) : $scope.data.countNoSatisfactionWomen[0].countAll]


                    ],
                    type : 'pie',
                    labels: true

                },

                tooltip: {
                    format: {

                        value: function (value, ratio, id) {

                            return value;
                        }

                    }
                }
            });



            $scope.chartAllVariable.push(chartWomen);





            if ( $scope.data.countSatisfactionCommonAll.length !== 0) {



                let chartCommonOrg = bb.generate({
                    bindto: "#chartCommonOrg",
                    data: {
                        json: [
                            $scope.data.countSatisfactionCommonAll[0].ques19
                        ],
                        keys: {

                            value: ['Государственное учреждение', 'Региональную организацию', 'НПО', 'Академическое сообщество', 'Ассоциацию фермеров', 'Ассоциацию малого и среднего бизнеса', 'Международную организацию', 'СМИ', 'Другое'],
                        },
                        type: 'pie'
                    },

                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return value;
                            }

                        }
                    }

                });


                $scope.chartAllVariable.push(chartCommonOrg);



                let chartCommonSex = bb.generate({
                    bindto: "#chartCommonSex",
                    data: {
                        json: [
                            $scope.data.countSatisfactionCommonAll[0].ques20
                        ],
                        keys: {

                            value: ['Мужской', 'Женский'],
                        },
                        type: 'pie'
                    },
                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return value;
                            }

                        }
                    }
                });

                $scope.chartAllVariable.push(chartCommonSex);


                let chartCommonAge = bb.generate({
                    bindto: "#chartCommonAge",
                    data: {
                        json: [
                            $scope.data.countSatisfactionCommonAll[0].ques21
                        ],
                        keys: {

                            value: ['25-29', '30-34', '35-39', '40-44', '45-49', '50-и старше'],
                        },
                        type: 'pie'
                    },
                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return value;
                            }

                        }
                    }
                });


                $scope.chartAllVariable.push(chartCommonAge);







            }




        });
    };





    $scope.createReportForEvent = function () {


        GetReportForEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data.selectEvent}, function(entry) {


            $scope.dataForOneEvent = entry.resultFromDb;

            for (let item of entry.resultFromDb) {
               $scope.data.countAllAnswer = item.getAnswerAndNotAnswer;
               $scope.data.countAllNotAnswer = item.getAnswerAndNotAnswer;

               $scope.data.ques = item.allQues;






            }





            if ($scope.data.ques.length !== 0) {


                let arrForChart = [1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                17,
            ];


                for (let itemOneChart of arrForChart) {
                    let chart = bb.generate({
                        bindto: `#chartQues${itemOneChart}`,
                        data: {


                            columns: [

                                ["data", $scope.data.ques[0][`ques${itemOneChart}`].hasOwnProperty("1") ? $scope.data.ques[0][`ques${itemOneChart}`]["1"] : 0,

                                    $scope.data.ques[0][`ques${itemOneChart}`].hasOwnProperty("2") ? $scope.data.ques[0][`ques${itemOneChart}`]["2"] : 0,
                                    $scope.data.ques[0][`ques${itemOneChart}`].hasOwnProperty("3") ? $scope.data.ques[0][`ques${itemOneChart}`]["3"] : 0,
                                    $scope.data.ques[0][`ques${itemOneChart}`].hasOwnProperty("4") ? $scope.data.ques[0][`ques${itemOneChart}`]["4"] : 0,
                                    $scope.data.ques[0][`ques${itemOneChart}`].hasOwnProperty("5") ? $scope.data.ques[0][`ques${itemOneChart}`]["5"] : 0


                                ]
                            ],

                            type: 'bar',
                            labels: {
                                format: function (value, id, i, j) {



                                    return `${value} (${$scope.calculatePercent($scope.data.ques[0][`ques${itemOneChart}`].totalAnswer, value)} %)`;


                                },

                            }
                        },
                        bar: {
                            width: {
                                ratio: 0.5 // this makes bar width 50% of length between ticks
                            }
                            // or
                            //width: 100 // this makes bar width 100px
                        },

                        grid: {

                            y: {
                                show: true
                            }
                        },


                        axis: {
                            x: {
                                type: 'category',
                                categories: ["1",
                                    "2",
                                    "3",
                                    "4",
                                    "5"]
                            },
                            y: {
                                max: $scope.data.ques[0][`ques${itemOneChart}`].totalAnswer

                            }
                        },

                        legend: {
                            show: false
                        },

                        tooltip: {
                            show: false

                        }


                    });

                    $scope.chartAllVariable.push(chart);
                }






                let dimensions13 = Object.keys($scope.data.ques[0].dimensions13);

                $scope.data.totalQues13 = dimensions13.length;

                let dimensions14 = Object.keys($scope.data.ques[0].dimensions14);

                $scope.data.totalQues14 = dimensions14.length;


                let dimensions15 = Object.keys($scope.data.ques[0].dimensions15);

                $scope.data.totalQues15 = dimensions15.length;

                let dimensions16 = Object.keys($scope.data.ques[0].dimensions16);

                $scope.data.totalQues16 = dimensions16.length;






                let dimensions18 = Object.keys($scope.data.ques[0].dimensions18);

                $scope.data.totalQues18 = dimensions18.length;






                bb.generate({
                    bindto: "#chartQues19",
                    data: {
                        json: [
                            $scope.data.ques[0].ques19
                        ],
                        keys: {

                            value: ['Государственное учреждение', 'Региональную организацию', 'НПО', 'Академическое сообщество', 'Ассоциацию фермеров', 'Ассоциацию малого и среднего бизнеса', 'Международную организацию', 'СМИ', 'Другое'],
                        },
                        type: 'pie'
                    },

                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return value;
                            }

                        }
                    }

                });


                bb.generate({
                    bindto: "#chartQues20",
                    data: {
                        json: [
                            $scope.data.ques[0].ques20
                        ],
                        keys: {

                            value: ['Мужской', 'Женский'],
                        },
                        type: 'pie'
                    },
                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return value;
                            }

                        }
                    }
                });



                bb.generate({
                    bindto: "#chartQues21",
                    data: {
                        json: [
                            $scope.data.ques[0].ques21
                        ],
                        keys: {

                            value: ['25-29', '30-34', '35-39', '40-44', '45-49', '50-и старше'],
                        },
                        type: 'pie'
                    },
                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return value;
                            }

                        }
                    }
                });



            }








        });







        };





    $scope.printOneEvent = function () {

        $("#print__one__event").print();

    };




    $scope.excel = function () {


       console.log(JSON.stringify($scope.dataForOneEvent));

    };




    $('.drawer').on('drawer.opened', function(){



        if ($scope.chartAllVariable.length !== 0) {


            for (let obj of $scope.chartAllVariable) {
                obj.resize();
            }

        }




    });

    $('.drawer').on('drawer.closed', function(){
        if ($scope.chartAllVariable.length !== 0) {


            for (let obj of $scope.chartAllVariable) {
                obj.resize();
            }

        }



    });


});

