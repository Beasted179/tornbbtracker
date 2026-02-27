function renderProjections(data, audits) {
  let html = '<table><tr><th>Type</th><th>Expected</th><th>Adjustments</th><th>Should Have</th><th>Last Actual</th><th>Drift</th></tr>';

  for (const type in data.total) {
    const row = data.total[type];
    const lastAudit = audits.find(a => a.payoutType === type);
    const actual = lastAudit ? lastAudit.actual : null;
    let drift = actual !== null ? actual - row.shouldHave : null;

    let driftClass = '';
    if (drift === 0) driftClass = 'positive';
    else if (drift > 0) driftClass = 'warning';
    else if (drift < 0) driftClass = 'negative';

    html += '<tr>' +
      '<td>' + type + '</td>' +
      '<td>' + formatNumber(row.expected) + '</td>' +
      '<td class="' + (row.adjustments < 0 ? 'negative' : 'positive') + '">' + formatNumber(row.adjustments) + '</td>' +
      '<td>' + formatNumber(row.shouldHave) + '</td>' +
      '<td>' + (actual !== null ? formatNumber(actual) : '-') + '</td>' +
      '<td class="' + driftClass + '">' + (drift !== null ? formatNumber(drift) : '-') + '</td>' +
      '</tr>';
  }

  html += '</table>';
  document.getElementById('projections').innerHTML = html;
}

function renderHoldings(data) {
  let html = '<table><tr>' +
    '<th>Member</th>' +
    '<th>Stock</th>' +
    '<th>Shares</th>' +
    '<th>Total BBs</th>' +
    '<th>Personal BBs</th>' +
    '<th>Level</th>' +
    '<th>Action</th>' +
    '</tr>';

  data.forEach(h => {
    html += '<tr>' +
      '<td>' + h.member + '</td>' +
      '<td>' + h.stock + '</td>' +
      '<td>' + formatNumber(h.shares) + '</td>' +
      '<td>' + h.totalBBs + '</td>' +
      '<td>' + (h.personalShares || 0) + '</td>' +
      '<td>' + h.incrementLevel + '</td>' +
      '<td><button onclick="deleteHolding(' + h.id + ')">Delete</button></td>' +
      '</tr>';
  });

  html += '</table>';
  document.getElementById('holdings').innerHTML = html;
}

function renderLedger(data) {
  let html = '<table><tr><th>Type</th><th>Delta</th><th>Category</th><th>Note</th><th>Date</th></tr>';
  data.forEach(e => {
    html += '<tr>' +
      '<td>' + e.payoutType + '</td>' +
      '<td class="' + (e.delta < 0 ? 'negative' : 'positive') + '">' + formatNumber(e.delta) + '</td>' +
      '<td>' + (e.category || '-') + '</td>' +
      '<td>' + (e.note || '-') + '</td>' +
      '<td>' + new Date(e.createdAt).toLocaleDateString() + '</td>' +
      '</tr>';
  });
  html += '</table>';
  document.getElementById('ledger').innerHTML = html;
}

function renderAudits(data) {
  let html = '<table><tr><th>Type</th><th>Actual</th><th>Note</th><th>Date</th></tr>';
  data.forEach(a => {
    html += '<tr>' +
      '<td>' + a.payoutType + '</td>' +
      '<td>' + formatNumber(a.actual) + '</td>' +
      '<td>' + (a.note || '-') + '</td>' +
      '<td>' + new Date(a.createdAt).toLocaleDateString() + '</td>' +
      '</tr>';
  });
  html += '</table>';
  document.getElementById('audits').innerHTML = html;
}

function renderSnapshots(data) {
  let html = '<table><tr><th>Month</th><th>Type</th><th>Expected</th><th>Adjustments</th><th>Should Have</th></tr>';
  data.forEach(s => {
    html += '<tr>' +
      '<td>' + s.month + '</td>' +
      '<td>' + s.payoutType + '</td>' +
      '<td>' + formatNumber(s.expected) + '</td>' +
      '<td>' + formatNumber(s.adjustments) + '</td>' +
      '<td>' + formatNumber(s.shouldHave) + '</td>' +
      '</tr>';
  });
  html += '</table>';
  document.getElementById('snapshots').innerHTML = html;
}

function renderMembersAdmin(data) {
  let html = '<table><tr><th>Name</th><th>Action</th></tr>';

  data.forEach(m => {
    html += '<tr>' +
      '<td>' + m.name + '</td>' +
      '<td><button onclick="deleteMember(' + m.id + ')">Delete</button></td>' +
      '</tr>';
  });

  html += '</table>';
  document.getElementById('membersAdmin').innerHTML = html;
}