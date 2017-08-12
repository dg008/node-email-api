# node-email-api

This is a simple api built with node which provides an abstraction between two different email service providers (mailGun & SendGrid). If the mailGun service is down, the SendGrid service will be used.

# How to use
1. Run 'npm install' in your terminal

2. Create an .env file in the project directory with the following contents:
```
MAIL_GUN_API_KEY=<YOUR_KEY_REMOVE_ANGLE_BRACKETS>
SEND_GRID_API_KEY=<YOUR_KEY_REMOVE_ANGLE_BRACKETS>
```
3. Create a simple POST request to http://localhost:3000/sendEmail using the following json:
```
{
  "from": "hello@email.com",
  "to": "david@email.com, george@email",
  "bcc": "mom@email.com, dad@email.com",
  "cc": "cousin@email.com"
  "subject": "Hello",
  "message": "Congratulations David"
}
```

NOTE: Content-Type header should be 'application/json'

# TODO

- API Call to SendGrid fails with a Bad Request (no other info given) - SO Question created (https://stackoverflow.com/questions/45613599/sendgrid-using-nodejs-with-fetch-400-bad-request)
- BCC and CC are not being passed to SendGrid API request
- If multiple To addresses are added (comma separated); The SendGrid API call will fail
- Code needs to be refactored - too much logic in server.js
- Test cases needed
- Improve Error Handling
- Input validation
