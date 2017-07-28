/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').controller('ReportsCtrl', function ($scope, $cookies, GetAllSliders, DeleteSlider, $http, $mdToast) {








  var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['Сумма реализованных консерв', 20, 10, 15, 80, 150, 250, 100 ],
        ['Сумма реализованных хлебо-булочных изделей', 100, 200, 300, 800, 150, 1150, 2500],

        ['Общая сумма продаж', 120, 210, 315, 880, 300, 1400, 2600 ]

      ],
      type: 'bar'
    },
    bar: {
      width: {
        ratio: 0.5 // this makes bar width 50% of length between ticks
      }
      // or
      //width: 100 // this makes bar width 100px
    },


    axis: {

        x: {
          type: 'category',
          categories: ['1 День', '2 День', '3 День', '4 День', '5 День', '6 День', '7 День']
        },

      y: {
        label: {
          text: 'Суммы указаны в тенге',
          position: 'outer-middle'
        }
      }
    },

    grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    },


    zoom: {
      enabled: true
    }
  });




  var chartPie = c3.generate({
    bindto: '#chartpie',
    data: {
      columns: [
        ['Сумма реализованных консерв', 20, 10, 15, 80, 150, 250, 100 ],
        ['Сумма реализованных хлебо-булочных изделей', 100, 200, 300, 800, 150, 1150, 2500],

        ['Общая сумма продаж', 120, 210, 315, 880, 300, 1400, 2600 ]

      ],
      type: 'pie'
    }
});


  var chartArea = c3.generate({
    bindto: '#chartarea',
    data: {
      columns: [
        ['Сумма реализованных консерв', 20, 10, 15, 80, 150, 250, 100 ],
        ['Сумма реализованных хлебо-булочных изделей', 100, 200, 300, 800, 150, 1150, 2500],

        ['Общая сумма продаж', 120, 210, 315, 880, 300, 1400, 2600 ]

      ],
      types: {
        'Сумма реализованных консерв': 'area',
        'Сумма реализованных хлебо-булочных изделей': 'area',
        'Общая сумма продаж': 'area'
      }
    },

    grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    },


    zoom: {
      enabled: true
    }
  });





  this.myDate = new Date();



});