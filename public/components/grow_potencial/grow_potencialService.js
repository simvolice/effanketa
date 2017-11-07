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




angular.module('app').factory("AddForm", function($resource) {
    return $resource("/addform");
});


angular.module('app').factory("GetForm", function($resource) {
    return $resource("/getform");
});


angular.module('app').factory("DelForm", function($resource) {
    return $resource("/delform");
});

angular.module('app').factory("UpdForm", function($resource) {
    return $resource("/updform");
});


angular.module('app').factory("GetOneForm", function($resource) {
    return $resource("/getoneform");
});


angular.module('app').factory("SendFormForEmail", function($resource) {
    return $resource("/sendformforemail");
});



angular.module('app').factory("GetAllEventStatuses", function($resource) {
    return $resource("/getalleventstatuses");
});


