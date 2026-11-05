document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('wbr-finder-form');
  if (!form) return;

  var events = [
    { name: 'eTail Autumn Interactive', url: '#', logo: 'img/events/etail-autumn-interactive.png', start: '2026-11-14', end: '2026-11-14', city: 'Online', region: 'americas', type: 'webinar', sector: 'Retail & eCommerce' },
    { name: 'ProcureCon Europe 2026', url: '#', logo: 'img/events/procurecon-europe.svg', start: '2026-11-20', end: '2026-11-22', city: 'Amsterdam, NL', region: 'europe', type: 'conference', sector: 'Procurement & Sourcing' },
    { name: 'Digital Travel Summit EMEA', url: '#', logo: 'img/events/digital-travel-summit.png', start: '2026-11-27', end: '2026-11-28', city: 'London, UK', region: 'europe', type: 'summit', sector: 'Customer Experience' },
    { name: 'InvestOps Europe 2026', url: '#', logo: 'img/events/investops-eu.png', start: '2026-12-03', end: '2026-12-04', city: 'London, UK', region: 'europe', type: 'conference', sector: 'Finance & Investments' },
    { name: 'LogiAfterSales 2026', url: '#', logo: 'img/events/logiaftersales.png', start: '2026-12-10', end: '2026-12-12', city: 'Amsterdam, NL', region: 'europe', type: 'conference', sector: 'Supply Chain & Logistics' },
    { name: 'eTail Australia 2026', url: '#', logo: 'img/events/etail-australia.png', start: '2026-12-17', end: '2026-12-18', city: 'Melbourne, AU', region: 'asia-anz-mea', type: 'conference', sector: 'Retail & eCommerce' },
    { name: 'Retail CIO Connect 2027', url: '#', logo: 'img/events/retail-cio-connect.png', start: '2027-01-12', end: '2027-01-13', city: 'Ashridge House, UK', region: 'europe', type: 'connect', sector: 'Technology & Data' },
    { name: 'TradeTech FX US 2027', url: '#', logo: 'img/events/tradetech-fx.svg', start: '2027-01-26', end: '2027-01-27', city: 'Miami, FL', region: 'americas', type: 'summit', sector: 'Finance & Investments' },
    { name: 'HR Retail: Frontline Hiring in 2027', url: '#', logo: 'img/events/hr-retail.png', start: '2027-02-18', end: '2027-02-18', city: 'Online', region: 'americas', type: 'webinar', sector: 'HR & Field Service' },
    { name: 'eTail Connect West 2027', url: '#', logo: 'img/events/etail-connect-west.png', start: '2027-03-08', end: '2027-03-10', city: 'Phoenix, AZ', region: 'americas', type: 'connect', sector: 'Retail & eCommerce' },
    { name: 'ProcureCon Indirect East 2027', url: '#', logo: 'img/events/procurecon-indirect-east.svg', start: '2027-03-23', end: '2027-03-25', city: 'Philadelphia, PA', region: 'americas', type: 'conference', sector: 'Procurement & Sourcing' },
    { name: 'Digital Insurance Connect 2027', url: '#', logo: 'img/events/digital-insurance-connect.png', start: '2027-04-06', end: '2027-04-08', city: 'Austin, TX', region: 'americas', type: 'connect', sector: 'Finance & Investments' },
    { name: 'Field Service East 2027', url: '#', logo: 'img/events/field-service-east.png', start: '2027-04-16', end: '2027-04-18', city: 'Orlando, FL', region: 'americas', type: 'conference', sector: 'HR & Field Service' },
    { name: 'InvestOps Asia 2027', url: '#', logo: 'img/events/investops-asia.png', start: '2027-04-27', end: '2027-04-28', city: 'Singapore', region: 'asia-anz-mea', type: 'conference', sector: 'Finance & Investments' },
    { name: 'Retail Media Pioneers 2027', url: '#', logo: 'img/events/retail-media-pioneers.png', start: '2027-05-13', end: '2027-05-14', city: 'London, UK', region: 'europe', type: 'summit', sector: 'Retail & eCommerce' },
    { name: 'Digital Travel Summit APAC', url: '#', logo: 'img/events/digital-travel-summit.png', start: '2027-06-17', end: '2027-06-18', city: 'Singapore', region: 'asia-anz-mea', type: 'summit', sector: 'Customer Experience' },
    { name: 'eTail Boston 2027', url: '#', logo: 'img/events/etail-boston.png', start: '2027-09-07', end: '2027-09-09', city: 'Boston, MA', region: 'americas', type: 'conference', sector: 'Retail & eCommerce' }
  ];

  var regions = { 'americas': 'Americas', 'europe': 'Europe', 'asia-anz-mea': 'Asia / ANZ / MEA' };
  var types = { conference: 'Conference', summit: 'Summit', connect: 'Connect', webinar: 'Webinar' };
  var sectorColors = {
    'Retail & eCommerce': 'bg-wbr-orange',
    'Procurement & Sourcing': 'bg-wbr-green',
    'Finance & Investments': 'bg-wbr-blue',
    'Supply Chain & Logistics': 'bg-wbr-cyan',
    'Customer Experience': 'bg-wbr-orange',
    'Technology & Data': 'bg-wbr-blue',
    'HR & Field Service': 'bg-wbr-green'
  };
  var monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var fields = form.elements;
  var groups = document.getElementById('wbr-finder-groups');
  var count = document.getElementById('wbr-finder-count');
  var pills = document.getElementById('wbr-finder-pills');
  var empty = document.getElementById('wbr-finder-empty');
  var clearButtons = document.querySelectorAll('[data-finder-clear]');
  var groupTemplate = document.getElementById('wbr-finder-group-template');
  var pillTemplate = document.getElementById('wbr-finder-pill-template');
  var rowTemplate = document.getElementById('wbr-event-row-template');

  var months = [];
  var today = new Date();
  for (var i = 0; i < 12; i++) {
    var d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    months.push(d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'));
  }
  months.forEach(function (m) {
    fields.from.add(new Option(monthLabel(m, monthShort), m));
    fields.to.add(new Option(monthLabel(m, monthShort), m));
  });

  function monthLabel(yearMonth, names) {
    var parts = yearMonth.split('-');
    return names[parts[1] - 1] + ' ' + parts[0];
  }

  function eventCount(n) {
    return n === 1 ? '1 event' : n + ' events';
  }

  function clean(state) {
    var s = {
      q: (state.q || '').trim(),
      region: regions[state.region] ? state.region : '',
      type: types[state.type] ? state.type : '',
      from: months.indexOf(state.from) > -1 ? state.from : months[0],
      to: months.indexOf(state.to) > -1 ? state.to : months[11],
      sort: state.sort === 'name' ? 'name' : 'date'
    };
    if (s.from > s.to) {
      var swap = s.from;
      s.from = s.to;
      s.to = swap;
    }
    return s;
  }

  function readUrl() {
    var params = new URLSearchParams(location.search);
    return clean({ q: params.get('q'), region: params.get('region'), type: params.get('type'), from: params.get('from'), to: params.get('to'), sort: params.get('sort') });
  }

  function readForm() {
    return clean({ q: fields.q.value, region: fields.region.value, type: fields.type.value, from: fields.from.value, to: fields.to.value, sort: fields.sort.value });
  }

  function toUrl(s) {
    var params = new URLSearchParams();
    if (s.q) params.set('q', s.q);
    if (s.region) params.set('region', s.region);
    if (s.type) params.set('type', s.type);
    if (s.from !== months[0]) params.set('from', s.from);
    if (s.to !== months[11]) params.set('to', s.to);
    if (s.sort !== 'date') params.set('sort', s.sort);
    var query = params.toString();
    return location.pathname + (query ? '?' + query : '');
  }

  function dateCells(e) {
    var start = e.start.split('-');
    var end = e.end.split('-');
    var month = monthShort[start[1] - 1];
    if (end[1] !== start[1]) month += '–' + monthShort[end[1] - 1];
    var days = +start[2] === +end[2] && start[1] === end[1] ? String(+start[2]) : +start[2] + '–' + +end[2];
    return { month: month, days: days };
  }

  function makeRow(e) {
    var row = rowTemplate.content.cloneNode(true);
    var field = function (name) { return row.querySelector('[data-field="' + name + '"]'); };
    var date = dateCells(e);
    field('month').textContent = date.month;
    field('days').textContent = date.days;
    field('logo').src = e.logo;
    field('name').textContent = e.name;
    field('name').href = e.url;
    field('type').textContent = types[e.type];
    field('sector-color').classList.add(sectorColors[e.sector]);
    field('sector').textContent = e.sector;
    field('city').textContent = e.city;
    field('sponsor').setAttribute('aria-label', 'Sponsor ' + e.name);
    field('agenda').setAttribute('aria-label', e.name + ' agenda');
    return row;
  }

  function makeGroup(label) {
    var group = groupTemplate.content.cloneNode(true);
    group.querySelector('[data-field="label"]').textContent = label;
    return group;
  }

  function render(s) {
    var q = s.q.toLowerCase();
    var list = events.filter(function (e) {
      var month = e.start.slice(0, 7);
      var text = (e.name + ' ' + e.city + ' ' + e.sector + ' ' + types[e.type]).toLowerCase();
      return (!s.region || e.region === s.region) && (!s.type || e.type === s.type) && month >= s.from && month <= s.to && (!q || text.indexOf(q) > -1);
    });
    list.sort(function (a, b) {
      return s.sort === 'name' ? a.name.localeCompare(b.name) : a.start.localeCompare(b.start);
    });

    groups.replaceChildren();
    var current = null;
    list.forEach(function (e) {
      var label = s.sort === 'name' ? 'A–Z' : monthLabel(e.start.slice(0, 7), monthLong);
      if (!current || current.label !== label) {
        var group = makeGroup(label);
        current = { label: label, rows: group.querySelector('[data-field="rows"]'), count: group.querySelector('[data-field="count"]'), n: 0 };
        groups.append(group);
      }
      current.rows.append(makeRow(e));
      current.n++;
      current.count.textContent = eventCount(current.n);
    });

    var active = [];
    if (s.q) active.push(['q', '“' + s.q + '”']);
    if (s.region) active.push(['region', regions[s.region]]);
    if (s.type) active.push(['type', types[s.type]]);
    if (s.from !== months[0] || s.to !== months[11]) active.push(['dates', monthLabel(s.from, monthShort) + ' – ' + monthLabel(s.to, monthShort)]);

    pills.replaceChildren();
    active.forEach(function (filter) {
      var pill = pillTemplate.content.cloneNode(true);
      var remove = pill.querySelector('[data-field="remove"]');
      pill.querySelector('[data-field="label"]').textContent = filter[1];
      remove.dataset.filter = filter[0];
      remove.setAttribute('aria-label', 'Remove filter: ' + filter[1]);
      pills.append(pill);
    });

    count.textContent = eventCount(list.length);
    clearButtons[0].hidden = active.length === 0;
    empty.hidden = list.length > 0;
  }

  function apply(s, historyMethod) {
    if (document.activeElement !== fields.q) fields.q.value = s.q;
    fields.region.value = s.region;
    fields.type.value = s.type;
    fields.from.value = s.from;
    fields.to.value = s.to;
    fields.sort.value = s.sort;
    render(s);
    if (historyMethod && toUrl(s) !== location.pathname + location.search) history[historyMethod](null, '', toUrl(s));
  }

  var typing;
  fields.q.addEventListener('input', function () {
    clearTimeout(typing);
    typing = setTimeout(function () { apply(readForm(), 'replaceState'); }, 300);
  });

  document.addEventListener('change', function (e) {
    if (e.target.form === form && e.target !== fields.q) apply(readForm(), 'pushState');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearTimeout(typing);
    apply(readForm(), 'pushState');
  });

  pills.addEventListener('click', function (e) {
    var remove = e.target.closest('[data-filter]');
    if (!remove) return;
    var s = readForm();
    if (remove.dataset.filter === 'dates') {
      s.from = months[0];
      s.to = months[11];
    } else {
      s[remove.dataset.filter] = '';
    }
    apply(s, 'pushState');
  });

  clearButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      fields.q.value = '';
      apply(clean({ sort: readForm().sort }), 'pushState');
    });
  });

  window.addEventListener('popstate', function () { apply(readUrl()); });

  apply(readUrl());
});
