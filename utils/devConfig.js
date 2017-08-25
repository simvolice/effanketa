/**
 * Created by Nikita on 16.01.2017.
 */





if (process.env.DEPLOY === 'dev') {



    module.exports = {




        port: 3000,
        smtpServer: "smtps://simvolice@gmail.com:gFb6kjtJFqpnQB@smtp-pulse.com:465",
        urlToMongoDBLocalhost: "mongodb://127.0.0.1:27017/efform",
        SECRETJSONWEBTOKEN: "5df9ed11-2bc3-4a2e-a4fc-780c271b25ac",


        firstStart: false,

        hashAdmin: "$2a$10$/btJrdH5SXPxIuII9jiUg.JpgRkmJa2Y4A8TbX/X1KRciTVkx4waG"






    };



} else if (process.env.DEPLOY === 'prod'){


    module.exports = {

        port: 3065,
        smtpServer: "smtps://simvolice@gmail.com:gFb6kjtJFqpnQB@smtp-pulse.com:465",
        urlToMongoDBLocalhost: "mongodb://admin:1989aaaAAA@127.0.0.1:27017/efform",
        SECRETJSONWEBTOKEN: "5df9ed11-2bc3-4a2e-a4fc-780c271b25ac",


        firstStart: true,

        hashAdmin: "$2a$10$/btJrdH5SXPxIuII9jiUg.JpgRkmJa2Y4A8TbX/X1KRciTVkx4waG"



    };




} else {


    console.log("\x1b[41m", new Error("Not set deploy ENV, set env: DEPLOY"));
    process.exit(1);

}




