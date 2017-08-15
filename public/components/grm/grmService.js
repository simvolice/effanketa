/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("AddGrm", function($resource) {
  return $resource("/addgrm", {tokenCSRF: "@tokenCSRF", login: "@login", pass: "@pass"});
});


angular.module('app').factory("GetAllStatus", function($resource) {
  return $resource("/getallstatus");
});


angular.module('app').factory("GetAllGrm", function($resource) {
    return $resource("/getallgrm");
});