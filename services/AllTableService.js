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
                    NonDirectBeneficiariesHiredAll : 1,
                    NonDirectBeneficiariesHiredMale : 1,
                    NonDirectBeneficiariesHiredFemale : 1,
                    CreatePowerPlan : 1,
                    CreatePowerFact: 1





                }).toArray();


                console.log("\x1b[42m", result);



                Object.defineProperties(result[0], {
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
                    'Прямые бенефециары, общее': {
                        value: result[0].DirectBeneficiariesAll,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Прямые бенефециары, муж.': {
                        value: result[0].DirectBeneficiariesMale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Прямые бенефециары, жен.': {
                        value: result[0].DirectBeneficiariesFemale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Непрямые бенефециары (члены семей), всего': {
                        value: result[0].NonDirectBeneficiariesMemberFamilyAll,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Непрямые бенефециары (члены семей), муж.': {
                        value: result[0].NonDirectBeneficiariesMemberFamilyMale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Непрямые бенефециары (члены семей), жен.': {
                        value: result[0].NonDirectBeneficiariesMemberFamilyFemale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Непрямые бенефециары (наемные работники), всего': {
                        value: result[0].NonDirectBeneficiariesHiredAll,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Непрямые бенефециары (наемные работники), муж.': {
                        value: result[0].NonDirectBeneficiariesHiredMale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Непрямые бенефециары (наемные работники), жен.': {
                        value: result[0].NonDirectBeneficiariesHiredFemale,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Создаваемые мощности/Ожидаемый эффект, План Га': {
                        value: result[0].CreatePowerPlan,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Создаваемые мощности/Ожидаемый эффект, Факт Га': {
                        value: result[0].CreatePowerFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Категория кредитов': {
                        value: result[0].nameFactCategcredits,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }



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
               delete result[0].NonDirectBeneficiariesHiredAll;
               delete result[0].NonDirectBeneficiariesHiredMale;
               delete result[0].NonDirectBeneficiariesHiredFemale;
               delete result[0].CreatePowerPlan;
               delete result[0].CreatePowerFact;
               delete result[0].nameFactCategcredits;



            } else if (idTable === "grm") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,
                    id: 1,
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
                    timeToCheckComplaint : 1




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
                    }



                });




                    delete result[0].id;
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




            }else if (idTable === "finansial_status") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,
                    id: 1,
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
                    'Номер': {
                        value: result[0].id,
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
                    'Страна': {
                        value: result[0].nameCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }




                });



                    delete result[0].id;
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



            }else if (idTable === "finansial_status") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,
                    id: 1,
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
                    'Номер': {
                        value: result[0].id,
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
                    'Страна': {
                        value: result[0].nameCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }




                });



                delete result[0].id;
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
                    id: 1,
                    nameCountry: 1,

                    projectIniciativ: 1,

                    amountFinance: 1,
                    sourceFinance: 1,
                    mainDestination: 1,
                    executorProject: 1,
                    contactExecutor: 1


                }).toArray();




                Object.defineProperties(result[0], {
                    'Номер': {
                        value: result[0].id,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Проект/инициатива': {
                        value: result[0].projectIniciativ,
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
                        value: result[0].mainDestination,
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
                    'Контакты исполнителя': {
                        value: result[0].contactExecutor,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }


                });

                    delete result[0].id;
                    delete result[0].projectIniciativ;
                    delete result[0].nameCountry;
                    delete result[0].amountFinance;
                    delete result[0].sourceFinance;
                    delete result[0].mainDestination;
                    delete result[0].executorProject;
                    delete result[0].contactExecutor;



            }else if (idTable === "project") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,
                    id: 1,
                    nameCountry: 1,

                    programm: 1,
                    sector: 1,
                    developers: 1,
                    executorAgents: 1

                }).toArray();



                Object.defineProperties(result[0], {
                    'Номер': {
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
                    'Программа': {
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
                    }


                });

                delete result[0].id;
                delete result[0].programm;
                delete result[0].nameCountry;
                delete result[0].sector;
                delete result[0].developers;
                delete result[0].executorAgents;


            }else if (idTable === "regional_invest") {




                const col = dbConnect.getConnect().collection(idTable);


                result = await col.find({}, {

                    _id: 0,
                    id: 1,
                    nameCountry: 1,
                    typeInvest: 1,
                    sizeInvest: 1,
                    investor: 1,
                    coloborationCountry: 1,
                    executorWithContact: 1,
                    descriptionInvest: 1,
                    executorAgentsContacts: 1

                }).toArray();



                Object.defineProperties(result[0], {
                    'Номер': {
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

                delete result[0].id;
                delete result[0].nameCountry;
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
                    id: 1,
                    nameCountry: 1,

                    projectIniciativ: 1,

                    amountFinance: 1,
                    sourceFinance: 1,
                    mainDestination: 1,
                    executorProject: 1,
                    contactExecutor: 1


                }).toArray();




                Object.defineProperties(result[0], {
                    'Номер': {
                        value: result[0].id,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Проект/инициатива': {
                        value: result[0].projectIniciativ,
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
                        value: result[0].mainDestination,
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
                    'Контакты исполнителя': {
                        value: result[0].contactExecutor,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }


                });

                delete result[0].id;
                delete result[0].projectIniciativ;
                delete result[0].nameCountry;
                delete result[0].amountFinance;
                delete result[0].sourceFinance;
                delete result[0].mainDestination;
                delete result[0].executorProject;
                delete result[0].contactExecutor;



            }



            return result;

        } catch (err){


            return err;

        }







    },




    getById: async (id) => {


        try {

            const col = dbConnect.getConnect().collection("strategic");
            let arrResult = [];

            let result = await col.findOne({_id: ObjectId(id)}, {

                _id: 0,
                id: 0,
                country: 0,
                createAt: 0,





            });


            arrResult[0] = {};


            Object.defineProperties(arrResult[0], {

                'Индикаторы': {
                    value: result.countMeetingTitle,
                    writable: true,
                    enumerable: true,
                    configurable: true
                },
                'Запланированы на 1 год': {
                    value: result.countMeetingPlanOnOneYear,
                    writable: true,
                    enumerable: true,
                    configurable: true
                },
                'Достигнуты на 1 год': {
                    value: result.countMeetingFinishOnOneYear,
                    writable: true,
                    enumerable: true,
                    configurable: true
                },
                'Детали/Объяснение': {
                    value: result.countMeetingDescription,
                    writable: true,
                    enumerable: true,
                    configurable: true
                }

            });



            arrResult.push({

                countEventHighLevelTitle: result.countEventHighLevelTitle,
                "countEventHighLevelPlanOnOneYear" : result.countEventHighLevelPlanOnOneYear,
                "countEventHighLevelFinishOnOneYear" : result.countEventHighLevelFinishOnOneYear,
                "countEventHighLevelDescription" : result.countEventHighLevelDescription


            });



            arrResult.push({

                "countInfoRequest" : result.countInfoRequest,
                "countInfoRequestPlanOnOneYear" : result.countInfoRequestPlanOnOneYear,
                "countInfoRequestFinishOnOneYear" : result.countInfoRequestFinishOnOneYear,
                "countInfoRequestDescription" : result.countInfoRequestDescription

            });


            arrResult.push({

                "countNetWorkTitle" : result.countNetWorkTitle,
                "countNetWorkPlanOnOneYear" : result.countNetWorkPlanOnOneYear,
                "countNetWorkFinishOnOneYear" : result.countNetWorkFinishOnOneYear,
                "countNetWorkDescription" : result.countNetWorkDescription
            });



            arrResult.push({

                "countStartPartnerTitle" : result.countStartPartnerTitle,
                "countStartPartnerPlanOnOneYear" : result.countStartPartnerPlanOnOneYear,
                "countStartPartnerFinishOnOneYear" : result.countStartPartnerFinishOnOneYear,
                "countStartPartnerDescription" : result.countStartPartnerDescription
            });



            arrResult.push({

                "countOnlineConferenceTitle" : result.countOnlineConferenceTitle,
                "countOnlineConferencePlanOnOneYear" : result.countOnlineConferencePlanOnOneYear,
                "countOnlineConferenceFinishOnOneYear" : result.countOnlineConferenceFinishOnOneYear,
                "countOnlineConferenceDescription" : result.countOnlineConferenceDescription
            });



            arrResult.push({

                "countMeetingPressTitle" : result.countMeetingPressTitle,
                "countMeetingPressPlanOnOneYear" : result.countMeetingPressPlanOnOneYear,
                "countMeetingPressFinishOnOneYear" : result.countMeetingPressFinishOnOneYear,
                "countMeetingPressDescription" : result.countMeetingPressDescription
            });





            arrResult.push({

                "countCreatePressDocTitle" : result.countCreatePressDocTitle,
                "countCreatePressDocPlanOnOneYear" : result.countCreatePressDocPlanOnOneYear,
                "countCreatePressDocFinishOnOneYear" : result.countCreatePressDocFinishOnOneYear,
                "countCreatePressDocDescription" : result.countCreatePressDocDescription
            });



            arrResult.push({

                "countPublishInPressTitle" : result.countPublishInPressTitle,
                "countPublishInPressPlanOnOneYear" : result.countPublishInPressPlanOnOneYear,
                "countPublishInPressFinishOnOneYear" : result.countPublishInPressFinishOnOneYear,
                "countPublishInPressDescription" : result.countPublishInPressDescription
            });



            arrResult.push({

                "countReadersTitle" : result.countReadersTitle,
                "countReadersPlanOnOneYear" : result.countReadersPlanOnOneYear,
                "countReadersFinishOnOneYear" : result.countReadersFinishOnOneYear,
                "countReadersDescription" : result.countReadersDescription
            });




            arrResult.push({

                "countOnlineChannelsTitle" : result.countOnlineChannelsTitle,
                "countOnlineChannelsPlanOnOneYear" : result.countOnlineChannelsPlanOnOneYear,
                "countOnlineChannelsFinishOnOneYear" : result.countOnlineChannelsFinishOnOneYear,
                "countOnlineChannelsDescription" : result.countOnlineChannelsDescription
            });



            arrResult.push({

                "countInfoAboutPartnersPageTitle" : result.countInfoAboutPartnersPageTitle,
                "countInfoAboutPartnersPagePlanOnOneYear" : result.countInfoAboutPartnersPagePlanOnOneYear,
                "countInfoAboutPartnersPageFinishOnOneYear" : result.countInfoAboutPartnersPageFinishOnOneYear,
                "countInfoAboutPartnersPageDescription" : result.countInfoAboutPartnersPageDescription
            });




            arrResult.push({

                "countPeopleOnSiteTitle" : result.countPeopleOnSiteTitle,
                "countPeopleOnSitePlanOnOneYear" : result.countPeopleOnSitePlanOnOneYear,
                "countPeopleOnSiteFinishOnOneYear" : result.countPeopleOnSiteFinishOnOneYear,
                "countPeopleOnSiteDescription" : result.countPeopleOnSiteDescription
            });


            arrResult.push({

                "countDigitalPeopleTitle" : result.countDigitalPeopleTitle,
                "countDigitalPeoplePlanOnOneYear" : result.countDigitalPeoplePlanOnOneYear,
                "countDigitalPeopleFinishOnOneYear" : result.countDigitalPeopleFinishOnOneYear,
                "countDigitalPeopleDescription" : result.countDigitalPeopleDescription
            });



            arrResult.push({

                "countDownloadInfoMaterialTitle" : result.countDownloadInfoMaterialTitle,
                "countDownloadInfoMaterialPlanOnOneYear" : result.countDownloadInfoMaterialPlanOnOneYear,
                "countDownloadInfoMaterialFinishOnOneYear" : result.countDownloadInfoMaterialFinishOnOneYear,
                "countDownloadInfoMaterialDescription" : result.countDownloadInfoMaterialDescription
            });



            arrResult.push({

                "countVisitsTitle" : result.countVisitsTitle,
                "countVisitsPlanOnOneYear" : result.countVisitsPlanOnOneYear,
                "countVisitsFinishOnOneYear" : result.countVisitsFinishOnOneYear,
                "countVisitsDescription" : result.countVisitsDescription
            });



            arrResult.push({

                "countMaleAndFemaleInInfoMaterialTitle" : result.countMaleAndFemaleInInfoMaterialTitle,
                "countMaleAndFemaleInInfoMaterialPlanOnOneYear" : result.countMaleAndFemaleInInfoMaterialPlanOnOneYear,
                "countMaleAndFemaleInInfoMaterialFinishOnOneYear" : result.countMaleAndFemaleInInfoMaterialFinishOnOneYear,
                "countMaleAndFemaleInInfoMaterialDescription" : result.countMaleAndFemaleInInfoMaterialDescription
            });



            arrResult.push({
                "countMaleAndFemaleTitle" : result.countMaleAndFemaleTitle,
                "countMaleAndFemalePlanOnOneYear" : result.countMaleAndFemalePlanOnOneYear,
                "countMaleAndFemaleFinishOnOneYear" : result.countMaleAndFemaleFinishOnOneYear,
                "countMaleAndFemaleDescription" : result.countMaleAndFemaleDescription
            });




            console.log("\x1b[42m", arrResult);


            return arrResult;

        }catch(err) {

            console.log("\x1b[42m", err);

            return err;


        }






    }







};