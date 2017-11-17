/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('Report_by_criteriyAppCtrl', function ( $scope, GetYearName, GetTypePeriod, GetAllCoutrys, $mdToast, GetGrowPotencial, GetReportForEvent, $window) {
    $scope.eventShow = false;

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


            console.log(entry.resultFromDb);

            for (let obj of entry.resultFromDb) {
                $scope.data.categorizedByDatePeriodCountry = obj.categorizedByDatePeriodCountry;
                $scope.data.categorizedBySum = obj.categorizedBySum;
                $scope.data.countSatisfaction = obj.countSatisfaction;
                $scope.data.countSatisfactionWomen = obj.countSatisfactionWomen;
                $scope.data.countForms = obj.countForms;
                $scope.data.allEvents = obj.allEvents;

            }



            if ($scope.data.allEvents.length !== 0) {

                $scope.data.selectEvent = $scope.data.allEvents[0]._id;

            } else {

                $scope.data.allEvents.push({_id: 0, nameEvent: "Мероприятий нет"});
                $scope.data.selectEvent = $scope.data.allEvents[0]._id;

            }






            if ($scope.data.categorizedBySum.length !== 0) {

                let chart = c3.generate({

                    bindto: '#chart',
                    data: {
                        columns: [
                            ['Общее количество участников', $scope.data.categorizedBySum[0].countPeopleEventCommon],
                            ['Общее количество участников, женщин', $scope.data.categorizedBySum[0].countWomanEventCommon],
                            ['Общее количество фасилитаторов', $scope.data.categorizedBySum[0].countFacilatatorEventCommon],
                            ['Общее количество фасилитаторов, женщин', $scope.data.categorizedBySum[0].countFacilatatorWomanEventCommon],
                            ['Общее количество спикеров', $scope.data.categorizedBySum[0].countSpeakerEventCommon],
                            ['Общее количество спикеров, женщин', $scope.data.categorizedBySum[0].countSpeakerWomanEventCommon],

                        ],
                        type : 'pie'

                    },
                    pie: {
                        label: {
                            format: function (value, ratio, id) {
                                return d3.format('')(value);
                            }
                        }
                    },
                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return d3.format('')(value);
                            }

                        }
                    }

                });

            } else {

                let chart = c3.generate({

                    bindto: '#chart',
                    data: {
                        columns: [
                            ['Общее количество участников', 0],
                            ['Общее количество участников, женщин', 0],
                            ['Общее количество фасилитаторов', 0],
                            ['Общее количество фасилитаторов, женщин', 0],
                            ['Общее количество спикеров', 0],
                            ['Общее количество спикеров, женщин', 0],

                        ],
                        type : 'pie'

                    },
                    pie: {
                        label: {
                            format: function (value, ratio, id) {
                                return d3.format('')(value);
                            }
                        }
                    },
                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return d3.format('')(value);
                            }

                        }
                    }

                });



            }






            if ($scope.data.countSatisfaction.length !== 0 &&  $scope.data.countSatisfactionWomen !== 0) {



                let chartAverage = c3.generate({

                    bindto: '#chartAverage',
                    data: {

                        columns: [
                            ['Средняя удоволетворительность участниками', $scope.data.countSatisfaction[0].average],
                            ['Средняя удоволетворительность участниками, женщин', $scope.data.countSatisfactionWomen[0].average]

                        ],
                        type : 'pie'

                    },
                    pie: {
                        label: {
                            format: function (value, ratio, id) {
                                return d3.format('')(value.toFixed(1));
                            }
                        }
                    },
                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return d3.format('')(value.toFixed(1));
                            }

                        }
                    }
                });



            } else {

                let chartAverage = c3.generate({

                    bindto: '#chartAverage',
                    data: {

                        columns: [
                            ['Средняя удоволетворительность участниками', 0],
                            ['Средняя удоволетворительность участниками, женщин', 0]

                        ],
                        type : 'pie'

                    },
                    pie: {
                        label: {
                            format: function (value, ratio, id) {
                                return d3.format('')(value.toFixed(1));
                            }
                        }
                    },
                    tooltip: {
                        format: {

                            value: function (value, ratio, id) {
                                return d3.format('')(value.toFixed(1));
                            }

                        }
                    }
                });


            }







        });
    };


    $scope.createReportForEvent = function () {


        GetReportForEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data.selectEvent}, function(entry) {


            for (let item of entry.resultFromDb) {
               $scope.data.countAllAnswer = item.getAnswerAndNotAnswer;
               $scope.data.countAllNotAnswer = item.getAnswerAndNotAnswer;

               $scope.data.ques = item.allQues;






            }




            if ($scope.data.ques.length !== 0) {


                c3.generate({
                    bindto: "#chartQues1",
                    data: {
                        json: [
                            $scope.data.ques[0].ques1
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues2",
                    data: {
                        json: [
                            $scope.data.ques[0].ques2
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues3",
                    data: {
                        json: [
                            $scope.data.ques[0].ques3
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues4",
                    data: {
                        json: [
                            $scope.data.ques[0].ques4
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues5",
                    data: {
                        json: [
                            $scope.data.ques[0].ques5
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues6",
                    data: {
                        json: [
                            $scope.data.ques[0].ques6
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues7",
                    data: {
                        json: [
                            $scope.data.ques[0].ques7
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues8",
                    data: {
                        json: [
                            $scope.data.ques[0].ques8
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues9",
                    data: {
                        json: [
                            $scope.data.ques[0].ques9
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues10",
                    data: {
                        json: [
                            $scope.data.ques[0].ques10
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues11",
                    data: {
                        json: [
                            $scope.data.ques[0].ques11
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues12",
                    data: {
                        json: [
                            $scope.data.ques[0].ques12
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });



                let dimensions13 = Object.keys($scope.data.ques[0].dimensions13);

                $scope.data.totalQues13 = dimensions13.length;

                let dimensions14 = Object.keys($scope.data.ques[0].dimensions14);

                $scope.data.totalQues14 = dimensions14.length;


                let dimensions15 = Object.keys($scope.data.ques[0].dimensions15);

                $scope.data.totalQues15 = dimensions15.length;

                let dimensions16 = Object.keys($scope.data.ques[0].dimensions16);

                $scope.data.totalQues16 = dimensions16.length;


                c3.generate({
                    bindto: "#chartQues17",
                    data: {
                        json: [
                            $scope.data.ques[0].ques17
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });




                let dimensions18 = Object.keys($scope.data.ques[0].dimensions18);

                $scope.data.totalQues18 = dimensions18.length;






                c3.generate({
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
                                return d3.format('')(value);
                            }

                        }
                    }

                });


                c3.generate({
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
                                return d3.format('')(value);
                            }

                        }
                    }
                });



                c3.generate({
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
                                return d3.format('')(value);
                            }

                        }
                    }
                });



            } else {


                c3.generate({
                    bindto: "#chartQues1",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues2",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues3",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues4",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues5",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues6",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues7",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues8",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues9",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues10",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues11",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });
                c3.generate({
                    bindto: "#chartQues12",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });



                $scope.data.totalQues13 = 0;
                $scope.data.totalQues14 = 0;
                $scope.data.totalQues15 = 0;
                $scope.data.totalQues16 = 0;
                $scope.data.totalQues18 = 0;




                c3.generate({
                    bindto: "#chartQues17",
                    data: {
                        json: [
                            {1:0, 2:0, 3:0, 4:0, 5:0}
                        ],
                        keys: {

                            value: ['1', '2', '3', '4', '5'],
                        },
                        type: 'bar'
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
                    }
                });


                c3.generate({
                    bindto: "#chartQues19",
                    data: {
                        json: [
                            {'Государственное учреждение': 0, 'Региональную организацию': 0, 'НПО': 0, 'Академическое сообщество': 0, 'Ассоциацию фермеров': 0, 'Ассоциацию малого и среднего бизнеса': 0, 'Международную организацию': 0, 'СМИ': 0, 'Другое': 0}
                        ],
                        keys: {

                            value: ['Государственное учреждение', 'Региональную организацию', 'НПО', 'Академическое сообщество', 'Ассоциацию фермеров', 'Ассоциацию малого и среднего бизнеса', 'Международную организацию', 'СМИ', 'Другое'],
                        },
                        type: 'pie'
                    }
                });



                c3.generate({
                    bindto: "#chartQues20",
                    data: {
                        json: [
                            {'Мужской': 0, 'Женский': 0}
                        ],
                        keys: {

                            value: ['Мужской', 'Женский'],
                        },
                        type: 'pie'
                    }
                });



                c3.generate({
                    bindto: "#chartQues21",
                    data: {
                        json: [
                            {'25-29': 0, '30-34': 0, '35-39': 0, '40-44': 0, '45-49': 0, '50-и старше': 0}
                        ],
                        keys: {

                            value: ['25-29', '30-34', '35-39', '40-44', '45-49', '50-и старше'],
                        },
                        type: 'pie'
                    }
                });

            }







        });







        };


});

