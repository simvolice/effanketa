/**
 * Created by simvolice on 14.08.2017 15:17
 */



const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;
const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');
const SourceInfoService = require('../services/SourceInfoService');




module.exports = {


    addCredit: async (objParams)=> {


      try {


          const col = dbConnect.getConnect().collection('credits');


          let seq = await CounterService.getNextSequence("creditid");


          const result = await col.insertOne({


              id: seq,


              country: ObjectId(objParams.country),
              categcredits: objParams.categcredits,

              countsubproject: Int32(objParams.countsubproject),
              commonAmountInDollors: Int32(objParams.commonAmountInDollors),
              commonAmountInNatCurrency: Int32(objParams.commonAmountInNatCurrency),
              DirectBeneficiariesAll: Int32(objParams.DirectBeneficiariesAll),
              DirectBeneficiariesMale: Int32(objParams.DirectBeneficiariesMale),
              DirectBeneficiariesFemale: Int32(objParams.DirectBeneficiariesFemale),
              NonDirectBeneficiariesMemberFamilyAll: Int32(objParams.NonDirectBeneficiariesMemberFamilyAll),
              NonDirectBeneficiariesMemberFamilyMale: Int32(objParams.NonDirectBeneficiariesMemberFamilyMale),
              NonDirectBeneficiariesMemberFamilyFemale: Int32(objParams.NonDirectBeneficiariesMemberFamilyFemale),
              NonDirectBeneficiariesHiredAll: Int32(objParams.NonDirectBeneficiariesHiredAll),
              NonDirectBeneficiariesHiredMale: Int32(objParams.NonDirectBeneficiariesHiredMale),
              NonDirectBeneficiariesHiredFemale: Int32(objParams.NonDirectBeneficiariesHiredFemale),
              CreatePowerPlan: Int32(objParams.CreatePowerPlan),
              CreatePowerFact: Int32(objParams.CreatePowerFact),

              createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )







          });





          return result;

      } catch (err){


          return err;

      }







  },



    delCredits: async (id) => {



        try {


            const col = dbConnect.getConnect().collection('credits');




            const result = await col.deleteOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }











    },



    getAllCredits: async ()=> {




        try {


            const col = dbConnect.getConnect().collection('credits');




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


    getCreditsByIdCountry: async (idCountry)=> {




        try {


            const col = dbConnect.getConnect().collection('credits');

            let oneCoutry = await CountryService.getCountryById(idCountry);
            let arrCoutry = [];
            arrCoutry.push(oneCoutry);




            const result = await col.aggregate([
                { $match : {country: ObjectId(idCountry)} },


                { $addFields: {

                    allCountrys: arrCoutry
                }}





            ]).toArray();






            return result;

        } catch (err){


            return err;

        }













    },




    updCredits: async (objParams)=> {



        try {


            const col = dbConnect.getConnect().collection('credits');





            const result = await col.updateOne({ _id: ObjectId(objParams._id) },

                {
                    $currentDate: {
                        lastModified: true
                    },
                  $set:    {



                      country: ObjectId(objParams.country),
                      categcredits: objParams.categcredits,

                      countsubproject: Int32(objParams.countsubproject),
                      commonAmountInDollors: Int32(objParams.commonAmountInDollors),
                      commonAmountInNatCurrency: Int32(objParams.commonAmountInNatCurrency),
                      DirectBeneficiariesAll: Int32(objParams.DirectBeneficiariesAll),
                      DirectBeneficiariesMale: Int32(objParams.DirectBeneficiariesMale),
                      DirectBeneficiariesFemale: Int32(objParams.DirectBeneficiariesFemale),
                      NonDirectBeneficiariesMemberFamilyAll: Int32(objParams.NonDirectBeneficiariesMemberFamilyAll),
                      NonDirectBeneficiariesMemberFamilyMale: Int32(objParams.NonDirectBeneficiariesMemberFamilyMale),
                      NonDirectBeneficiariesMemberFamilyFemale: Int32(objParams.NonDirectBeneficiariesMemberFamilyFemale),
                      NonDirectBeneficiariesHiredAll: Int32(objParams.NonDirectBeneficiariesHiredAll),
                      NonDirectBeneficiariesHiredMale: Int32(objParams.NonDirectBeneficiariesHiredMale),
                      NonDirectBeneficiariesHiredFemale: Int32(objParams.NonDirectBeneficiariesHiredFemale),
                      CreatePowerPlan: Int32(objParams.CreatePowerPlan),
                      CreatePowerFact: Int32(objParams.CreatePowerFact)



                  }

                }



            );





            return result;

        } catch (err){


            return err;

        }









    },




    addCreditToTable5: async (objParams)=> {


        try {


            const col = dbConnect.getConnect().collection('table5');


            let seq = await CounterService.getNextSequence("table5id");


            const result = await col.insertOne({


                id: seq,


                country: ObjectId(objParams.country),


                IriggSquareGA: objParams.IriggSquareGA,
                IriggSquareGASource: ObjectId(objParams.IriggSquareGASource),
                IriggYieldIncrease: objParams.IriggYieldIncrease,
                IriggYieldIncreaseSource: ObjectId(objParams.IriggYieldIncreaseSource),
                IriggSalDecrease: objParams.IriggSalDecrease,
                IriggSalDecreaseSource: ObjectId(objParams.IriggSalDecreaseSource),
                WaterSquareGA: objParams.WaterSquareGA,
                WaterSquareGASource: ObjectId(objParams.WaterSquareGASource),
                WaterYieldIncrease: objParams.WaterYieldIncrease,
                WaterYieldIncreaseSource: ObjectId(objParams.WaterYieldIncreaseSource),
                WaterWaterSaver: objParams.WaterWaterSaver,
                WaterWaterSaverSource: ObjectId(objParams.WaterWaterSaverSource),
                GardeningSquareGA: objParams.GardeningSquareGA,
                GardeningSquareGASource: ObjectId(objParams.GardeningSquareGASource),
                GardeningYieldIncrease: objParams.GardeningYieldIncrease,
                GardeningYieldIncreaseSource: ObjectId(objParams.GardeningYieldIncreaseSource),
                GardeningIncreasingSustainability: objParams.GardeningIncreasingSustainability,
                GardeningIncreasingSustainabilitySource: ObjectId(objParams.GardeningIncreasingSustainabilitySource),
                GardeningDecreaseEarth: objParams.GardeningDecreaseEarth,
                GardeningDecreaseEarthSource: ObjectId(objParams.GardeningDecreaseEarthSource),
                SeedSquareGA: objParams.SeedSquareGA,
                SeedSquareGASource: ObjectId(objParams.SeedSquareGASource),
                SeedYieldIncrease: objParams.SeedYieldIncrease,
                SeedYieldIncreaseSource: ObjectId(objParams.SeedYieldIncreaseSource),
                SeedIncreasingSustainability: objParams.SeedIncreasingSustainability,
                SeedIncreasingSustainabilitySource: ObjectId(objParams.SeedIncreasingSustainabilitySource),
                AnimalIncreaseProductivity: objParams.AnimalIncreaseProductivity,
                AnimalIncreaseProductivitySource: ObjectId(objParams.AnimalIncreaseProductivitySource),
                AnimalUsePasture: objParams.AnimalUsePasture,
                AnimalUsePastureSource: ObjectId(objParams.AnimalUsePastureSource),





                createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )







            });





            return result;

        } catch (err){


            return err;

        }







    },



    delTable5: async (id) => {



        try {


            const col = dbConnect.getConnect().collection('table5');




            const result = await col.deleteOne({_id: ObjectId(id)});





            return result;

        } catch (err){


            return err;

        }











    },






    getAllTable5: async (id) => {



        try {


            const col = dbConnect.getConnect().collection('table5');




            const result = await col.aggregate([
                { $match : { } },


                { $addFields: {

                    allCountrys: await CountryService.getAllCountrys(),
                    allsourceInfo: await SourceInfoService.getAllSourceInfo()
                }}





            ]).toArray();





            return result;

        } catch (err){


            return err;

        }











    },




    getTable5ByIdCountry: async (idCountry)=> {




        try {


            const col = dbConnect.getConnect().collection('table5');

            let oneCoutry = await CountryService.getCountryById(idCountry);
            let arrCoutry = [];
            arrCoutry.push(oneCoutry);




            const result = await col.aggregate([
                { $match : {country: ObjectId(idCountry)} },


                { $addFields: {

                    allCountrys: arrCoutry,
                    allsourceInfo: await SourceInfoService.getAllSourceInfo()
                }}





            ]).toArray();






            return result;

        } catch (err){


            return err;

        }













    },



    updTable5: async (objParams)=> {



        try {


            const col = dbConnect.getConnect().collection('table5');





            const result = await col.updateOne({ _id: ObjectId(objParams._id) },

                {
                    $currentDate: {
                        lastModified: true
                    },
                    $set:    {



                        country: ObjectId(objParams.country),



                        IriggSquareGA: objParams.IriggSquareGA,
                        IriggSquareGASource: ObjectId(objParams.IriggSquareGASource),
                        IriggYieldIncrease: objParams.IriggYieldIncrease,
                        IriggYieldIncreaseSource: ObjectId(objParams.IriggYieldIncreaseSource),
                        IriggSalDecrease: objParams.IriggSalDecrease,
                        IriggSalDecreaseSource: ObjectId(objParams.IriggSalDecreaseSource),
                        WaterSquareGA: objParams.WaterSquareGA,
                        WaterSquareGASource: ObjectId(objParams.WaterSquareGASource),
                        WaterYieldIncrease: objParams.WaterYieldIncrease,
                        WaterYieldIncreaseSource: ObjectId(objParams.WaterYieldIncreaseSource),
                        WaterWaterSaver: objParams.WaterWaterSaver,
                        WaterWaterSaverSource: ObjectId(objParams.WaterWaterSaverSource),
                        GardeningSquareGA: objParams.GardeningSquareGA,
                        GardeningSquareGASource: ObjectId(objParams.GardeningSquareGASource),
                        GardeningYieldIncrease: objParams.GardeningYieldIncrease,
                        GardeningYieldIncreaseSource: ObjectId(objParams.GardeningYieldIncreaseSource),
                        GardeningIncreasingSustainability: objParams.GardeningIncreasingSustainability,
                        GardeningIncreasingSustainabilitySource: ObjectId(objParams.GardeningIncreasingSustainabilitySource),
                        GardeningDecreaseEarth: objParams.GardeningDecreaseEarth,
                        GardeningDecreaseEarthSource: ObjectId(objParams.GardeningDecreaseEarthSource),
                        SeedSquareGA: objParams.SeedSquareGA,
                        SeedSquareGASource: ObjectId(objParams.SeedSquareGASource),
                        SeedYieldIncrease: objParams.SeedYieldIncrease,
                        SeedYieldIncreaseSource: ObjectId(objParams.SeedYieldIncreaseSource),
                        SeedIncreasingSustainability: objParams.SeedIncreasingSustainability,
                        SeedIncreasingSustainabilitySource: ObjectId(objParams.SeedIncreasingSustainabilitySource),
                        AnimalIncreaseProductivity: objParams.AnimalIncreaseProductivity,
                        AnimalIncreaseProductivitySource: ObjectId(objParams.AnimalIncreaseProductivitySource),
                        AnimalUsePasture: objParams.AnimalUsePasture,
                        AnimalUsePastureSource: ObjectId(objParams.AnimalUsePastureSource),


                    }

                }



            );





            return result;

        } catch (err){


            return err;

        }









    },




};