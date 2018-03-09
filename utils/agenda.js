/**
 * Created by simvolice on 16.08.2017 23:14
 */





const Agenda = require('agenda');
const querystring = require('querystring');
const GrmService = require('../services/GrmService');
const GrmStatusService = require('../services/GrmStatusService');
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
          agenda.every('1 day','changeStatusOnComplaint');
          agenda.start();
      });






  },




    //TODO Надо пользоваться уже готовым апи для отсылки письма
  /*sendEmailNotificationOnWriteForm: async ()=> {




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

                        let urlToPublicForm = querystring.stringify({ parentId: item.parentId, country: item.country, dateOfEvent: item.dateOfEvent, nameEvent: item.nameEvent,
                            nameCountry: item.nameCountry});




                            let mail = {
                                from: "simvolice@gmail.com",
                                to: objParams.email,
                                subject: "Добрый день, просим Вас заполнить анкету",

                                html: '<a href="'+ "http://localhost:3000" + '/?#!/publicform?' + urlToPublicForm +'">Перейдите по этой ссылке, чтобы заполнить анкету</a>'
                            }; //TODO Потом надо отвязаться от вшитого домена

                            transporter.sendMail(mail);


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
            agenda.every('1 week', 'sendEmailNotificationOnWriteForm');
            agenda.start();
        });






    }*/




};