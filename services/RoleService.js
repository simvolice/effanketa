/**
 * Created by simvolice on 04.08.2017 14:59
 */



const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


module.exports = {

    initialRoles: async () => {

        const db = await MongoClient.connect(config.urlToMongoDBLocalhost);
        try {




            const col = db.collection('roles');

            col.createIndex({ name : 1 }, {unique: true});


            const result = await col.insertMany([

                { name: "Администратор 1 уровня",

                    mainPageHtml: "<ul class=\"collapsible popout\" data-collapsible=\"accordion\">\n" +
                    "                <li id=\"admins\">\n" +
                    "                    <div class=\"collapsible-header\"><i class=\"material-icons\">filter_drama</i>{{ 'ADMINS' | translate }}</div>\n" +
                    "                    <div class=\"collapsible-body\"><a href=\"?#!/adminedit\">{{ 'ADMIN_LIST' | translate }}</a></div>\n" +
                    "                </li>\n" +
                    "                <li>\n" +
                    "                    <div class=\"collapsible-header\"><i class=\"material-icons\">place</i>{{ 'ENTER_DATA' | translate }}</div>\n" +
                    "                    <div class=\"collapsible-body\"><ul>\n" +
                    "                        <li><a href=\"?#!/grow_potencial\">{{ 'GROW_POTENCIAL' | translate }}</a></li>\n" +
                    "                        <li><a href=\"?#!/credits\">{{ 'CREDITS' | translate }}</a></li>\n" +
                    "                        <li><a href=\"?#!/grm\">{{ 'GRM' | translate }}</a></li>\n" +
                    "                        <li><a href=\"?#!/finansial_status\">{{ 'FINANSIAL_STATUS' | translate }}</a></li>\n" +
                    "                        <li><a href=\"?#!/main_score_program\">{{ 'MAIN_SCORE_PROGRAM' | translate }}</a></li>\n" +
                    "                        <li><a href=\"?#!/strategic_communications\">{{ 'STRATEGIC_COMMUNICATIONS' | translate }}</a></li>\n" +
                    "\n" +
                    "\n" +
                    "                    </ul></div>\n" +
                    "                </li>\n" +
                    "                <li>\n" +
                    "                    <div class=\"collapsible-header\"><i class=\"material-icons\">whatshot</i>{{ 'ANALYS_DATA' | translate }}</div>\n" +
                    "                    <div class=\"collapsible-body\">\n" +
                    "                        <ul>\n" +
                    "\n" +
                    "\n" +
                    "                            <li><a href=\"?#!/build_report\">{{ 'BUILD_REPORT' | translate }}</a></li>\n" +
                    "\n" +
                    "                            <li><a href=\"?#!/report_by_main_score\">{{ 'REPORT_BY_MAIN_SCORE' | translate }}</a></li>\n" +
                    "                            <li><a href=\"?#!/report_by_criteriy\">{{ 'REPORT_BY_CRITERIY' | translate }}</a></li>\n" +
                    "                            <li><a href=\"?#!/data_intermediate_index\">{{ 'DATA_INTERMEDIATE_INDEX' | translate }}</a></li>\n" +
                    "\n" +
                    "                        </ul></div>\n" +
                    "                </li>\n" +
                    "            </ul>"
                },

                {name: "Администратор 2 уровня", mainPageHtml: "  <ul class=\"collapsible popout\" data-collapsible=\"accordion\">\n" +
                "                <li id=\"admins\">\n" +
                "                    <div class=\"collapsible-header\"><i class=\"material-icons\">filter_drama</i>{{ 'ADMINS' | translate }}</div>\n" +
                "                    <div class=\"collapsible-body\"><a href=\"?#!/adminedit\">{{ 'ADMIN_LIST' | translate }}</a></div>\n" +
                "                </li>\n" +
                "                <li>\n" +
                "                    <div class=\"collapsible-header\"><i class=\"material-icons\">place</i>{{ 'ENTER_DATA' | translate }}</div>\n" +
                "                    <div class=\"collapsible-body\"><ul>\n" +
                "                        <li><a href=\"?#!/grow_potencial\">{{ 'GROW_POTENCIAL' | translate }}</a></li>\n" +
                "                        <li><a href=\"?#!/credits\">{{ 'CREDITS' | translate }}</a></li>\n" +
                "                        <li><a href=\"?#!/grm\">{{ 'GRM' | translate }}</a></li>\n" +
                "                        <li><a href=\"?#!/finansial_status\">{{ 'FINANSIAL_STATUS' | translate }}</a></li>\n" +
                "                        \n" +
                "\n" +
                "\n" +
                "                    </ul></div>\n" +
                "                </li>\n" +
                "                <li>\n" +
                "                    <div class=\"collapsible-header\"><i class=\"material-icons\">whatshot</i>{{ 'ANALYS_DATA' | translate }}</div>\n" +
                "                    <div class=\"collapsible-body\">\n" +
                "                        <ul>\n" +
                "\n" +
                "\n" +
                "                            <li><a href=\"?#!/build_report\">{{ 'BUILD_REPORT' | translate }}</a></li>\n" +
                "\n" +
                "                            <li><a href=\"?#!/report_by_main_score\">{{ 'REPORT_BY_MAIN_SCORE' | translate }}</a></li>\n" +
                "                            <li><a href=\"?#!/report_by_criteriy\">{{ 'REPORT_BY_CRITERIY' | translate }}</a></li>\n" +
                "                            <li><a href=\"?#!/data_intermediate_index\">{{ 'DATA_INTERMEDIATE_INDEX' | translate }}</a></li>\n" +
                "\n" +
                "                        </ul></div>\n" +
                "                </li>\n" +
                "            </ul>"},


                { name: "Администратор 3 уровня", mainPageHtml: " <ul class=\"collapsible popout\" data-collapsible=\"accordion\">\n" +
                "\n" +
                "                <li>\n" +
                "                    <div class=\"collapsible-header\"><i class=\"material-icons\">place</i>{{ 'ENTER_DATA' | translate }}</div>\n" +
                "                    <div class=\"collapsible-body\"><ul>\n" +
                "                        <li><a href=\"?#!/grow_potencial\">{{ 'GROW_POTENCIAL' | translate }}</a></li>\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "                    </ul></div>\n" +
                "                </li>\n" +
                "\n" +
                "            </ul>"}]

            );



            db.close();

            return result;


        }catch(err) {


            db.close();

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





            const result = await col.find({}).project({mainPageHtml: 0}).toArray();





            return result;

        } catch (err){


            return err;

        }







    }




};