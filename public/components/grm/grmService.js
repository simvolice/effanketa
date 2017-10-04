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



angular.module('app').factory("ChangeStatus", function($resource) {
    return $resource("/changestatus");
});



angular.module('app').factory("DeleteGrm", function($resource) {
    return $resource("/deletegrm");
});


angular.module('app').factory("UpdateGrm", function($resource) {
    return $resource("/updategrm");
});



angular.module('app').factory("GetAllCanalRequest", function($resource) {
    return $resource("/getallcanalrequest");
});



angular.module('app').factory("InsertNewCanalRequest", function($resource) {
    return $resource("/insertnewcanalrequest");
});