# Check conversation users

## Setup

1. Create a secret.json file with
```shell
cp secret.sample.json secret.json
```

2. Populate your secret.json file with
    1. [accountSid](https://www.twilio.com/console)
    1. [authToken](https://www.twilio.com/console)
    1. [chatServiceSid](https://www.twilio.com/console/chat/services)
    

3. Run the following command with the ID of the conversation you want to check

```shell
yarn start CHXXXXX
```