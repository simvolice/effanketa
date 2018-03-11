/**
 * Created by Admin on 29.09.2016.
 */










angular.module('app').factory("DelStrategic", function($resource) {
    return $resource("/delstrategic");
});



angular.module('app').factory("GetStrategic", function($resource) {
    return $resource("/getstrategic");
});