const TURKISH_DATE_FORMATTER = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function parseValidSourceDate(sourceDate) {
  if (typeof sourceDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(sourceDate)) {
    return null;
  }

  const [yearStr, monthStr, dayStr] = sourceDate.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

export function sourceDateLabel(item) {
  if (!item || item.sourceDateVerified !== true) {
    return 'Kaynak temelli okuma';
  }

  const validDate = parseValidSourceDate(item.sourceDate);
  if (validDate) {
    return `Kaynak tarihi: ${TURKISH_DATE_FORMATTER.format(validDate)}`;
  }

  if (
    Number.isInteger(item.sourceYear) &&
    item.sourceYear >= 1800 &&
    item.sourceYear <= 2100
  ) {
    return `Kaynak yılı: ${item.sourceYear}`;
  }

  return 'Kaynak temelli okuma';
}
