/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('PublicFormCtrl', function ($window, $timeout, $scope, $mdToast, $mdDialog, GetToken, $location) {

    //Убираем весь UI
    jQuery( "nav" ).remove();
    $timeout(function () {


        $('.drawer').drawer('close');


    }, 150);


    if (localStorage.getItem('tokenCSRF') === null) {

        GetToken.get(function (result) {


            localStorage.setItem("tokenCSRF", result.tokenCSRF);


        });


    }




    $mdDialog.show({
        controller: DialogControllerForNewForm,
        locals:{data: $location.search()},
        templateUrl: 'components/grow_potencial/dialog_template_new_form.html',
        parent: angular.element(document.body),
        //targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true // Only for -xs, -sm breakpoints.
    });




    function DialogControllerForNewForm($scope, data, AddPublicForm, $mdDialog) {


        $scope.data = {

            parentId: data.parentId,
            myDate: data.dateOfEvent,
            nameCountry: data.nameCountry,
            nameEvent: data.nameEvent,
            email: "",
            question1: 'Цели данного мероприятия были четко определены',
            ques1: 5,

            question2: 'Взаимодействие между участниками поощрялось',
            ques2: 5,

            question3: 'Темы имели отношение к тому, чем я занимаюсь',
            ques3: 5,

            question4: 'Содержание было хорошо структурировано и понятно',
            ques4: 5,

            question5: 'Раздаточные материалы были полезны',
            ques5: 5,

            question6: 'Полученная информация/знания и навыки будут полезны мне в работе',
            ques6: 5,


            question7: 'Тренер/модератор хорошо знал тему',
            ques7: 5,


            question8: 'Тренер/модератор был хорошо подготовлен',
            ques8: 5,


            question9: 'Цели мероприятия были достигнуты',
            ques9: 5,

            question10: 'Время выделенное для мероприятия было достаточным',
            ques10: 5,

            question11: 'Помещения для проведения мероприятия и используемая участниками инфраструктура были удобными',
            ques11: 5,

            question12: 'Оцените свою общую удовлетворенность проведенным мероприятием используя 5-бальную шкалу',
            ques12: 5,



            question13: 'Что вам понравилось больше всего?',
            ques13: "",


            question14: 'Что можно было бы улучшить?',
            ques14: "",


            question15: 'Как вы планируете использовать полученные знания/информацию?',
            ques15: "",


            question16: 'В каких темах вы заинтересованы и хотели бы пройти обучение/получать информацию в дальнейшем?',
            ques16: "",



            question17: 'Как вы оцениваете организацию мероприятия?',
            ques17: 5,


            question18: 'Пожалуйста, отметьте, есть ли у Вас замечания или пожелания в целом по организации мероприятия?',
            ques18: "",


            question19: 'Вы представляете',
            ques19: "Государственное учреждение",



            question20: 'Пол',
            ques20: "Мужской",



            question21: 'Возрастная группа',
            ques21: "25-29"











        };


        $scope.save = function () {
            AddPublicForm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), data: $scope.data}, function(result) {


                if (result.code === 0) {




                   $window.location.href = "http://climate.carececo.org";

                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }



            });

        };





    }










});

