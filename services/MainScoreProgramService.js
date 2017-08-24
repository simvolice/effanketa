/**
 * Created by simvolice on 24.08.2017 16:32
 */




const dbConnect = require('../utils/dbConnect');
const config = require('../utils/devConfig');

const ObjectId = require('mongodb').ObjectId;

const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');

module.exports = {

    addPlatform: async (objParams)=> {





          try {


              const col = dbConnect.getConnect().collection('platform_network');
              let seq = await CounterService.getNextSequence("platform_network_id");
              let nameCountry = await CountryService.getCountryById(objParams.country);


              const result = await col.insertOne({

                  id :seq,
                  country: ObjectId(objParams.country),
                  projectIniciativ: objParams.projectIniciativ,
                  nameCountry: nameCountry.name,
                  amountFinance: objParams.amountFinance,
                  sourceFinance: objParams.sourceFinance,
                  mainDestination: objParams.mainDestination,
                  executorProject: objParams.executorProject,
                  contactExecutor: objParams.contactExecutor


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

            let nameCountry = await CountryService.getCountryById(objParams.country);


            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    country: ObjectId(objParams.country),
                    projectIniciativ: objParams.projectIniciativ,
                    nameCountry: nameCountry.name,
                    amountFinance: objParams.amountFinance,
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
            let nameCountry = await CountryService.getCountryById(objParams.country);


            const result = await col.insertOne({

                id :seq,
                country: ObjectId(objParams.country),

                nameCountry: nameCountry.name,

                programm: objParams.programm,
                sector: objParams.sector,
                developers: objParams.developers,
                executorAgents: objParams.executorAgents,



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

            let nameCountry = await CountryService.getCountryById(objParams.country);


            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    country: ObjectId(objParams.country),

                    nameCountry: nameCountry.name,
                    programm: objParams.programm,
                    sector: objParams.sector,
                    developers: objParams.developers,
                    executorAgents: objParams.executorAgents,



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
            let nameCountry = await CountryService.getCountryById(objParams.country);


            const result = await col.insertOne({

                id: seq,
                country: ObjectId(objParams.country),
                nameCountry: nameCountry.name,

                typeInvest: objParams.typeInvest,
                sizeInvest: objParams.sizeInvest,
                investor: objParams.investor,
                coloborationCountry: objParams.coloborationCountry,
                executorWithContact: objParams.executorWithContact,
                descriptionInvest: objParams.descriptionInvest

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

            let nameCountry = await CountryService.getCountryById(objParams.country);


            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    country: ObjectId(objParams.country),

                    nameCountry: nameCountry.name,
                    typeInvest: objParams.typeInvest,
                    sizeInvest: objParams.sizeInvest,
                    investor: objParams.investor,
                    coloborationCountry: objParams.coloborationCountry,
                    executorWithContact: objParams.executorWithContact,
                    descriptionInvest: objParams.descriptionInvest


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
            let nameCountry = await CountryService.getCountryById(objParams.country);


            const result = await col.insertOne({

                id :seq,
                country: ObjectId(objParams.country),
                projectIniciativ: objParams.projectIniciativ,
                nameCountry: nameCountry.name,
                amountFinance: objParams.amountFinance,
                sourceFinance: objParams.sourceFinance,
                mainDestination: objParams.mainDestination,
                executorProject: objParams.executorProject,
                contactExecutor: objParams.contactExecutor


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

            let nameCountry = await CountryService.getCountryById(objParams.country);


            const result = await col.updateOne({_id: ObjectId(objParams._id)},{

                $currentDate: {
                    lastModified: true
                },

                $set: {


                    country: ObjectId(objParams.country),
                    projectIniciativ: objParams.projectIniciativ,
                    nameCountry: nameCountry.name,
                    amountFinance: objParams.amountFinance,
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