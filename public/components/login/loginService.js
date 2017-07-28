/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("DeleteSlider", function($resource) {
  return $resource("/deleteslider");
});


angular.module('app').factory("GetAllSliders", function($resource) {
  return $resource("/sliders");
});