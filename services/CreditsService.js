/**
 * Created by simvolice on 14.08.2017 15:17
 */



const dbConnect = require('../utils/dbConnect');
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;
const Double = require('mongodb').Double;
const CounterService = require('../services/CounterService');
const CountryService = require('../services/CountryService');
const ItemForFactInCredits = require('../services/ItemForFactInCredits');



module.exports = {


    addCredit: async (objParams)=> {


      try {


          const col = dbConnect.getConnect().collection('credits');


          let seq = await CounterService.getNextSequence("creditid");
          let nameCountry = await CountryService.getCountryById(objParams.country);
          let nameFact = await ItemForFactInCredits.getNameById(objParams.categcredits);


          const result = await col.insertOne({


              id: seq,


              country: ObjectId(objParams.country),
              nameCountry: nameCountry.name,
              categcredits: ObjectId(objParams.categcredits),

              countsubproject: Int32(objParams.countsubproject),
              commonAmountInDollors: Int32(objParams.commonAmountInDollors),
              commonAmountInNatCurrency: Int32(objParams.commonAmountInNatCurrency),
              DirectBeneficiariesAll: Int32(objParams.DirectBeneficiariesAll),
              DirectBeneficiariesMale: Int32(objParams.DirectBeneficiariesMale),
              DirectBeneficiariesFemale: Int32(objParams.DirectBeneficiariesFemale),
              NonDirectBeneficiariesMemberFamilyAll: Int32(objParams.NonDirectBeneficiariesMemberFamilyAll),
              NonDirectBeneficiariesMemberFamilyMale: Int32(objParams.NonDirectBeneficiariesMemberFamilyMale),
              NonDirectBeneficiariesMemberFamilyFemale: Int32(objParams.NonDirectBeneficiariesMemberFamilyFemale),


              CreatePowerPlan: Double(objParams.CreatePowerPlan),
              CreatePowerFact: Double(objParams.CreatePowerFact),

              nameFactCategcredits: nameFact.name,

              createAt: new Date( new Date(objParams.createAt).getTime() - ( new Date(objParams.createAt).getTimezoneOffset() * 60000 ) )







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

                    allCountrys: await CountryService.getAllCountrys(),
                    allCreditsFact: await ItemForFactInCredits.getAllCreditsFact()
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

                    allCountrys: arrCoutry,
                    allCreditsFact: await ItemForFactInCredits.getAllCreditsFact()

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

            let nameCountry = await CountryService.getCountryById(objParams.country);
            let nameFact = await ItemForFactInCredits.getNameById(objParams.categcredits);




            const result = await col.updateOne({ _id: ObjectId(objParams._id) },

                {
                    $currentDate: {
                        lastModified: true
                    },
                  $set:    {



                      country: ObjectId(objParams.country),
                      categcredits: ObjectId(objParams.categcredits),
                      nameFactCategcredits: nameFact.name,
                      nameCountry: nameCountry.name,
                      countsubproject: Int32(objParams.countsubproject),
                      commonAmountInDollors: Int32(objParams.commonAmountInDollors),
                      commonAmountInNatCurrency: Int32(objParams.commonAmountInNatCurrency),
                      DirectBeneficiariesAll: Int32(objParams.DirectBeneficiariesAll),
                      DirectBeneficiariesMale: Int32(objParams.DirectBeneficiariesMale),
                      DirectBeneficiariesFemale: Int32(objParams.DirectBeneficiariesFemale),
                      NonDirectBeneficiariesMemberFamilyAll: Int32(objParams.NonDirectBeneficiariesMemberFamilyAll),
                      NonDirectBeneficiariesMemberFamilyMale: Int32(objParams.NonDirectBeneficiariesMemberFamilyMale),
                      NonDirectBeneficiariesMemberFamilyFemale: Int32(objParams.NonDirectBeneficiariesMemberFamilyFemale),


                      CreatePowerPlan: Double(objParams.CreatePowerPlan),
                      creditsFactSelect: ObjectId(objParams.creditsFactSelect),
                      createAt: new Date( new Date(objParams.createAt).getTime() - ( new Date(objParams.createAt).getTimezoneOffset() * 60000 ) )




                  }

                }



            );





            return result;

        } catch (err){


            return err;

        }









    }






};