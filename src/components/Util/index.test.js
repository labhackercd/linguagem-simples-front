import { parseHourMinute, isURLValid } from './index'

test('parses date correctly', () => {
  let validInputDate = "2020-08-31T14:33:24.694684-03:00"
  expect(parseHourMinute(validInputDate)).not.toBeNull()
})

test('url should not be valid', () => {
  let invalidURL = "www.uol.com.br"
  let validURL = "http://google.com"
  expect(isURLValid(invalidURL)).toBe(false)
  expect(isURLValid(validURL)).toBe(true)
})
