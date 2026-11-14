-- Run in the BigQuery editor
SELECT
  COUNT(*) AS total_rows,
  COUNT(*) - COUNT(DISTINCT ride_id) AS duplicate_ids,
  COUNTIF(started_at < '2025-10-01' OR started_at >= '2026-10-01') AS outside_12_month_window,
  COUNTIF(TIMESTAMP_DIFF(ended_at, started_at, SECOND) < 0) AS negative_duration,
  COUNTIF(TIMESTAMP_DIFF(ended_at, started_at, SECOND) BETWEEN 0 AND 59) AS under_1_minute,
  COUNTIF(TIMESTAMP_DIFF(ended_at, started_at, SECOND) > 86400) AS over_24_hours,
  COUNTIF(start_station_name IS NULL) AS null_start_station,
  COUNTIF(end_station_name IS NULL) AS null_end_station,
  COUNTIF(REGEXP_CONTAINS(UPPER(CONCAT(IFNULL(start_station_name,''), IFNULL(end_station_name,''))),
          r'TEST|HUBBARD BIKE-CHECKING|CASSETTE|LYFT DRIVER|DIVVY CASSETTE')) AS test_or_maintenance_stations
FROM `my-first-pro-504117.cyclistic.trips_all_raw`;
