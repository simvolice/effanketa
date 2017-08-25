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
          templateUrl: 'components/main/mainView.html'



      })

      .state('adminedit', {
          url: '/adminedit',
          templateUrl: 'components/adminedit/adminView.html',


      })


      .state('grow_potencial', {
          url: '/grow_potencial',
          templateUrl: 'components/grow_potencial/grow_potencialView.html',


      })


      .state('publicform', {
          url: '/publicform',
          templateUrl: 'components/publicform/publicformView.html',


      })


      .state('credits', {
          url: '/credits',
          templateUrl: 'components/credits/creditsView.html',


      })



      .state('grm', {
          url: '/grm',
          templateUrl: 'components/grm/grmView.html',


      })


      .state('finansial_status', {
          url: '/finansial_status',
          templateUrl: 'components/finansial_status/finansial_statusView.html',


      })



      .state('main_score_program', {
          url: '/main_score_program',
          templateUrl: 'components/main_score_program/mainScoreProgramView.html',


      })


      .state('strategic_communications', {
          url: '/strategic_communications',
          templateUrl: 'components/strategic_communications/strategic_communicationsView.html',


      })




});