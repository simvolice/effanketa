/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("GetPublicEvent", function($resource) {
    return $resource("/getpublicevent");
});




angular.module('app').factory("AddPublicForm", function($resource) {
    return $resource("/addpublicform");
});