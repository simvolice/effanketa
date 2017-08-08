/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('Grow_potencialCtrl', function ($scope, $cookies, DelEvent, GetEvent, $mdToast, $state, $rootScope, $timeout, $mdDialog) {





    $rootScope.data = [];
    $scope.arrForInsert = [];

    GetEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


        $rootScope.data = result.resultFromDb;


    });

    $scope.arrForInsert = [ {"icon": "subdirectory_arrow_right" ,"name":"Test1","place":"Egypt","type":"instapayment","dateOfEvent":"6/15/2017", "childId": 1}, {"icon": "subdirectory_arrow_right" ,"name":"Test2","place":"Egypt","type":"instapayment","dateOfEvent":"6/15/2017", "childId": 1}, {"icon": "subdirectory_arrow_right" ,"name":"Test3","place":"Egypt","type":"instapayment","dateOfEvent":"6/15/2017", "childId": 1}, {"icon": "subdirectory_arrow_right" ,"name":"Test4","place":"Egypt","type":"instapayment","dateOfEvent":"6/15/2017", "childId": 1}];

    $scope.plusRow = function (index, event, id) {





        if ($(event.currentTarget).text() === "add") {

            $scope.data[index].icon = "remove";

            let newIndex = index;
            for (let value of $scope.arrForInsert) {
                newIndex++;

                $scope.data.splice(newIndex, 0, value);
            }




        }else if ($(event.currentTarget).text() === "remove"){

            $scope.data[index].icon = "add";


            $scope.data = $scope.data.filter(function (value, index, array) {
                return (value.childId !== id);
            });








        }









    };

    $scope.delete = function (id, index) {

        DelEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function (result) {



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





        $scope.showModalWnd = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                locals:{data: "testDataFromParentController"},
                templateUrl: 'components/grow_potencial/dialog_template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });
        };

function DialogController($scope, AddEvent, GetAllCoutrys, $mdToast) {



    $scope.data = {

        allCountrys: [],
        country: "",
        myDate: new Date(),

        nameEvent: "",
        typeEvent: "",
        subTypeEvent: "",
        countPeopleEventCommon: 0,
        countWomanEventCommon: 0,

        countFacilatatorEventCommon: 0,
        countFacilatatorWomanEventCommon: 0,

        countSpeakerEventCommon: 0,
        countSpeakerWomanEventCommon: 0








    };
    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;

    });





    $scope.addEvent = function () {


        AddEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(result) {


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








    $scope.closeDialog = function () {

        GetEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


            $rootScope.data = result.resultFromDb;


        });


        $mdDialog.hide();




    };





    }





$scope.addForm = function (id, index, ev) {

    $mdDialog.show({
        controller: DialogControllerForNewForm,
        locals:{data: "testDataFromParentController"},
        templateUrl: 'components/grow_potencial/dialog_template_new_form.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true // Only for -xs, -sm breakpoints.
    });


};



function DialogControllerForNewForm($scope, data) {
    $scope.dateOfEvent = "08.08.2016";
    $scope.placeOfEvent = "Узбекистан";
    $scope.nameOfEvent = "Семинар тестовый";







    $scope.closeDialog = function () {



        $mdDialog.hide();







    };

}




});

