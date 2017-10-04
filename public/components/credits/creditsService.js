/**
 * Created by Admin on 29.09.2016.
 */





angular.module('app').factory("GetAllCredits", function($resource) {
    return $resource("/getallcredits");
});


angular.module('app').factory("Addcredit", function($resource) {
  return $resource("/addcredit");
});



angular.module('app').factory("DelCredits", function($resource) {
    return $resource("/delcredits");
});



angular.module('app').factory("UpdCredits", function($resource) {
    return $resource("/updcredits");
});



angular.module('app').factory("GetCreditsFact", function($resource) {
    return $resource("/creditsfact");
});



angular.module('app').factory("SendNewCreditsFact", function($resource) {
    return $resource("/newcreditsfact");
});




