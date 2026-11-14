#!/bin/bash
# Run in Cloud Shell (bash), not in the BigQuery editor.
mkdir -p ~/data
for z in ~/"cap stone.zip"/*-divvy-tripdata.zip; do unzip -o -q "$z" -d ~/data -x "__MACOSX/*"; done
cd ~/data
# only if the January CSV has the wrong name:
[ -f 202501-divvy-tripdata.csv ] && mv 202501-divvy-tripdata.csv 202601-divvy-tripdata.csv
ls *.csv | wc -l   # should print 12
Step 2: create the dataset and load all 12 months (Cloud Shell):
bq --location=US mk --dataset my-first-pro-504117:cyclistic

for m in 202510 202511 202512 202601 202602 202603 202604 202605 202606 202607 202608 202609; do
  bq load --replace --source_format=CSV --skip_leading_rows=1 --allow_quoted_newlines \
    my-first-pro-504117:cyclistic.trips_$m \
    ${m}-divvy-tripdata.csv \
    ride_id:STRING,rideable_type:STRING,started_at:TIMESTAMP,ended_at:TIMESTAMP,start_station_name:STRING,start_station_id:STRING,end_station_name:STRING,end_station_id:STRING,start_lat:FLOAT,start_lng:FLOAT,end_lat:FLOAT,end_lng:FLOAT,member_casual:STRING
done
