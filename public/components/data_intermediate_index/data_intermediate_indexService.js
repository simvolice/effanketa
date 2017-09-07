/**
 * Created by Admin on 29.09.2016.
 */









angular.module('app').factory("GetReportUsersSatisfied", function($resource) {
    return $resource("/getreportuserssatisfied");
});



angular.module('app').factory("GetReportCountProgramm", function($resource) {
    return $resource("/getreportcountprogramm");
});


angular.module('app').factory("GetReportCountRegeonalInvest", function($resource) {
    return $resource("/getreportcountregeonalinvest");
});



angular.module('app').factory("GetReportSumMobileAmount", function($resource) {
    return $resource("/getreportsummobileamount");
});


angular.module('app').factory("GetReportCountPlatform", function($resource) {
    return $resource("/getreportcountplatform");
});


angular.module('app').factory("GetReportCountBenificiarProject", function($resource) {
    return $resource("/getreportcountbenificiarproject");
});


angular.module('app').factory("GetReportSumGAProject", function($resource) {
    return $resource("/getreportsumgaproject");
});


angular.module('app').factory("GetReportCountCompleteGRM", function($resource) {
    return $resource("/getreportcountcompletegrm");
});