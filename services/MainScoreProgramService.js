/**
 * Created by simvolice on 24.08.2017 16:32
 */




const dbConnect = require('../utils/dbConnect');


const ObjectId = require('mongodb').ObjectId;
const Decimal128 = require('mongodb').Decimal128;

const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');

module.exports = {

    addPlatform: async (objParams)=> {





          try {


              const col = dbConnect.getConnect().collection('platform_network');
              let seq = await CounterService.getNextSequence("platform_network_id");
              let nameCountry = [];





              for (let oneIdCountry of objParams.country) {
                  let resultName = await CountryService.getCountryById(oneIdCountry);
                  nameCountry.push(resultName.name);
              }

              const result = await col.insertOne({

                  id :seq,
                  country: objParams.country,

                  platform_name: objParams.platform_name,
                  nameCountry: nameCountry,

                  platform_participants: objParams.platform_participants,
                  platform_target: objParams.platform_target,
                  platform_subject: objParams.platform_subject,
                  platform_typeHelp: objParams.platform_typeHelp,
                  platform_results: objParams.platform_results,
                  createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )



              });



              return result;

          } catch (err){


              return err;

          }











  },


    getAll: async ()=> {





        try {


            const col = dbConnect.getConnect().collection('platform_network');


            const result = await col.find({}).toArray();



            return result;

        } catch (err){


            return err;

        }











    },


    updPlatform: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('platform_network');

            let nameCountry = [];





            for (let oneIdCountry of objParams.country) {
                let resultName = await CountryService.getCountryById(oneIdCountry);
                nameCountry.push(resultName.name);
            }

            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    country: objParams.country,

                    nameCountry: nameCountry,
                    platform_name: objParams.platform_name,
                    platform_participants: objParams.platform_participants,
                    platform_target: objParams.platform_target,
                    platform_subject: objParams.platform_subject,
                    platform_typeHelp: objParams.platform_typeHelp,
                    platform_results: objParams.platform_results


                }


            });



            return result;

        } catch (err){


            return err;

        }











    },



    deletePlatform: async (id)=> {





        try {


            const col = dbConnect.getConnect().collection('platform_network');


            const result = await col.deleteOne({_id: ObjectId(id)});



            return result;

        } catch (err){


            return err;

        }











    },





    addProject: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('project');
            let seq = await CounterService.getNextSequence("project_id");


            let nameCountry = [];





            for (let oneIdCountry of objParams.country) {
                let resultName = await CountryService.getCountryById(oneIdCountry);
                nameCountry.push(resultName.name);
            }


            const result = await col.insertOne({

                id :seq,
                country: objParams.country,



                programm: objParams.programm,
                sector: objParams.sector,

                nameCountry: nameCountry,



                developers: objParams.developers,
                executorAgents: objParams.executorAgents,
                executorAgentsContacts: objParams.executorAgentsContacts,
                projectDescription: objParams.projectDescription,
                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )




            });



            return result;

        } catch (err){


            return err;

        }











    },


    getAllProject: async ()=> {





        try {


            const col = dbConnect.getConnect().collection('project');


            const result = await col.find({}).toArray();



            return result;

        } catch (err){


            return err;

        }











    },


    updProject: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('project');

            let nameCountry = [];





            for (let oneIdCountry of objParams.country) {
                let resultName = await CountryService.getCountryById(oneIdCountry);
                nameCountry.push(resultName.name);
            }

            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    country: objParams.country,

                    nameCountry: nameCountry,
                    programm: objParams.programm,
                    sector: objParams.sector,
                    developers: objParams.developers,
                    executorAgents: objParams.executorAgents,
                    executorAgentsContacts: objParams.executorAgentsContacts,
                    projectDescription: objParams.projectDescription,



                }


            });



            return result;

        } catch (err){


            return err;

        }











    },



    deleteProject: async (id)=> {





        try {


            const col = dbConnect.getConnect().collection('project');


            const result = await col.deleteOne({_id: ObjectId(id)});



            return result;

        } catch (err){


            return err;

        }











    },







    addRegionalInvest: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('regional_invest');
            let seq = await CounterService.getNextSequence("regional_invest_id");

            const result = await col.insertOne({

                id: seq,

                typeInvest: objParams.typeInvest,
                sizeInvest: objParams.sizeInvest,
                investor: objParams.investor,
                coloborationCountry: objParams.coloborationCountry,
                executorWithContact: objParams.executorWithContact,
                descriptionInvest: objParams.descriptionInvest,
                executorAgentsContacts: objParams.executorAgentsContacts,
                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )


            });



            return result;

        } catch (err){


            return err;

        }











    },


    getAllRegionalInvest: async ()=> {





        try {


            const col = dbConnect.getConnect().collection('regional_invest');


            const result = await col.find({}).toArray();



            return result;

        } catch (err){


            return err;

        }











    },


    updRegionalInvest: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('regional_invest');



            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {



                    typeInvest: objParams.typeInvest,
                    sizeInvest: objParams.sizeInvest,
                    investor: objParams.investor,
                    coloborationCountry: objParams.coloborationCountry,
                    executorWithContact: objParams.executorWithContact,
                    descriptionInvest: objParams.descriptionInvest,
                    executorAgentsContacts: objParams.executorAgentsContacts


                }


            });



            return result;

        } catch (err){


            return err;

        }











    },



    deleteRegionalInvest: async (id)=> {





        try {


            const col = dbConnect.getConnect().collection('regional_invest');


            const result = await col.deleteOne({_id: ObjectId(id)});



            return result;

        } catch (err){


            return err;

        }











    },




    addMobileResurs: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('mobile_resurse');
            let seq = await CounterService.getNextSequence("mobile_resurse_id");


            const result = await col.insertOne({

                id :seq,

                projectIniciativ: objParams.projectIniciativ,

                amountFinance: Decimal128.fromString(objParams.amountFinance),
                sourceFinance: objParams.sourceFinance,
                executorProject: objParams.executorProject,
                contactExecutor: objParams.contactExecutor,
                mainDestination: objParams.mainDestination,


                mobileOther: objParams.mobileOther,



                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )



            });



            return result;

        } catch (err){


            return err;

        }











    },


    getAllMobileResurs: async ()=> {





        try {


            const col = dbConnect.getConnect().collection('mobile_resurse');


            const result = await col.find({}).toArray();



            return result;

        } catch (err){


            return err;

        }











    },


    updMobileResurs: async (objParams)=> {





        try {


            const col = dbConnect.getConnect().collection('mobile_resurse');


            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {



                    projectIniciativ: objParams.projectIniciativ,
                    mobileOther: objParams.mobileOther,

                    amountFinance: Decimal128.fromString(objParams.amountFinance),
                    sourceFinance: objParams.sourceFinance,
                    mainDestination: objParams.mainDestination,
                    executorProject: objParams.executorProject,
                    contactExecutor: objParams.contactExecutor


                }


            });



            return result;

        } catch (err){


            return err;

        }











    },



    deleteMobileResurs: async (id)=> {





        try {


            const col = dbConnect.getConnect().collection('mobile_resurse');


            const result = await col.deleteOne({_id: ObjectId(id)});



            return result;

        } catch (err){


            return err;

        }











    },




};