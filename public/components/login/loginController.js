/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('LoginCtrl', function ($scope, $cookies, GetAllSliders, DeleteSlider, $http) {

  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    autoHeight: true,
    simulateTouch: false

  });







  this.resetPassClk = function () {

    mySwiper.slideTo(2);

  };

  this.resetPassClkOK = function () {

    mySwiper.slideTo(4);


    TweenLite.set(".st0", {visibility:"visible"});
    var tl = new TimelineLite();


    tl.from(".st0", 1, {drawSVG:0, ease:Expo.easeInOut});






  };


  this.registerClk = function () {
    mySwiper.slideTo(3);

    TweenLite.set(".st0", {visibility:"visible"});
    var tl = new TimelineLite();


    tl.from(".st0", 1, {drawSVG:0, ease:Expo.easeInOut});


  };


  this.toRegisterClk = function () {
    mySwiper.slideTo(1);
  };



});

