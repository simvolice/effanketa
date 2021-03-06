/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('DataIntermediateIndexCtrl', function (GenerateDocxReport, GetNewVal, InsertNewVal, $timeout, GetReportSumGenderEvent, $scope, $window, GetYearName, GetReportAllForms, GetReportCountProgramm, $mdToast, GetReportCountRegeonalInvest, GetReportSumMobileAmount, GetReportCountPlatform, GetReportCountBenificiarProject, GetReportSumGAProject, GetReportCountCompleteGRM) {



    $scope.data = {

        country: "матрица",
        typePeriod: "РЕЗУЛЬТАТОВ",
        year: "И ИХ МОНИТОРИНГА"

    };


    GetNewVal.get(function(entry) {




        if (entry.hasOwnProperty("resultFromDb")) {
            $scope.data.ipr112016 = entry.resultFromDb.ipr112016;
            $scope.data.ipr112017 = entry.resultFromDb.ipr112017;
            $scope.data.ipr112018 = entry.resultFromDb.ipr112018;
            $scope.data.ipr112019 = entry.resultFromDb.ipr112019;
            $scope.data.ipr112020 = entry.resultFromDb.ipr112020;
            $scope.data.ipr112021 = entry.resultFromDb.ipr112021;
            $scope.data.ipr122016 = entry.resultFromDb.ipr122016;
            $scope.data.ipr122017 = entry.resultFromDb.ipr122017;
            $scope.data.ipr122018 = entry.resultFromDb.ipr122018;
            $scope.data.ipr122019 = entry.resultFromDb.ipr122019;
            $scope.data.ipr122020 = entry.resultFromDb.ipr122020;
            $scope.data.ipr122021 = entry.resultFromDb.ipr122021;
        } else {
            $scope.data.ipr112016 = 0;
            $scope.data.ipr112017 = 0;
            $scope.data.ipr112018 = 0;
            $scope.data.ipr112019 = 0;
            $scope.data.ipr112020 = 0;
            $scope.data.ipr112021 = 0;
            $scope.data.ipr122016 = 0;
            $scope.data.ipr122017 = 0;
            $scope.data.ipr122018 = 0;
            $scope.data.ipr122019 = 0;
            $scope.data.ipr122020 = 0;
            $scope.data.ipr122021 = 0;

        }

    });



    $scope.createNewVal = function (event) {
        if(event.keyCode === 13) {

            InsertNewVal.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(entry) {


                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась УСПЕШНО.')
                        .position('bottom left')
                        .hideDelay(3000)
                );

            });

        }
    };

    $scope.arrAllForms = [];
    $scope.arrAllCountProgramm = [];
    $scope.arrAllCountRegeonalInvest = [];
    $scope.arrAllSumMobileAmount = [];
    $scope.arrAllCountPlatform = [];
    $scope.arrAllCountBenificiarProject = [];
    $scope.arrAllSumGAProject = [];
    $scope.arrAllSumGenderEvent = [];
    $scope.arrAllCountCompleteGRM = [];

    $scope.arrYear = [2016, 2017, 2018, 2019, 2020, 2021];




    $scope.objResult = {};





    /*
  Поиск 100 процентов
   */
    $scope.calculatePercent = function (numberBase, value) {


        if (value === 0) {

            return 0;

        } else {

            let result = value * 100 / numberBase;
            return Number.parseInt(result.toFixed(0));

        }


    };


    $scope.average = arr => {


        if (arr.length === 0) {

            return 0;
        } else {

            return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
        }


    };

    $scope.add = (a, b) =>
        a + b;









    $scope.summVal = [];

    $scope.generateReport = function (yearname) {


        let arrAllData = [];


        GetReportAllForms.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {







            let avgByForms = $scope.calculatePercent(5 ,entry.resultFromDb[0].getAllGoodTestResult.length === 0 ? 0 : entry.resultFromDb[0].getAllGoodTestResult[0].all_countSatisfaction_yes);

            let avgByCustom = 0;
            if (entry.resultFromDb[0].countCommonOk.length !== 0) {

                if (entry.resultFromDb[0].countCommonOk[0].avg !== null) {

                   avgByCustom = parseInt(entry.resultFromDb[0].countCommonOk[0].avg.toFixed(0));

                }

            } else {

                avgByCustom = 0;
            }



           let arrAvgResult = [];

            arrAvgResult.push(avgByForms);
            arrAvgResult.push(avgByCustom);

            if (arrAvgResult.indexOf(0) !== -1) {

                arrAvgResult.splice(arrAvgResult.indexOf(0), 1);
            }








            if (yearname === 2016) {


                if ($scope.data.ipr112016 === 0) {
                    $scope.data.allFormPercent = $scope.average(arrAvgResult).toFixed(0);

                } else {

                    $scope.data.allFormPercent = (parseInt($scope.average(arrAvgResult).toFixed(0)) + parseInt($scope.data.ipr112016)) / 2;

                }


            } else if (yearname === 2017){

                if ($scope.data.ipr112017 === 0) {
                    $scope.data.allFormPercent = $scope.average(arrAvgResult).toFixed(0);

                } else {

                    $scope.data.allFormPercent = (parseInt($scope.average(arrAvgResult).toFixed(0)) + parseInt($scope.data.ipr112017)) / 2;

                }


            } else if (yearname === 2018) {

                if ($scope.data.ipr112018 === 0) {
                    $scope.data.allFormPercent = $scope.average(arrAvgResult).toFixed(0);

                } else {

                    $scope.data.allFormPercent = (parseInt($scope.average(arrAvgResult).toFixed(0)) + parseInt($scope.data.ipr112018)) / 2;

                }


            } else if (yearname === 2019) {


                if ($scope.data.ipr112019 === 0) {
                    $scope.data.allFormPercent = $scope.average(arrAvgResult).toFixed(0);

                } else {



                    $scope.data.allFormPercent = (parseInt($scope.average(arrAvgResult).toFixed(0)) + parseInt($scope.data.ipr112019)) / 2;

                }


            } else if (yearname === 2020) {


                if ($scope.data.ipr112020 === 0) {

                    $scope.data.allFormPercent = $scope.average(arrAvgResult).toFixed(0);

                } else {

                    $scope.data.allFormPercent = (parseInt($scope.average(arrAvgResult).toFixed(0)) + parseInt($scope.data.ipr112020)) / 2;

                }



            }






            arrAllData.push({allFormPercent: parseInt($scope.data.allFormPercent)});



            $scope.summVal.push(parseInt($scope.data.allFormPercent));


            if (yearname === 2021) {

                $scope.objResult["allFormPercent" + yearname] = $scope.average($scope.summVal).toFixed(0);

            } else {

                $scope.objResult["allFormPercent" + yearname] = parseInt($scope.data.allFormPercent);

            }



        });


        $scope.arrAllForms.push(arrAllData);



    };





    let summValcountProgramm = 0;

    $scope.generateReportCountProgramm = function (yearname) {


        let arrAllData = [];


          GetReportCountProgramm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



                  $scope.data.countProgramm = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_programm;


              summValcountProgramm += $scope.data.countProgramm;
                arrAllData.push({countProgramm: $scope.data.countProgramm});

              if (yearname === 2021) {

                  $scope.objResult["countProgramm" + yearname] = summValcountProgramm;

              } else {

                  $scope.objResult["countProgramm" + yearname] = $scope.data.countProgramm;

              }



          });




        $scope.arrAllCountProgramm.push(arrAllData);



    };

    let summValfinInvest = 0;
    $scope.generateReportCountRegeonalInvest = function (yearname) {


        let arrAllData = [];






         GetReportCountRegeonalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {




                   $scope.data.finInvest = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_invest;


                   summValfinInvest += $scope.data.finInvest;

                   arrAllData.push({finInvest: $scope.data.finInvest});


             if (yearname === 2021) {

                 $scope.objResult["finInvest" + yearname] = summValfinInvest;

             } else {

                 $scope.objResult["finInvest" + yearname] = $scope.data.finInvest;

             }




           });




        $scope.arrAllCountRegeonalInvest.push(arrAllData);



    };



    let summValmobileResurs = 0;

    $scope.generateReportSumMobileAmount = function (yearname) {


        let arrAllData = [];








          GetReportSumMobileAmount.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {


                $scope.data.mobileResurs = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_mobileresurs.$numberDecimal;


                 arrAllData.push({mobileResurs: Number.parseFloat($scope.data.mobileResurs)});

              summValmobileResurs += $scope.data.mobileResurs;

              if (yearname === 2021) {

                  $scope.objResult["mobileResurs" + yearname] = summValmobileResurs;

              } else {

                  $scope.objResult["mobileResurs" + yearname] = $scope.data.mobileResurs;

              }



         });




        $scope.arrAllSumMobileAmount.push(arrAllData);



    };





    let summValcountPlatform = 0;
    $scope.generateReportCountPlatform = function (yearname) {


        let arrAllData = [];




          GetReportCountPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {



                  $scope.data.countPlatform = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].all_platform;


                  arrAllData.push({countPlatform: $scope.data.countPlatform});

              summValcountPlatform += $scope.data.countPlatform;

              if (yearname === 2021) {

                  $scope.objResult["countPlatform" + yearname] = summValcountPlatform;

              } else {

                  $scope.objResult["countPlatform" + yearname] = $scope.data.countPlatform;

              }

          });



        $scope.arrAllCountPlatform.push(arrAllData);



    };


   $scope.summValsumComponents = [];
   $scope.summValcountComponent1 = [];
   $scope.summValcountComponent2 = [];
   $scope.summValcountBenificiarProjectTj = [];
   $scope.summValcountBenificiarProjectUz = [];
   $scope.summValpercentSum = [];
   $scope.summValpercentC1 = [];
   $scope.summValpercentC2 = [];
   $scope.summValTjPercentWomen = [];
   $scope.summValUzPercentWomen = [];
   $scope.summValcountBenificiarProjectUzIPR14 = [];
   $scope.summValcountBenificiarProjectTjIPR14 = [];
   $scope.summValcountsummC2PR14 = [];
   $scope.summValcountsummC1PR14 = [];
   $scope.summValcountsummC1C2PR14 = [];

    $scope.generateReportCountBenificiarProject = function (yearname) {


        let arrAllData = [];






         GetReportCountBenificiarProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {





            if (entry.resultFromDb.length !== 0) {



                $scope.data.countComponent1 = entry.resultFromDb[0].categByAll.length === 0 ? 0 : entry.resultFromDb[0].categByAll[0].all_benificiar;

                $scope.data.countComponent2 = entry.resultFromDb[0].categByAll.length === 0 ? 0 : entry.resultFromDb[0].categByAll[0].all_benificiar;

                $scope.data.countBenificiarProjectTj = entry.resultFromDb[0].categByTj.length === 0 ? 0 : entry.resultFromDb[0].categByTj[0].all_benificiar;
                $scope.data.countBenificiarProjectUz = entry.resultFromDb[0].categByUz.length === 0 ? 0 : entry.resultFromDb[0].categByUz[0].all_benificiar;



                $scope.data.countBenificiarProjectUzIPR14 = entry.resultFromDb[1].allEventSumPeopleUZ.length === 0 ? 0 : entry.resultFromDb[1].allEventSumPeopleUZ[0].all_countPeopleEventCommon;
                $scope.data.countBenificiarProjectTjIPR14 = entry.resultFromDb[1].allEventSumPeopleTJ.length === 0 ? 0 : entry.resultFromDb[1].allEventSumPeopleTJ[0].all_countPeopleEventCommon;
                $scope.data.summC2PR14 = $scope.data.countBenificiarProjectTjIPR14 + $scope.data.countBenificiarProjectUzIPR14;
                $scope.data.summC1PR14 = entry.resultFromDb[1].allEventSumPeople.length === 0 ? 0 : entry.resultFromDb[1].allEventSumPeople[0].all_countPeopleEventCommon;
                $scope.data.summC1C2PR14 = $scope.data.summC2PR14 + $scope.data.summC1PR14;




                $scope.sumComponents = $scope.data.countComponent1 + $scope.data.countComponent2;



                 let categByAllWomenAll_benificiar = entry.resultFromDb[0].categByAllWomen.length === 0 ? 0 : entry.resultFromDb[0].categByAllWomen[0].all_benificiar;


                $scope.sumWomen = entry.resultFromDb[1].allEventSumWomen.length === 0 ? 0 : entry.resultFromDb[1].allEventSumWomen[0].all_countWomanEventCommon + categByAllWomenAll_benificiar;





                $scope.data.countC1All = parseInt($scope.data.countComponent1);

                $scope.data.percentC1 = $scope.calculatePercent($scope.data.countC1All, entry.resultFromDb[0].categByAllWomen.length === 0 ? 0 : entry.resultFromDb[0].categByAllWomen[0].all_benificiar);

                $scope.data.countTjAll = parseInt($scope.data.countBenificiarProjectTj);
                $scope.data.countUzAll = parseInt($scope.data.countBenificiarProjectUz);


                $scope.data.avgAllCountry = [];
                $scope.data.avgAllComponents = [];

                $scope.data.TjPercentWomen = $scope.calculatePercent($scope.data.countTjAll, entry.resultFromDb[0].categByTjWomen.length === 0 ? 0 : entry.resultFromDb[0].categByTjWomen[0].all_benificiar);




                $scope.data.UzPercentWomen = $scope.calculatePercent($scope.data.countUzAll, entry.resultFromDb[0].categByUzWomen.length === 0 ? 0 : entry.resultFromDb[0].categByUzWomen[0].all_benificiar);

                $scope.data.avgAllCountry.push($scope.data.TjPercentWomen);
                $scope.data.avgAllCountry.push($scope.data.UzPercentWomen);


                $scope.data.percentC2 = $scope.average($scope.data.avgAllCountry).toFixed(0);


                $scope.data.avgAllComponents.push(parseInt($scope.data.percentC1));
                $scope.data.avgAllComponents.push(parseInt($scope.data.percentC2));


                $scope.data.percentSum = $scope.average($scope.data.avgAllComponents).toFixed(0);






                $scope.summValsumComponents.push($scope.sumComponents);
                $scope.summValcountComponent1.push($scope.data.countComponent1);
                $scope.summValcountComponent2.push($scope.data.countComponent2);
                $scope.summValcountBenificiarProjectTj.push($scope.data.countBenificiarProjectTj);
                $scope.summValcountBenificiarProjectUz.push($scope.data.countBenificiarProjectUz);
                $scope.summValpercentSum.push(parseInt($scope.data.percentSum));
                $scope.summValpercentC1.push(parseInt($scope.data.percentC1));
                $scope.summValpercentC2.push(parseInt($scope.data.percentC2));
                $scope.summValTjPercentWomen.push(parseInt($scope.data.TjPercentWomen));
                $scope.summValUzPercentWomen.push(parseInt($scope.data.UzPercentWomen));
                $scope.summValcountBenificiarProjectUzIPR14.push(parseInt($scope.data.countBenificiarProjectUzIPR14));
                $scope.summValcountBenificiarProjectTjIPR14.push(parseInt($scope.data.countBenificiarProjectTjIPR14));
                $scope.summValcountsummC2PR14.push(parseInt($scope.data.summC2PR14));
                $scope.summValcountsummC1PR14.push(parseInt($scope.data.summC1PR14));
                $scope.summValcountsummC1C2PR14.push(parseInt($scope.data.summC1C2PR14));

                arrAllData.push({sumComponents: $scope.sumComponents});
                arrAllData.push({countComponent1: $scope.data.countComponent1});
                arrAllData.push({countComponent2: $scope.data.countComponent2});
                arrAllData.push({countBenificiarProjectTj: $scope.data.countBenificiarProjectTj});
                arrAllData.push({countBenificiarProjectUz: $scope.data.countBenificiarProjectUz});
                arrAllData.push({countBenificiarProjectUzIPR14: $scope.data.countBenificiarProjectUzIPR14});
                arrAllData.push({countBenificiarProjectTjIPR14: $scope.data.countBenificiarProjectTjIPR14});


                arrAllData.push({percentSum: $scope.data.percentSum});
                arrAllData.push({percentC1: $scope.data.percentC1});
                arrAllData.push({percentC2: $scope.data.percentC2});
                arrAllData.push({TjPercentWomen: $scope.data.TjPercentWomen});
                arrAllData.push({UzPercentWomen: $scope.data.UzPercentWomen});
                arrAllData.push({summC2PR14: $scope.data.summC2PR14});
                arrAllData.push({summC1PR14: $scope.data.summC1PR14});
                arrAllData.push({summC1C2PR14: $scope.data.summC1C2PR14});




                if (yearname === 2021) {


                    $scope.objResult["sumComponents" + yearname] = $scope.average($scope.summValsumComponents).toFixed(0);
                    $scope.objResult["countComponent1" + yearname] = $scope.average($scope.summValcountComponent1).toFixed(0);
                    $scope.objResult["countComponent2" + yearname] = $scope.average($scope.summValcountComponent2).toFixed(0);
                    $scope.objResult["countBenificiarProjectTj" + yearname] = $scope.average($scope.summValcountBenificiarProjectTj).toFixed(0);
                    $scope.objResult["countBenificiarProjectUz" + yearname] = $scope.average($scope.summValcountBenificiarProjectUz).toFixed(0);
                    $scope.objResult["percentSum" + yearname] = $scope.average($scope.summValpercentSum).toFixed(0);
                    $scope.objResult["percentC1" + yearname] = $scope.average($scope.summValpercentC1).toFixed(0);
                    $scope.objResult["percentC2" + yearname] = $scope.average($scope.summValpercentC2).toFixed(0);
                    $scope.objResult["TjPercentWomen" + yearname] = $scope.average($scope.summValTjPercentWomen).toFixed(0);
                    $scope.objResult["UzPercentWomen" + yearname] = $scope.average($scope.summValUzPercentWomen).toFixed(0);
                    $scope.objResult["countBenificiarProjectUzIPR14" + yearname] = $scope.average($scope.summValcountBenificiarProjectUzIPR14).toFixed(0);
                    $scope.objResult["countBenificiarProjectTjIPR14" + yearname] = $scope.average($scope.summValcountBenificiarProjectTjIPR14).toFixed(0);
                    $scope.objResult["summC2PR14" + yearname] = $scope.average($scope.summValcountsummC2PR14).toFixed(0);
                    $scope.objResult["summC1PR14" + yearname] = $scope.average($scope.summValcountsummC1PR14).toFixed(0);
                    $scope.objResult["summC1C2PR14" + yearname] = $scope.average($scope.summValcountsummC1C2PR14).toFixed(0);




                } else {

                    $scope.objResult["sumComponents" + yearname] = $scope.sumComponents;
                    $scope.objResult["countComponent1" + yearname] = $scope.data.countComponent1;
                    $scope.objResult["countComponent2" + yearname] = $scope.data.countComponent2;
                    $scope.objResult["countBenificiarProjectTj" + yearname] = $scope.data.countBenificiarProjectTj;
                    $scope.objResult["countBenificiarProjectUz" + yearname] = $scope.data.countBenificiarProjectUz;
                    $scope.objResult["percentSum" + yearname] = $scope.data.percentSum;
                    $scope.objResult["percentC1" + yearname] = $scope.data.percentC1;
                    $scope.objResult["percentC2" + yearname] = $scope.data.percentC2;
                    $scope.objResult["TjPercentWomen" + yearname] = $scope.data.TjPercentWomen;
                    $scope.objResult["UzPercentWomen" + yearname] = $scope.data.UzPercentWomen;
                    $scope.objResult["countBenificiarProjectUzIPR14" + yearname] = $scope.data.countBenificiarProjectUzIPR14;
                    $scope.objResult["countBenificiarProjectTjIPR14" + yearname] = $scope.data.countBenificiarProjectTjIPR14;
                    $scope.objResult["summC2PR14" + yearname] = $scope.data.summC2PR14;
                    $scope.objResult["summC1PR14" + yearname] = $scope.data.summC1PR14;
                    $scope.objResult["summC1C2PR14" + yearname] = $scope.data.summC1C2PR14;

                }



            }




        });




        $scope.arrAllCountBenificiarProject.push(arrAllData);



    };




    let summValareaGAProject = 0;
    let summValareaGAProjectTj = 0;
    let summValareaGAProjectUz = 0;

    $scope.generateReportSumGAProject = function (yearname) {


        let arrAllData = [];





         GetReportSumGAProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {


              if (entry.resultFromDb.length !== 0) {

                  $scope.data.areaGAProject = entry.resultFromDb[0].categByAll.length === 0 ? 0 : entry.resultFromDb[0].categByAll[0].all_gaproject;
                  $scope.data.areaGAProjectTj = entry.resultFromDb[0].categByTj.length === 0 ? 0 : entry.resultFromDb[0].categByTj[0].all_gaproject;
                  $scope.data.areaGAProjectUz = entry.resultFromDb[0].categByUz.length === 0 ? 0 : entry.resultFromDb[0].categByUz[0].all_gaproject;


                  arrAllData.push({areaGAProject: $scope.data.areaGAProject});
                  arrAllData.push({areaGAProjectTj: $scope.data.areaGAProjectTj});
                  arrAllData.push({areaGAProjectUz: $scope.data.areaGAProjectUz});


                  summValareaGAProject += $scope.data.areaGAProject;
                  summValareaGAProjectTj += $scope.data.areaGAProjectTj;
                  summValareaGAProjectUz += $scope.data.areaGAProjectUz;

                  if (yearname === 2021) {

                      $scope.objResult["areaGAProject" + yearname] = summValareaGAProject;
                      $scope.objResult["areaGAProjectTj" + yearname] = summValareaGAProjectTj;
                      $scope.objResult["areaGAProjectUz" + yearname] = summValareaGAProjectUz;

                  } else {

                      $scope.objResult["areaGAProject" + yearname] = $scope.data.areaGAProject;
                      $scope.objResult["areaGAProjectTj" + yearname] = $scope.data.areaGAProjectTj;
                      $scope.objResult["areaGAProjectUz" + yearname] = $scope.data.areaGAProjectUz;

                  }



              }



          });



        $scope.arrAllSumGAProject.push(arrAllData);



    };



    let summValsumgenderevent = 0;

    $scope.generateReportSumGenderEvent = function (yearname) {


        let arrAllData = [];







          GetReportSumGenderEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {





                  $scope.data.sumgenderevent = entry.resultFromDb.length === 0 ? 0 : entry.resultFromDb[0].countAll;


                  arrAllData.push({sumgenderevent: $scope.data.sumgenderevent});

              summValsumgenderevent += $scope.data.sumgenderevent;

              if (yearname === 2021) {

                  $scope.objResult["sumgenderevent" + yearname] = summValsumgenderevent;

              } else {

                  $scope.objResult["sumgenderevent" + yearname] = $scope.data.sumgenderevent;

              }




          });






        $scope.arrAllSumGenderEvent.push(arrAllData);



    };


    $scope.summValcountGRMC1 = [];
    $scope.summValcountGRM = [];
    $scope.summValcountGRM_TJ = [];
    $scope.summValcountGRM_UZ = [];

    $scope.generateReportCountCompleteGRM = function (yearname) {


        let arrAllData = [];






         GetReportCountCompleteGRM.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: yearname}, function(entry) {




             if (entry.resultFromDb.length !== 0) {

                 $scope.data.countGRMC1 = entry.resultFromDb[0].categorizedByAllCompletegrmAVG[0].percent;
                 $scope.data.countGRM_TJ = entry.resultFromDb[0].categorizedByAllCompletegrmAVG_TJ[0].percent;
                 $scope.data.countGRM_UZ = entry.resultFromDb[0].categorizedByAllCompletegrmAVG_UZ[0].percent;


                 $scope.arrC2 = [];


                 if ($scope.data.countGRM_TJ === 0) {
                     $scope.arrC2.push($scope.data.countGRM_UZ);
                 } else {

                     $scope.arrC2.push($scope.data.countGRM_TJ);

                 }

                 if ($scope.data.countGRM_UZ === 0) {
                     $scope.arrC2.push($scope.data.countGRM_TJ);
                 } else {

                     $scope.arrC2.push($scope.data.countGRM_UZ);
                 }



                 $scope.data.countGRM = $scope.average($scope.arrC2);




                 arrAllData.push({

                     countGRMC1: $scope.data.countGRMC1,
                     countGRM: $scope.data.countGRM,
                     countGRM_TJ: $scope.data.countGRM_TJ,
                     countGRM_UZ: $scope.data.countGRM_UZ,


                 });


                 $scope.summValcountGRMC1.push($scope.data.countGRMC1);
                 $scope.summValcountGRM.push($scope.data.countGRM);
                 $scope.summValcountGRM_TJ.push($scope.data.countGRM_TJ);
                 $scope.summValcountGRM_UZ.push($scope.data.countGRM_UZ);



                 if (yearname === 2021) {

                     $scope.objResult["countGRMC1" + yearname] = $scope.average($scope.summValcountGRMC1).toFixed(0);
                     $scope.objResult["countGRM" + yearname] = $scope.average($scope.summValcountGRM).toFixed(0);
                     $scope.objResult["countGRM_TJ" + yearname] = $scope.average($scope.summValcountGRM_TJ).toFixed(0);
                     $scope.objResult["countGRM_UZ" + yearname] = $scope.average($scope.summValcountGRM_UZ).toFixed(0);

                 } else {

                     $scope.objResult["countGRMC1" + yearname] = $scope.data.countGRMC1;
                     $scope.objResult["countGRM" + yearname] = $scope.data.countGRM;
                     $scope.objResult["countGRM_TJ" + yearname] = $scope.data.countGRM_TJ;
                     $scope.objResult["countGRM_UZ" + yearname] = $scope.data.countGRM_UZ;

                 }


             }


         });





        $scope.arrAllCountCompleteGRM.push(arrAllData);



    };




    for (const itemYear of $scope.arrYear) {


        $scope.generateReport(itemYear);
        $scope.generateReportCountProgramm(itemYear);
        $scope.generateReportCountRegeonalInvest(itemYear);
        $scope.generateReportSumMobileAmount(itemYear);
        $scope.generateReportCountPlatform(itemYear);
        $scope.generateReportCountBenificiarProject(itemYear);
        $scope.generateReportSumGAProject(itemYear);
        $scope.generateReportSumGenderEvent(itemYear);
        $scope.generateReportCountCompleteGRM(itemYear);


    }



    $timeout(function () {


        $scope.summVal = $scope.summVal.filter(function (item) {

            return item !== 0;

        });


        $scope.summValsumComponents = $scope.summValsumComponents.filter(function (item) {
            return item !== 0;
        });
        $scope.summValcountComponent1 = $scope.summValcountComponent1.filter(function (item) {
            return item !== 0;
        });
        $scope.summValcountComponent2 = $scope.summValcountComponent2.filter(function (item) {
            return item !== 0;
        });
        $scope.summValcountBenificiarProjectTj = $scope.summValcountBenificiarProjectTj.filter(function (item) {
            return item !== 0;
        });
        $scope.summValcountBenificiarProjectUz = $scope.summValcountBenificiarProjectUz.filter(function (item) {
            return item !== 0;
        });
        $scope.summValpercentSum = $scope.summValpercentSum.filter(function (item) {
            return item !== 0;
        });
        $scope.summValpercentC1 = $scope.summValpercentC1.filter(function (item) {
            return item !== 0;
        });
        $scope.summValpercentC2 = $scope.summValpercentC2.filter(function (item) {
            return item !== 0;
        });
        $scope.summValTjPercentWomen = $scope.summValTjPercentWomen.filter(function (item) {
            return item !== 0;
        });
        $scope.summValUzPercentWomen = $scope.summValUzPercentWomen.filter(function (item) {
            return item !== 0;
        });


        $scope.summValcountGRMC1 = $scope.summValcountGRMC1.filter(function (item) {
            return item !== 0;
        });
        $scope.summValcountGRM = $scope.summValcountGRM.filter(function (item) {
            return item !== 0;
        });
        $scope.summValcountGRM_TJ = $scope.summValcountGRM_TJ.filter(function (item) {
            return item !== 0;
        });
        $scope.summValcountGRM_UZ = $scope.summValcountGRM_UZ.filter(function (item) {
            return item !== 0;
        });

        $scope.summValcountBenificiarProjectUzIPR14 = $scope.summValcountBenificiarProjectUzIPR14.filter(function (item) {
            return item !== 0;
        });

        $scope.summValcountBenificiarProjectTjIPR14 = $scope.summValcountBenificiarProjectTjIPR14.filter(function (item) {
            return item !== 0;
        });

        $scope.summValcountsummC2PR14 = $scope.summValcountsummC2PR14.filter(function (item) {
            return item !== 0;
        });


        $scope.summValcountsummC1PR14 = $scope.summValcountsummC1PR14.filter(function (item) {
            return item !== 0;
        });




        $scope.summValcountsummC1C2PR14 = $scope.summValcountsummC1C2PR14.filter(function (item) {
            return item !== 0;
        });

        $scope.arrAllFormsResult = $scope.average($scope.summVal).toFixed(0);



        $scope.summValsumComponentsResult = $scope.average($scope.summValsumComponents).toFixed(0);
        $scope.summValcountComponent1Result = $scope.average($scope.summValcountComponent1).toFixed(0);
        $scope.summValcountComponent2Result = $scope.average($scope.summValcountComponent2).toFixed(0);
        $scope.summValcountBenificiarProjectTjResult = $scope.average($scope.summValcountBenificiarProjectTj).toFixed(0);
        $scope.summValcountBenificiarProjectUzResult = $scope.average($scope.summValcountBenificiarProjectUz).toFixed(0);
        $scope.summValcountBenificiarProjectUzIPR14Result = $scope.summValcountBenificiarProjectUzIPR14.reduce($scope.add);
        $scope.summValcountBenificiarProjectTjIPR14Result = $scope.summValcountBenificiarProjectTjIPR14.reduce($scope.add);
        $scope.summValcountsummC2PR14Result = $scope.summValcountsummC2PR14.reduce($scope.add);
        $scope.summValcountsummC1PR14Result = $scope.summValcountsummC1PR14.reduce($scope.add);
        $scope.summValcountsummC1C2PR14Result = $scope.summValcountsummC1C2PR14.reduce($scope.add);


        $scope.summValpercentSumResult = $scope.average($scope.summValpercentSum).toFixed(0);
        $scope.summValpercentC1Result = $scope.average($scope.summValpercentC1).toFixed(0);
        $scope.summValpercentC2Result = $scope.average($scope.summValpercentC2).toFixed(0);
        $scope.summValTjPercentWomenResult = $scope.average($scope.summValTjPercentWomen).toFixed(0);
        $scope.summValUzPercentWomenResult = $scope.average($scope.summValUzPercentWomen).toFixed(0);




        $scope.summValcountGRMC1Result = $scope.average($scope.summValcountGRMC1).toFixed(0);
        $scope.summValcountGRMResult = $scope.average($scope.summValcountGRM).toFixed(0);
        $scope.summValcountGRM_TJResult = $scope.average($scope.summValcountGRM_TJ).toFixed(0);
        $scope.summValcountGRM_UZResult = $scope.average($scope.summValcountGRM_UZ).toFixed(0);




        }, 2000);


    $scope.print = function () {
        $("#printmatrix").css("visibility", "visible");
        $("#printmatrix").print();
        $("#printmatrix").css("visibility", "collapse");
    };






    $scope.excel = function () {




        $scope.data = {...$scope.data, ...$scope.objResult};


        GenerateDocxReport.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(entry) {

            if (entry.code === 0) {

                $window.open('/generatedocx?' + "country=" + $scope.data.country + "&typePeriod=" + $scope.data.typePeriod + "&year=" + $scope.data.year, '_blank');

            } else {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                        .position('bottom left')
                        .hideDelay(6000)
                );

            }
        });


    };


});

