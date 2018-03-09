/**
 * Created by simvolice on 25.08.2017 18:47
 */




const dbConnect = require('../utils/dbConnect');


const ObjectId = require('mongodb').ObjectId;

const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');
const NameYear = require('../services/NameYear');



module.exports = {


    addStrategy: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');
            let seq = await CounterService.getNextSequence("strategic_id");
            let nameCountry = await CountryService.getCountryById(objParams.country);

            const result = await col.insertOne({

                id: seq,
                country: ObjectId(objParams.country),
                nameCountry: nameCountry.name,

                countMeetingTitle: "Количество организованных личных встреч и взаимодействий (форумы, воркшопы, семинары, общественные диалоги, политические диалоги, личные встречи) и количество участников",
               countMeetingPlanOnOneYear: objParams.countMeetingPlanOnOneYear,
               countMeetingFinishOnOneYear: objParams.countMeetingFinishOnOneYear,
               countMeetingDescription: objParams.countMeetingDescription,

                countEventHighLevelTitle: "Количество мероприятий высокого уровня, где была представлена программа CAMP4ASB",
                countEventHighLevelPlanOnOneYear: objParams.countEventHighLevelPlanOnOneYear,
               countEventHighLevelFinishOnOneYear: objParams.countEventHighLevelFinishOnOneYear,
               countEventHighLevelDescription: objParams.countEventHighLevelDescription,


                countInfoRequest: "Количество информационных запросов от заинтересованных сторон",
                countInfoRequestPlanOnOneYear: objParams.countInfoRequestPlanOnOneYear,
               countInfoRequestFinishOnOneYear: objParams.countInfoRequestFinishOnOneYear,
               countInfoRequestDescription: objParams.countInfoRequestDescription,


                countNetWorkTitle: "Количество коалиций / сетей, созданных и усиленных CAMP4ASB",
                countNetWorkPlanOnOneYear: objParams.countNetWorkPlanOnOneYear,
               countNetWorkFinishOnOneYear: objParams.countNetWorkFinishOnOneYear,
               countNetWorkDescription: objParams.countNetWorkDescription,


                countStartPartnerTitle: "Количество запущенных совместных партнерских инициатив",

                countStartPartnerPlanOnOneYear: objParams.countStartPartnerPlanOnOneYear,
               countStartPartnerFinishOnOneYear: objParams.countStartPartnerFinishOnOneYear,
               countStartPartnerDescription: objParams.countStartPartnerDescription,

                countOnlineConferenceTitle: "Количество организованных онлайн-конференций и количество участников",
                countOnlineConferencePlanOnOneYear: objParams.countOnlineConferencePlanOnOneYear,
               countOnlineConferenceFinishOnOneYear: objParams.countOnlineConferenceFinishOnOneYear,
               countOnlineConferenceDescription: objParams.countOnlineConferenceDescription,


                countMeetingPressTitle: "Количество встреч со СМИ (тренинги в СМИ, пресс-конференции, выезды на места)",
                countMeetingPressPlanOnOneYear: objParams.countMeetingPressPlanOnOneYear,
               countMeetingPressFinishOnOneYear: objParams.countMeetingPressFinishOnOneYear,
               countMeetingPressDescription: objParams.countMeetingPressDescription,



                countCreatePressDocTitle: "Количество изданных печатных документов (отчеты, краткие политические обзоры, брошюры, инфографика, информационные бюллетени, информационные продукты)",
                countCreatePressDocPlanOnOneYear: objParams.countCreatePressDocPlanOnOneYear,
               countCreatePressDocFinishOnOneYear: objParams.countCreatePressDocFinishOnOneYear,
               countCreatePressDocDescription: objParams.countCreatePressDocDescription,



                countPublishInPressTitle: "Количество публикаций в СМИ (газетные статьи, телевидение, радио, интернет-медиа)",

                countPublishInPressPlanOnOneYear: objParams.countPublishInPressPlanOnOneYear,
               countPublishInPressFinishOnOneYear: objParams.countPublishInPressFinishOnOneYear,
               countPublishInPressDescription: objParams.countPublishInPressDescription,



                countReadersTitle: "Количество читателей, которым были распространены информационные материалы о проекте",
                countReadersPlanOnOneYear: objParams.countReadersPlanOnOneYear,
               countReadersFinishOnOneYear: objParams.countReadersFinishOnOneYear,
               countReadersDescription: objParams.countReadersDescription,

                countOnlineChannelsTitle: "Количество онлайн-каналов CAMP4ASB",

                countOnlineChannelsPlanOnOneYear: objParams.countOnlineChannelsPlanOnOneYear,
               countOnlineChannelsFinishOnOneYear: objParams.countOnlineChannelsFinishOnOneYear,
               countOnlineChannelsDescription: objParams.countOnlineChannelsDescription,




                countInfoAboutPartnersPageTitle: "Информация о партнерских страницах (обмен информацией в интернете, блогах, социальных сетях) о деятельности или новостях CAMP4ASB",



                countInfoAboutPartnersPagePlanOnOneYear: objParams.countInfoAboutPartnersPagePlanOnOneYear,
               countInfoAboutPartnersPageFinishOnOneYear: objParams.countInfoAboutPartnersPageFinishOnOneYear,
               countInfoAboutPartnersPageDescription: objParams.countInfoAboutPartnersPageDescription,


                countPeopleOnSiteTitle: "Количество онлайн-посетителей на веб-сайте и в социальных сетях из региона Центральной Азии",

                countPeopleOnSitePlanOnOneYear: objParams.countPeopleOnSitePlanOnOneYear,
               countPeopleOnSiteFinishOnOneYear: objParams.countPeopleOnSiteFinishOnOneYear,
               countPeopleOnSiteDescription: objParams.countPeopleOnSiteDescription,



                countDigitalPeopleTitle: "Количество цифровых подписчиков на информационный бюллетень CAMP4ASB из региона Центральной Азии",


                countDigitalPeoplePlanOnOneYear: objParams.countDigitalPeoplePlanOnOneYear,
               countDigitalPeopleFinishOnOneYear: objParams.countDigitalPeopleFinishOnOneYear,
               countDigitalPeopleDescription: objParams.countDigitalPeopleDescription,




                countDownloadInfoMaterialTitle: "Количество загрузок информационных материалов CAMP4ASB",
                countDownloadInfoMaterialPlanOnOneYear: objParams.countDownloadInfoMaterialPlanOnOneYear,
               countDownloadInfoMaterialFinishOnOneYear: objParams.countDownloadInfoMaterialFinishOnOneYear,
               countDownloadInfoMaterialDescription: objParams.countDownloadInfoMaterialDescription,



                countVisitsTitle: "Количество посетителей информационной платформы CAMP4ASB",
                countVisitsPlanOnOneYear: objParams.countVisitsPlanOnOneYear,
               countVisitsFinishOnOneYear: objParams.countVisitsFinishOnOneYear,
               countVisitsDescription: objParams.countVisitsDescription,



                countMaleAndFemaleInInfoMaterialTitle: "Количество мужчин и женщин, опоминающихся в информационных материалах",
                countMaleAndFemaleInInfoMaterialPlanOnOneYear: objParams.countMaleAndFemaleInInfoMaterialPlanOnOneYear,
               countMaleAndFemaleInInfoMaterialFinishOnOneYear: objParams.countMaleAndFemaleInInfoMaterialFinishOnOneYear,
               countMaleAndFemaleInInfoMaterialDescription: objParams.countMaleAndFemaleInInfoMaterialDescription,


                countMaleAndFemaleTitle: "Количество охваченных мужчин и женщин (по возможности)",
                countMaleAndFemalePlanOnOneYear: objParams.countMaleAndFemalePlanOnOneYear,
               countMaleAndFemaleFinishOnOneYear: objParams.countMaleAndFemaleFinishOnOneYear,
               countMaleAndFemaleDescription: objParams.countMaleAndFemaleDescription,
               createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )




            });



            return result;

        } catch (err){


            return err;

        }











    },

    getAll: async (year)=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');
            let nameYear = await NameYear.getYearById(year);

            const result = await col.aggregate([
                { $match : { } },




                {
                    $addFields:
                        {

                            allCountrys: await CountryService.getAllCountrys(),
                            year: { $year: "$createAt" }

                        }
                },


                {

                    $match: {year: nameYear.codeName}

                },






            ]).toArray();




            return result;

        } catch (err){


            return err;

        }











    },

    updStrategic: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');
            let nameCountry = await CountryService.getCountryById(objParams.country);


            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    country: ObjectId(objParams.country),
                    nameCountry: nameCountry.name,

                    countMeetingPlanOnOneYear: objParams.countMeetingPlanOnOneYear,
                    countMeetingFinishOnOneYear: objParams.countMeetingFinishOnOneYear,
                    countMeetingDescription: objParams.countMeetingDescription,
                    countEventHighLevelPlanOnOneYear: objParams.countEventHighLevelPlanOnOneYear,
                    countEventHighLevelFinishOnOneYear: objParams.countEventHighLevelFinishOnOneYear,
                    countEventHighLevelDescription: objParams.countEventHighLevelDescription,
                    countInfoRequestPlanOnOneYear: objParams.countInfoRequestPlanOnOneYear,
                    countInfoRequestFinishOnOneYear: objParams.countInfoRequestFinishOnOneYear,
                    countInfoRequestDescription: objParams.countInfoRequestDescription,
                    countNetWorkPlanOnOneYear: objParams.countNetWorkPlanOnOneYear,
                    countNetWorkFinishOnOneYear: objParams.countNetWorkFinishOnOneYear,
                    countNetWorkDescription: objParams.countNetWorkDescription,
                    countStartPartnerPlanOnOneYear: objParams.countStartPartnerPlanOnOneYear,
                    countStartPartnerFinishOnOneYear: objParams.countStartPartnerFinishOnOneYear,
                    countStartPartnerDescription: objParams.countStartPartnerDescription,
                    countOnlineConferencePlanOnOneYear: objParams.countOnlineConferencePlanOnOneYear,
                    countOnlineConferenceFinishOnOneYear: objParams.countOnlineConferenceFinishOnOneYear,
                    countOnlineConferenceDescription: objParams.countOnlineConferenceDescription,
                    countMeetingPressPlanOnOneYear: objParams.countMeetingPressPlanOnOneYear,
                    countMeetingPressFinishOnOneYear: objParams.countMeetingPressFinishOnOneYear,
                    countMeetingPressDescription: objParams.countMeetingPressDescription,
                    countCreatePressDocPlanOnOneYear: objParams.countCreatePressDocPlanOnOneYear,
                    countCreatePressDocFinishOnOneYear: objParams.countCreatePressDocFinishOnOneYear,
                    countCreatePressDocDescription: objParams.countCreatePressDocDescription,
                    countPublishInPressPlanOnOneYear: objParams.countPublishInPressPlanOnOneYear,
                    countPublishInPressFinishOnOneYear: objParams.countPublishInPressFinishOnOneYear,
                    countPublishInPressDescription: objParams.countPublishInPressDescription,
                    countReadersPlanOnOneYear: objParams.countReadersPlanOnOneYear,
                    countReadersFinishOnOneYear: objParams.countReadersFinishOnOneYear,
                    countReadersDescription: objParams.countReadersDescription,
                    countOnlineChannelsPlanOnOneYear: objParams.countOnlineChannelsPlanOnOneYear,
                    countOnlineChannelsFinishOnOneYear: objParams.countOnlineChannelsFinishOnOneYear,
                    countOnlineChannelsDescription: objParams.countOnlineChannelsDescription,
                    countInfoAboutPartnersPagePlanOnOneYear: objParams.countInfoAboutPartnersPagePlanOnOneYear,
                    countInfoAboutPartnersPageFinishOnOneYear: objParams.countInfoAboutPartnersPageFinishOnOneYear,
                    countInfoAboutPartnersPageDescription: objParams.countInfoAboutPartnersPageDescription,
                    countPeopleOnSitePlanOnOneYear: objParams.countPeopleOnSitePlanOnOneYear,
                    countPeopleOnSiteFinishOnOneYear: objParams.countPeopleOnSiteFinishOnOneYear,
                    countPeopleOnSiteDescription: objParams.countPeopleOnSiteDescription,
                    countDigitalPeoplePlanOnOneYear: objParams.countDigitalPeoplePlanOnOneYear,
                    countDigitalPeopleFinishOnOneYear: objParams.countDigitalPeopleFinishOnOneYear,
                    countDigitalPeopleDescription: objParams.countDigitalPeopleDescription,
                    countDownloadInfoMaterialPlanOnOneYear: objParams.countDownloadInfoMaterialPlanOnOneYear,
                    countDownloadInfoMaterialFinishOnOneYear: objParams.countDownloadInfoMaterialFinishOnOneYear,
                    countDownloadInfoMaterialDescription: objParams.countDownloadInfoMaterialDescription,
                    countVisitsPlanOnOneYear: objParams.countVisitsPlanOnOneYear,
                    countVisitsFinishOnOneYear: objParams.countVisitsFinishOnOneYear,
                    countVisitsDescription: objParams.countVisitsDescription,
                    countMaleAndFemaleInInfoMaterialPlanOnOneYear: objParams.countMaleAndFemaleInInfoMaterialPlanOnOneYear,
                    countMaleAndFemaleInInfoMaterialFinishOnOneYear: objParams.countMaleAndFemaleInInfoMaterialFinishOnOneYear,
                    countMaleAndFemaleInInfoMaterialDescription: objParams.countMaleAndFemaleInInfoMaterialDescription,
                    countMaleAndFemalePlanOnOneYear: objParams.countMaleAndFemalePlanOnOneYear,
                    countMaleAndFemaleFinishOnOneYear: objParams.countMaleAndFemaleFinishOnOneYear,
                    countMaleAndFemaleDescription: objParams.countMaleAndFemaleDescription




                }



            });



            return result;

        } catch (err){


            return err;

        }











    },

    delStrategic: async (id)=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');


            const result = await col.deleteOne({_id: ObjectId(id)});



            return result;

        } catch (err){


            return err;

        }











    }



};