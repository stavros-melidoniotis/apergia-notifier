export function formatDate(date) {
  const options = {
    year: "numeric",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Europe/Athens",
  };

  return new Intl.DateTimeFormat("el-GR", options).format(date);
}

export function splitDate(date) {
  return date.split(", ");
}
