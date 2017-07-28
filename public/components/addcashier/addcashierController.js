/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').controller('AddCashierCtrl', function ($scope, $cookies, GetAllSliders, DeleteSlider, $http, $mdToast) {







  this.add = function () {


    $mdToast.show(
        $mdToast.simple()
            .textContent('Вы успешно добавили кассира')
            .position('bottom left')
            .hideDelay(3000)
    );



  };










});