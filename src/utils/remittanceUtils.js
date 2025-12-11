export const getEffectivePreviousWorkDate = () => {
  const now = new Date();
  const todayUTC = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  const effectiveDate = new Date(todayUTC);
  effectiveDate.setDate(effectiveDate.getDate() - 1);

  while (effectiveDate.getDay() === 0 || effectiveDate.getDay() === 6) {
    effectiveDate.setDate(effectiveDate.getDate() - 1);
  }

  return effectiveDate;
};

export const toDateString = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

export const getPendingRemittanceForPreviousWorkday = (remittances = []) => {
  if (!Array.isArray(remittances) || remittances.length === 0) {
    return null;
  }

  const effectiveDate = getEffectivePreviousWorkDate();
  const targetDateString = toDateString(effectiveDate);

  // Find all entries for the target date
  const entries = remittances.filter((item) => {
    if (!item?.date) return false;
    return toDateString(item.date) === targetDateString;
  });

  // Pick the first entry as requested by the user
  const entry = entries.length > 0 ? entries[0] : null;

  if (!entry) {
    return null;
  }

  const expected = Number(entry.amount || 0);
  const paid = Number(entry.amountPaid || 0);
  console.log(entry.amountPaid, expected, paid);

  const remaining = Math.max(expected - paid, 0);

  if (remaining <= 0) {
    return null;
  }

  return {
    entry,
    expected,
    paid,
    remaining,
    dateString: targetDateString,
    displayDate: new Date(entry.date).toDateString(),
  };
};
