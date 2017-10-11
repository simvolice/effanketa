/**
 * Created by Admin on 29.09.2016.
 */








angular.module('app').factory("GetTypePeriod", function($resource) {
    return $resource("/gettypeperiod");
});


angular.module('app').factory("GetYearName", function($resource) {
    return $resource("/getyearname");
});


angular.module('app').factory("GetGrowPotencial", function($resource) {
    return $resource("/getgrowpotencial");
});


angular.module('app').factory("GetGrowPotencialNewVersion", function($resource) {
    return $resource("/getgrowpotencialnewver");
});



angular.module('app').factory("GetReportCredits", function($resource) {
    return $resource("/getreportcredits");
});


angular.module('app').factory("GetReportGrm", function($resource) {
    return $resource("/getreportgrm");
});


angular.module('app').factory("GetReportFinansialStatus", function($resource) {
    return $resource("/getreportfinansialstatus");
});




angular.module('app').factory("AddNewReport", function($resource) {
    return $resource("/addnewreport");
});


angular.module('app').factory("GetReport", function($resource) {
    return $resource("/getreport");
});


angular.module('app').factory("UpdReport", function($resource) {
    return $resource("/updreport");
});

angular.module('app').factory("DelReport", function($resource) {
    return $resource("/delreport");
});