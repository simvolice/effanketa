/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("GetAllCoutrys", function($resource) {
    return $resource("/getcountry");
});


angular.module('app').factory("AddEvent", function($resource) {
    return $resource("/addevent");
});


angular.module('app').factory("DelEvent", function($resource) {
    return $resource("/delevent");
});


angular.module('app').factory("GetEvent", function($resource) {
    return $resource("/getevent");
});

angular.module('app').factory("UpdEvent", function($resource) {
    return $resource("/updevent");
});