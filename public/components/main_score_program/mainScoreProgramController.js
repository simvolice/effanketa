/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('MainScoreProgramCtrl', function ($window, $scope, $mdDialog, GetPlatform, GetMainPage, $mdToast, $state, $rootScope, DeletePlatform, GetProject, DeleteProject, GetRegionalInvest, DeleteRegionalInvest, GetMobileResurs, DeleteMobileResurs) {


$rootScope.data = [];

    $scope.excel = function (tableId, titleSheet) {



        $scope.tableID = tableId;
        $scope.titleSheet = titleSheet;

        $window.open('/generateexcel.xlsx?data=' + $scope.tableID + "&titleSheet=" + $scope.titleSheet, '_blank');




    };



    $scope.tabClk = function (nameMethod) {

   if (nameMethod === "Platform"){

       GetPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


           $rootScope.data = entry.resultFromDb;


       });


   } else if(nameMethod === "Projects"){

       GetProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


           $rootScope.data = entry.resultFromDb;


       });

   } else if(nameMethod === "RegionalInvest") {

       GetRegionalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


           $rootScope.data = entry.resultFromDb;


       });


   } else if(nameMethod === "MobileResurs") {

       GetMobileResurs.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


           $rootScope.data = entry.resultFromDb;


       });

   } else {

       return false;

   }

};



GetPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $rootScope.data = entry.resultFromDb;


    });



$scope.delete = function (id, nameMethod) {

    if (nameMethod === "Platform"){

        DeletePlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function(result) {


            if (result.code === 0) {


                GetPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                    $rootScope.data = entry.resultFromDb;


                });


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



    } else if(nameMethod === "Projects"){



        DeleteProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function(result) {


            if (result.code === 0) {


                GetProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                    $rootScope.data = entry.resultFromDb;


                });


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



    } else if(nameMethod === "RegionalInvest") {

        DeleteRegionalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function(result) {


            if (result.code === 0) {


                GetRegionalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                    $rootScope.data = entry.resultFromDb;


                });


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


    } else if(nameMethod === "MobileResurs") {

        DeleteMobileResurs.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: id}, function(result) {


            if (result.code === 0) {


                GetMobileResurs.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                    $rootScope.data = entry.resultFromDb;


                });


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

        return false;

    }










};




















