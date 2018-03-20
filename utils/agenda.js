/**
 * Created by simvolice on 16.08.2017 23:14
 */





const Agenda = require('agenda');
const querystring = require('querystring');
const GrmService = require('../services/GrmService');
const request = require('request');

const util = require('util');


const requestPromise = util.promisify(request);


const SendFormService = require('../services/SendFormService');
const FormService = require('../services/FormService');

let agenda = new Agenda({db: {address: process.env.DB_HOST}});


module.exports = {

  changeStatusOnComplaint: async ()=> {




      agenda.define('changeStatusOnComplaint', async(job, done)=> {





          let dateNow = new Date( new Date().getTime() - ( new Date().getTimezoneOffset() * 60000 ) );

          let result = await GrmService.checkLastDateAnswer(dateNow);
          let resultForOneWeekBefore = await GrmService.checkOneWeekBefore(dateNow);




          if (result.length !== 0) {

              let objParams = {

                  id: "",
                  colorForStatus: "deadlineStatus"

              };

              for (let obj of result) {


                      objParams.id = obj._id;
                      await GrmService.changeStatus(objParams);



              }

              done();

          } else if (resultForOneWeekBefore.length !== 0) {


              let objParams = {

                  id: "",
                  colorForStatus: "oneWeekBefore"

              };

              for (let obj of resultForOneWeekBefore) {



                  if (obj.dateDifference <= 604800000) {

                      objParams.id = obj._id;
                      await GrmService.changeStatus(objParams);



                  }




              }







              done();
          } else {


              done();

          }




      });





      agenda.on('ready', function() {
          agenda.every('1 day','changeStatusOnComplaint', null, {timezone: "Asia/Dhaka"}, null);
          agenda.start();
      });






  },




    //TODO Надо пользоваться уже готовым апи для отсылки письма
  sendEmailNotificationOnWriteForm: async ()=> {




        agenda.define('sendEmailNotificationOnWriteForm', async(job, done)=> {

            let allEmails = await SendFormService.getAllFormEmails();








            for (let item of allEmails) {
                let objParams = {
                    parentId: item.parentId,
                    email: "",
                    emails: []
                };

                for (let emailItem of item.emails) {
                    objParams.email = emailItem;

                    let oneForms = await FormService.getFormByParentIdAndEmail(objParams);

                    if (oneForms === null) {



                        let urlForNotif = querystring.stringify({

                            parentId: item.parentId,

                            country: item.country,
                            dateOfEvent: item.dateOfEvent,
                            nameEvent: item.nameEvent,
                            nameCountry: item.nameCountry,
                            email: emailItem

                        });




                       await requestPromise.get(`${process.env.HOSTNAME}/sendnotif?${urlForNotif}`);




                    } else {

                        item.emails.splice(emailItem, 1);
                        objParams.emails = item.emails;
                        await SendFormService.updFormEmails(objParams);

                    }



                }



            }












            done();





        });





        agenda.on('ready', function() {

            agenda.every( "1 week", 'sendEmailNotificationOnWriteForm', null, {timezone: "Asia/Dhaka"}, null);



            agenda.start();
        });






    }




};