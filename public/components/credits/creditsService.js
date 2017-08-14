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



angular.module('app').factory("GetSourceInfo", function($resource) {
    return $resource("/getsourceinfo");
});




angular.module('app').factory("Addtable5", function($resource) {
    return $resource("/addtable5");
});


angular.module('app').factory("DelTable5", function($resource) {
    return $resource("/deltable5");
});


angular.module('app').factory("Getalltable5", function($resource) {
    return $resource("/getalltable5");
});


angular.module('app').factory("UpdTable5", function($resource) {
    return $resource("/updtable5");
});