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
          let nameFact = await ItemForFactInCredits.getNameById(objParams.creditsFactSelect);


          const result = await col.insertOne({


              id: seq,


              country: ObjectId(objParams.country),
              nameCountry: nameCountry.name,
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
              CreatePowerPlan: Double(objParams.CreatePowerPlan),
              creditsFactSelect: ObjectId(objParams.creditsFactSelect),
              nameFact: nameFact.name,

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

            let nameCountry = await CountryService.getCountryById(objParams.country);
            let nameFact = await ItemForFactInCredits.getNameById(objParams.creditsFactSelect);




            const result = await col.updateOne({ _id: ObjectId(objParams._id) },

                {
                    $currentDate: {
                        lastModified: true
                    },
                  $set:    {



                      country: ObjectId(objParams.country),
                      categcredits: objParams.categcredits,
                      nameFact: nameFact.name,
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
                      NonDirectBeneficiariesHiredAll: Int32(objParams.NonDirectBeneficiariesHiredAll),
                      NonDirectBeneficiariesHiredMale: Int32(objParams.NonDirectBeneficiariesHiredMale),
                      NonDirectBeneficiariesHiredFemale: Int32(objParams.NonDirectBeneficiariesHiredFemale),
                      CreatePowerPlan: Double(objParams.CreatePowerPlan),
                      creditsFactSelect: ObjectId(objParams.creditsFactSelect)



                  }

                }



            );





            return result;

        } catch (err){


            return err;

        }









    }






};