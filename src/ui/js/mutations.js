async function updateHolding() {
  const shares = parseShorthand(
    document.getElementById('holdingShares').value || "0"
  );

  const personalShares = parseShorthand(
    document.getElementById('personalShares').value || "0"
  );

  console.log("Submitting holding:", {
    member: document.getElementById('member').value,
    symbol: document.getElementById('stock').value,
    shares,
    personalShares
  });

  await fetch('/holdings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      member: document.getElementById('member').value,
      symbol: document.getElementById('stock').value,
      shares,
      personalShares
    })
  });

  // auto clear inputs
  document.getElementById('holdingShares').value = "";
  document.getElementById('personalShares').value = "";

  loadData();
}

async function addLedger() {
  const delta = parseShorthand(
    document.getElementById('ledgerDelta').value || "0"
  );

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

  // auto clear inputs
  document.getElementById('ledgerDelta').value = "";
  document.getElementById('ledgerNote').value = "";

  loadData();
}

async function addAudit() {
  const actual = parseShorthand(
    document.getElementById('auditActual').value || "0"
  );

  await fetch('/audits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      payoutType: document.getElementById('auditType').value,
      actual,
      note: document.getElementById('auditNote').value
    })
  });

  // auto clear inputs
  document.getElementById('auditActual').value = "";
  document.getElementById('auditNote').value = "";

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
  const shares = parseShorthand(
    document.getElementById('transferAmount').value || "0"
  );

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

  // auto clear input
  document.getElementById('transferAmount').value = "";

  loadData();
}