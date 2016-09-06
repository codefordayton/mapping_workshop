import csv
import json


colleges = []

with open('../data/college_data.csv') as csvfile:
    reader = csv.DictReader(csvfile) 
    for row in reader:
        if row['LATITUDE'] != 'NULL' and row['LONGITUDE'] != 'NULL':
            colleges.append({ 'id': row['UNITID'],
                              'name': row['INSTNM'],
                              'url': row['INSTURL'],
                              'lat': row['LATITUDE'],
                              'lon': row['LONGITUDE']})

file = open('../data/college_index.json', 'w')
file.write(json.dumps(colleges, indent=2, ensure_ascii=False))
file.close()
