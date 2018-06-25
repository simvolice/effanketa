/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('FinansialStatusCtrl', function ($translate, $scope, AddFinansialStatus, GetAllCoutrys, $mdToast, GetFinansialStatus, UpdFinansialStatus, DelFinansialStatus, $window, GetNameQurter) {


    $scope.data = [];


    GetFinansialStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



        if (result.code === 0) {



            $scope.data = result.resultFromDb;


            for (let item of $scope.data) {
                item.nameQuarter = new Date(item.nameQuarter);
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
            BudgetBisbursementPlan: "",
            BudgetBisbursementFact: "",
            BudgetBisbursementComment: "",
            ServicesPlan: "",
            ServicesFact: "",
            ServicesComment: "",
            CreditLinePlan: "",
            CreditLineFact: "",
            CreditLineComment: "",
            OperatingExpensesPlan: "",
            OperatingExpensesFact: "",
            OperatingExpensesComment: "",
            country: "",
            nameQuarter: new Date()



        };

        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allCountrys = entry.resultFromDb;
            tempObj.country = entry.resultFromDb[0]._id;


        });





        $scope.data.push(tempObj);


    };

    $scope.saveBtn = function (data) {



        if (data.id === 0) {



            AddFinansialStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



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



            UpdFinansialStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



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

            DelFinansialStatus.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



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



        $scope.tableID = "finansial_status";
        $scope.titleSheet = "Финансовый статус";

        $window.open('/generateexcel.xlsx?data=' + $scope.tableID + "&titleSheet=" + $scope.titleSheet + "&lang=" + $translate.use(), '_blank');




    };






});

