/**
 * Created by simvolice on 20.04.2017 17:57
 */



const validator = require('../utils/validator');
const AuthService = require('../services/Auth');
const RoleService = require('../services/RoleService');
const CountryService = require('../services/CountryService');
const EventService = require('../services/EventService');
const CreditsService = require('../services/CreditsService');
const GrmService = require('../services/GrmService');
const FinansialStatusService = require('../services/FinansialStatusService');
const MainScoreProgramService = require('../services/MainScoreProgramService');
const StrategicService = require('../services/StrategicService');
const BuildReportService = require('../services/BuildReportService');



const jsonwebtoken = require('jsonwebtoken');


module.exports = {




    forUsers: async (SeesionToken) => {




    let AdminRole = await RoleService.getAllRoles();








    let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



    let result = await AuthService.checkUserById(userId);




    if (validator.checkProps(result)) {

        //Здесь ловим рута
        if(result.role.toString() === AdminRole[0]._id.toString()){


            return await AuthService.getAllUsers();

            //Здесь ловим 2 Админа
        } else if (result.role.toString() === AdminRole[1]._id.toString()) {



            return await AuthService.getUsersForAdmin2(result.country.toString());


        } else {

            return false;


        }


    } else {

        return false;


    }

















},




    forCountrys: async (SeesionToken) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){


                return await CountryService.getAllCountrys();

                //Здесь ловим 2 Админа
            } else if (result.role.toString() === AdminRole[1]._id.toString()) {

                let arrCountrys = [];
                let oneCountry = await CountryService.getCountryById(result.country.toString());
                arrCountrys.push(oneCountry);

                return arrCountrys;


            } else {

                return false;


            }


        } else {

            return false;


        }

















    },



    forRoles: async (SeesionToken) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){


                return await RoleService.getAllRoles();

                //Здесь ловим 2 Админа
            } else if (result.role.toString() === AdminRole[1]._id.toString()) {

                let allRoles = await RoleService.getAllRoles();


                return allRoles.slice(2, 3);


            } else {

                return false;


            }


        } else {

            return false;


        }

















    },




    forEvents: async (SeesionToken) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){


                return await EventService.getEvent();

                //Здесь ловим 2 Админа
            } else if (result.role.toString() === AdminRole[1]._id.toString()) {

                let allEvents = await EventService.getEventByCountryId(result.country.toString());


                return allEvents;

//Здесь ловим 3 Админа
            } else if(result.role.toString() === AdminRole[2]._id.toString()) {

                let allEvents = await EventService.getEventByCountryId(result.country.toString());


                return allEvents;


            } else {

                return false;


            }


        } else {

            return false;


        }

















    },



    forMainPage: async (SeesionToken) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

                //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){


                return AdminRole[0].mainPageHtml;

                //Здесь ловим 2 Админа
            } else if (result.role.toString() === AdminRole[1]._id.toString()) {



                return AdminRole[1].mainPageHtml;

                //Здесь ловим 3 Админа
            } else if(result.role.toString() === AdminRole[2]._id.toString()) {



                return AdminRole[2].mainPageHtml;


            } else {

                return false;


            }


        } else {

            return false;


        }

















    },




    forCredits: async (SeesionToken) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){


                return await CreditsService.getAllCredits();

                //Здесь ловим 2 Админа
            } else if (result.role.toString() === AdminRole[1]._id.toString()) {



                return await CreditsService.getCreditsByIdCountry(result.country.toString());


            } else {

                return false;


            }


        } else {

            return false;


        }

















    },






    forTable5: async (SeesionToken) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){


                return await CreditsService.getAllTable5();

                //Здесь ловим 2 Админа
            } else if (result.role.toString() === AdminRole[1]._id.toString()) {



                return await CreditsService.getTable5ByIdCountry(result.country.toString());


            } else {

                return false;


            }


        } else {

            return false;


        }

















    },



    forGrm: async (SeesionToken) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){





                return await GrmService.getAllGrm();

                //Здесь ловим 2 Админа
            } else if (result.role.toString() === AdminRole[1]._id.toString()) {






                 return await GrmService.getByCountryId(result.country.toString());




            } else {

                return false;


            }


        } else {

            return false;


        }

















    },







    forFinansialStatus: async (SeesionToken, statusId) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){



                return await FinansialStatusService.getAll();



                //Здесь ловим 2 Админа
            } else if (result.role.toString() === AdminRole[1]._id.toString()) {





                return await FinansialStatusService.getByCountryId(result.country.toString());




            } else {

                return false;


            }


        } else {

            return false;


        }

















    },





    forPlatform: async (SeesionToken, statusId) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){



                return await MainScoreProgramService.getAll();




            }  else {

                return false;


            }


        } else {

            return false;


        }

















    },



    forProject: async (SeesionToken, statusId) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){



                return await MainScoreProgramService.getAllProject();




            }  else {

                return false;


            }


        } else {

            return false;


        }

















    },



    forRegionalInvest: async (SeesionToken, statusId) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){



                return await MainScoreProgramService.getAllRegionalInvest();




            }  else {

                return false;


            }


        } else {

            return false;


        }

















    },



    forMobileResurs: async (SeesionToken, statusId) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){



                return await MainScoreProgramService.getAllMobileResurs();




            }  else {

                return false;


            }


        } else {

            return false;


        }

















    },




    forStrategic: async (SeesionToken, data) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){



                return await StrategicService.getAll(data);




            }  else {

                return false;


            }


        } else {

            return false;


        }

















    },




    forBuildReport: async (SeesionToken) => {




        let AdminRole = await RoleService.getAllRoles();








        let userId = jsonwebtoken.verify(SeesionToken, process.env.SECRETJSONWEBTOKEN);



        let result = await AuthService.checkUserById(userId);




        if (validator.checkProps(result)) {

            //Здесь ловим рута
            if(result.role.toString() === AdminRole[0]._id.toString()){



                return await BuildReportService.getAll();



                //Здесь ловим 2 Админа
            } else if (result.role.toString() === AdminRole[1]._id.toString()) {





                return await BuildReportService.getByCountryId(result.country.toString());




            } else {

                return false;


            }


        } else {

            return false;


        }

















    },




};









