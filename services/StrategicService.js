/**
 * Created by simvolice on 25.08.2017 18:47
 */




const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');

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