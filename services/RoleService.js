/**
 * Created by simvolice on 04.08.2017 14:59
 */



const dbConnect = require('../utils/dbConnect');


const ObjectId = require('mongodb').ObjectId;


module.exports = {

    initialRoles: async () => {


        try {





            const col = dbConnect.getConnect().collection('roles');


            col.createIndex({ name : 1 }, {unique: true});


            const result = await col.insertMany([

                { name: "Администратор 1 уровня",

                    mainPageHtml: "<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">{{ 'ADMINS' | translate }}\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/adminedit\">{{ 'ADMIN_LIST' | translate }}</a></li>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">{{ 'ENTER_DATA' | translate }}\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grow_potencial\">{{ 'GROW_POTENCIAL' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/credits\">{{ 'CREDITS' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grm\">{{ 'GRM' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/finansial_status\">{{ 'FINANSIAL_STATUS' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/main_score_program\">{{ 'MAIN_SCORE_PROGRAM' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/strategic_communications\">{{ 'STRATEGIC_COMMUNICATIONS' | translate }}</a></li>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">{{ 'ANALYS_DATA' | translate }}\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/build_report\">{{ 'BUILD_REPORT' | translate }}</a></li>\n" +

                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/report_by_criteriy\">{{ 'REPORT_BY_EVENT' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/data_intermediate_index\">{{ 'REPORT_BY_MATRIX' | translate }}</a></li>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>\n" +
                    "\n"
                },

                {name: "Администратор 2 уровня",


                    mainPageHtml: "<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">{{ 'ADMINS' | translate }}\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/adminedit\">{{ 'ADMIN_LIST' | translate }}</a></li>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">{{ 'ENTER_DATA' | translate }}\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grow_potencial\">{{ 'GROW_POTENCIAL' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/credits\">{{ 'CREDITS' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grm\">{{ 'GRM' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/finansial_status\">{{ 'FINANSIAL_STATUS' | translate }}</a></li>\n" +

                    "\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">{{ 'ANALYS_DATA' | translate }}\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/build_report\">{{ 'BUILD_REPORT' | translate }}</a></li>\n" +

                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/report_by_criteriy\">{{ 'REPORT_BY_EVENT' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/data_intermediate_index\">{{ 'REPORT_BY_MATRIX' | translate }}</a></li>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>\n" +
                    "\n"




                },


                { name: "Администратор 3 уровня",


                    mainPageHtml:

                    "<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">{{ 'ENTER_DATA' | translate }}\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grow_potencial\">{{ 'GROW_POTENCIAL' | translate }}</a></li>\n" +
                    "\t\t\t\t\t\t\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>"


                }]

            );





            return result;


        }catch(err) {




            return err;


        }






    },


    getRoleByRole: async (roleId) => {

        try {


            const col = dbConnect.getConnect().collection('roles');





            const result = await col.findOne({_id: ObjectId(roleId)});





            return result;

        } catch (err){


            return err;

        }







    },

    getAllRoles: async () => {

        try {


            const col = dbConnect.getConnect().collection('roles');





            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    }




};