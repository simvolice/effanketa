/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').controller('AdminCtrl', function ($scope, $rootScope, $http, $mdToast, GetAllUsers, GetAllRoles, GetAllCoutrys, Register, UpdRegister, DelUser, RecoverUser, $mdDialog) {




    $rootScope.data = [];



    GetAllUsers.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



        if (result.code === 0) {



            $rootScope.data = result.resultFromDb;



            for (let item of $rootScope.data) {

                item.nameDate = new Date(item.createAt).toLocaleDateString();

            }
            for (let item of $rootScope.data) {


                for (const allCountrysItem of item.allCountrys) {


                    if (allCountrysItem._id === item.country) {

                        item.nameCountry = allCountrysItem.name;

                    }
                }


            }



        } else {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('У Вас не достаточно прав, для просмотра данных.')
                    .position('bottom left')
                    .hideDelay(6000)
            );


        }




    });





    $scope.saveBtn = function (data, ev) {



        $mdDialog.show({
            controller: DialogControllerUpd,
            locals:{data: data},
            templateUrl: 'components/adminedit/dialog_template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });





    };





$scope.delete = function (id, index) {




                DelUser.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



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






    $scope.recoverpass = function (id) {



            RecoverUser.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



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



    };



    $scope.addBtn = function (ev) {



        $mdDialog.show({
            controller: DialogController,
            locals:{data: null},
            templateUrl: 'components/adminedit/dialog_template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    };





function DialogController($scope, GetAllCoutrys, GetAllRoles, $http, $mdToast) {



    $scope.data = {



    };





    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;


    });

    GetAllRoles.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {



        $scope.data.allRoles = entry.resultFromDb;
        $scope.data.role = entry.resultFromDb[0]._id;




    });





    $scope.closeDialog = function () {


        $mdDialog.hide();



    };



    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };




    $scope.uploadFiles = function () {

        formdata.append('fio', $scope.data.fio);
        formdata.append('email', $scope.data.email);
        formdata.append('country', $scope.data.country);
        formdata.append('role', $scope.data.role);


        var request = {
            method: 'POST',
            url: '/register',
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

                $mdDialog.hide();




                GetAllUsers.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



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



                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Вы успешно загрузили объект.')
                        .position('left bottom')
                        .hideDelay(3000)
                );





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






}



function DialogControllerUpd(data, $scope, GetAllCoutrys, GetAllRoles, $http, $mdToast) {



        $scope.data = {
            _id: data._id,
            country: data.country,
            allCountrys: data.allCountrys,
            role: data.role,
            allRoles: data.allRoles,
            fio: data.fio,
            email: data.email,
            urlImg: data.urlImg


        };










        $scope.closeDialog = function () {


            $mdDialog.hide();



        };



        var formdata = new FormData();
        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
        };




        $scope.uploadFiles = function () {

            formdata.append('fio', $scope.data.fio);
            formdata.append('email', $scope.data.email);
            formdata.append('country', $scope.data.country);
            formdata.append('role', $scope.data.role);
            formdata.append('_id', $scope.data._id);
            formdata.append('urlImg', $scope.data.urlImg);


            var request = {
                method: 'POST',
                url: '/updregister',
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




                    $mdDialog.hide();




                    GetAllUsers.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



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



                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Вы успешно загрузили объект.')
                            .position('left bottom')
                            .hideDelay(3000)
                    );





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






    }



    $scope.exclude = ['allCountrys', "allRoles", "country", "createAt", "role", "updateAt", "urlImg", "_id", "id"];


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