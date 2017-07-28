/**
 * Created by Admin on 29.09.2016.
 */



app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider


      .state('index', {
        url: '/',
        view: {

          templateUrl: 'index.html'

        }

      })

      .state('login', {
        url: '/login',
        templateUrl: 'components/login/loginView.html',


      })

      .state('addcashier', {
        url: '/addcashier',
        templateUrl: 'components/addcashier/addcashierView.html'
      })


      .state('catcateg', {
        url: '/catcateg',
        templateUrl: 'components/catalogcateg/catCategView.html'
      })


      .state('subcatcateg', {
        url: '/subcatcateg',
        templateUrl: 'components/subcatalogcateg/subcatCategView.html'
      })


      .state('units', {
        url: '/units',
        templateUrl: 'components/units/unitsView.html'
      })



      .state('goodscatalog', {
        url: '/goodscatalog',
        templateUrl: 'components/goodscatalog/goodsView.html'
      })


      .state('reports', {
        url: '/reports',
        templateUrl: 'components/reports/reportsView.html'
      })

      .state('windowcashier', {
        url: '/windowcashier',
        templateUrl: 'components/windowcashier/windowcashierView.html'
      })

      .state('goodsgo', {
        url: '/goodsgo',
        templateUrl: 'components/goodsgo/goodsgoView.html'
      })

});