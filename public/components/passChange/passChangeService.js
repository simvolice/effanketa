/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("SendPassChange", function($resource) {
  return $resource("/sendpasschange");
});


