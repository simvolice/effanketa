/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('Grow_potencialCtrl', function ($scope, DelEvent, GetEvent, $mdToast, $state, $rootScope, $timeout, $mdDialog, GetForm, DelForm, GetMainPage, $sce, $window) {

    GetMainPage.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


        if (result.code === 0) {


            $rootScope.myHTML = result.resultFromDb;


        } else {

            localStorage.removeItem('sessionToken');
            localStorage.removeItem('fio');

            $rootScope.err = "Вы не авторизованы, для повторной авторизации, нажмите на эту ";


        }



    });


    $rootScope.deliberatelyTrustDangerousSnippet = function() {
        return $sce.trustAsHtml($rootScope.myHTML);
    };






    $rootScope.data = [];
    $scope.arrForInsert = [];

    GetEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


        $rootScope.data = result.resultFromDb;


    });


    $scope.sendForm = function (data, ev) {



        $mdDialog.show({
            controller: DialogControllerSendFormToEmail,
            locals:{data: data},
            templateUrl: 'components/grow_potencial/dialog_template_send_form_to_email.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    };



    function DialogControllerSendFormToEmail($scope, data, SendFormForEmail) {


        $scope.data = {

            emails: [],
            readonly: false,
            removable: true,
            parentId: data._id,
            country: data.country,
            dateOfEvent: data.myDate,
            nameEvent: data.nameEvent,
            nameCountry: data.nameCountry




        };






        $scope.sendForm = function () {


            SendFormForEmail.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(result) {


                if (result.code === 0) {


                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );


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


        $scope.closeDialog = function () {
            $mdDialog.hide();
        };

    }



    $scope.plusRow = function (index, event, id) {







        if ($(event.currentTarget).text() === "add") {



            GetForm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function(result) {


                if (result.code === 0) {




                    $scope.arrForInsert = result.resultFromDb;
                    $scope.data[index].icon = "remove";
                    let newIndex = index;
                    for (let value of $scope.arrForInsert) {
                        newIndex++;

                        $scope.data.splice(newIndex, 0, value);
                    }



                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }



            });










        }else if ($(event.currentTarget).text() === "remove"){

            $scope.data[index].icon = "add";


            $scope.data = $scope.data.filter(function (value, index, array) {
                return (value.parentId !== id);
            });








        }









    };






    $scope.delete = function (data, index) {



        if (data.hasOwnProperty('parentId')) {

            DelForm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data._id}, function (result) {



                if (result.code === 0) {



                    $scope.data.splice(index, 1);

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );


                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }




            });


        } else {


            DelEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data._id}, function (result) {



                if (result.code === 0) {



                    $scope.data.splice(index, 1);

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась УСПЕШНО.')
                            .position('bottom left')
                            .hideDelay(3000)
                    );


                } else {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                            .position('bottom left')
                            .hideDelay(6000)
                    );


                }




            });


        }




    };










    $scope.updateEvent = function(data, ev, index) {


        if (data.hasOwnProperty('parentId')) {

            $mdDialog.show({
                controller: DialogControllerUpdateForm,
                locals:{data: data, index: index},
                templateUrl: 'components/grow_potencial/dialog_template_new_form.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });


        } else {


            $mdDialog.show({
                controller: DialogControllerUpdateEvent,
                locals:{data: data},
                templateUrl: 'components/grow_potencial/dialog_template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });

        }







    };


function DialogControllerUpdateForm($scope, data, UpdForm, index, GetOneForm) {


    console.log(data);

    $scope.data = {

        id: data._id,
        myDate: data.dateOfEvent,
        nameCountry: data.nameOfCountry,
        nameEvent: data.nameEvent,
        email: data.email,
        question1: 'Цели данного мероприятия были четко определены',
        ques1: data.ques1,

        question2: 'Взаимодействие между участниками поощрялось',
        ques2: data.ques2,

        question3: 'Темы имели отношение к тому, чем я занимаюсь',
        ques3: data.ques3,

        question4: 'Содержание было хорошо структурировано и понятно',
        ques4: data.ques4,

        question5: 'Раздаточные материалы были полезны',
        ques5: data.ques5,

        question6: 'Полученная информация/знания и навыки будут полезны мне в работе',
        ques6: data.ques6,


        question7: 'Тренер/модератор хорошо знал тему',
        ques7: data.ques7,


        question8: 'Тренер/модератор был хорошо подготовлен',
        ques8: data.ques8,


        question9: 'Цели мероприятия были достигнуты',
        ques9: data.ques9,

        question10: 'Время выделенное для мероприятия было достаточным',
        ques10: data.ques10,

        question11: 'Помещения для проведения мероприятия и используемая участниками инфраструктура были удобными',
        ques11: data.ques11,

        question12: 'Оцените свою общую удовлетворенность проведенным мероприятием используя 5-бальную шкалу',
        ques12: data.ques12,



        question13: 'Что вам понравилось больше всего?',
        ques13: data.ques13,


        question14: 'Что можно было бы улучшить?',
        ques14: data.ques14,


        question15: 'Как вы планируете использовать полученные знания/информацию?',
        ques15: data.ques15,


        question16: 'В каких темах вы заинтересованы и хотели бы пройти обучение/получать информацию в дальнейшем?',
        ques16: data.ques16,



        question17: 'Как вы оцениваете организацию мероприятия?',
        ques17: data.ques17,


        question18: 'Пожалуйста, отметьте, есть ли у Вас замечания или пожелания в целом по организации мероприятия?',
        ques18: data.ques18,


        question19: 'Вы представляете',
        ques19: data.ques19,



        question20: 'Пол',
        ques20: data.ques20,



        question21: 'Возрастная группа',
        ques21: data.ques21











    };



    $scope.save = function () {
        UpdForm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(result) {


            if (result.code === 0) {



                $mdDialog.hide();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась УСПЕШНО.')
                        .position('bottom left')
                        .hideDelay(3000)
                );


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


    $scope.closeDialog = function () {




        GetOneForm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data.id}, function(result) {


            if (result.code === 0) {


                $rootScope.data.splice(index, 1);
                $rootScope.data.splice(index, 0, result.resultFromDb);






            } else {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                        .position('bottom left')
                        .hideDelay(6000)
                );


            }



        });


        $mdDialog.hide();







    };


}





function DialogControllerUpdateEvent(GetAllEventSubStatuses, $scope, data, GetAllCoutrys, $mdToast, UpdEvent, GetAllEventStatuses) {



    $scope.data = {
        _id: data._id,

        allCountrys: [],


        country: data.country,
        myDate: new Date(data.myDate),

        nameEvent: data.nameEvent,
        typeEvent: data.typeEvent,
        subTypeEvent: data.subTypeEvent,

        countPeopleEventCommon: data.countPeopleEventCommon,
        countWomanEventCommon: data.countWomanEventCommon,

        countFacilatatorEventCommon: data.countFacilatatorEventCommon,
        countFacilatatorWomanEventCommon: data.countFacilatatorWomanEventCommon,

        countSpeakerEventCommon: data.countSpeakerEventCommon,
        countSpeakerWomanEventCommon: data.countSpeakerWomanEventCommon


    };

    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;


    });


    GetAllEventStatuses.get(function(entry) {


        $scope.data.allEventStatuses = entry.resultFromDb;


    });


    GetAllEventSubStatuses.get(function(entry) {


        $scope.data.allEventSubStatuses = entry.resultFromDb;


    });


    $scope.addEvent = function () {


        UpdEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(result) {


            if (result.code === 0) {



                $mdDialog.hide();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась УСПЕШНО.')
                        .position('bottom left')
                        .hideDelay(3000)
                );


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



    $scope.closeDialog = function () {
        GetEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


            $rootScope.data = result.resultFromDb;


        });


        $mdDialog.hide();
    };




}





$scope.showModalWnd = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                locals:{data: "testDataFromParentController"},
                templateUrl: 'components/grow_potencial/dialog_template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });
        };

