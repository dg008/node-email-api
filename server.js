var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

var fetch = require('node-fetch'),
    querystring = require('querystring');

require('dotenv').config();

var mailGunApiKey = process.env.MAIL_GUN_API_KEY;
console.log('mailGunApiKey', mailGunApiKey);

var mailgunUrl = 'https://api:' + mailGunApiKey + '@api.mailgun.net/v3/sandbox5acf4bc5ddf6420489cb457ff1926058.mailgun.org/messages';

app.use(bodyParser());

app.post('/sendEmail', function (req, res) {
  var from = req.body.from;
  if (!from)
    res.status(400).send("'from' is required");
  var to = req.body.to;
  if (!to)
      res.status(400).send("'to' is required");
  var cc = req.body.cc;
  var bcc = req.body.bcc;
  var subject = req.body.subject;
  if (!subject)
      res.status(400).send("'subject' is required");
  var message = req.body.message;
  if (!message)
    res.status(400).send("'message' is required");

  console.log('params', req.params);
  console.log('body', req.body);

  var emailBody = {
    from: from,
    to: to,
    subject: subject,
    text: message
  };

  if (cc)
    emailBody['cc'] = cc;
  if (bcc)
    emailBody['bcc'] = bcc;

  var emailOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify(emailBody)
  };
  fetch(mailgunUrl, emailOptions)
      .then(function(res) {
          console.log(res);
          console.log(res.statusText);
          return res.json();
      }).then(function(json) {
          console.log(json);

          throw new Error('Test error to call Backup API');
          res.send(json);
      }).catch(function(error, response, body) {
          console.log(error);
          console.log('error sending mailgun email');
          // res.status(500).send("'subject' is required");
          //res.send('Network error');

          sendEmailViaBackupAPI(req, res);

          // TODO: At this point call the SendGrid api
          // Execute call back
      });


      // TODO: At what point should I send the res back? - it should be after the Mailgun api request
  //res.send(req.body);
})

var sendGridApiKey = process.env.SEND_GRID_API_KEY;
var sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';
// This function sends an email via the SendGrid api
function sendEmailViaBackupAPI(req, res) {

  // console.log('in backup method req', req);
  var {from, to, subject, message, cc, bcc} = req.body;

  console.log('from in backup method', from);

  var emailBody = {
     "personalizations":[
        {
           "to":[
              {
                 "email":to
              }
           ]
        }
     ],
     "from":{
        "email": from
     },
     "subject": "Send Grid" + subject,
     "content": [
        {
           "type":"text/plain",
           "value": message
        }
     ]
  };

  // TODO: Add cc and bcc
  // if (cc)
  //   emailBody.personalizations[0].cc = [cc];
  // if (bcc)
  //   emailBody['bcc'] = bcc;

  var emailOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sendGridApiKey,
      'content-type': 'application/json'
    },
    body: emailBody
  };

  fetch(sendGridUrl, emailOptions)
      .then(function(res) {
          console.log(res);
          console.log(res.statusText);
          return res.json();
      }).then(function(json) {
          console.log(json);
          res.send(json);
      }).catch(function(error, response, body) {
          console.log(error);
          console.log('network error sending sendGrid email');
          res.send('Network Error sending sendGrid email');
      });
}

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
