/**
 * Created by Admin on 29.09.2016.
 */








angular.module('app').factory("GetReportForEvent", function($resource) {
    return $resource("/getreportforevent");
});


