async function updateHolding() {
  const shares = parseShorthand(document.getElementById('shares').value);
  const personalBBs = Number(document.getElementById('personalBBs').value || 0);

  await fetch('/holdings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      member: document.getElementById('member').value,
      symbol: document.getElementById('stock').value,
      shares,
      personalBBs
    })
  });

  loadData();
}

async function addLedger() {
  const delta = parseShorthand(document.getElementById('ledgerDelta').value);

  await fetch('/ledger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      payoutType: document.getElementById('ledgerType').value,
      delta,
      category: document.getElementById('ledgerCategory').value,
      note: document.getElementById('ledgerNote').value
    })
  });

  loadData();
}

async function addAudit() {
  const actual = parseShorthand(document.getElementById('auditActual').value);

  await fetch('/audits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      payoutType: document.getElementById('auditType').value,
      actual,
      note: document.getElementById('auditNote').value
    })
  });

  loadData();
}

async function createSnapshot() {
  await fetch('/snapshots', { method: 'POST' });
  loadData();
}

async function deleteMember(id) {
  await fetch('/members/' + id, { method: 'DELETE' });
  loadData();
}

async function deleteHolding(id) {
  await fetch('/holdings/' + id, {
    method: 'DELETE'
  });

  loadData();
}

async function transferShares() {
  const shares = parseShorthand(document.getElementById('transferAmount').value);

  await fetch('/transfers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fromMemberId: Number(document.getElementById('transferFrom').value),
      toMemberId: Number(document.getElementById('transferTo').value),
      stockId: Number(document.getElementById('transferStock').value),
      shares
    })
  });

  loadData();
}