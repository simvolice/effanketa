/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('StrategicCommunicationsCtrl', function ($scope, $rootScope, $mdDialog, GetAllCoutrys, AddStrategic, $mdToast, UpdStrategic, DelStrategic, GetStrategic, GetYearName) {


    $rootScope.data = [];



    GetYearName.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.allyearname = entry.resultFromDb;
        $scope.yearname = entry.resultFromDb[entry.resultFromDb.length - 2]._id;



        GetStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function (result) {



            if (result.code === 0) {



                $rootScope.data = result.resultFromDb;


            } else {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                        .position('bottom left')
                        .hideDelay(6000)
                );


            }




        });

    });







    $scope.addBtn = function (ev) {

        $mdDialog.show({
            controller: DialogController,
            locals:{data: $scope.data},
            templateUrl: 'components/strategic_communications/dialog_template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    };



    $scope.updBtn = function (data, ev) {
        $mdDialog.show({
            controller: DialogControllerUpdate,
            locals:{data: data},
            templateUrl: 'components/strategic_communications/dialog_template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    };


function DialogControllerUpdate($scope, data, GetAllCoutrys, UpdStrategic) {



        $scope.data = {


            _id: data._id,

            country: data.country,
            countMeetingPlanOnOneYear: data.countMeetingPlanOnOneYear,
            countMeetingFinishOnOneYear: data.countMeetingFinishOnOneYear,
            countMeetingDescription: data.countMeetingDescription,
            countEventHighLevelPlanOnOneYear: data.countEventHighLevelPlanOnOneYear,
            countEventHighLevelFinishOnOneYear: data.countEventHighLevelFinishOnOneYear,
            countEventHighLevelDescription: data.countEventHighLevelDescription,
            countInfoRequestPlanOnOneYear: data.countInfoRequestPlanOnOneYear,
            countInfoRequestFinishOnOneYear: data.countInfoRequestFinishOnOneYear,
            countInfoRequestDescription: data.countInfoRequestDescription,
            countNetWorkPlanOnOneYear: data.countNetWorkPlanOnOneYear,
            countNetWorkFinishOnOneYear: data.countNetWorkFinishOnOneYear,
            countNetWorkDescription: data.countNetWorkDescription,
            countStartPartnerPlanOnOneYear: data.countStartPartnerPlanOnOneYear,
            countStartPartnerFinishOnOneYear: data.countStartPartnerFinishOnOneYear,
            countStartPartnerDescription: data.countStartPartnerDescription,
            countOnlineConferencePlanOnOneYear: data.countOnlineConferencePlanOnOneYear,
            countOnlineConferenceFinishOnOneYear: data.countOnlineConferenceFinishOnOneYear,
            countOnlineConferenceDescription: data.countOnlineConferenceDescription,
            countMeetingPressPlanOnOneYear: data.countMeetingPressPlanOnOneYear,
            countMeetingPressFinishOnOneYear: data.countMeetingPressFinishOnOneYear,
            countMeetingPressDescription: data.countMeetingPressDescription,
            countCreatePressDocPlanOnOneYear: data.countCreatePressDocPlanOnOneYear,
            countCreatePressDocFinishOnOneYear: data.countCreatePressDocFinishOnOneYear,
            countCreatePressDocDescription: data.countCreatePressDocDescription,
            countPublishInPressPlanOnOneYear: data.countPublishInPressPlanOnOneYear,
            countPublishInPressFinishOnOneYear: data.countPublishInPressFinishOnOneYear,
            countPublishInPressDescription: data.countPublishInPressDescription,
            countReadersPlanOnOneYear: data.countReadersPlanOnOneYear,
            countReadersFinishOnOneYear: data.countReadersFinishOnOneYear,
            countReadersDescription: data.countReadersDescription,
            countOnlineChannelsPlanOnOneYear: data.countOnlineChannelsPlanOnOneYear,
            countOnlineChannelsFinishOnOneYear: data.countOnlineChannelsFinishOnOneYear,
            countOnlineChannelsDescription: data.countOnlineChannelsDescription,
            countInfoAboutPartnersPagePlanOnOneYear: data.countInfoAboutPartnersPagePlanOnOneYear,
            countInfoAboutPartnersPageFinishOnOneYear: data.countInfoAboutPartnersPageFinishOnOneYear,
            countInfoAboutPartnersPageDescription: data.countInfoAboutPartnersPageDescription,
            countPeopleOnSitePlanOnOneYear: data.countPeopleOnSitePlanOnOneYear,
            countPeopleOnSiteFinishOnOneYear: data.countPeopleOnSiteFinishOnOneYear,
            countPeopleOnSiteDescription: data.countPeopleOnSiteDescription,
            countDigitalPeoplePlanOnOneYear: data.countDigitalPeoplePlanOnOneYear,
            countDigitalPeopleFinishOnOneYear: data.countDigitalPeopleFinishOnOneYear,
            countDigitalPeopleDescription: data.countDigitalPeopleDescription,
            countDownloadInfoMaterialPlanOnOneYear: data.countDownloadInfoMaterialPlanOnOneYear,
            countDownloadInfoMaterialFinishOnOneYear: data.countDownloadInfoMaterialFinishOnOneYear,
            countDownloadInfoMaterialDescription: data.countDownloadInfoMaterialDescription,
            countVisitsPlanOnOneYear: data.countVisitsPlanOnOneYear,
            countVisitsFinishOnOneYear: data.countVisitsFinishOnOneYear,
            countVisitsDescription: data.countVisitsDescription,
            countMaleAndFemaleInInfoMaterialPlanOnOneYear: data.countMaleAndFemaleInInfoMaterialPlanOnOneYear,
            countMaleAndFemaleInInfoMaterialFinishOnOneYear: data.countMaleAndFemaleInInfoMaterialFinishOnOneYear,
            countMaleAndFemaleInInfoMaterialDescription: data.countMaleAndFemaleInInfoMaterialDescription,
            countMaleAndFemalePlanOnOneYear: data.countMaleAndFemalePlanOnOneYear,
            countMaleAndFemaleFinishOnOneYear: data.countMaleAndFemaleFinishOnOneYear,
            countMaleAndFemaleDescription: data.countMaleAndFemaleDescription,





        };


        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            $scope.data.allCountrys = entry.resultFromDb;

        });







        $scope.save = function () {


            UpdStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



                if (result.code === 0) {
                    GetStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



                        if (result.code === 0) {



                            $rootScope.data = result.resultFromDb;


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
        }







    }

function DialogController($scope, data, GetAllCoutrys, AddStrategic) {



    $scope.data = {};


    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;

    });







    $scope.save = function () {


        AddStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



            if (result.code === 0) {



                GetStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



                    if (result.code === 0) {



                        $rootScope.data = result.resultFromDb;


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
    }







}





$scope.selectClose = function () {
    GetStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.yearname}, function (result) {



        if (result.code === 0) {



            $rootScope.data = result.resultFromDb;


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


$scope.delete = function (id, index) {
    DelStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function(result) {


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




});

