# node-email-api

This is a simple api built with node which provides an abstraction between two different email service providers (mailGun & SendGrid). If the mailGun service is down, the SendGrid service will be used.

# How to use
1. Run 'npm install' in your terminal

2. Create an .env file in the project directory with the following contents:
```
MAIL_GUN_API_KEY=<YOUR_KEY_REMOVE_ANGLE_BRACKETS>
SEND_GRID_API_KEY=<YOUR_KEY_REMOVE_ANGLE_BRACKETS>
```
3. Run using 'npm run dev'.

4. Create a simple POST request to http://localhost:3000/sendEmail using the following json:
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

- BCC and CC are not being passed to SendGrid API request
- If multiple To addresses are added (comma separated); The SendGrid API call will fail
- Test cases needed
- Improve Error Handling
- Input validation (Partial)
  - This needs to be re-thought; some validation seems to be handled by mailGun (eg. from address must be a valid email)
- If there's an actual network error (for eg. with SendGrid) - error received 'UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Can't set headers after they are sent.'
  - Maybe we need to actually 'return' from the nodejs express method when sending back a status due to validation, etc..
