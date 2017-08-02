/**
 * Created by Admin on 29.09.2016.
 */



app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

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

      .state('main', {
          url: '/main',
          templateUrl: 'components/main/mainView.html',


      })

      .state('adminedit', {
          url: '/adminedit',
          templateUrl: 'components/adminedit/adminView.html',


      })


});