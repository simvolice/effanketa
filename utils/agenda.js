/**
 * Created by simvolice on 16.08.2017 23:14
 */



const config = require('../utils/devConfig');

const Agenda = require('agenda');
const querystring = require('querystring');
const GrmService = require('../services/GrmService');
const GrmStatusService = require('../services/GrmStatusService');
const SendFormService = require('../services/SendFormService');
const FormService = require('../services/FormService');

let agenda = new Agenda({db: {address: config.urlToMongoDBLocalhost}});
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport(config.smtpServer);


module.exports = {

  changeStatusOnComplaint: async ()=> {




      agenda.define('changeStatusOnComplaint', async(job, done)=> {


          let allStatus = await GrmStatusService.getAllStatus();

          let statusDeadLine = allStatus[2]._id;
          let statusFinishComplain = allStatus[3]._id;



          let dateNow = new Date( new Date().getTime() - ( new Date().getTimezoneOffset() * 60000 ) );

          let result = await GrmService.checkLastDateAnswer(dateNow);


          let objParams = {

              id: "",
              statusId: statusDeadLine

          };


          if (result.length !== 0) {


              for (let obj of result) {

                  if (obj.statusId !== statusFinishComplain) {

                      objParams.id = obj._id;
                      await GrmService.changeSatatus(objParams);

                  }

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






  },



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






    }




};