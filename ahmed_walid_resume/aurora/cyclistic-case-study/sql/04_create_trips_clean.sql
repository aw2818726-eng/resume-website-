-- Run in the BigQuery editor
CREATE OR REPLACE TABLE `my-first-pro-504117.cyclistic.trips_clean` AS
SELECT
  ride_id,
  LOWER(TRIM(rideable_type))  AS rideable_type,
  started_at,
  ended_at,
  TIMESTAMP_DIFF(ended_at, started_at, SECOND) / 60.0 AS ride_length_min,
  FORMAT_TIMESTAMP('%A', started_at)                  AS day_of_week,
  EXTRACT(DAYOFWEEK FROM started_at)                  AS day_of_week_num,  -- 1 = Sunday
  FORMAT_TIMESTAMP('%B', started_at)                  AS month_name,
  EXTRACT(MONTH FROM started_at)                      AS month_num,
  EXTRACT(HOUR FROM started_at)                       AS start_hour,
  NULLIF(TRIM(start_station_name), '') AS start_station_name,
  NULLIF(TRIM(end_station_name), '')   AS end_station_name,
  start_lat, start_lng, end_lat, end_lng,
  LOWER(TRIM(member_casual)) AS member_casual
FROM `my-first-pro-504117.cyclistic.trips_all_raw`
WHERE started_at >= '2025-10-01' AND started_at < '2026-10-01'
  AND TIMESTAMP_DIFF(ended_at, started_at, SECOND) BETWEEN 60 AND 86400
  AND NOT REGEXP_CONTAINS(UPPER(CONCAT(IFNULL(start_station_name,''), IFNULL(end_station_name,''))),
          r'TEST|HUBBARD BIKE-CHECKING|CASSETTE|LYFT DRIVER')
QUALIFY ROW_NUMBER() OVER (PARTITION BY ride_id ORDER BY started_at) = 1;

SELECT member_casual, rideable_type, COUNT(*) AS rides,
       ROUND(AVG(ride_length_min), 1) AS avg_min
FROM `my-first-pro-504117.cyclistic.trips_clean`
GROUP BY 1, 2 ORDER BY 1, 2;
