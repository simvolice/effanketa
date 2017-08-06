/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').factory("GetAllUsers", function($resource) {
    return $resource("/getallusers");
});

angular.module('app').factory("GetAllRoles", function($resource) {
    return $resource("/getroles");
});


angular.module('app').factory("GetAllCoutrys", function($resource) {
    return $resource("/getcountry");
});

angular.module('app').factory("Register", function($resource) {
    return $resource("/register", {tokenCSRF: "@tokenCSRF", sessionToken: "@sessionToken", data: "@data"});
});


angular.module('app').factory("UpdRegister", function($resource) {
    return $resource("/updregister", {tokenCSRF: "@tokenCSRF", sessionToken: "@sessionToken", data: "@data"});
});


angular.module('app').factory("DelUser", function($resource) {
    return $resource("/deleteuser", {tokenCSRF: "@tokenCSRF", sessionToken: "@sessionToken", data: "@data"});
});


angular.module('app').factory("RecoverUser", function($resource) {
    return $resource("/recoverypass", {tokenCSRF: "@tokenCSRF", sessionToken: "@sessionToken", data: "@data"});
});