function DialogController($scope, AddEvent, GetAllCoutrys, $mdToast, GetAllEventStatuses, GetAllEventSubStatuses) {



    $scope.data = {

        allCountrys: [],
        country: "",
        myDate: new Date(),

        nameEvent: "",
        typeEvent: "",
        subTypeEvent: "",

        countPeopleEventCommon: "",
        countWomanEventCommon: "",

        countFacilatatorEventCommon: "",
        countFacilatatorWomanEventCommon: "",

        countSpeakerEventCommon: "",
        countSpeakerWomanEventCommon: ""


    };




    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;

    });

    GetAllEventStatuses.get(function(entry) {


        $scope.data.allEventStatuses = entry.resultFromDb;
        $scope.data.typeEvent = entry.resultFromDb[0]._id;


    });



    GetAllEventSubStatuses.get(function(entry) {


        $scope.data.allEventSubStatuses = entry.resultFromDb;
        $scope.data.subTypeEvent = entry.resultFromDb[0]._id;


    });




    $scope.addEvent = function () {


        AddEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(result) {


            if (result.code === 0) {



                GetEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


                    $rootScope.data = result.resultFromDb;


                });

                $mdDialog.hide();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась УСПЕШНО.')
                        .position('bottom left')
                        .hideDelay(3000)
                );


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








    $scope.closeDialog = function () {

        GetEvent.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(result) {


            $rootScope.data = result.resultFromDb;


        });


        $mdDialog.hide();




    };





    }





