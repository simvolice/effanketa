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

      .state('passchange', {
          url: '/passchange',
          templateUrl: 'components/passChange/passChangeView.html',


      })
      .state('main', {
          url: '/main',
          templateUrl: 'components/main/mainView.html',


      })




      .state('adminedit', {
          url: '/adminedit',
          templateUrl: 'components/adminedit/adminView.html',


      })


      .state('creditfact', {
          url: '/creditfact',
          templateUrl: 'components/creditFact/creditFactView.html',


      })

      .state('categgrm', {
          url: '/categgrm',
          templateUrl: 'components/categGRM/categGRMView.html',


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

      .state('build_report', {
          url: '/build_report',
          templateUrl: 'components/build_report/build_reportView.html',


      })



      .state('report_by_criteriy', {
          url: '/report_by_criteriy',
          templateUrl: 'components/report_by_criteriy/report_by_criteriyView.html',


      })



      .state('data_intermediate_index', {
          url: '/data_intermediate_index',
          templateUrl: 'components/data_intermediate_index/data_intermediate_indexView.html',


      })

});