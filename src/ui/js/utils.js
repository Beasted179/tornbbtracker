function parseShorthand(value) {
  if (!value) return 0;

  const cleaned = value
    .toLowerCase()
    .replace(/,/g, '')
    .replace(/\$/g, '')
    .trim();

  const match = cleaned.match(/^(-?[\d.]+)(k|m|b)?$/);
  if (!match) return NaN;

  let number = parseFloat(match[1]);
  const suffix = match[2];

  if (suffix === 'k') number *= 1_000;
  if (suffix === 'm') number *= 1_000_000;
  if (suffix === 'b') number *= 1_000_000_000;

  return Math.round(number);
}

function formatNumber(num) {
  return Number(num).toLocaleString();
}

function showLiveValue(inputId, displayId) {
  const val = document.getElementById(inputId).value;
  const parsed = parseShorthand(val);
  document.getElementById(displayId).textContent =
    isNaN(parsed) ? '' : parsed.toLocaleString();
}

function liveFormat(input) {
  const cursorPos = input.selectionStart;
  const raw = input.value;

  const parsed = parseShorthand(raw);
  if (isNaN(parsed)) return;

  const formatted = parsed.toLocaleString();
  input.value = formatted;
  input.setSelectionRange(formatted.length, formatted.length);
}

function autoFormatInput(id) {
  const input = document.getElementById(id);
  const parsed = parseShorthand(input.value);
  if (!isNaN(parsed)) input.value = formatNumber(parsed);
}

function populateDropdown(id, items, labelKey, valueKey) {
  const select = document.getElementById(id);
  select.innerHTML = '';

  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item[valueKey];
    option.textContent = item[labelKey];
    select.appendChild(option);
  });
}