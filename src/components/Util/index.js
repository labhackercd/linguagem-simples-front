export function parseHourMinute(date) {
	if(!(date instanceof Date)) {
		date = new Date(date)
	}
	return date.getHours() + ':' + ('0'+ date.getMinutes()).slice(-2)
}
