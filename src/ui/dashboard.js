export function dashboardHTML() {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Torn BB Tracker</title>
  <style>
    body { font-family: Arial; padding: 40px; background: #111; color: #eee; }
    h1 { margin-bottom: 20px; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
    th, td { padding: 8px 12px; border: 1px solid #333; }
    th { background: #222; }
    input, select, button { padding: 6px; margin: 4px; }
    .positive { color: #4caf50; }
    .negative { color: #f44336; }
    .warning { color: #ff9800; }
    .panel { margin-bottom: 50px; }
  </style>
</head>
<body>

<h1>Torn BB Tracker</h1>
<button onclick="loadData()">Refresh</button>

<div class="panel">
  <h2>Projections</h2>
  <div id="projections"></div>
</div>

<div class="panel">
  <h2>Holdings</h2>
  <select id="member"></select>
  <select id="stock"></select>

  <input id="shares"
         type="text"
         placeholder="Shares (e.g. 2m, 500k)"
         oninput="liveFormat(this)" />

<input id="personalShares"
       type="text"
       placeholder="Personal Shares (e.g. 1)"
       oninput="liveFormat(this)" />

  <button onclick="updateHolding()">Save</button>

  <div id="holdings"></div>
</div>

<div class="panel">
  <h2>Ledger</h2>
  <select id="ledgerType"></select>
  <input id="shares" type="text" placeholder="e.g. 2m, 500k"
       oninput="liveFormat(this)" />
  <select id="ledgerCategory"></select>
  <input id="ledgerNote" placeholder="Note" />
  <button onclick="addLedger()">Add</button>
  <div id="ledger"></div>
</div>

<div class="panel">
  <h2>Transfer Shares</h2>
  <select id="transferFrom"></select>
  <select id="transferTo"></select>
  <select id="transferStock"></select>
  <input id="shares" type="text" placeholder="e.g. 2m, 500k"
       oninput="liveFormat(this)" />
  <span id="sharesPreview"></span>
  <button onclick="transferShares()">Transfer</button>
</div>

<div class="panel">
  <h2>Audit Snapshots</h2>
 <select id="auditType"></select>
 <input id="shares" type="text" placeholder="e.g. 2m, 500k"
       oninput="liveFormat(this)" />
  <input id="auditNote" placeholder="Note" />
  <button onclick="addAudit()">Add</button>
  <div id="audits"></div>
</div>

<div class="panel">
  <h2>Monthly Snapshots</h2>
  <button onclick="createSnapshot()">Freeze Current Month</button>
  <div id="snapshots"></div>
</div>

<div class="panel">
  <h2>Members (Admin)</h2>
  <input id="newMemberName" placeholder="New Member Name" />
  <button onclick="addMember()">Add</button>
  <div id="membersAdmin"></div>
</div>

<script src="/js/utils.js"></script>
<script src="/js/renders.js"></script>
<script src="/js/mutations.js"></script>
<script src="/js/api.js"></script>
<script src="/js/dashboard.js"></script>

</body>
</html>`;
}