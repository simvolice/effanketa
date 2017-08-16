/**
 * Created by simvolice on 16.08.2017 23:14
 */



const config = require('../utils/devConfig');

const Agenda = require('agenda');
const GrmService = require('../services/GrmService');
const GrmStatusService = require('../services/GrmStatusService');

let agenda = new Agenda({db: {address: config.urlToMongoDBLocalhost}});


module.exports = {

  changeStatusOnComplaint: async ()=> {




      agenda.define('changeStatusOnComplaint', async(job, done)=> {


          let allStatus = await GrmStatusService.getAllStatus();

          let statusDeadLine = allStatus[3]._id;

          let dateNow = new Date( new Date().getTime() - ( new Date().getTimezoneOffset() * 60000 ) );

          let result = await GrmService.checkLastDateAnswer(dateNow);


          let objParams = {

              id: "",
              statusId: statusDeadLine

          };


          if (result.length !== 0) {


              for (let obj of result) {
                  objParams.id = obj._id;
                  await GrmService.changeSatatus(objParams);
              }

              done();

          } else {


              done();

          }




      });





      agenda.on('ready', function() {
          agenda.every('1 day', 'changeStatusOnComplaint');
          agenda.start();
      });






  }



};