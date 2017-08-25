/**
 * Created by simvolice on 25.08.2017 18:47
 */




const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');

const ObjectId = require('mongodb').ObjectId;

const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');




module.exports = {


    addStrategy: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');
            let seq = await CounterService.getNextSequence("strategic_id");


            const result = await col.insertOne({

                id: seq,
                country: ObjectId(objParams.country),

                NumberFaceFacePlan: objParams.NumberFaceFacePlan,
                NumberFaceFaceFact: objParams.NumberFaceFaceFact,
                NumberFaceFaceDetail: objParams.NumberFaceFaceDetail,
                NumberHighLevelPlan: objParams.NumberHighLevelPlan,
                NumberHighLeveleFact: objParams.NumberHighLeveleFact,
                NumberHighLevelDetail: objParams.NumberHighLevelDetail,
                NumberInformationPlan: objParams.NumberInformationPlan,
                NumberInformationFact: objParams.NumberInformationFact,
                NumberInformationDetail: objParams.NumberInformationDetail,
                NumberCoalitionsPlan: objParams.NumberCoalitionsPlan,
                NumberCoalitionsFact: objParams.NumberCoalitionsFact,
                NumberCoalitionsDetail: objParams.NumberCoalitionsDetail,
                NumberJointPartnershipPlan: objParams.NumberJointPartnershipPlan,
                NumberJointPartnershipFact: objParams.NumberJointPartnershipFact,
                NumberJointPartnershipDetail: objParams.NumberJointPartnershipDetail,
                NumberWebConferencingPlan: objParams.NumberWebConferencingPlan,
                NumberWebConferencingFact: objParams.NumberWebConferencingFact,
                NumberWebConferencingDetail: objParams.NumberWebConferencingDetail,
                NumberMeetingsMediaPlan: objParams.NumberMeetingsMediaPlan,
                NumberMeetingsMediaFact: objParams.NumberMeetingsMediaFact,
                NumberMeetingsMediaDetail: objParams.NumberMeetingsMediaDetail,
                NumberPrintedDocumentsPlan: objParams.NumberPrintedDocumentsPlan,
                NumberPrintedDocumentsFact: objParams.NumberPrintedDocumentsFact,
                NumberPrintedDocumentsDetail: objParams.NumberPrintedDocumentsDetail,
                NumberMediaPublicityPlan: objParams.NumberMediaPublicityPlan,
                NumberMediaPublicityFact: objParams.NumberMediaPublicityFact,
                NumberMediaPublicityDetail: objParams.NumberMediaPublicityDetail,
                NumberReadersPlan: objParams.NumberReadersPlan,
                NumberReadersFact: objParams.NumberReadersFact,
                NumberReadersDetail: objParams.NumberReadersDetail,
                NumberOnlineChannelsPlan: objParams.NumberOnlineChannelsPlan,
                NumberOnlineChannelsFact: objParams.NumberOnlineChannelsFact,
                NumberOnlineChannelsDetail: objParams.NumberOnlineChannelsDetail,
                InformationPartnerPagesPlan: objParams.InformationPartnerPagesPlan,
                InformationPartnerPagesFact: objParams.InformationPartnerPagesFact,
                InformationPartnerPagesDetail: objParams.InformationPartnerPagesDetail,
                NumberOnlineVisitorsPlan: objParams.NumberOnlineVisitorsPlan,
                NumberOnlineVisitorsFact: objParams.NumberOnlineVisitorsFact,
                NumberOnlineVisitorsDetail: objParams.NumberOnlineVisitorsDetail,
                NumberDigitalSubscribersPlan: objParams.NumberDigitalSubscribersPlan,
                NumberDigitalSubscribersFact: objParams.NumberDigitalSubscribersFact,
                NumberDigitalSubscribersDetail: objParams.NumberDigitalSubscribersDetail,
                NumberDownloadsPlan: objParams.NumberDownloadsPlan,
                NumberDownloadsFact: objParams.NumberDownloadsFact,
                NumberDownloadsDetail: objParams.NumberDownloadsDetail,
                NumberVisitorsCAMP4ASBPlan: objParams.NumberVisitorsCAMP4ASBPlan,
                NumberVisitorsCAMP4ASBFact: objParams.NumberVisitorsCAMP4ASBFact,
                NumberVisitorsCAMP4ASBDetail: objParams.NumberVisitorsCAMP4ASBDetail,
                NumberMenWomenFeaturedPlan: objParams.NumberMenWomenFeaturedPlan,
                NumberMenWomenFeaturedFact: objParams.NumberMenWomenFeaturedFact,
                NumberMenWomenFeaturedDetail: objParams.NumberMenWomenFeaturedDetail,
                NumberMenWomenReachedPlan: objParams.NumberMenWomenReachedPlan,
                NumberMenWomenReachedFact: objParams.NumberMenWomenReachedFact,
                NumberMenWomenReachedDetail: objParams.NumberMenWomenReachedDetail





            });



            return result;

        } catch (err){


            return err;

        }











    },

    getAll: async ()=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');


            const result = await col.aggregate([
                { $match : { } },


                { $addFields: {

                    allCountrys: await CountryService.getAllCountrys()
                }}





            ]).toArray();




            return result;

        } catch (err){


            return err;

        }











    },

    updStrategic: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('strategic');


            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    country: ObjectId(objParams.country),

                    NumberFaceFacePlan: objParams.NumberFaceFacePlan,
                    NumberFaceFaceFact: objParams.NumberFaceFaceFact,
                    NumberFaceFaceDetail: objParams.NumberFaceFaceDetail,
                    NumberHighLevelPlan: objParams.NumberHighLevelPlan,
                    NumberHighLeveleFact: objParams.NumberHighLeveleFact,
                    NumberHighLevelDetail: objParams.NumberHighLevelDetail,
                    NumberInformationPlan: objParams.NumberInformationPlan,
                    NumberInformationFact: objParams.NumberInformationFact,
                    NumberInformationDetail: objParams.NumberInformationDetail,
                    NumberCoalitionsPlan: objParams.NumberCoalitionsPlan,
                    NumberCoalitionsFact: objParams.NumberCoalitionsFact,
                    NumberCoalitionsDetail: objParams.NumberCoalitionsDetail,
                    NumberJointPartnershipPlan: objParams.NumberJointPartnershipPlan,
                    NumberJointPartnershipFact: objParams.NumberJointPartnershipFact,
                    NumberJointPartnershipDetail: objParams.NumberJointPartnershipDetail,
                    NumberWebConferencingPlan: objParams.NumberWebConferencingPlan,
                    NumberWebConferencingFact: objParams.NumberWebConferencingFact,
                    NumberWebConferencingDetail: objParams.NumberWebConferencingDetail,
                    NumberMeetingsMediaPlan: objParams.NumberMeetingsMediaPlan,
                    NumberMeetingsMediaFact: objParams.NumberMeetingsMediaFact,
                    NumberMeetingsMediaDetail: objParams.NumberMeetingsMediaDetail,
                    NumberPrintedDocumentsPlan: objParams.NumberPrintedDocumentsPlan,
                    NumberPrintedDocumentsFact: objParams.NumberPrintedDocumentsFact,
                    NumberPrintedDocumentsDetail: objParams.NumberPrintedDocumentsDetail,
                    NumberMediaPublicityPlan: objParams.NumberMediaPublicityPlan,
                    NumberMediaPublicityFact: objParams.NumberMediaPublicityFact,
                    NumberMediaPublicityDetail: objParams.NumberMediaPublicityDetail,
                    NumberReadersPlan: objParams.NumberReadersPlan,
                    NumberReadersFact: objParams.NumberReadersFact,
                    NumberReadersDetail: objParams.NumberReadersDetail,
                    NumberOnlineChannelsPlan: objParams.NumberOnlineChannelsPlan,
                    NumberOnlineChannelsFact: objParams.NumberOnlineChannelsFact,
                    NumberOnlineChannelsDetail: objParams.NumberOnlineChannelsDetail,
                    InformationPartnerPagesPlan: objParams.InformationPartnerPagesPlan,
                    InformationPartnerPagesFact: objParams.InformationPartnerPagesFact,
                    InformationPartnerPagesDetail: objParams.InformationPartnerPagesDetail,
                    NumberOnlineVisitorsPlan: objParams.NumberOnlineVisitorsPlan,
                    NumberOnlineVisitorsFact: objParams.NumberOnlineVisitorsFact,
                    NumberOnlineVisitorsDetail: objParams.NumberOnlineVisitorsDetail,
                    NumberDigitalSubscribersPlan: objParams.NumberDigitalSubscribersPlan,
                    NumberDigitalSubscribersFact: objParams.NumberDigitalSubscribersFact,
                    NumberDigitalSubscribersDetail: objParams.NumberDigitalSubscribersDetail,
                    NumberDownloadsPlan: objParams.NumberDownloadsPlan,
                    NumberDownloadsFact: objParams.NumberDownloadsFact,
                    NumberDownloadsDetail: objParams.NumberDownloadsDetail,
                    NumberVisitorsCAMP4ASBPlan: objParams.NumberVisitorsCAMP4ASBPlan,
                    NumberVisitorsCAMP4ASBFact: objParams.NumberVisitorsCAMP4ASBFact,
                    NumberVisitorsCAMP4ASBDetail: objParams.NumberVisitorsCAMP4ASBDetail,
                    NumberMenWomenFeaturedPlan: objParams.NumberMenWomenFeaturedPlan,
                    NumberMenWomenFeaturedFact: objParams.NumberMenWomenFeaturedFact,
                    NumberMenWomenFeaturedDetail: objParams.NumberMenWomenFeaturedDetail,
                    NumberMenWomenReachedPlan: objParams.NumberMenWomenReachedPlan,
                    NumberMenWomenReachedFact: objParams.NumberMenWomenReachedFact,
                    NumberMenWomenReachedDetail: objParams.NumberMenWomenReachedDetail






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