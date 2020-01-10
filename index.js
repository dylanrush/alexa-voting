const Alexa = require('ask-sdk-core');
const zipcodes = require('zipcodes');

const deadlines = {"AL": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary Election", "date": "2020-03-06T00:00:00Z"}, {"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-17T00:00:00Z"}, {"name": "Runoff Primary Election", "date": "2020-04-14T00:00:00Z"}, {"name": "Registration for the Runoff Primary Election", "date": "2020-03-30T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-19T00:00:00Z"}]}, "AK": {"deadlines": [{"name": "Primary Election", "date": "2020-08-18T00:00:00Z"}, {"name": "Federal Election", "date": "2020-11-03T00:00:00Z"}]}, "AZ": {"deadlines": [{"name": "Presidential Preference Election", "date": "2020-03-17T00:00:00Z"}, {"name": "Registration for the Presidential Preference Election", "date": "2020-02-18T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-04T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-07-06T00:00:00Z"}, {"name": "Federal Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the Federal Election", "date": "2020-10-05T00:00:00Z"}]}, "AR": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "CA": {"deadlines": [{"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "California offers \"conditional\" voter registration 14 days before an election through Election Day. See the state election office website for details on exceptions to the regular registration deadline."}, "CO": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-30T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Colorado offers same-day registration during early voting through Election Day. Colorado also mails ballots to all voters who register to vote by eight days prior to the election. Inside of that date, eligible individuals must go to a voter service and polling center (VSPC) in order to register, obtain a ballot and vote. See the state election office website for more information."}, "CT": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "DE": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "DC": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-06-16T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-11-13T00:00:00Z"}]}, "FL": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-17T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary Election", "date": "2020-02-18T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-18T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-07-20T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}]}, "GA": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-24T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary Election", "date": "2020-02-24T00:00:00Z"}, {"name": "Primary Election", "date": "2020-05-19T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-04-20T00:00:00Z"}, {"name": "Runoff Election", "date": "2020-07-21T00:00:00Z"}, {"name": "Registration for the Runoff Election", "date": "2020-06-22T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}], "message": "In Georgia, some of these elections may not be needed. See state election office website for details."}, "GU": {"deadlines": [{"name": "Primary Election", "date": "2020-08-29T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "HI": {"deadlines": [{"name": "Primary Election", "date": "2020-08-08T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Hawaii offers late registration during early voting through Election Day. See the state election office website for details on exceptions to the regular registration deadline."}, "ID": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-03-10T00:00:00Z"}, {"name": "Party Primary Election", "date": "2020-05-19T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Idaho offers Election-Day registration. See the state election office website for details on exceptions to the regular registration deadline."}, "IL": {"deadlines": [{"name": "Primary Election", "date": "2020-03-17T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "IN": {"deadlines": [{"name": "Primary Election", "date": "2020-05-05T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "IA": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-05-22T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-24T00:00:00Z"}], "message": "Iowa offers same-day registration during the in-person absentee period. See the state election office website for details on exceptions to the regular registration deadline."}, "KS": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "KY": {"deadlines": [{"name": "Primary Election", "date": "2020-05-19T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-04-20T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}]}, "LA": {"deadlines": [{"name": "Presidential Preference Primary/ Municipal Primary Election", "date": "2020-04-04T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary/ Municipal Primary Election", "date": "2020-03-04T00:00:00Z"}, {"name": "Open Primary/Presidential/Congressional Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the Open Primary/Presidential/Congressional Election", "date": "2020-10-05T00:00:00Z"}, {"name": "Open General/ Congressional Election", "date": "2020-12-05T00:00:00Z"}, {"name": "Registration for the Open General/ Congressional Election", "date": "2020-11-04T00:00:00Z"}], "message": "See the state election office website for details on exceptions to the regular registration deadline."}, "ME": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Maine offers election day registration"}, "MD": {"deadlines": [{"name": "Primary Election", "date": "2020-04-28T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Maryland offers same-day registration during early voting. See the state election office website for details on exceptions to the regular registration deadline."}, "MA": {"deadlines": [{"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-12T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-14T00:00:00Z"}]}, "MI": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "MN": {"deadlines": [{"name": "Caucus Election", "date": "2020-02-25T00:00:00Z"}, {"name": "Presidential Preference Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-11T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Minnesota offers Election-Day registration. See the state election office website for details on exceptions to the regular registration deadline."}, "MS": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "See the state election office website for details on exceptions to the regular registration deadline."}, "MO": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-03-10T00:00:00Z"}, {"name": "Registration for the Presidential Primary Election", "date": "2020-02-12T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-04T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-07-08T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-07T00:00:00Z"}]}, "MT": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NE": {"deadlines": [{"name": "Registration for the Primary Election, In Person", "date": "2020-05-01T00:00:00Z"}, {"name": "Registration for the Primary Election, By Mail", "date": "2020-04-24T00:00:00Z"}, {"name": "Registration for the General Election, In Person", "date": "2020-10-23T00:00:00Z"}, {"name": "Registration for the General Election, By Mail", "date": "2020-10-16T00:00:00Z"}, {"name": "Primary Election", "date": "2020-05-12T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NV": {"deadlines": [{"name": "Democratic Caucus Election", "date": "2020-02-22T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-09T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NJ": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NM": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NY": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "NC": {"deadlines": [{"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-07T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "North Carolina offers same-day registration during early voting. See the state election office website for details on exceptions to the regular registration deadline."}, "ND": {"deadlines": [{"name": "Primary Election", "date": "2020-06-09T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "North Dakota does not conduct statewide voter registration."}, "OH": {"deadlines": [{"name": "Primary Election", "date": "2020-03-17T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-18T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}]}, "OK": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Presidential Primary Election", "date": "2020-02-07T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-30T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-06-05T00:00:00Z"}, {"name": "Runoff Election", "date": "2020-08-25T00:00:00Z"}, {"name": "Registration for the Runoff Election", "date": "2020-07-31T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-09T00:00:00Z"}]}, "OR": {"deadlines": [{"name": "Primary Election", "date": "2020-05-19T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-04-28T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "PA": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "RI": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-04-28T00:00:00Z"}, {"name": "Registration for the Presidential Primary Election", "date": "2020-03-29T00:00:00Z"}, {"name": "State Election", "date": "2020-09-15T00:00:00Z"}, {"name": "Registration for the State Election", "date": "2020-08-16T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-04T00:00:00Z"}], "message": "The state election registration and election dates are tentative"}, "SC": {"deadlines": [{"name": "Democratic Presidential Preference Primary Election", "date": "2020-02-29T00:00:00Z"}, {"name": "Registration for the Democratic Presidential Preference Primary Election", "date": "2020-01-30T00:00:00Z"}, {"name": "Registration for the Primary Election, In Person", "date": "2020-05-08T00:00:00Z"}, {"name": "Registration for the Primary Election, Electronic", "date": "2020-05-10T00:00:00Z"}, {"name": "Registration for the Primary Election, By Mail", "date": "2020-05-11T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-09T00:00:00Z"}, {"name": "Primary Runoff Election", "date": "2020-06-23T00:00:00Z"}, {"name": "Registration for the General Election, In Person", "date": "2020-10-02T00:00:00Z"}, {"name": "Registration for the General Election, Electronic", "date": "2020-10-04T00:00:00Z"}, {"name": "Registration for the General Election, By Mail", "date": "2020-10-05T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "See the state election office website for details on exceptions to the regular registration deadline."}, "SD": {"deadlines": [{"name": "Primary Election", "date": "2020-06-02T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-05-18T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-19T00:00:00Z"}]}, "TN": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Presidential Preference Primary Election", "date": "2020-02-03T00:00:00Z"}, {"name": "Primary Election", "date": "2020-08-06T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-07-07T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-05T00:00:00Z"}]}, "TX": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "UT": {"deadlines": [{"name": "Presidential Preference Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Primary Election", "date": "2020-06-23T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "VT": {"deadlines": [{"name": "Primary Election", "date": "2020-08-11T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "VA": {"deadlines": [{"name": "Primary Election", "date": "2020-03-03T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-02-10T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-12T00:00:00Z"}]}, "VI": {"deadlines": [{"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "WA": {"deadlines": [{"name": "Primary Election", "date": "2020-08-04T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "See the state election office website for details on exceptions to the regular registration deadline."}, "WV": {"deadlines": [{"name": "Primary Election", "date": "2020-05-12T00:00:00Z"}, {"name": "Registration for the Primary Election", "date": "2020-04-21T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}, {"name": "Registration for the General Election", "date": "2020-10-13T00:00:00Z"}]}, "WI": {"deadlines": [{"name": "Presidential Primary Election", "date": "2020-04-07T00:00:00Z"}, {"name": "Partisan Election", "date": "2020-08-11T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}]}, "WY": {"deadlines": [{"name": "Primary Election", "date": "2020-08-18T00:00:00Z"}, {"name": "General Election", "date": "2020-11-03T00:00:00Z"}], "message": "Wyoming offers Election-Day registration. See the state election office website for details on exceptions to the regular registration deadline."}};

const stateNames = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

const defaultDeadlines = {
    "deadlines": [{
        "name": "General Election",
        "date": "2020-11-03T00:00:00Z"
    }]
};

function alexaFriendlyDateString(d) {
    return d.toISOString().substring(0, 19);
};


const HandleLaunchRequest = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
        || (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NavigateHomeIntent');
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("OK, what time of day would you like to receive election day reminders?")
            .addElicitSlotDirective('time', {
                    name: 'EnableVotingWithTime',
                    confirmationStatus: 'NONE',
                    slots: {}
                 })
            .getResponse();
    }
};

function askForPermission(responseBuilder, create) {
    var message;
    if (create === true) {
        message = "Please enable permissions in the Alexa app. Permissions to read and write "
        + "reminders are required. This skill cannot see your personal reminders, only ones created by the skill. "
        + "Permission to see your location is optional and limited to postal code. Location permissions are used "
        + "create reminders that are specific to your state.";
    } else {
        message = 'This skill does not have permissions to delete reminders. You can add permission or manually delete reminders through the Alexa app.';
    }
    return responseBuilder
        .speak(message)
        .withAskForPermissionsConsentCard(['alexa::alerts:reminders:skill:readwrite', 'read::alexa:device:all:address:country_and_postal_code'])
        .getResponse();
}

const EnableHandlerWithTime = {
    canHandle(handlerInput) {
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
            return askForPermission(responseBuilder, true);
        }

        try {
            const {
                deviceId
            } = requestEnvelope.context.System.device;
            
            const time = handlerInput.requestEnvelope.request.intent.slots.time.value;
            const hours = parseInt(time.split(":")[0]);
            const minutes = parseInt(time.split(":")[1]);

            var state;
            if ('value' in handlerInput.requestEnvelope.request.intent.slots.state) {
                state = handlerInput.requestEnvelope.request.intent.slots.state.value.replace('.', '');
                for (var shortName in stateNames) {
                    if(stateNames[shortName].toLowerCase() === state.toLowerCase()) {
                        state = shortName;
                        break;
                    }
                }
            } else {
                try {
                    const deviceAddressServiceClient = serviceClientFactory.getDeviceAddressServiceClient();
                    const address = await deviceAddressServiceClient.getCountryAndPostalCode(deviceId);
                    if (address.countryCode === null || address.postalCode === null || address.countryCode !== "US") {
                        throw "Could not find postal code";
                    }
                    state = zipcodes.lookup(address.postalCode).state;
                } catch (err) {
                    return responseBuilder
                        .speak("For which US state would you like to receive reminders?")
                        .addElicitSlotDirective('state')
                        .getResponse();
                }
                
            }

            const longName = stateNames[state];
            var speechText;
            if (state in deadlines) {
                deadlinesToUse = deadlines[state];
                speechText = `Great! I've scheduled election reminders for you for the state of ${longName} at ${time}. You can see or disable these reminders in the Alexa app. Don't forget to check your registration regularly.`;
            } else {
                const speechText = `I don't have information for the state of ${state}, but I added a reminder for the national general election on November Third at ${time}.`;
                deadlinesToUse = defaultDeadlines;
            }
            if ("message" in deadlinesToUse) {
                speechText = speechText + " " + deadlinesToUse.message;
            }

            const reminderManagementServiceClient = serviceClientFactory.getReminderManagementServiceClient();
            await clearAllReminders(reminderManagementServiceClient)
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
            console.log("JSONified error: "+JSON.stringify(error));
            if ('statusCode' in error && error.statusCode == 401) {
                return askForPermission(responseBuilder, true);
            } else {
                console.error(error)
                return responseBuilder
                    .speak('Uh Oh. Looks like something went wrong.')
                    .getResponse();
            }
        }
    }
};

async function clearAllReminders(reminderManagementServiceClient) {
    const allReminders = await reminderManagementServiceClient.getReminders();

    console.log("Attempting to delete reminders: "+JSON.stringify(allReminders));
    for (i = 0; i < allReminders.totalCount; i++) {
        reminder = allReminders.alerts[i]
        if (reminder.status === "ON") {
            token = reminder.alertToken;
            console.log("Attempting to delete reminder with token: "+token);
            await reminderManagementServiceClient.deleteReminder(token);
        } else {
            console.log("Skipping "+reminder.token);
        }
    }
}

const DisableHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent';
    },
    async handle(handlerInput) {
        const {
            requestEnvelope,
            serviceClientFactory,
            responseBuilder
        } = handlerInput;
        const consentToken = requestEnvelope.context.System.user.permissions &&
            requestEnvelope.context.System.user.permissions.consentToken;
        if (!consentToken) {
            return askForPermission(responseBuilder, false);
        }
        
        var speak = "OK, I deleted all election reminders.";
        try {
            const reminderManagementServiceClient = serviceClientFactory.getReminderManagementServiceClient();
            await clearAllReminders(reminderManagementServiceClient);
        } catch(error) {
            if ('statusCode' in error && error.statusCode == 401) {
                return askForPermission(responseBuilder, false);
            }
            speak = "There was an error deleting your reminders. You can delete them in the Alexa app.";
            console.log("==== ERROR ======");
            console.error(error);
        }
        return handlerInput.responseBuilder
            .speak(speak)
            .getResponse();
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    async handle(handlerInput) {
        const helpMessage = "The Election Reminders skill can create reminders for you on registration and election deadlines for your state. Would you like to continue?";
        return handlerInput.responseBuilder
            .speak(helpMessage)
            .addConfirmIntentDirective({
                    name: 'EnableVotingConfirmation',
                    confirmationStatus: 'NONE',
                    slots: {}
                 })
            .getResponse();
    }
}

const EnableVotingConfirmation = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'EnableVotingConfirmation';
    },
    async handle(handlerInput) {
        const {
            requestEnvelope,
            serviceClientFactory,
            responseBuilder
        } = handlerInput;
        if (requestEnvelope.request.intent.confirmationStatus === 'CONFIRMED') {
            return handlerInput.responseBuilder
                .addDelegateDirective({
                    name: 'EnableVotingWithTime',
                    confirmationStatus: 'NONE',
                    slots: {}})
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .withShouldEndSession(true)
                .getResponse();
        }
    }
}

const EndSessionHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest'
        || (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .withShouldEndSession(true)
            .getResponse();
    }
}

