/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('StrategicCommunicationsCtrl', function ($translate, $window, $scope, $rootScope, $mdDialog, GetAllCoutrys, $mdToast, DelStrategic, GetStrategic, GetYearName) {


    $rootScope.data = [];








        GetStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



            if (result.code === 0) {



                $rootScope.data = result.resultFromDb;



            } else {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                        .position('bottom left')
                        .hideDelay(6000)
                );


            }




        });









    $scope.addBtn = function (ev) {

        $mdDialog.show({
            controller: DialogController,
            locals:{data: $scope.data},
            templateUrl: 'components/strategic_communications/dialog_template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    };



    $scope.updBtn = function (data, ev) {
        $mdDialog.show({
            controller: DialogControllerUpdate,
            locals:{data: data},
            templateUrl: 'components/strategic_communications/dialog_template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    };


function DialogControllerUpdate($scope, data, GetAllCoutrys, GetYearName, $http) {



        $scope.data = {


            _id: data._id,

            country: data.country,
            yearname: data.year

        };


        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            $scope.data.allCountrys = entry.resultFromDb;

        });



    GetYearName.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {




        $scope.data.allyearname = entry.resultFromDb;


    });



    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        formdata.append('country', $scope.data.country);
        formdata.append('yearName', $scope.data.yearname);
        formdata.append('urlExcel', data.urlExcel);
        formdata.append('_id',  data._id);


        var request = {
            method: 'POST',
            url: '/updstrategic',
            data: formdata,
            headers: {
                'Content-Type': undefined,
                'tokenCSRF' : localStorage.getItem('tokenCSRF'),
                'sessionToken' : localStorage.getItem('sessionToken')
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;



                if (response.data.code === 0) {






                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );



                    GetStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {


                            $rootScope.data = result.resultFromDb;


                    });












                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }








            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }







    $scope.closeDialog = function () {
            $mdDialog.hide();
        }







    }

function DialogController($http, $scope, data, GetAllCoutrys, GetYearName) {



    $scope.data = {};


    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;

    });



    GetYearName.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {



        $scope.data.yearname = entry.resultFromDb[entry.resultFromDb.length - 1]._id;
        $scope.data.allyearname = entry.resultFromDb;


    });



    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {


        formdata.append('country', $scope.data.country);
        formdata.append('yearName', $scope.data.yearname);


        var request = {
            method: 'POST',
            url: '/addstrategic',
            data: formdata,
            headers: {
                'Content-Type': undefined,
                'tokenCSRF' : localStorage.getItem('tokenCSRF'),
                'sessionToken' : localStorage.getItem('sessionToken')
            }
        };

        // SEND THE FILES.
        $http(request)
            .then(function successCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;



                if (response.data.code === 0) {





                    $rootScope.data.push(response.data.resultFromDb);


                    $mdDialog.hide();
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








            }, function errorCallback(response) {
                formdata = new FormData();
                document.getElementById("file").value = null;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                        .position('left bottom')
                        .hideDelay(3000)
                );
            });
    }














    $scope.closeDialog = function () {
        $mdDialog.hide();
    }







}







$scope.delete = function (id, index) {
    DelStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function(result) {


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

};

$scope.excel = function () {



        $scope.tableID = "strategic";
        $scope.titleSheet = "Стратегия по коммуникации";

        $window.open('/generateexcel.xlsx?data=' + $scope.tableID + "&titleSheet=" + $scope.titleSheet + "&lang=" + $translate.use() + "&sessionToken=" + localStorage.getItem('sessionToken'), '_blank');




};


    $scope.exclude = ['allCountrys', "_id", "createAt"];


}).filter('excludeFilter', function(){
    return function(data, search, exclude){
        if(!search)
            return data;
        return data.filter(function(x){

            for(var prop in x)
                if(exclude.indexOf(prop) == -1){
                    var value = x[prop];
                    if(value.indexOf && value.indexOf(search) != -1)
                        return true;
                    if(!value.indexOf && value == search)
                        return true;
                }
            return false;
        });
    }
});

