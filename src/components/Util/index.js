export function parseHourMinute(date) {
	if(!(date instanceof Date)) {
		date = new Date(date)
	}
	return date.getHours() + ':' + ('0'+ date.getMinutes()).slice(-2)
}

export function isURLValid(url) {
  try {
    url = new URL(url);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
