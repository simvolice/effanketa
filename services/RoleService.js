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

                    mainPageHtml: "<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">Администраторы\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/adminedit\">Список администраторов</a></li>\n" +
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
                    "\t\t\t\t<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">Ввод данных\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grow_potencial\">Наращивание потенциала</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/credits\">Кредиты</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grm\">Механизм рассмотрения жалоб и отзывов</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/finansial_status\">Финансовый статус</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/main_score_program\">Главные и промежуточные цели программы</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/strategic_communications\">Стратегия коммуникаций</a></li>\n" +
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
                    "\t\t\t\t<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">Анализ данных\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/build_report\">Сформировать отчёт (квартальный, полугодовой, годовой)</a></li>\n" +

                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/report_by_criteriy\">Отчёт по отдельному мероприятию</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/data_intermediate_index\">Матрица результатов и их мониторинга</a></li>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>\n" +
                    "\n"
                },

                {name: "Администратор 2 уровня",


                    mainPageHtml: "<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">Администраторы\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/adminedit\">Список администраторов</a></li>\n" +
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
                    "\t\t\t\t<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">Ввод данных\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grow_potencial\">Наращивание потенциала</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/credits\">Кредиты</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grm\">Механизм рассмотрения жалоб и отзывов</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/finansial_status\">Финансовый статус</a></li>\n" +
                    "\t\t\t\t\t\t\n" +
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
                    "\t\t\t\t<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">Анализ данных\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/build_report\">Сформировать отчёт (квартальный, полугодовой, годовой)</a></li>\n" +

                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/report_by_criteriy\">Отчёт по отдельному мероприятию</a></li>\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/data_intermediate_index\">Матрица результатов и их мониторинга</a></li>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>\n"




                },


                { name: "Администратор 3 уровня",


                    mainPageHtml: "<li class=\"drawer-dropdown open\"><a class=\"drawer-menu-item\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"true\">Ввод данных\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<span class=\"drawer-caret\"></span></a>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t<ul class=\"drawer-dropdown-menu\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li><a class=\"drawer-dropdown-menu-item\" href=\"?#!/grow_potencial\">Наращивание потенциала</a></li>\n" +
                    "\t\t\t\t\t\t\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t</li>"}]

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





            const result = await col.find({}).toArray();





            return result;

        } catch (err){


            return err;

        }







    }




};