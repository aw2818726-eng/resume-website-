-- Run in the BigQuery editor
CREATE OR REPLACE TABLE `my-first-pro-504117.cyclistic.trips_all_raw` AS
SELECT * FROM `my-first-pro-504117.cyclistic.trips_20*`;

SELECT COUNT(*) AS total_rows,
       COUNT(DISTINCT ride_id) AS distinct_rides,
       MIN(started_at) AS first_ride,
       MAX(started_at) AS last_ride
FROM `my-first-pro-504117.cyclistic.trips_all_raw`;
