/**
 * Created by Admin on 29.09.2016.
 */








angular.module('app').factory("GetToken", function($resource) {
  return $resource("/gettokencsrf");
});