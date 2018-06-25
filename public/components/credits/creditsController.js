/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('CreditsCtrl', function ($element, $scope, Addcredit, GetAllCoutrys, $mdToast, DelCredits, GetAllCredits, UpdCredits, GetCreditsFact, SendNewCreditsFact, $window, $translate) {


$scope.data = [];

$scope.dataCtrl = {};

    $scope.dataCtrl.newFact = "";
    $scope.clearSearchTerm = function() {
        $scope.dataCtrl.newFact = '';
    };



    $scope.sumMaleFemale = function (data, event) {


        data.DirectBeneficiariesAll = Number.parseInt(data.DirectBeneficiariesMale) + Number.parseInt(data.DirectBeneficiariesFemale);
        data.NonDirectBeneficiariesMemberFamilyAll = Number.parseInt(data.NonDirectBeneficiariesMemberFamilyFemale) + Number.parseInt(data.NonDirectBeneficiariesMemberFamilyMale);
        data.NonDirectBeneficiariesHiredAll = Number.parseInt(data.NonDirectBeneficiariesHiredFemale) + Number.parseInt(data.NonDirectBeneficiariesHiredMale);



    };








$scope.createNewFact = function (event) {

    if (event.keyCode === 13) {



        SendNewCreditsFact.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.dataCtrl.newFact}, function (result) {



            if (result.code === 0) {


                for (let item of $scope.data) {
                    item.allCreditsFact = result.resultFromDb;
                }



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



    GetAllCredits.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



        if (result.code === 0) {



            $scope.data = result.resultFromDb;

            for (let item of $scope.data) {

                item.createAt = new Date(item.createAt);

            }

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




        };

        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allCountrys = entry.resultFromDb;
            tempObj.country = entry.resultFromDb[0]._id;


        });


        GetCreditsFact.get(function (result) {
            tempObj.allCreditsFact = result.resultFromDb;
            tempObj.categcredits = result.resultFromDb[0]._id;
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




    $scope.excel = function () {



        $scope.tableID = "credits";
        $scope.titleSheet = "Кредиты";

        $window.open('/generateexcel.xlsx?data=' + $scope.tableID + "&titleSheet=" + $scope.titleSheet + "&lang=" + $translate.use(), '_blank');




    };










});

