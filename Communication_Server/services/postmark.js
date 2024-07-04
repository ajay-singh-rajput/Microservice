const axios = require('axios');
const keys = require('../config/keys');
// const userModel = require('../models/userModel');
const communicationModel = require('../models/communicationModel');

exports.sendEmail = async (sender, recipient, subject, body, user) => {
  
  try {
    // const data = await axios.post('https://api.postmarkapp.com/email', {
    //   From: keys.companyEmail,
    //   // From: sender,
    //   // To: recipient,
    //   To: 'test@blackhole.postmarkapp.com',
    //   Subject: subject,
    //   HtmlBody: body || '<html><body><strong>Hello</strong> dear Postmark user.</body></html>'
    // }, {
    //   headers: { 'X-Postmark-Server-Token': keys.postmarkToken }
    // });
    // const theSender = await userModel.findById(user?._id);
    console.log(user)
    
      // const receiver = await userModel.findOne({email:recipient});
      // let mailDetails = {
      //   receiver: recipient,
      //   subject: subject,
      //   mailBody: body,
      // };
      // if (theSender) {
      //   mailDetails.sender = theSender._id
      // }
      // const newMail = await new communicationModel(mailDetails).save();
      // if (receiver) {
      //   receiver.receiveMail.push(newMail._id);
      //   await receiver.save();
      // }
      // if (theSender) {
      //   theSender.sendMail.push(newMail._id);
      //   await theSender.save()
      // }
      
    
  } catch (error) {
    console.log(error,'fhjdghjfghjds')
  }
  

  // console.log('after send mail', data)
};
