import csv
import json

# Load up the airports
airports = {}
with open('../data/airports.dat') as airport_file:
    airport_reader = csv.DictReader(airport_file,
                                     ['airport_id',
                                      'name',
                                      'city',
                                      'country',
                                      'three_letter_code',
                                      'four_letter_code',
                                      'latitude',
                                      'longitude',
                                      'altitude',
                                      'timezone',
                                      'dst',
                                      'tz'])
    for row in airport_reader:
        airports[row['airport_id']] = {'name': row['name'],
                                       'code': row['three_letter_code'],
                                       'lat': row['latitude'],
                                       'lon': row['longitude'],
                                       'outbound': [],
                                       'inbound': []}
        #if row['three_letter_code'] == 'DAY':
        #    print row
    #print airports['3627']

with open('../data/routes.dat') as route_file:
    route_reader = csv.DictReader(route_file,
                                    ['airline',
                                     'airline_id',
                                     'source_airport',
                                     'source_airport_id',
                                     'destination_airport',
                                     'destination_airport_id',
                                     'codeshare',
                                     'stops',
                                     'equipment'])
    for row in route_reader:
        try:
            airports[row['source_airport_id']]['outbound'].append({
                'name': airports[row['destination_airport_id']]['name'],
                'code': airports[row['destination_airport_id']]['code'],
                'lat': airports[row['destination_airport_id']]['lat'],
                'lon': airports[row['destination_airport_id']]['lon']})
            airports[row['destination_airport_id']]['inbound'].append({
                'name': airports[row['source_airport_id']]['name'],
                'code': airports[row['source_airport_id']]['code'],
                'lat': airports[row['source_airport_id']]['lat'],
                'lon': airports[row['source_airport_id']]['lon']})
        except KeyError as e:
            #print row, e
            pass
    print airports['3627']

    file = open('../data/dayton_routes.json', 'w')
    file.write('var routes=')
    file.write(json.dumps(airports['3627'], indent=2))
    file.write(';')
    file.close()
