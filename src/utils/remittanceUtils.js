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

  if (entries.length === 0) {
    return null;
  }

  // Check the first entry
  const firstEntry = entries[0];
  const firstExpected = Number(firstEntry.amount || 0);
  const firstPaid = Number(firstEntry.amountPaid || 0);
  const firstRemaining = Math.max(firstExpected - firstPaid, 0);
  const firstIsFullyPaid = firstRemaining <= 0;

  // Check the last entry
  const lastEntry = entries[entries.length - 1];
  const lastExpected = Number(lastEntry.amount || 0);
  const lastPaid = Number(lastEntry.amountPaid || 0);
  const lastRemaining = Math.max(lastExpected - lastPaid, 0);
  const lastIsFullyPaid = lastRemaining <= 0;

  console.log("First entry:", {
    amount: firstExpected,
    paid: firstPaid,
    remaining: firstRemaining,
    fullyPaid: firstIsFullyPaid,
  });
  console.log("Last entry:", {
    amount: lastExpected,
    paid: lastPaid,
    remaining: lastRemaining,
    fullyPaid: lastIsFullyPaid,
  });

  // If either first or last is fully paid, don't show popup
  if (firstIsFullyPaid || lastIsFullyPaid) {
    return null;
  }

  // Both have remaining balance - use the first entry (or you could choose last)
  return {
    entry: firstEntry,
    expected: firstExpected,
    paid: firstPaid,
    remaining: firstRemaining,
    dateString: targetDateString,
    displayDate: new Date(firstEntry.date).toDateString(),
  };
};