$scope.updBtn = function (data, ev, nameMethod) {

    if (nameMethod === "Platform"){

        $mdDialog.show({
            controller: DialogControllerUpdPlatform,
            locals:{data: data},
            templateUrl: 'components/main_score_program/dialog_template_new_platform.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    } else if(nameMethod === "Projects"){

        $mdDialog.show({
            controller: DialogControllerUpdProject,
            locals:{data: data},
            templateUrl: 'components/main_score_program/dialog_template_new_project.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    } else if(nameMethod === "RegionalInvest") {

        $mdDialog.show({
            controller: DialogControllerUpdRegionalInvest,
            locals:{data: data},
            templateUrl: 'components/main_score_program/dialog_template_new_regionalinvest.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });

    } else if(nameMethod === "MobileResurs") {

        $mdDialog.show({
            controller: DialogControllerUpdMobileResurs,
            locals:{data: data},
            templateUrl: 'components/main_score_program/dialog_template_new_mobileresurs.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    } else {

        return false;

    }









};


function DialogControllerUpdMobileResurs($scope, data, GetAllCoutrys, UpdMobileResurs) {
        $scope.data = {

            _id: data._id,
            country: data.country,
            projectIniciativ: data.projectIniciativ,
            amountFinance: data.amountFinance,
            sourceFinance: data.sourceFinance,
            mainDestination: data.mainDestination,
            executorProject: data.executorProject,
            contactExecutor: data.contactExecutor




        };


        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            $scope.data.allCountrys = entry.resultFromDb;


        });




        $scope.addPlatform = function () {

            UpdMobileResurs.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



                if (result.code === 0) {
                    $mdDialog.hide();

                    GetMobileResurs.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                        $rootScope.data = entry.resultFromDb;


                    });


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


function DialogControllerUpdRegionalInvest($scope, data, GetAllCoutrys, UpdRegionalInvest) {
        $scope.data = {

            _id: data._id,
            country: data.country,
            typeInvest: data.typeInvest,
            sizeInvest: data.sizeInvest,
            investor: data.investor,
            coloborationCountry: data.coloborationCountry,
            executorWithContact: data.executorWithContact,
            descriptionInvest: data.descriptionInvest,
            executorAgentsContacts: data.executorAgentsContacts




        };


        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            $scope.data.allCountrys = entry.resultFromDb;


        });




        $scope.addPlatform = function () {

            UpdRegionalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



                if (result.code === 0) {

                    $mdDialog.hide();
                    GetRegionalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                        $rootScope.data = entry.resultFromDb;


                    });


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



function DialogControllerUpdPlatform($scope, data, GetAllCoutrys, UpdPlatform) {
    $scope.data = {

        _id: data._id,
        country: data.country,
        projectIniciativ: data.projectIniciativ,
        amountFinance: data.amountFinance,
        sourceFinance: data.sourceFinance,
        mainDestination: data.mainDestination,
        executorProject: data.executorProject,
        contactExecutor: data.contactExecutor




    };


    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;


    });




    $scope.addPlatform = function () {

        UpdPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



            if (result.code === 0) {

                $mdDialog.hide();
                GetPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                    $rootScope.data = entry.resultFromDb;


                });


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

function DialogControllerUpdProject($scope, data, GetAllCoutrys, UpdProject) {
        $scope.data = {

            _id: data._id,
            country: data.country,
            programm: data.programm,
            sector: data.sector,
            developers: data.developers,
            executorAgents: data.executorAgents,
            executorAgentsContacts: data.executorAgentsContacts




        };


        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            $scope.data.allCountrys = entry.resultFromDb;


        });




        $scope.addPlatform = function () {

            UpdProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



                if (result.code === 0) {

                    $mdDialog.hide();
                    GetProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                        $rootScope.data = entry.resultFromDb;


                    });


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






















$scope.addBtn = function (ev, nameMethod) {



    if (nameMethod === "Platform"){

        $mdDialog.show({
            controller: DialogControllerNewPlatform,
            locals:{},
            templateUrl: 'components/main_score_program/dialog_template_new_platform.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    } else if(nameMethod === "Projects"){

        $mdDialog.show({
            controller: DialogControllerNewProject,
            locals:{},
            templateUrl: 'components/main_score_program/dialog_template_new_project.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });


    } else if(nameMethod === "RegionalInvest") {

        $mdDialog.show({
            controller: DialogControllerNewRegionalInvest,
            locals:{},
            templateUrl: 'components/main_score_program/dialog_template_new_regionalinvest.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });

    } else if(nameMethod === "MobileResurs") {

        $mdDialog.show({
            controller: DialogControllerNewMobileResurs,
            locals:{},
            templateUrl: 'components/main_score_program/dialog_template_new_mobileresurs.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });

    } else {

        return false;

    }












    };


function DialogControllerNewMobileResurs($scope, GetAllCoutrys, AddMobileResurs) {


        $scope.data = {

            country: "",
            projectIniciativ: "",
            amountFinance: "",
            sourceFinance: "",
            mainDestination: "",
            executorProject: "",
            contactExecutor: ""




        };


        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            $scope.data.allCountrys = entry.resultFromDb;
            $scope.data.country = entry.resultFromDb[0]._id;


        });



        $scope.addPlatform = function () {

            AddMobileResurs.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



                if (result.code === 0) {
                    $mdDialog.hide();

                    GetMobileResurs.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                        $rootScope.data = entry.resultFromDb;


                    });


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


function DialogControllerNewRegionalInvest($scope, GetAllCoutrys, AddRegionalInvest) {


        $scope.data = {

            country: "",
            typeInvest: "",
            sizeInvest: "",
            investor: "",
            coloborationCountry: "",
            executorWithContact: "",
            descriptionInvest: "",
            executorAgentsContacts: ""


        };


        GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


            $scope.data.allCountrys = entry.resultFromDb;
            $scope.data.country = entry.resultFromDb[0]._id;


        });



        $scope.addPlatform = function () {

            AddRegionalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



                if (result.code === 0) {

                    $mdDialog.hide();
                    GetRegionalInvest.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                        $rootScope.data = entry.resultFromDb;


                    });


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


function DialogControllerNewProject($scope, GetAllCoutrys, AddProject) {


    $scope.data = {

        country: "",
        programm: "",
        sector: "",
        developers: "",
        executorAgents: "",
        executorAgentsContacts: ""


    };


    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;


    });



    $scope.addPlatform = function () {

        AddProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



            if (result.code === 0) {

                $mdDialog.hide();
                GetProject.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                    $rootScope.data = entry.resultFromDb;


                });


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

function DialogControllerNewPlatform($scope, GetAllCoutrys, AddPlatform) {


    $scope.data = {

        country: "",
        projectIniciativ: "",
        amountFinance: "",
        sourceFinance: "",
        mainDestination: "",
        executorProject: "",
        contactExecutor: ""




    };


    GetAllCoutrys.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


        $scope.data.allCountrys = entry.resultFromDb;
        $scope.data.country = entry.resultFromDb[0]._id;


    });



    $scope.addPlatform = function () {

        AddPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken'), data: $scope.data}, function (result) {



            if (result.code === 0) {

                $mdDialog.hide();
                GetPlatform.save({tokenCSRF: localStorage.getItem('tokenCSRF'), sessionToken: localStorage.getItem('sessionToken')}, function(entry) {


                    $rootScope.data = entry.resultFromDb;


                });


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


});

