/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').factory("GetCreditsFact", function($resource) {
    return $resource("/creditsfact");
});


angular.module('app').factory("DelCreditsFact", function($resource) {
    return $resource("/delcreditsfact");
});

