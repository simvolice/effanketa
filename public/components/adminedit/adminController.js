/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').controller('AdminCtrl', function ($scope, $cookies, $http, $mdToast) {






  this.saveBtn = function (data) {
    console.log(data);
  };

  this.delete = function (id) {
    console.log(id);
  };




  this.addBtn = function () {
    this.data.push({"_id":289,"title": null,"createAt": new Date()});
  };


  this.data = [


      {"_id":1,"fio":"Flossie","role": ["Admin1", "Admin2"], "selectedRole": "Admin1",  "country": ["Узбекистан", "Таджикистан"], "selectedCountry": "Таджикистан", "email": "admin@admin.kz", "createAt":"9/9/2016"},
      {"_id":2,"fio":"sdsd","role": ["Admin1", "Admin2"], "selectedRole": "Admin2",  "country": ["Узбекистан", "Таджикистан"], "selectedCountry": "Узбекистан", "email": "admin@admin.kz", "createAt":"9/9/2016"},
      {"_id":3,"fio":"fdfsdfsdfggg","role": ["Admin1", "Admin2"], "selectedRole": "Admin1",  "country": ["Узбекистан", "Таджикистан"], "selectedCountry": "Таджикистан", "email": "admin@admin.kz", "createAt":"9/9/2016"},

    ];











});