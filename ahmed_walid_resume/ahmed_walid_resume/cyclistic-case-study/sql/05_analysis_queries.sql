-- Analysis queries (BigQuery editor). Queries 5 to 8 were rebuilt from the exported result
-- columns because the originals were not saved; re-run them to confirm the numbers.
-- 1. Hour of day
SELECT start_hour,
       COUNTIF(member_casual = 'casual') AS casual_rides,
       COUNTIF(member_casual = 'member') AS member_rides
FROM `my-first-pro-504117.cyclistic.trips_clean`
GROUP BY 1 ORDER BY 1;

-- 2. Month (rides and casual share)
SELECT FORMAT_TIMESTAMP('%Y-%m', started_at) AS year_month,
       COUNTIF(member_casual = 'casual') AS casual_rides,
       COUNTIF(member_casual = 'member') AS member_rides,
       ROUND(100 * COUNTIF(member_casual = 'casual') / COUNT(*), 1) AS casual_pct
FROM `my-first-pro-504117.cyclistic.trips_clean`
GROUP BY 1 ORDER BY 1;

-- 3. Day of week
SELECT day_of_week_num, day_of_week,
       COUNTIF(member_casual = 'casual') AS casual_rides,
       COUNTIF(member_casual = 'member') AS member_rides
FROM `my-first-pro-504117.cyclistic.trips_clean`
GROUP BY 1, 2 ORDER BY 1;

-- 4. Top 10 casual start stations
SELECT start_station_name, COUNT(*) AS casual_rides
FROM `my-first-pro-504117.cyclistic.trips_clean`
WHERE member_casual = 'casual' AND start_station_name IS NOT NULL
GROUP BY 1 ORDER BY 2 DESC LIMIT 10;

-- 5. Overall summary (rebuilt)
SELECT member_casual, COUNT(*) AS rides,
       ROUND(100 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_of_rides,
       ROUND(AVG(ride_length_min), 1) AS avg_min,
       ROUND(APPROX_QUANTILES(ride_length_min, 100)[OFFSET(50)], 1) AS median_min
FROM `my-first-pro-504117.cyclistic.trips_clean`
GROUP BY 1;

-- 6. Average ride length by day of week (rebuilt)
SELECT member_casual, day_of_week_num, day_of_week, COUNT(*) AS rides,
       ROUND(AVG(ride_length_min), 1) AS avg_min
FROM `my-first-pro-504117.cyclistic.trips_clean`
GROUP BY 1, 2, 3 ORDER BY 1, 2;

-- 7. Average ride length by month (rebuilt)
SELECT member_casual, FORMAT_TIMESTAMP('%Y-%m', started_at) AS year_month,
       COUNT(*) AS rides, ROUND(AVG(ride_length_min), 1) AS avg_min
FROM `my-first-pro-504117.cyclistic.trips_clean`
GROUP BY 1, 2 ORDER BY 2, 1;

-- 8. Bike type share (rebuilt)
SELECT member_casual, rideable_type, COUNT(*) AS rides,
       ROUND(100 * COUNT(*) / SUM(COUNT(*)) OVER (PARTITION BY member_casual), 1) AS pct_within_type
FROM `my-first-pro-504117.cyclistic.trips_clean`
GROUP BY 1, 2 ORDER BY 1, 2;
