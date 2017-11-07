/**
 * Created by simvolice on 06.11.2017 15:15
 */



const dbConnect = require('../utils/dbConnect');


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
                    categcredits : 1,
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
                    nameFact: 1




                }).toArray();


                Object.defineProperties(result[0], {
                    'Страна': {
                        value: result[0].nameCountry,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    },
                    'Категория кредитов': {
                        value: result[0].categcredits,
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
                    'Создаваемые мощности/Ожидаемый эффект, Факт': {
                        value: result[0].nameFact,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    }



                });



               delete result[0].nameCountry;
               delete result[0].categcredits;
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
               delete result[0].nameFact;



            }


            console.log("\x1b[42m", result);

            return result;

        } catch (err){


            return err;

        }







    },







};