/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("GetReportMainScore", function($resource) {
  return $resource("/getreportmainscore");
});


