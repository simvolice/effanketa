/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').controller('WindowcashierCtrl', function ($scope, $cookies, GetAllSliders, DeleteSlider, $http, $mdToast) {



  this.total = 55.25;


  this.data = [{"name":"Wine - Rioja Campo Viejo","count":8,"price":"$69.64","sum":"$7.28"},
    {"name":"V8 - Tropical Blend","count":43,"price":"$52.74","sum":"$788.45"},
    {"name":"Daikon Radish","count":38,"price":"$4.18","sum":"$930.60"},
    {"name":"Gherkin","count":97,"price":"$60.13","sum":"$119.05"},
    {"name":"Pastry - Lemon Danish - Mini","count":56,"price":"$10.04","sum":"$368.88"},
    {"name":"Godiva White Chocolate","count":61,"price":"$26.06","sum":"$894.12"}];









  $scope.$watch(angular.bind(this, function () {
    return this.total;
  }), function (newValue, oldValue) {


    if (newValue.length === 24) {

      $('#totalsum').css({'font-size': '4vw'});


    } else if (newValue.length === 30){

      $('#totalsum').css({'font-size': '3vw'});

    }else if (newValue.length === 41){

      $('#totalsum').css({'font-size': '2vw'});

    } else if (newValue.length === 61){

      $('#totalsum').css({'font-size': '1vw'});

    } else if (newValue.length < 24){

      $('#totalsum').css({'font-size': '5vw'});

    } else if (newValue.length === 120){

      $('#totalsum').text(".Слишком большое число");

    }

  });







});