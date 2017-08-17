/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("AddFinansialStatus", function($resource) {
  return $resource("/addfinansialstatus");
});


angular.module('app').factory("GetFinansialStatus", function($resource) {
  return $resource("/getfinansialstatus");
});


angular.module('app').factory("UpdFinansialStatus", function($resource) {
    return $resource("/updfinansialstatus");
});


angular.module('app').factory("DelFinansialStatus", function($resource) {
    return $resource("/delfinansialstatus");
});