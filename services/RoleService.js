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

                    mainPageHtml: "<div class=\"menu-list\">\n" +
                    "\n" +
                    "\t\t\t\t\t<ul id=\"menu-content\" class=\"menu-content\">\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li data-toggle=\"collapse\" data-target=\"#products\" class=\"collapsed\">\n" +
                    "\t\t\t\t\t\t\t<a><i class=\"material-icons\">filter_drama</i> Администраторы <i class=\"material-icons\">keyboard_arrow_down</i></a>\n" +
                    "\t\t\t\t\t\t</li>\n" +
                    "\t\t\t\t\t\t<ul class=\"sub-menu collapse\" id=\"products\">\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/adminedit\">Список администраторов</a></li>\n" +
                    "\t\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li data-toggle=\"collapse\" data-target=\"#service\" class=\"collapsed\">\n" +
                    "\t\t\t\t\t\t\t<a><i class=\"material-icons\">place</i> Ввод данных <i class=\"material-icons\">keyboard_arrow_down</i></a>\n" +
                    "\t\t\t\t\t\t</li>\n" +
                    "\t\t\t\t\t\t<ul class=\"sub-menu collapse\" id=\"service\">\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/grow_potencial\">Наращивание потенциала</a></li>\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/credits\">Кредиты</a></li>\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/grm\">Механизм рассмотрения жалоб и отзывов</a></li>\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/finansial_status\">Финансовый статус</a></li>\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/main_score_program\">Главные и промежуточные цели программы</a></li>\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/strategic_communications\">Стратегия коммуникаций</a></li>\n" +
                    "\t\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t\t<li data-toggle=\"collapse\" data-target=\"#new\" class=\"collapsed\">\n" +
                    "\t\t\t\t\t\t\t<a><i class=\"material-icons\">whatshot</i>Анализ данных<i class=\"material-icons\">keyboard_arrow_down</i></a>\n" +
                    "\t\t\t\t\t\t</li>\n" +
                    "\t\t\t\t\t\t<ul class=\"sub-menu collapse\" id=\"new\">\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/build_report\">Сформировать отчёт (квартальный, полугодовой, годовой)</a></li>\n" +
                    "\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/report_by_main_score\">Отчёт по главным целям программы</a></li>\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/report_by_criteriy\">Отчёт по заданным критериям</a></li>\n" +
                    "\t\t\t\t\t\t\t<li><a href=\"?#!/data_intermediate_index\">Данные по промежуточным показателям</a></li>\n" +
                    "\t\t\t\t\t\t</ul>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\t\t\t\t\t</ul>\n" +
                    "\t\t\t\t</div>"
                },

                {name: "Администратор 2 уровня", mainPageHtml: "<div class=\"menu-list\">\n" +
                "\n" +
                "\t\t\t\t\t<ul id=\"menu-content\" class=\"menu-content\">\n" +
                "\n" +
                "\t\t\t\t\t\t<li data-toggle=\"collapse\" data-target=\"#products\" class=\"collapsed\">\n" +
                "\t\t\t\t\t\t\t<a><i class=\"material-icons\">filter_drama</i> Администраторы <i class=\"material-icons\">keyboard_arrow_down</i></a>\n" +
                "\t\t\t\t\t\t</li>\n" +
                "\t\t\t\t\t\t<ul class=\"sub-menu collapse\" id=\"products\">\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/adminedit\">Список администраторов</a></li>\n" +
                "\t\t\t\t\t\t</ul>\n" +
                "\n" +
                "\n" +
                "\t\t\t\t\t\t<li data-toggle=\"collapse\" data-target=\"#service\" class=\"collapsed\">\n" +
                "\t\t\t\t\t\t\t<a><i class=\"material-icons\">place</i> Ввод данных <i class=\"material-icons\">keyboard_arrow_down</i></a>\n" +
                "\t\t\t\t\t\t</li>\n" +
                "\t\t\t\t\t\t<ul class=\"sub-menu collapse\" id=\"service\">\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/grow_potencial\">Наращивание потенциала</a></li>\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/credits\">Кредиты</a></li>\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/grm\">Механизм рассмотрения жалоб и отзывов</a></li>\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/finansial_status\">Финансовый статус</a></li>\n" +
                "\t\t\t\t\t\t</ul>\n" +
                "\n" +
                "\n" +
                "\t\t\t\t\t\t<li data-toggle=\"collapse\" data-target=\"#new\" class=\"collapsed\">\n" +
                "\t\t\t\t\t\t\t<a><i class=\"material-icons\">whatshot</i>Анализ данных<i class=\"material-icons\">keyboard_arrow_down</i></a>\n" +
                "\t\t\t\t\t\t</li>\n" +
                "\t\t\t\t\t\t<ul class=\"sub-menu collapse\" id=\"new\">\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/build_report\">Сформировать отчёт (квартальный, полугодовой, годовой)</a></li>\n" +
                "\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/report_by_main_score\">Отчёт по главным целям программы</a></li>\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/report_by_criteriy\">Отчёт по заданным критериям</a></li>\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/data_intermediate_index\">Данные по промежуточным показателям</a></li>\n" +
                "\t\t\t\t\t\t</ul>\n" +
                "\n" +
                "\n" +
                "\n" +
                "\t\t\t\t\t</ul>\n" +
                "\t\t\t\t</div>\n"},


                { name: "Администратор 3 уровня", mainPageHtml: "<div class=\"menu-list\">\n" +
                "\n" +
                "\t\t\t\t\t<ul id=\"menu-content\" class=\"menu-content\">\n" +
                "\n" +
                "\t\t\t\t\t\t\n" +
                "\n" +
                "\t\t\t\t\t\t<li data-toggle=\"collapse\" data-target=\"#service\" class=\"collapsed\">\n" +
                "\t\t\t\t\t\t\t<a><i class=\"material-icons\">place</i> Ввод данных <i class=\"material-icons\">keyboard_arrow_down</i></a>\n" +
                "\t\t\t\t\t\t</li>\n" +
                "\t\t\t\t\t\t<ul class=\"sub-menu collapse\" id=\"service\">\n" +
                "\t\t\t\t\t\t\t<li><a href=\"?#!/grow_potencial\">Наращивание потенциала</a></li>\n" +
                "\n" +
                "\n" +
                "\n" +
                "\t\t\t\t\t\t</ul>\n" +
                "\n" +
                "\n" +
                "\t\t\t\t\t\t\n" +
                "\n" +
                "\n" +
                "\n" +
                "\t\t\t\t\t</ul>\n" +
                "\t\t\t\t</div>"}]

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