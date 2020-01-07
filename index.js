const Alexa = require('ask-sdk-core');
const zipcodes = require('zipcodes');

const deadlines = {"AL": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary Election", "date": "2020-03-06T00:00:00Z"}, {"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-17T00:00:00Z"}, {"name": "Runoff Primary Election", "date": "2020-04-14T00:00:00Z"}, {"name": "Registration for the Runoff Primary Election", "date": "2020-03-30T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-19T00:00:00Z"}]}, "AK": {"deadlines": [{"name": "Primary Election", "date": "2020-08-18T00:00:00Z"}, {"name": "Federal Election", "date": "2020-11-03T00:00:00Z"}]}, "AZ": {"deadlines": [{"name": "Presidential Preference Election", "date": "2020-03-17T00:00:00Z"}, {"name": "Registration for the Presidential Preference Election", "date": "2020-02-18T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-04T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-07-06T00:00:00Z"}, {"name": "Federal Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the Federal Election", "date": "2020-10-05T00:00:00Z"}]}, "AR": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "CA": {"deadlines": [{"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "California offers \"conditional\" voter registration 14 days before an election through Election Day. See the state election office website for details on exceptions to the regular registration deadline."}, "CO": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-30T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Colorado offers same-day registration during early voting through Election Day. Colorado also mails ballots to all voters who register to vote by eight days prior to the election. Inside of that date, eligible individuals must go to a voter service and polling center (VSPC) in order to register, obtain a ballot and vote. See the state election office website for more information."}, "CT": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "DE": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "DC": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-06-16T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-11-13T00:00:00Z"}]}, "FL": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-17T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary Election", "date": "2020-02-18T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-18T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-07-20T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}]}, "GA": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-24T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary Election", "date": "2020-02-24T00:00:00Z"}, {"name": "Primary Election", "date": "2020-05-19T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-04-20T00:00:00Z"}, {"name": "Runoff Election", "date": "2020-07-21T00:00:00Z"}, {"name": "Registration for the Runoff Election", "date": "2020-06-22T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}], "message": "In Georgia, some of these elections may not be needed. See state election office website for details."}, "GU": {"deadlines": [{"name": "Primary Election", "date": "2020-08-29T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "HI": {"deadlines": [{"name": "Primary Election", "date": "2020-08-08T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Hawaii offers late registration during early voting through Election Day. See the state election office website for details on exceptions to the regular registration deadline."}, "ID": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-03-10T00:00:00Z"}, {"name": "Party Primary Election", "date": "2020-05-19T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Idaho offers Election-Day registration. See the state election office website for details on exceptions to the regular registration deadline."}, "IL": {"deadlines": [{"name": "Primary Election", "date": "2020-03-17T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "IN": {"deadlines": [{"name": "Primary Election", "date": "2020-05-05T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "IA": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-05-22T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-24T00:00:00Z"}], "message": "Iowa offers same-day registration during the in-person absentee period. See the state election office website for details on exceptions to the regular registration deadline."}, "KS": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "KY": {"deadlines": [{"name": "Primary Election", "date": "2020-05-19T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-04-20T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}]}, "LA": {"deadlines": [{"name": "Presidential Preference Primary/ Municipal Primary Election", "date": "2020-04-04T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary/ Municipal Primary Election", "date": "2020-03-04T00:00:00Z"}, {"name": "Open Primary/Presidential/Congressional Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the Open Primary/Presidential/Congressional Election", "date": "2020-10-05T00:00:00Z"}, {"name": "Open General/ Congressional Election", "date": "2020-12-05T00:00:00Z"}, {"name": "Registration for the Open General/ Congressional Election", "date": "2020-11-04T00:00:00Z"}], "message": "See the state election office website for details on exceptions to the regular registration deadline."}, "ME": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Maine offers election day registration"}, "MD": {"deadlines": [{"name": "Primary Election", "date": "2020-04-28T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Maryland offers same-day registration during early voting. See the state election office website for details on exceptions to the regular registration deadline."}, "MA": {"deadlines": [{"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-12T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-14T00:00:00Z"}]}, "MI": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "MN": {"deadlines": [{"name": "Caucus Election", "date": "2020-02-25T00:00:00Z"}, {"name": "Presidential Preference Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-11T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Minnesota offers Election-Day registration. See the state election office website for details on exceptions to the regular registration deadline."}, "MS": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "See the state election office website for details on exceptions to the regular registration deadline."}, "MO": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-03-10T00:00:00Z"}, {"name": "Registration for the Presidential Primary Election", "date": "2020-02-12T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-04T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-07-08T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-07T00:00:00Z"}]}, "MT": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NE": {"deadlines": [{"name": "Registration for the Primary Election, In Person", "date": "2020-05-01T00:00:00Z"}, {"name": "Registration for the Primary Election, By Mail", "date": "2020-04-24T00:00:00Z"}, {"name": "Registration for the General Election, In Person", "date": "2020-10-23T00:00:00Z"}, {"name": "Registration for the General Election, By Mail", "date": "2020-10-16T00:00:00Z"}, {"name": "Primary Election", "date": "2020-05-12T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NV": {"deadlines": [{"name": "Democratic Caucus Election", "date": "2020-02-22T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-09T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NJ": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NM": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NY": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NC": {"deadlines": [{"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-07T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "North Carolina offers same-day registration during early voting. See the state election office website for details on exceptions to the regular registration deadline."}, "ND": {"deadlines": [{"name": "Primary Election", "date": "2020-06-09T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "North Dakota does not conduct statewide voter registration."}, "OH": {"deadlines": [{"name": "Primary Election", "date": "2020-03-17T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-18T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}]}, "OK": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Presidential Primary Election", "date": "2020-02-07T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-30T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-06-05T00:00:00Z"}, {"name": "Runoff Election", "date": "2020-08-25T00:00:00Z"}, {"name": "Registration for the Runoff Election", "date": "2020-07-31T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-09T00:00:00Z"}]}, "OR": {"deadlines": [{"name": "Primary Election", "date": "2020-05-19T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-04-28T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "PA": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "RI": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-04-28T00:00:00Z"}, {"name": "Registration for the Presidential Primary Election", "date": "2020-03-29T00:00:00Z"}, {"name": "State Election", "date": "2020-09-15T00:00:00Z"}, {"name": "Registration for the State Election", "date": "2020-08-16T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-04T00:00:00Z"}], "message": "The state election registration and election dates are tentative"}, "SC": {"deadlines": [{"name": "Democratic Presidential Preference Primary Election", "date": "2020-02-29T00:00:00Z"}, {"name": "Registration for the Democratic Presidential Preference Primary Election", "date": "2020-01-30T00:00:00Z"}, {"name": "Registration for the Primary Election, In Person", "date": "2020-05-08T00:00:00Z"}, {"name": "Registration for the Primary Election, Electronic", "date": "2020-05-10T00:00:00Z"}, {"name": "Registration for the Primary Election, By Mail", "date": "2020-05-11T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-09T00:00:00Z"}, {"name": "Primary Runoff Election", "date": "2020-06-23T00:00:00Z"}, {"name": "Registration for the General Election, In Person", "date": "2020-10-02T00:00:00Z"}, {"name": "Registration for the General Election, Electronic", "date": "2020-10-04T00:00:00Z"}, {"name": "Registration for the General Election, By Mail", "date": "2020-10-05T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "See the state election office website for details on exceptions to the regular registration deadline."}, "SD": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-05-18T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-19T00:00:00Z"}]}, "TN": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary Election", "date": "2020-02-03T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-06T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-07-07T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}]}, "TX": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "UT": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-23T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "VT": {"deadlines": [{"name": "Primary Election", "date": "2020-08-11T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "VA": {"deadlines": [{"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-10T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-12T00:00:00Z"}]}, "VI": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "WA": {"deadlines": [{"name": "Primary Election", "date": "2020-08-04T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "See the state election office website for details on exceptions to the regular registration deadline."}, "WV": {"deadlines": [{"name": "Primary Election", "date": "2020-05-12T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-04-21T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-13T00:00:00Z"}]}, "WI": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-04-07T00:00:00Z"}, {"name": "Partisan Election", "date": "2020-08-11T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "WY": {"deadlines": [{"name": "Primary Election", "date": "2020-08-18T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Wyoming offers Election-Day registration. See the state election office website for details on exceptions to the regular registration deadline."}};

const defaultDeadlines = {
    "deadlines": [{
        "name": "General Election",
        "date": "2020-11-03T00:00:00Z"
    }]
};

function alexaFriendlyDateString(d) {
    return d.toISOString().substring(0, 19);
}


const EnableHandlerWithTime = {
    canHandle(handlerInput) {
        console.log(handlerInput)
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'EnableVotingWithTime';
    },
    async handle(handlerInput) {
        console.log(JSON.stringify(handlerInput));
        const {
            requestEnvelope,
            serviceClientFactory,
            responseBuilder
        } = handlerInput;
        const consentToken = requestEnvelope.context.System.user.permissions &&
            requestEnvelope.context.System.user.permissions.consentToken;
        if (!consentToken) {
            return responseBuilder
                .speak('Please enable Reminder and Location permissions in the Amazon Alexa app.')
                .withAskForPermissionsConsentCard(['alexa::alerts:reminders:skill:readwrite', 'read::alexa:device:all:address:country_and_postal_code'])
                .getResponse();
        }

        try {
            const {
                deviceId
            } = requestEnvelope.context.System.device;
            const deviceAddressServiceClient = serviceClientFactory.getDeviceAddressServiceClient();
            const address = await deviceAddressServiceClient.getCountryAndPostalCode(deviceId);
            const time = handlerInput.requestEnvelope.request.intent.slots.time.value;
            const hours = parseInt(time.split(":")[0]);
            const minutes = parseInt(time.split(":")[1]);

            if (address.countryCode === null || address.postalCode === null) {
                return responseBuilder
                    .speak("It looks like you don't have an address set, which you can set in the companion app. This skill can only see your country and zip code.")
                    .getResponse();
            }
            if (address.countryCode !== "US") {
                return responseBuilder
                    .speak("This skill only works in the United States.")
                    .getResponse();
            }

            const state = zipcodes.lookup(address.postalCode).state;
            speechText = `Great! I've scheduled voting reminders for you for the state of ${state}. You can see or disable these reminders in the Alexa app. Don't forget to check your registration regularly.`;

            if (state in deadlines) {
                deadlinesToUse = deadlines[state];
            } else {
                const speechText = `I don't have deadline information for the state of ${state}, but I added a reminder for Super Tuesday.`;
                deadlinesToUse = defaultDeadlines;
            }
            if ("message" in deadlinesToUse) {
                speechText = speechText + " " + deadlinesToUse.message;
            }

            const reminderManagementServiceClient = serviceClientFactory.getReminderManagementServiceClient();
            clearAllReminders(reminderManagementServiceClient);
            console.log("deadlinesToUse "+JSON.stringify(deadlinesToUse))
            for (var i=0; i<deadlinesToUse.deadlines.length; i++) {
                var deadline = deadlinesToUse.deadlines[i];
                dateAndTime = new Date(deadline.date);
                dateAndTime.setHours(hours, minutes);
                reminderPayload = {
                    "trigger": {
                        "type": "SCHEDULED_ABSOLUTE",
                        "scheduledTime": alexaFriendlyDateString(dateAndTime)
                    },
                    "alertInfo": {
                        "spokenInfo": {
                            "content": [{
                                "locale": "en-US",
                                "text": deadline.name
                            }]
                        }
                    },
                    "pushNotification": {
                        "status": "ENABLED"
                    }
                }
                console.log("Creating reminder with payload: "+JSON.stringify(reminderPayload));
                await reminderManagementServiceClient.createReminder(reminderPayload);
            }

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

function clearAllReminders(reminderManagementServiceClient) {

    const allReminders = reminderManagementServiceClient.getReminders();
    for (i = 0; i < allReminders.totalCount; i++) {
        reminder = allReminders.alerts[i];
        id = reminder.alertToken;
        reminderManagementServiceClient.deleteReminder(id);
    }
}

const DisableHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent';
    },
    handle(handlerInput) {
        const {
            requestEnvelope,
            serviceClientFactory,
            responseBuilder
        } = handlerInput;
        const consentToken = requestEnvelope.context.System.user.permissions &&
            requestEnvelope.context.System.user.permissions.consentToken;
        if (!consentToken) {
            return responseBuilder
                .speak('Please enable Reminder and Location permissions in the Amazon Alexa app.')
                .withAskForPermissionsConsentCard(['alexa::alerts:reminders:skill:readwrite', 'read::alexa:device:all:address:country_and_postal_code'])
                .getResponse();
        }
        const reminderManagementServiceClient = serviceClientFactory.getReminderManagementServiceClient();
        clearAllReminders(reminderManagementServiceClient);

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
        EnableHandlerWithTime,
        DisableHandler)
    .withApiClient(new Alexa.DefaultApiClient())
    .withSkillId('amzn1.ask.skill.9640b986-1a1d-4860-98c8-005ab7a07f1a')
    .lambda();