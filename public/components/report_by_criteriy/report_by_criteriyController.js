/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('Report_by_criteriyAppCtrl', function ($scope, GetYearName, GetTypePeriod, GetAllCoutrys, $mdToast, GetGrowPotencial, $rootScope, $timeout) {


    $scope.data = {

        period: "",
        yearname: "",
        country: ""


    };

    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allCountrys = entry.resultFromDb;
        $scope.country = entry.resultFromDb[0]._id;


    });


    GetTypePeriod.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allperiod = entry.resultFromDb;
        $scope.period = entry.resultFromDb[0]._id;


    });



    GetYearName.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allyearname = entry.resultFromDb;
        $scope.yearname = entry.resultFromDb[0]._id;


    });



    let chart = c3.generate({

        bindto: '#chart',
        data: {
            // iris data from R
            columns: [
                ['Общее количество участников', 0],
                ['Общее количество участников, женщин', 0],
                ['Общее количество фассилитаторов', 0],
                ['Общее количество фассилитаторов, женщин', 0],
                ['Общее количество спикеров', 0],
                ['Общее количество спикеров, женщин', 0],


            ],
            type : 'pie'

        }
    });


    let chartAverage = c3.generate({

        bindto: '#chartAverage',
        data: {

            columns: [
                ['Среднее удоволетворительность участниками', 0],
                ['Среднее удоволетворительность участниками, женщин', 0]



            ],
            type : 'pie'

        }
    });




    $scope.createReport = function () {

        $scope.data.period = $scope.period;
        $scope.data.yearname = $scope.yearname;
        $scope.data.country = $scope.country;




        GetGrowPotencial.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(entry) {





            console.log(entry);


            for (let obj of entry.resultFromDb) {
                $scope.data.categorizedByDatePeriodCountry = obj.categorizedByDatePeriodCountry;
                $scope.data.categorizedBySum = obj.categorizedBySum;
                $scope.data.countSatisfaction = obj.countSatisfaction;
                $scope.data.countSatisfactionWomen = obj.countSatisfactionWomen;
                $scope.data.countForms = obj.countForms;

            }



            $scope.allCount = $scope.data.categorizedByDatePeriodCountry.length;
            $scope.allForm = $scope.data.countForms[0].all_form;


            chart.load({
                columns: [
                    ['Общее количество участников', $scope.data.categorizedBySum[0].countPeopleEventCommon],
                    ['Общее количество участников, женщин', $scope.data.categorizedBySum[0].countWomanEventCommon],
                    ['Общее количество фассилитаторов', $scope.data.categorizedBySum[0].countFacilatatorEventCommon],
                    ['Общее количество фассилитаторов, женщин', $scope.data.categorizedBySum[0].countFacilatatorWomanEventCommon],
                    ['Общее количество спикеров', $scope.data.categorizedBySum[0].countSpeakerEventCommon],
                    ['Общее количество спикеров, женщин', $scope.data.categorizedBySum[0].countSpeakerWomanEventCommon],

                ]
            });



            chartAverage.load({
                columns: [
                    ['Среднее удоволетворительность участниками', $scope.data.countSatisfaction[0].average],
                    ['Среднее удоволетворительность участниками, женщин', $scope.data.countSatisfactionWomen[0].average]

                ]
            });



        });
    };





});

