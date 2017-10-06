/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('StrategicCommunicationsCtrl', function ($scope, $cookies, GetAllCoutrys, AddStrategic, $mdToast, UpdStrategic, DelStrategic, GetStrategic) {


    $scope.data = [];







    GetStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function (result) {



        if (result.code === 0) {



            $scope.data = result.resultFromDb;


        } else {

            $mdToast.show(
                $mdToast.simple()
                    .textContent('Операция закончилась НЕУДАЧНО. Измените данные для ввода.')
                    .position('bottom left')
                    .hideDelay(6000)
            );


        }




    });




    $scope.addBtn = function () {

        let tempObj = {



            id: 0,
            country: "",



            NumberFaceFacePlan: "",
            NumberFaceFaceFact: "",
            NumberFaceFaceDetail: "",
            NumberHighLevelPlan: "",
            NumberHighLeveleFact: "",
            NumberHighLevelDetail: "",
            NumberInformationPlan: "",
            NumberInformationFact: "",
            NumberInformationDetail: "",
            NumberCoalitionsPlan: "",
            NumberCoalitionsFact: "",
            NumberCoalitionsDetail: "",
            NumberJointPartnershipPlan: "",
            NumberJointPartnershipFact: "",
            NumberJointPartnershipDetail: "",
            NumberWebConferencingPlan: "",
            NumberWebConferencingFact: "",
            NumberWebConferencingDetail: "",
            NumberMeetingsMediaPlan: "",
            NumberMeetingsMediaFact: "",
            NumberMeetingsMediaDetail: "",
            NumberPrintedDocumentsPlan: "",
            NumberPrintedDocumentsFact: "",
            NumberPrintedDocumentsDetail: "",
            NumberMediaPublicityPlan: "",
            NumberMediaPublicityFact: "",
            NumberMediaPublicityDetail: "",
            NumberReadersPlan: "",
            NumberReadersFact: "",
            NumberReadersDetail: "",
            NumberOnlineChannelsPlan: "",
            NumberOnlineChannelsFact: "",
            NumberOnlineChannelsDetail: "",
            InformationPartnerPagesPlan: "",
            InformationPartnerPagesFact: "",
            InformationPartnerPagesDetail: "",
            NumberOnlineVisitorsPlan: "",
            NumberOnlineVisitorsFact: "",
            NumberOnlineVisitorsDetail: "",
            NumberDigitalSubscribersPlan: "",
            NumberDigitalSubscribersFact: "",
            NumberDigitalSubscribersDetail: "",
            NumberDownloadsPlan: "",
            NumberDownloadsFact: "",
            NumberDownloadsDetail: "",
            NumberVisitorsCAMP4ASBPlan: "",
            NumberVisitorsCAMP4ASBFact: "",
            NumberVisitorsCAMP4ASBDetail: "",
            NumberMenWomenFeaturedPlan: "",
            NumberMenWomenFeaturedFact: "",
            NumberMenWomenFeaturedDetail: "",
            NumberMenWomenReachedPlan: "",
            NumberMenWomenReachedFact: "",
            NumberMenWomenReachedDetail: ""



        };

        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            tempObj.allCountrys = entry.resultFromDb;
            tempObj.country = entry.resultFromDb[0]._id;


        });








        $scope.data.push(tempObj);


    };

    $scope.saveBtn = function (data) {



        if (data.id === 0) {



            AddStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



                if (result.code === 0) {


                    $scope.data[$scope.data.length - 1]._id = result.resultFromDb._id;
                    $scope.data[$scope.data.length - 1].id = result.resultFromDb.id;

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



            UpdStrategic.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: data}, function (result) {



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




        }








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

