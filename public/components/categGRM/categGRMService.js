/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').factory("GetAllStatus", function($resource) {
    return $resource("/getallstatus");
});

angular.module('app').factory("DelcategGRM", function($resource) {
    return $resource("/delcateggrm");
});

