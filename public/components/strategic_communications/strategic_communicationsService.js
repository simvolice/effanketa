/**
 * Created by Admin on 29.09.2016.
 */









angular.module('app').factory("UpdStrategic", function($resource) {
    return $resource("/updstrategic");
});


angular.module('app').factory("AddStrategic", function($resource) {
    return $resource("/addstrategic");
});


angular.module('app').factory("DelStrategic", function($resource) {
    return $resource("/delstrategic");
});



angular.module('app').factory("GetStrategic", function($resource) {
    return $resource("/getstrategic");
});