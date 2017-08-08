/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('Grow_potencialCtrl', function ($scope, $cookies, GetToken, SendAuth, $mdToast, $state, $rootScope, $timeout, $mdDialog) {





    $scope.data = [];
    $scope.arrForInsert = [];

    $scope.data = [{"icon": "add", "id":1,"name":"Gisella","place":"Egypt","type":"instapayment","dateOfEvent":"6/15/2017"},
        {"icon": "add", "id":2,"name":"Leesa","place":"Indonesia","type":"jcb","dateOfEvent":"6/11/2017"},
        {"icon": "add", "id":3,"name":"Ruggiero","place":"Sweden","type":"jcb","dateOfEvent":"7/9/2017"},
        {"icon": "add", "id":4,"name":"Penny","place":"Mongolia","type":"china-unionpay","dateOfEvent":"9/12/2016"},
        {"icon": "add", "id":5,"name":"Torry","place":"Ireland","type":"diners-club-carte-blanche","dateOfEvent":"10/16/2016"},
        {"icon": "add", "id":6,"name":"Gaylene","place":"Philippines","type":"bankcard","dateOfEvent":"11/22/2016"},
        {"icon": "add", "id":7,"name":"Ilyse","place":"Peru","type":"laser","dateOfEvent":"1/31/2017"},
        {"icon": "add", "id":8,"name":"Elsinore","place":"Russia","type":"instapayment","dateOfEvent":"2/19/2017"},
        {"icon": "add", "id":9,"name":"Olga","place":"Cuba","type":"bankcard","dateOfEvent":"9/29/2016"},
        {"icon": "add", "id":10,"name":"Kalinda","place":"China","type":"mastercard","dateOfEvent":"3/28/2017"}];

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

function DialogController($scope, data) {

       $scope.data = data;







    $scope.closeDialog = function () {



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

