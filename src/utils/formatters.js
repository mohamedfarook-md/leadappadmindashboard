// Shared display formatters. Keeping these centralized avoids inconsistent
// date/number formatting scattered across pages.

export function formatDate(value, options) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  });
}

export function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return `${date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}, ${date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "0";
  }
  return Number(value).toLocaleString("en-IN");
}

export function formatCurrency(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "₹0";
  }
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export function formatPercent(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "0%";
  }
  return `${Number(value).toFixed(digits)}%`;
}

export function initialsFromName(name) {
  if (!name) return "—";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function truncate(text, max = 40) {
  if (!text) return "—";
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