const LogRequestInterceptor = {
  process(handlerInput) {
    // Log Request
    console.log("==== REQUEST ======");
    console.log(JSON.stringify(handlerInput.requestEnvelope, null, 2));
  }
}
/**
 * Response Interceptor to log the response made to Alexa
 */
const LogResponseInterceptor = {
  process(handlerInput, response) {
    // Log Response
    console.log("==== RESPONSE ======");
    console.log(JSON.stringify(response, null, 2));
  }
}

/**
 * Handler to catch exceptions from RequestHandler 
 * and respond back to Alexa
 */
const GlobalErrorHandler = {
  canHandle(handlerInput, error) {
    return true;
  },
  handle(handlerInput, error) {
    console.log("==== ERROR ======");
    console.log(error);
    const speechText = "I'm sorry, there was an error";
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        EnableHandlerWithTime,
        HandleLaunchRequest,
        DisableHandler,
        EndSessionHandler,
        HelpIntentHandler,
        EnableVotingConfirmation)
    .addErrorHandlers(GlobalErrorHandler)
    .addRequestInterceptors(LogRequestInterceptor)
    .addResponseInterceptors(LogResponseInterceptor)
    .withApiClient(new Alexa.DefaultApiClient())
    .withSkillId('amzn1.ask.skill.9640b986-1a1d-4860-98c8-005ab7a07f1a')
    .lambda();