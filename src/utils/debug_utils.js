const toDateString = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const getEffectivePreviousWorkDate = () => {
  const now = new Date();
  // Simulate "today" as Dec 10
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

const getPendingRemittanceForPreviousWorkday = (remittances = []) => {
  if (!Array.isArray(remittances) || remittances.length === 0) {
    return null;
  }

  const effectiveDate = getEffectivePreviousWorkDate();
  const targetDateString = toDateString(effectiveDate);

  console.log("Effective Previous Date:", targetDateString);

  // Find all entries for the target date
  const entries = remittances.filter((item) => {
    if (!item?.date) return false;
    return toDateString(item.date) === targetDateString;
  });

  console.log(`Found ${entries.length} entries for date ${targetDateString}`);

  // Pick the last one as requested by the user (likely the most recent update)
  const entry = entries.length > 0 ? entries[entries.length - 1] : null;

  if (!entry) {
    console.log("No entry found for date:", targetDateString);
    return null;
  }

  console.log("Selected Entry:", entry);

  const expected = Number(entry.amount || 0);
  const paid = Number(entry.amountPaid || 0);
  const remaining = Math.max(expected - paid, 0);

  console.log("Expected:", expected);
  console.log("Paid:", paid);
  console.log("Remaining:", remaining);

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

// User's data snippet with duplicates
const remittances = [
  {
    amount: 453500,
    amountPaid: 0,
    date: "2025-12-09T22:19:02.473Z",
    _id: "6938a056a0e98eb65a48dabd",
  },
  {
    amount: 453500,
    amountPaid: 453500,
    date: "2025-12-09T17:00:00.000Z",
    _id: "6939653314f3c8d203ac36a6",
  },
];

console.log("Testing with duplicate user data...");
const result = getPendingRemittanceForPreviousWorkday(remittances);
console.log("Result (should be null if paid):", result);
