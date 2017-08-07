/**
 * Created by simvolice on 20.04.2017 17:57
 */


const config = require('../utils/devConfig');
const validator = require('../utils/validator');
const AuthService = require('../services/Auth');
const RoleService = require('../services/RoleService');
const CountryService = require('../services/CountryService');
const jsonwebtoken = require('jsonwebtoken');


module.exports = {

   forUsers: async (SeesionToken) => {




    let AdminRole = await RoleService.getAllRoles();








    let userId = jsonwebtoken.verify(SeesionToken, config.SECRETJSONWEBTOKEN);



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








        let userId = jsonwebtoken.verify(SeesionToken, config.SECRETJSONWEBTOKEN);



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








        let userId = jsonwebtoken.verify(SeesionToken, config.SECRETJSONWEBTOKEN);



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

};









