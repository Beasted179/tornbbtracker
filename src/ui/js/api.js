async function loadData() {
  const projections = await fetch('/projections').then(r => r.json());
  const ledger = await fetch('/ledger').then(r => r.json());
  const audits = await fetch('/audits').then(r => r.json());
  const members = await fetch('/members').then(r => r.json());
  const stocks = await fetch('/stocks').then(r => r.json());
  const holdings = await fetch('/holdings').then(r => r.json());
  const snapshots = await fetch('/snapshots').then(r => r.json());
    const payoutTypes = [...new Set(stocks.map(s => s.payoutType))];
const ledgerCategories = [
  "PRIZE",
  "TRADE",
  "SALE",
  "PURCHASE",
  "DONATION",
  "TRANSFER",
  "ADJUSTMENT",
  "CORRECTION"
];

populateDropdown(
  "ledgerCategory",
  ledgerCategories.map(c => ({ label: c, value: c })),
  "label",
  "value"
);
populateDropdown(
  'ledgerType',
  payoutTypes.map(p => ({ value: p, label: p })),
  'label',
  'value'
);

populateDropdown(
  'auditType',
  payoutTypes.map(p => ({ value: p, label: p })),
  'label',
  'value'
);
  populateDropdown('member', members, 'name', 'name');
  populateDropdown('stock', stocks, 'symbol', 'symbol');
  populateDropdown('transferFrom', members, 'name', 'id');
  populateDropdown('transferTo', members, 'name', 'id');
  populateDropdown('transferStock', stocks, 'symbol', 'id');

  renderProjections(projections, audits);
  renderHoldings(holdings);
  renderLedger(ledger);
  renderAudits(audits);
  renderSnapshots(snapshots);
  renderMembersAdmin(members);
}