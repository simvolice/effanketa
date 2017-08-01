/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("SendAuth", function($resource) {
  return $resource("/auth", {tokenCSRF: "@tokenCSRF", login: "@login", pass: "@pass"});
});


angular.module('app').factory("GetToken", function($resource) {
  return $resource("/gettokencsrf");
});