/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('CreditsCtrl', function ($scope, $cookies, Addcredit, GetAllCoutrys, $mdToast, DelCredits, GetAllCredits, UpdCredits, GetSourceInfo, Addtable5, DelTable5, Getalltable5, UpdTable5) {


$scope.data = [];





    GetAllCredits.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



        if (result.code === 0) {



            $scope.data = result.resultFromDb;


        } else {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                    .position('bottom left')
                    .hideDelay(6000)
            );


        }




    });


    $scope.addBtn = function () {

        let tempObj = {



            id: 0,
            country: "",



            categcredits: "",
            countsubproject: "",
            commonAmountInDollors: "",
            commonAmountInNatCurrency: "",
            DirectBeneficiariesAll: "",
            DirectBeneficiariesMale: "",
            DirectBeneficiariesFemale: "",
            NonDirectBeneficiariesMemberFamilyAll: "",
            NonDirectBeneficiariesMemberFamilyMale: "",
            NonDirectBeneficiariesMemberFamilyFemale: "",
            NonDirectBeneficiariesHiredAll: "",
            NonDirectBeneficiariesHiredMale: "",
            NonDirectBeneficiariesHiredFemale: "",
            CreatePowerPlan: "",
            CreatePowerFact: "",



        };

        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allCountrys = entry.resultFromDb;
            tempObj.country = entry.resultFromDb[0]._id;


        });








        $scope.data.push(tempObj);


    };




    $scope.saveBtn = function (data) {



        if (data.id === 0) {



            Addcredit.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



                if (result.code === 0) {


                    $scope.data[$scope.data.length - 1]._id = result.resultFromDb._id;
                    $scope.data[$scope.data.length - 1].id = result.resultFromDb.id;

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );


                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }




            });


        } else {



            UpdCredits.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



                if (result.code === 0) {



                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );


                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }




            });




        }








    };



    $scope.delete = function (id, index) {



        if (id === undefined){

            $scope.data.pop();


        }else {

            DelCredits.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



                if (result.code === 0) {



                    $scope.data.splice(index, 1);

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );


                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }




            });


        }
    };







/////////////////////////Table5///////////////////////////



    $scope.dataTable5 = [];



    Getalltable5.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



        if (result.code === 0) {



            $scope.dataTable5 = result.resultFromDb;


        } else {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                    .position('bottom left')
                    .hideDelay(6000)
            );


        }




    });





    $scope.addBtnTable5 = function () {

        let tempObj = {



            id: 0,
            country: "",



            IriggSquareGA: "",
            IriggSquareGASource: "",
            IriggYieldIncrease: "",
            IriggYieldIncreaseSource: "",
            IriggSalDecrease: "",
            IriggSalDecreaseSource: "",
            WaterSquareGA: "",
            WaterSquareGASource: "",
            WaterYieldIncrease: "",
            WaterYieldIncreaseSource: "",
            WaterWaterSaver: "",
            WaterWaterSaverSource: "",
            GardeningSquareGA: "",
            GardeningSquareGASource: "",
            GardeningYieldIncrease: "",
            GardeningYieldIncreaseSource: "",
            GardeningIncreasingSustainability: "",
            GardeningIncreasingSustainabilitySource: "",
            GardeningDecreaseEarth: "",
            GardeningDecreaseEarthSource: "",
            SeedSquareGA: "",
            SeedSquareGASource: "",
            SeedYieldIncrease: "",
            SeedYieldIncreaseSource: "",
            SeedIncreasingSustainability: "",
            SeedIncreasingSustainabilitySource: "",
            AnimalIncreaseProductivity: "",
            AnimalIncreaseProductivitySource: "",
            AnimalUsePasture: "",
            AnimalUsePastureSource: "",


        };

        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allCountrys = entry.resultFromDb;
            tempObj.country = entry.resultFromDb[0]._id;


        });


        GetSourceInfo.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allsourceInfo = entry.resultFromDb;


            tempObj.IriggSquareGASource  = entry.resultFromDb[0]._id;
            tempObj.IriggYieldIncreaseSource  = entry.resultFromDb[0]._id;
            tempObj.IriggSalDecreaseSource  = entry.resultFromDb[0]._id;
            tempObj.WaterSquareGASource  = entry.resultFromDb[0]._id;
            tempObj.WaterYieldIncreaseSource  = entry.resultFromDb[0]._id;
            tempObj.WaterWaterSaverSource  = entry.resultFromDb[0]._id;
            tempObj.GardeningSquareGASource  = entry.resultFromDb[0]._id;
            tempObj.GardeningYieldIncreaseSource  = entry.resultFromDb[0]._id;
            tempObj.GardeningIncreasingSustainabilitySource  = entry.resultFromDb[0]._id;
            tempObj.GardeningDecreaseEarthSource  = entry.resultFromDb[0]._id;
            tempObj.SeedSquareGASource  = entry.resultFromDb[0]._id;
            tempObj.SeedYieldIncreaseSource  = entry.resultFromDb[0]._id;
            tempObj.SeedIncreasingSustainabilitySource  = entry.resultFromDb[0]._id;
            tempObj.AnimalIncreaseProductivitySource  = entry.resultFromDb[0]._id;
            tempObj.AnimalUsePastureSource  = entry.resultFromDb[0]._id;


        });








        $scope.dataTable5.push(tempObj);


    };



    $scope.saveBtnTable5 = function (data) {



        if (data.id === 0) {



            Addtable5.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



                if (result.code === 0) {


                    Getalltable5.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {


                            $scope.dataTable5 = result.resultFromDb;


                    });


                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );


                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }




            });


        } else {



            UpdTable5.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



                if (result.code === 0) {



                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );


                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }




            });




        }








    };




    $scope.deleteTable5 = function (id, index) {



        if (id === undefined){

            $scope.dataTable5.pop();


        }else {

            DelTable5.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



                if (result.code === 0) {



                    $scope.dataTable5.splice(index, 1);

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );


                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }




            });


        }
    };



/////////////////////////END Table5///////////////////////////

});

