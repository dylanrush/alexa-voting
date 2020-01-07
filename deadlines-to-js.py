import csv
import re
import json
from dateutil.parser import parse
from dateutil.parser import ParserError


def sanitize(value: str) -> str:
    return re.sub('\*', '', value).strip()
def get_date(value: str) -> str:
    try:
        return parse(sanitize(value)).isoformat()+'Z'
    except ParserError:
        return None
def get_election_event(name, date):
    return {
        'name': name,
        'date': str(date)
    }


with open('deadlines.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    states = {}

    for row in readCSV:
        state = row[0]
        if not states.get(state):
            states[state] = {}
            states[state]['deadlines'] = []
        if row[4]:
            states[state]['message'] = sanitize(row[4])
        registration_date = get_date(row[2])
        election_date = get_date(row[3])
        election_name = sanitize(row[1]) + " Election"
        if row[5]:
            election_name = election_name + ", " + row[5]
        registration_name = "Registration for the " + election_name
        if election_date:
            states[state]['deadlines'].append(get_election_event(election_name, election_date))
        if registration_date and registration_date != election_date:
            states[state]['deadlines'].append(get_election_event(registration_name, registration_date))

    print(json.dumps(states))
