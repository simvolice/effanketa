/**
 * Created by simvolice on 06.09.2017 16:14
 */




const dbConnect = require('../utils/dbConnect');
const NameYear = require('../services/NameYear');

const ObjectId = require('mongodb').ObjectId;





module.exports = {



    getReport: async (objParams) => {





        try {


            let result = [];

            const platform_network = dbConnect.getConnect().collection('platform_network');
            const mobile_resurse = dbConnect.getConnect().collection('mobile_resurse');
            const regional_invest = dbConnect.getConnect().collection('regional_invest');
            const project = dbConnect.getConnect().collection('project');



            let nameYear = await NameYear.getYearById(objParams.yearname);


            const resultPlatform_network = await platform_network.aggregate([

                        {

                            $match: {country: ObjectId(objParams.country)}

                        },

                            {
                                $addFields:
                                    {
                                        year: { $year: "$createAt" },


                                    }
                            },


                            {

                                $match: {year: nameYear.codeName}

                            },

                {
                    $count: "all_platform_network"
                }



            ]).toArray();





            const resultMobile_resurse = await mobile_resurse.aggregate([

                {

                    $match: {country: ObjectId(objParams.country)}

                },

                {
                    $addFields:
                        {
                            year: { $year: "$createAt" },


                        }
                },


                {

                    $match: {year: nameYear.codeName}

                },

                {
                    $count: "all_mobile_resurse"
                }



            ]).toArray();




            const resultRegional_invest = await regional_invest.aggregate([

                {

                    $match: {country: ObjectId(objParams.country)}

                },

                {
                    $addFields:
                        {
                            year: { $year: "$createAt" },


                        }
                },


                {

                    $match: {year: nameYear.codeName}

                },

                {
                    $count: "all_regional_invest"
                }



            ]).toArray();




            const resultProject = await project.aggregate([

                {

                    $match: {country: ObjectId(objParams.country)}

                },

                {
                    $addFields:
                        {
                            year: { $year: "$createAt" },


                        }
                },


                {

                    $match: {year: nameYear.codeName}

                },

                {
                    $count: "all_project"
                }



            ]).toArray();




            result.push(resultMobile_resurse);
            result.push(resultPlatform_network);
            result.push(resultProject);
            result.push(resultRegional_invest);





            return result;


        }catch(err) {




            return err;


        }










    },




};