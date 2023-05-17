import { sendMessage } from "./lib/telegram.js";
import { strikeIcons } from "./strikeIcons.js";
import { formatDate, splitDate } from "./helpers/dates.js";

async function fetchTransportationStrikes() {
  const STRIKES_CATEGORY = "strikeTransportation";
  const URL = "https://apergia.gr/api/v1/events/summary";

  const res = await fetch(URL);
  const data = await res.json();

  return data.listEvents.filter((event) => event.category === STRIKES_CATEGORY);
}

(async function main() {
  const transportationStrikes = await fetchTransportationStrikes();

  if (!transportationStrikes) {
    return;
  }

  let message = "";

  for (const strike of transportationStrikes) {
    const dateFromRaw = formatDate(new Date(strike.dateFromMs));
    const dateToRaw = formatDate(new Date(strike.dateToMs));
    const [dateFrom, timeFrom] = splitDate(dateFromRaw);
    const [dateTo, timeTo] = splitDate(dateToRaw);
    const icon = strikeIcons[strike.categorySub] ?? "🚨";

    message += `
        ${icon} ${strike.title} από ${dateFrom} στις ${timeFrom} έως ${dateTo} στις ${timeTo}. \n\n
    `;
  }

  await sendMessage(message);
  return;
})();
