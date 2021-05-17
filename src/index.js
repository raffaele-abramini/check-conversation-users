const Twilio = require("twilio");
const chalk = require("chalk");

const run = async () => {
  const conversationSid = process.argv[2];
  let { accountSid, authToken, chatServiceSid } = {};

  if (!conversationSid) {
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

  let client;
  try {
    client = await new Twilio(accountSid, authToken);
  } catch (e) {
    throw chalk`{redBright Something went wrong you getting your twilio client: ${e.message}}`;
  }

  const conversation = await client.conversations
    .conversations(conversationSid)
    .fetch();

  console.log(
    chalk`{bgCyanBright                         CONVERSATION                        }`
  );
  console.log(conversation);

  const participants = await conversation.participants().list();
  console.log(
    chalk`{bgYellowBright                         CONVERSATION PARTICIPANTS                         }`
  );
  console.log(participants);

  await Promise.all(
    participants.map(async (p, i) => {
      const user = await client.conversations.users(p.identity).fetch();

      console.log(
        chalk`{bgGreenBright                         USER ${
          i + 1
        }                         }`
      );
      console.log(user);
    })
  );
};

run().catch(console.log);
