# node-email-api

This is a simple api built with node which provides an abstraction between two different email service providers (mailGun & SendGrid). If the mailGun service is down, the SendGrid service will be used.

# TODO

- API Call to SendGrid fails with a Bad Request (no other info given) - SO Question created (https://stackoverflow.com/questions/45613599/sendgrid-using-nodejs-with-fetch-400-bad-request)
- Code needs to be refactored - too much logic in server.js
- Test cases needed
- Improve Error Handling
- Input validation
