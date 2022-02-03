const { DateTime } = require('luxon')

const now = DateTime.now()
const currentYear = now.year
const lastMonth = now.minus({ months: 1 })
const lastDayOfPreviousMonth = lastMonth.set({ day: lastMonth.daysInMonth })

const dates = {
  now: now.toISODate(), // make `now` usable with ISO date format
  lastDayOfPreviousMonth: lastDayOfPreviousMonth.toISODate(), // gets the last day of the previous month
  checkFrom: `${currentYear}-${lastDayOfPreviousMonth.month.toString().padStart(2, 0)}-01`, // yyyy-mm-dd
  checkUntil: `${currentYear}-${lastDayOfPreviousMonth.month.toString().padStart(2, 0)}-${lastDayOfPreviousMonth.daysInMonth.toString().padStart(2, 0)}` // yyyy-mm-dd-yyyy-mm-dd
}

module.exports = dates
