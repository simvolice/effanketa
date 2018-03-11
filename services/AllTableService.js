/**
 * Created by simvolice on 06.11.2017 15:15
 */



const dbConnect = require('../utils/dbConnect');

const ObjectId = require('mongodb').ObjectId;

module.exports = {


    getAllData: async (idTable) => {

        try {


            let result = [];

            if (idTable === "events") {

                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,
                    nameCountry: 1,
                    nameEvent: 1,
                    nameTypeEvent: 1,
                    nameSubTypeEvent: 1,
                    myDate: 1,
                    countPeopleEventCommon: 1,
                    countWomanEventCommon: 1,
                    countFacilatatorEventCommon: 1,
                    countFacilatatorWomanEventCommon: 1,
                    countSpeakerEventCommon: 1,
                    countSpeakerWomanEventCommon: 1




                }).toArray();


                Object.defineProperties(result[0], {
                    'Страна': {
                        value: result[0].nameCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Дата события': {
                        value: result[0].myDate,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Имя события': {
                        value: result[0].nameEvent,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Тип события': {
                        value: result[0].nameTypeEvent,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Мероприятие посвящено гендерным вопросам': {
                        value: result[0].nameSubTypeEvent,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Количество участников, общее': {
                        value: result[0].countPeopleEventCommon,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Количество участников, женщин': {
                        value: result[0].countWomanEventCommon,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Количество фасилитаторов, общее': {
                        value: result[0].countFacilatatorEventCommon,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Количество фасилитаторов, женщин': {
                        value: result[0].countFacilatatorWomanEventCommon,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Количество спикеров, общее': {
                        value: result[0].countSpeakerEventCommon,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Количество спикеров, женщин': {
                        value: result[0].countSpeakerWomanEventCommon,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }

                });



               delete result[0].nameCountry;
               delete result[0].nameEvent;
               delete result[0].nameTypeEvent;
               delete result[0].nameSubTypeEvent;
               delete result[0].myDate;
               delete result[0].countPeopleEventCommon;
               delete result[0].countWomanEventCommon;
               delete result[0].countFacilatatorEventCommon;
               delete result[0].countFacilatatorWomanEventCommon;
               delete result[0].countSpeakerEventCommon;
               delete result[0].countSpeakerWomanEventCommon;




            } else if (idTable === "credits") {



                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,
                    nameCountry: 1,
                    nameFactCategcredits: 1,
                    countsubproject : 1,
                    commonAmountInDollors : 1,
                    commonAmountInNatCurrency : 1,
                    DirectBeneficiariesAll : 1,
                    DirectBeneficiariesMale : 1,
                    DirectBeneficiariesFemale : 1,
                    NonDirectBeneficiariesMemberFamilyAll : 1,
                    NonDirectBeneficiariesMemberFamilyMale : 1,
                    NonDirectBeneficiariesMemberFamilyFemale : 1,

                    CreatePowerPlan : 1,
                    CreatePowerFact: 1





                }).toArray();




                Object.defineProperties(result[0], {


                    'Категория кредитов': {
                        value: result[0].nameFactCategcredits,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },


                    'Страна': {
                        value: result[0].nameCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Кол-во субпроектов': {
                        value: result[0].countsubproject,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Общий объем, в долларах': {
                        value: result[0].commonAmountInDollors,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Общий объем, в нац. валюте': {
                        value: result[0].commonAmountInNatCurrency,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Прямые бенефициары (заёмщики и члены их семьи (для заемщиков физ. и юр. лиц), муж.': {
                        value: result[0].DirectBeneficiariesMale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Прямые бенефициары (заёмщики и члены их семьи (для заемщиков физ. и юр. лиц), жен.': {
                        value: result[0].DirectBeneficiariesFemale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },


                    'Прямые бенефициары (заёмщики и члены их семьи (для заемщиков физ. и юр. лиц), общее': {
                        value: result[0].DirectBeneficiariesAll,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },




                    'Прямые бенефициары-наемные работники (для заемщиков физ. лиц и юр. лиц), муж.': {
                        value: result[0].NonDirectBeneficiariesMemberFamilyMale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Прямые бенефициары-наемные работники (для заемщиков физ. лиц и юр. лиц), жен.': {
                        value: result[0].NonDirectBeneficiariesMemberFamilyFemale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Прямые бенефициары-наемные работники (для заемщиков физ. лиц и юр. лиц), всего': {
                        value: result[0].NonDirectBeneficiariesMemberFamilyAll,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },







                    'Создаваемые мощности/Ожидаемый эффект, Га': {
                        value: result[0].CreatePowerPlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Создаваемые мощности/Ожидаемый эффект, Другое': {
                        value: result[0].CreatePowerFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },



                });



               delete result[0].nameCountry;

               delete result[0].countsubproject;
               delete result[0].commonAmountInDollors;
               delete result[0].commonAmountInNatCurrency;
               delete result[0].DirectBeneficiariesAll;
               delete result[0].DirectBeneficiariesMale;
               delete result[0].DirectBeneficiariesFemale;
               delete result[0].NonDirectBeneficiariesMemberFamilyAll;
               delete result[0].NonDirectBeneficiariesMemberFamilyMale;
               delete result[0].NonDirectBeneficiariesMemberFamilyFemale;

               delete result[0].CreatePowerPlan;
               delete result[0].CreatePowerFact;
               delete result[0].nameFactCategcredits;



            } else if (idTable === "grm") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,

                    nameCountry: 1,
                    categName : 1,
                    canalName : 1,
                    statusName : 1,
                    dateInGo : 1,

                    declarerFIO : 1,

                    raisedQuestion : 1,
                    responsibleConsideration : 1,

                    takeAction : 1,
                    lastDateAnswer : 1,
                    dateNotifDeclarer : 1,
                    timeToCheckComplaint : 1,
                    assessmentQualitySatisfactionComplaint : 1




                }).toArray();






                Object.defineProperties(result[0], {
                    'Номер отслеживания': {
                        value: result[0].id,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Страна': {
                        value: result[0].nameCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Категория жалобы': {
                        value: result[0].categName,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Канал получения жалобы': {
                        value: result[0].canalName,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Статус жалобы': {
                        value: result[0].statusName,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Дата получения': {
                        value: result[0].dateInGo,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Заявитель': {
                        value: result[0].declarerFIO,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Возникшие вопросы': {
                        value: result[0].raisedQuestion,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Ответственный за рассмотрение жалобы': {
                        value: result[0].responsibleConsideration,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Принятые меры ': {
                        value: result[0].takeAction,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Крайний срок для ответа заявителю': {
                        value: result[0].lastDateAnswer,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Дата уведомления заявителя': {
                        value: result[0].dateNotifDeclarer,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Время затраченное на рассмотрение жалобы': {
                        value: result[0].timeToCheckComplaint,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Оценка качества удовлетворённости жалобы': {
                        value: result[0].assessmentQualitySatisfactionComplaint,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }




                });





                    delete result[0].nameCountry;
                    delete result[0].categName;
                    delete result[0].canalName;
                    delete result[0].statusName;
                    delete result[0].dateInGo;
                    delete result[0].declarerFIO;
                    delete result[0].raisedQuestion;
                    delete result[0].responsibleConsideration;
                    delete result[0].takeAction;
                    delete result[0].lastDateAnswer;
                    delete result[0].dateNotifDeclarer;
                    delete result[0].timeToCheckComplaint;
                    delete result[0].assessmentQualitySatisfactionComplaint;




            }else if (idTable === "finansial_status") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,

                    nameCountry: 1,

                    BudgetBisbursementPlan: 1,
                    BudgetBisbursementFact: 1,
                    BudgetBisbursementComment: 1,
                    ServicesPlan: 1,
                    ServicesFact: 1,
                    ServicesComment: 1,
                    CreditLinePlan: 1,
                    CreditLineFact: 1,
                    CreditLineComment: 1,
                    OperatingExpensesPlan: 1,
                    OperatingExpensesFact: 1,
                    OperatingExpensesComment: 1,
                    nameQuarter: 1


                }).toArray();




                Object.defineProperties(result[0], {


                    'Страна': {
                    value: result[0].nameCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },



                    'Период': {
                    value: result[0].nameQuarter,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },


                    'Планирование бюджета, План': {
                        value: result[0].BudgetBisbursementPlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Планирование бюджета, Факт': {
                        value: result[0].BudgetBisbursementFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Планирование бюджета, Комментарий': {
                        value: result[0].BudgetBisbursementComment,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Сервис, План': {
                        value: result[0].ServicesPlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Сервис, Факт': {
                        value: result[0].ServicesFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Сервис, Комментарий': {
                        value: result[0].ServicesComment,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }
                    ,
                    'Кредитная линия, План': {
                        value: result[0].CreditLinePlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Кредитная линия, Факт': {
                        value: result[0].CreditLineFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Кредитная линия, Комментарий': {
                        value: result[0].CreditLineComment,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Операционные расходы, План': {
                        value: result[0].OperatingExpensesPlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Операционные расходы, Факт': {
                        value: result[0].OperatingExpensesFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Операционные расходы, Комментарий': {
                        value: result[0].OperatingExpensesComment,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }




                });




                    delete result[0].BudgetBisbursementPlan;
                    delete result[0].BudgetBisbursementFact;
                    delete result[0].BudgetBisbursementComment;
                    delete result[0].ServicesPlan;
                    delete result[0].ServicesFact;
                    delete result[0].ServicesComment;
                    delete result[0].CreditLinePlan;
                    delete result[0].CreditLineFact;
                    delete result[0].CreditLineComment;
                    delete result[0].OperatingExpensesPlan;
                    delete result[0].OperatingExpensesFact;
                    delete result[0].OperatingExpensesComment;
                    delete result[0].nameCountry;
                    delete result[0].nameQuarter;



            }else if (idTable === "finansial_status") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,

                    nameCountry: 1,

                    BudgetBisbursementPlan: 1,
                    BudgetBisbursementFact: 1,
                    BudgetBisbursementComment: 1,
                    ServicesPlan: 1,
                    ServicesFact: 1,
                    ServicesComment: 1,
                    CreditLinePlan: 1,
                    CreditLineFact: 1,
                    CreditLineComment: 1,
                    OperatingExpensesPlan: 1,
                    OperatingExpensesFact: 1,
                    OperatingExpensesComment: 1


                }).toArray();




                Object.defineProperties(result[0], {


                    'Страна': {
                        value: result[0].nameCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Планирование бюджета, План': {
                        value: result[0].BudgetBisbursementPlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Планирование бюджета, Факт': {
                        value: result[0].BudgetBisbursementFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Планирование бюджета, Комментарий': {
                        value: result[0].BudgetBisbursementComment,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Сервис, План': {
                        value: result[0].ServicesPlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Сервис, Факт': {
                        value: result[0].ServicesFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Сервис, Комментарий': {
                        value: result[0].ServicesComment,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }
                    ,
                    'Кредитная линия, План': {
                        value: result[0].CreditLinePlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Кредитная линия, Факт': {
                        value: result[0].CreditLineFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Кредитная линия, Комментарий': {
                        value: result[0].CreditLineComment,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Операционные расходы, План': {
                        value: result[0].OperatingExpensesPlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Операционные расходы, Факт': {
                        value: result[0].OperatingExpensesFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Операционные расходы, Комментарий': {
                        value: result[0].OperatingExpensesComment,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },





                });




                delete result[0].BudgetBisbursementPlan;
                delete result[0].BudgetBisbursementFact;
                delete result[0].BudgetBisbursementComment;
                delete result[0].ServicesPlan;
                delete result[0].ServicesFact;
                delete result[0].ServicesComment;
                delete result[0].CreditLinePlan;
                delete result[0].CreditLineFact;
                delete result[0].CreditLineComment;
                delete result[0].OperatingExpensesPlan;
                delete result[0].OperatingExpensesFact;
                delete result[0].OperatingExpensesComment;
                delete result[0].nameCountry;



            }else if (idTable === "platform_network") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,

                    nameCountry: 1,

                    platform_name: 1,

                    platform_participants: 1,
                    platform_target: 1,
                    platform_subject: 1,
                    platform_typeHelp: 1,
                    platform_results: 1


                }).toArray();




                Object.defineProperties(result[0], {


                    'Страна': {
                        value: result[0].nameCountry.join(","),
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Сеть/ платформа': {
                        value: result[0].platform_name,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Участники': {
                        value: result[0].platform_participants,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Цель': {
                        value: result[0].platform_target,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Тема': {
                        value: result[0].platform_subject,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Тип оказанной поддержки': {
                        value: result[0].platform_typeHelp,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }
                    ,
                    'Достигнутые результаты': {
                        value: result[0].platform_results,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }


                });


                    delete result[0].nameCountry;
                    delete result[0].platform_name;
                    delete result[0].platform_participants;
                    delete result[0].platform_target;
                    delete result[0].platform_subject;
                    delete result[0].platform_typeHelp;
                    delete result[0].platform_results;



            }else if (idTable === "project") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,

                    nameCountry: 1,
                    programm: 1,
                    sector: 1,
                    developers: 1,
                    executorAgents: 1,
                    executorAgentsContacts: 1,
                    projectDescription: 1

                }).toArray();



                Object.defineProperties(result[0], {

                    'Страна': {
                        value: result[0].nameCountry.join(","),
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Название программы': {
                        value: result[0].programm,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Сфера/сектор': {
                        value: result[0].sector,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Разработчики': {
                        value: result[0].developers,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Реализующее агенство': {
                        value: result[0].executorAgents,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Контакты': {
                        value: result[0].executorAgentsContacts,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Краткое описание использованного ноу-хау проекта': {
                        value: result[0].projectDescription,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }


                });


                delete result[0].programm;
                delete result[0].nameCountry;
                delete result[0].sector;
                delete result[0].developers;
                delete result[0].executorAgents;
                delete result[0].executorAgentsContacts;
                delete result[0].projectDescription;


            }else if (idTable === "regional_invest") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,


                    typeInvest: 1,
                    sizeInvest: 1,
                    investor: 1,
                    coloborationCountry: 1,
                    executorWithContact: 1,
                    descriptionInvest: 1,
                    executorAgentsContacts: 1





                }).toArray();



                Object.defineProperties(result[0], {

                    'Тип инвестиций': {
                        value: result[0].typeInvest,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Размер инвестиций': {
                        value: result[0].sizeInvest,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Инвестор': {
                        value: result[0].investor,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Сотрудничающие страны': {
                        value: result[0].coloborationCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Исполнительный деятель с контактами': {
                        value: result[0].executorWithContact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Краткое описание совместной деятельности, приведшей к инвестициям': {
                        value: result[0].descriptionInvest,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }
                    ,
                    'Контактные данные реализующего агенства': {
                        value: result[0].executorAgentsContacts,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }


                });


                delete result[0].typeInvest;
                delete result[0].sizeInvest;
                delete result[0].investor;
                delete result[0].coloborationCountry;
                delete result[0].executorWithContact;
                delete result[0].descriptionInvest;
                delete result[0].executorAgentsContacts;

            }else if (idTable === "mobile_resurse") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,



                    projectIniciativ: 1,

                    amountFinance: 1,
                    sourceFinance: 1,
                    mainDestination: 1,
                    executorProject: 1,
                    contactExecutor: 1,
                    mobileOther: 1


                }).toArray();




                Object.defineProperties(result[0], {

                    'Проект/инициатива': {
                        value: result[0].projectIniciativ,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Объем финансирования': {
                        value: result[0].amountFinance,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Источник финансирования': {
                        value: result[0].sourceFinance,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Основное назначение': {
                        value: result[0].mainDestination.join(","),
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Другое': {
                        value: result[0].mobileOther,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },


                    'Исполнитель проекта': {
                        value: result[0].executorProject,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }
                    ,
                    'Контактные данные исполнителя': {
                        value: result[0].contactExecutor,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }


                });


                delete result[0].projectIniciativ;
                delete result[0].mobileOther;
                delete result[0].amountFinance;
                delete result[0].sourceFinance;
                delete result[0].mainDestination;
                delete result[0].executorProject;
                delete result[0].contactExecutor;



            } else if (idTable === "strategic") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,



                    nameCountry: 1,

                    nameYear: 1,
                    urlExcel: 1,



                }).toArray();




                Object.defineProperties(result[0], {

                    'Страна': {
                        value: result[0].nameCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },

                    'Год': {
                        value: result[0].nameYear,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Путь до Excel файла': {
                        value: result[0].urlExcel,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }


                });


                delete result[0].nameCountry;
                delete result[0].nameYear;
                delete result[0].urlExcel;



            }



            return result;

        } catch (err){


            return err;

        }







    }







};