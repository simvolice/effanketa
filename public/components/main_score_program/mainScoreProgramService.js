/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("AddPlatform", function($resource) {
  return $resource("/addplatform");
});


angular.module('app').factory("GetPlatform", function($resource) {
  return $resource("/getplatform");
});


angular.module('app').factory("UpdPlatform", function($resource) {
    return $resource("/updplatform");
});


angular.module('app').factory("DeletePlatform", function($resource) {
    return $resource("/deleteplatform");
});










////////////////Projects///////////////


angular.module('app').factory("AddProject", function($resource) {
    return $resource("/addproject");
});


angular.module('app').factory("GetProject", function($resource) {
    return $resource("/getproject");
});


angular.module('app').factory("UpdProject", function($resource) {
    return $resource("/updproject");
});


angular.module('app').factory("DeleteProject", function($resource) {
    return $resource("/deleteproject");
});




////////////////RegionalInvest///////////////


angular.module('app').factory("AddRegionalInvest", function($resource) {
    return $resource("/addregionalinvest");
});


angular.module('app').factory("GetRegionalInvest", function($resource) {
    return $resource("/getregionalinvest");
});


angular.module('app').factory("UpdRegionalInvest", function($resource) {
    return $resource("/updregionalinvest");
});


angular.module('app').factory("DeleteRegionalInvest", function($resource) {
    return $resource("/deleteregionalinvest");
});



////////////////MobileResurs///////////////


angular.module('app').factory("AddMobileResurs", function($resource) {
    return $resource("/addmobileresurs");
});


angular.module('app').factory("GetMobileResurs", function($resource) {
    return $resource("/getmobileresurs");
});


angular.module('app').factory("UpdMobileResurs", function($resource) {
    return $resource("/updmobileresurs");
});


angular.module('app').factory("DeleteMobileResurs", function($resource) {
    return $resource("/deletemobileresurs");
});




