
const Alexa = require('ask-sdk-core');
const zipcodes = require('zipcodes');

const EnableHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EnableVoting';
    },
  async handle(handlerInput) {
  	console.log(JSON.stringify(handlerInput))
    const { requestEnvelope, serviceClientFactory, responseBuilder } = handlerInput;
    const consentToken = requestEnvelope.context.System.user.permissions
      && requestEnvelope.context.System.user.permissions.consentToken;
    if (!consentToken) {
      return responseBuilder
        .speak('Please enable Reminder and Location permissions in the Amazon Alexa app.')
        .withAskForPermissionsConsentCard(['alexa::alerts:reminders:skill:readwrite', 'read::alexa:device:all:address:country_and_postal_code'])
        .getResponse();
    }

    try {
      const { deviceId } = requestEnvelope.context.System.device;
      const deviceAddressServiceClient = serviceClientFactory.getDeviceAddressServiceClient();
      const address = await deviceAddressServiceClient.getCountryAndPostalCode(deviceId);

      if (address.countryCode === null || address.postalCode === null) {
        return responseBuilder
          .speak(`It looks like you don't have an address set, which you can set in the companion app. This skill can only see your country and zip code.`)
          .getResponse();
      }
      if (address.countryCode !== "US") {
        return responseBuilder
          .speak(`This skill only works in the United States.`)
          .getResponse();
      }

      const state = zipcodes.lookup(address.postalCode).state;
      const speechText = `Great! I've scheduled voting reminders for you for the state of ${state}`;

      const reminderManagementServiceClient = serviceClientFactory.getReminderManagementServiceClient();
      const reminderPayload = {
        "trigger": {
          "type": "SCHEDULED_RELATIVE",
          "offsetInSeconds": "30",
          "timeZoneId": "America/Los_Angeles"
        },
        "alertInfo": {
          "spokenInfo": {
            "content": [{
              "locale": "en-US",
              "text": "Reminder1"
            }]
          }
        },
        "pushNotification": {
          "status": "ENABLED"
        }
      };
      const reminderPayload2 = {
        "trigger": {
          "type": "SCHEDULED_RELATIVE",
          "offsetInSeconds": "60",
          "timeZoneId": "America/Los_Angeles"
        },
        "alertInfo": {
          "spokenInfo": {
            "content": [{
              "locale": "en-US",
              "text": "Reminder2"
            }]
          }
        },
        "pushNotification": {
          "status": "ENABLED"
        }
      };

      await reminderManagementServiceClient.createReminder(reminderPayload);
      await reminderManagementServiceClient.createReminder(reminderPayload2);
      
      return responseBuilder
        .speak(speechText)
        .getResponse();

    } catch (error) {
      console.error(error);
      return responseBuilder
        .speak('Uh Oh. Looks like something went wrong.')
        .getResponse();
    }
  }
};

const DisableHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent';
    },
    handle(handlerInput) {
    	const allReminders = reminderManagementServiceClient.getReminders();
    	console.log(JSON.stringify(allReminders));
    	for(i=0; i<allReminders.totalCount; i++) {
    		reminder = allReminders.alerts[i];
    		id = reminder.alertToken;
    		reminderManagementServiceClient.deleteReminder(id);
    	}
        return handlerInput.responseBuilder
            .speak("OK, I deleted all reminders to vote.")
            .getResponse();
    }
};


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        EnableHandler,
        DisableHandler)
    .withApiClient(new Alexa.DefaultApiClient())
    .withSkillId('amzn1.ask.skill.9640b986-1a1d-4860-98c8-005ab7a07f1a')
    .lambda();