(function () {
  // Data comes from the CSV exports in /data (embedded so the page also works when opened from a file).
  var months = ['Oct 25','Nov 25','Dec 25','Jan 26','Feb 26','Mar 26','Apr 26','May 26','Jun 26','Jul 26','Aug 26','Sep 26'];
  var mc = [214380,94719,27088,23878,40077,84812,127018,235873,297229,345551,335501,284177];
  var mm = [414094,251924,109371,109865,157240,223654,308460,399522,444151,500460,511007,467096];
  var pct = [34.1,27.3,19.9,17.9,20.3,27.5,29.2,37.1,40.1,40.8,39.6,37.8];
  var hc = [46370,30327,19000,11201,8804,14146,29284,52130,74849,71957,85615,108989,130565,136754,141449,157230,182639,199590,172120,129842,96635,83903,73402,53502];
  var hm = [37010,22562,13195,8710,9744,37925,110362,217458,281662,177501,152023,176057,202520,200895,201678,257927,368509,420759,329798,228695,161785,127941,93707,58421];
  var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var dc = [337544,242886,241560,246730,263128,331190,447265];
  var dm = [409265,543924,627692,631330,615031,572513,497089];
  var lc = [21.0,18.3,15.7,15.0,15.8,17.9,20.6];
  var lm = [13.3,11.9,11.7,11.6,11.7,12.1,13.4];
  var sn = ['Navy Pier','DuSable Lake Shore Dr & Monroe St','Michigan Ave & Oak St','DuSable Lake Shore Dr & North Blvd','Millennium Park','Shedd Aquarium','Theater on the Lake','Dusable Harbor','Field Museum','Adler Planetarium'];
  var sv = [49557,28566,20660,16931,16835,16055,14756,13629,10021,9993];
  var hours = []; for (var i = 0; i < 24; i++) hours.push(String(i).padStart(2, '0'));

  var root = document.documentElement, btn = document.getElementById('theme'), charts = [];
  var fallback = {month:'01_rides_by_month',pct:'02_casual_share_by_month',hour:'03_rides_by_hour',day:'04_rides_by_day_of_week',len:'05_avg_ride_length_by_day',stations:'06_top_casual_stations'};

  try { var saved = localStorage.getItem('cyclistic-theme'); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}
  function label() { btn.textContent = root.getAttribute('data-theme') === 'clean' ? 'Analyst view' : 'Recruiter view'; }

  function showImages() {
    Object.keys(fallback).forEach(function (id) {
      var c = document.getElementById(id); if (!c) return;
      c.parentNode.innerHTML = '<img src="charts/' + fallback[id] + '.png" alt="' + c.getAttribute('aria-label') + '">';
    });
  }

  function fmt(v) { return v >= 1000 ? (v / 1000) + 'k' : v; }
  function base(ytitle, cb) {
    return { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true, title: { display: true, text: ytitle }, ticks: { callback: cb } }, x: { grid: { display: false } } } };
  }

  function render() {
    charts.forEach(function (c) { c.destroy(); }); charts = [];
    var cs = getComputedStyle(root), g = function (n) { return cs.getPropertyValue(n).trim(); };
    var cas = g('--casual'), mem = g('--member');
    Chart.defaults.color = g('--mute'); Chart.defaults.borderColor = g('--line');
    Chart.defaults.font.family = 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';
    function mk(id, cfg) { charts.push(new Chart(document.getElementById(id), cfg)); }
    function two(a, b) { return [{ label: 'Casual', data: a, backgroundColor: cas, borderColor: cas }, { label: 'Member', data: b, backgroundColor: mem, borderColor: mem }]; }
    function lines(a, b) { return two(a, b).map(function (d) { d.tension = .25; d.pointRadius = 3; return d; }); }

    mk('month', { type: 'bar', data: { labels: months, datasets: two(mc, mm) }, options: base('Rides', fmt) });
    mk('pct', { type: 'line', data: { labels: months, datasets: [{ label: 'Casual share of rides (%)', data: pct, borderColor: cas, backgroundColor: cas, tension: .25, pointRadius: 4 }] }, options: base('Casual share (%)', function (v) { return v + '%'; }) });
    var ho = base('Rides', fmt); ho.scales.x.title = { display: true, text: 'Start hour (local time)' };
    mk('hour', { type: 'line', data: { labels: hours, datasets: lines(hc, hm) }, options: ho });
    mk('day', { type: 'bar', data: { labels: days, datasets: two(dc, dm) }, options: base('Rides', fmt) });
    mk('len', { type: 'line', data: { labels: days, datasets: lines(lc, lm) }, options: base('Average ride length (min)') });
    var so = base('', fmt); so.indexAxis = 'y'; so.plugins.legend = { display: false };
    so.scales = { y: { ticks: { autoSkip: false }, grid: { display: false } }, x: { beginAtZero: true, title: { display: true, text: 'Casual rides starting here' }, ticks: { callback: fmt } } };
    mk('stations', { type: 'bar', data: { labels: sn, datasets: [{ label: 'Casual rides', data: sv, backgroundColor: cas }] }, options: so });
  }

  label();
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'clean' ? 'analyst' : 'clean';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('cyclistic-theme', next); } catch (e) {}
    label(); if (typeof Chart !== 'undefined') render();
  });

  if (typeof Chart === 'undefined') showImages(); else render();
})();
