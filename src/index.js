const twilio = require("twilio");
const chalk = require("chalk");

const run = async () => {
  const convo = process.argv[2];
  let { accountSid, authToken, chatServiceSid } = {};

  if (!convo) {
    throw chalk`{redBright Please add a conversation sid to inspect}
    
    ie. {bold yarn start CHXXXXXXX}
    
`;
  }

  try {
    ({ accountSid, authToken, chatServiceSid } = require("../secret.json"));
  } catch (e) {
    throw chalk`{redBright Please make sure to have a secret.json file with an {bold accountSid}, {bold authToken} and {bold chatServiceSid}}`;
  }

  if (!accountSid || !authToken || !chatServiceSid) {
    throw chalk`{redBright Please make sure to populate your secret.json file with an {bold accountSid}, {bold authToken} and {bold chatServiceSid}}`;
  }
};

run().catch(console.log);
