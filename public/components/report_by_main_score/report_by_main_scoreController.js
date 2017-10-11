/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('ReportByMainScoreAppCtrl', function ($scope, GetYearName, GetAllCoutrys, $mdToast, GetReportMainScore, $rootScope, $timeout) {

    $scope.data = {

        yearname: "",
        country: ""


    };




    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allCountrys = entry.resultFromDb;
        $scope.country = entry.resultFromDb[0]._id;


    });





    GetYearName.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allyearname = entry.resultFromDb;
        $scope.yearname = entry.resultFromDb[0]._id;


    });













    $scope.createReport = function () {

        $scope.data.yearname = $scope.yearname;
        $scope.data.country = $scope.country;




        GetReportMainScore.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(entry) {

            let arrPlatformNetwork = ['Платформы и сети', 0];



            let arrMobileResurse = ['Дополнительно мобилизованные ресурсы', 0];
            let arrRegionalInvest =  ['Региональные инвестиции', 0];
            let arrAllProject = ['Проекты и программы', 0];

            for (let obj of entry.resultFromDb) {




                if (obj.length !== 0) {








                if (obj[0].all_platform_network !== undefined) {

                    arrPlatformNetwork[0] = "Платформы и сети";
                    arrPlatformNetwork[1] = obj[0].all_platform_network;


                }

                if (obj[0].all_mobile_resurse !== undefined) {

                    arrMobileResurse[0] = "Дополнительно мобилизованные ресурсы";
                    arrMobileResurse[1] = obj[0].all_mobile_resurse;

                }


                if (obj[0].all_regional_invest !== undefined) {

                    arrRegionalInvest[0] = "Региональные инвестиции";
                    arrRegionalInvest[1] = obj[0].all_regional_invest;

                }

                if (obj[0].all_project !== undefined) {

                    arrAllProject[0] = "Проекты и программы";
                    arrAllProject[1] = obj[0].all_project;


                }



            }


            }





            var chart = c3.generate({
                bindto: "#chartMainScore",
                data: {
                    columns: [
                        arrPlatformNetwork,
                        arrMobileResurse,
                        arrRegionalInvest,
                        arrAllProject
                    ],
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



        });


    };







});

