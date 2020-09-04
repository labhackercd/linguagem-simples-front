import { parseHourMinute } from './index'

test('parses date correctly', () => {
  let validInputDate = "2020-08-31T14:33:24.694684-03:00"
  expect(parseHourMinute(validInputDate)).not.toBeNull()
})
