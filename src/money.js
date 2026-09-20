function kobo(naira) {
  if (naira == null || naira === '') return null;
  const n = Number(String(naira).replace(/,/g, ''));
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100);
}

function naira(koboAmount) {
  return Number(koboAmount || 0) / 100;
}

function formatNaira(koboAmount, digits = 2) {
  const value = naira(koboAmount);
  return `₦${value.toLocaleString('en-NG', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  })}`;
}

function formatPct(bps) {
  return `${(Number(bps || 0) / 100).toFixed(2)}%`;
}

function bpsFromPercent(pct) {
  const n = Number(pct);
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100);
}

module.exports = { kobo, naira, formatNaira, formatPct, bpsFromPercent };
