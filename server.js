var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

var email_controller = require('./controllers/emailController');

app.use(bodyParser());

app.post('/sendEmail', email_controller.email_send);

app.listen(port, function() {
    console.log("App is running on port " + port);
});

console.log('todo list RESTful API server started on: ' + port);