$scope.addForm = function (data, ev) {

    $mdDialog.show({
        controller: DialogControllerForNewForm,
        locals:{data: data},
        templateUrl: 'components/grow_potencial/dialog_template_new_form.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true // Only for -xs, -sm breakpoints.
    });


};



function DialogControllerForNewForm($scope, data, AddForm) {


    $scope.data = {

        parentId: data._id,
        myDate: data.myDate,
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
        AddForm.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function(result) {


            if (result.code === 0) {



                $mdDialog.hide();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась УСПЕШНО.')
                        .position('bottom left')
                        .hideDelay(3000)
                );


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






    $scope.closeDialog = function () {



        $mdDialog.hide();







    };









}





    $scope.excel = function () {



        $scope.tableID = "events";
        $scope.titleSheet = "Наращивание потенциала";

        $window.open('/generateexcel.xlsx?data=' + $scope.tableID + "&titleSheet=" + $scope.titleSheet, '_blank');




    };






    $scope.addFromExcel = function(ev) {
        $mdDialog.show({
            controller: DialogControllerFormFromExcel,
            locals:{data: "testDataFromParentController"},
            templateUrl: 'components/grow_potencial/dialog_template_form_from_excel.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    };



    function DialogControllerFormFromExcel($scope, $rootScope, $http) {


        $scope.allevents = $rootScope.data;


        $scope.closeDialog = function () {
            $mdDialog.hide();
        };


        var formdata = new FormData();
        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
        };



        $scope.addFormExcel = function () {






                formdata.append('selectedEvent', $scope.selectedEvent);


                var request = {
                    method: 'POST',
                    url: '/formfromexcel',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined,
                        'tokenCSRF' : localStorage.getItem('tokenCSRF'),
                        'sessionToken' : localStorage.getItem('sessionToken')
                    }
                };

                // SEND THE FILES.
                $http(request)
                    .then(function successCallback(response) {
                        formdata = new FormData();
                        document.getElementById("file").value = null;

                        $mdDialog.hide();


                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Вы успешно загрузили объект.')
                                .position('left bottom')
                                .hideDelay(3000)
                        );





                    }, function errorCallback(response) {
                        formdata = new FormData();
                        document.getElementById("file").value = null;
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Операция закончилась не удачно, попробуйте изменить данные.')
                                .position('left bottom')
                                .hideDelay(3000)
                        );
                    });
            }







    }


});

