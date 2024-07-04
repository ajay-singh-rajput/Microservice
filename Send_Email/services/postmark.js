const axios = require('axios');
const keys = require('../config/keys');

exports.sendEmail = async (sender, recipient, subject, body) => {
  
  try {
    const data = await axios.post('https://api.postmarkapp.com/email', {
      From: sender,
      To: recipient,
      Subject: subject,
      HtmlBody: body || '<html><body><strong>Hello</strong> dear Postmark user.</body></html>'
    }, {
      headers: { 'X-Postmark-Server-Token': keys.postmarkToken }
    });
  } catch (error) {
    console.log(error,'fhjdghjfghjds')
  }
  

  // console.log('after send mail', data)
};
