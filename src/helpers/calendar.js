/**
 * Build a monthly calendar
 * @param {Number} month
 * @param {Number} year
 * @return {Array.<CalendarDay>} 
 */
export function calendarViewMonth(month, year) {
    const monthDays = getMonthDays(month, year)// Number days in a month
    const monthFirstDay = getMonthFirstDay(month, year)// First day of the month
    const daysFromPrevMonth = monthFirstDay - 1;// Number of day from previous month
    const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDays)// Number of day from next month
    // Get the previous and next months and years
    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year)
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year)
    // Get number of days in previous month
    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear)
    // Builds dates
    const prevMonthDates = [...new Array(daysFromPrevMonth)].map(// Previous month
        (n, index) => new CalendarDay(prevMonthYear, prevMonth, index + 1 + (prevMonthDays - daysFromPrevMonth))
    )
    const thisMonthDates = [...new Array(monthDays)].map(// Current month
        (n, index) => new CalendarDay(year, month, index + 1)
    )
    const nextMonthDates = [...new Array(daysFromNextMonth)].map(// Next month
        (n, index) => new CalendarDay(nextMonthYear, nextMonth, index + 1)
    )
    return [ ...prevMonthDates, ...thisMonthDates, ...nextMonthDates ]// Combines all dates
}

/**
 * Calandar day class
 * @class calendarDay
 */
export class CalendarDay {
    /**
     * Creates an instance of calendarDay.
     * @param {Number} year
     * @param {Number} month
     * @param {Number} day
     * @constructor
     * @memberof calendarDay
     */
    constructor(year, month, day) {
        this.year = year
        this.month = month
        this.day = day
        this.iso = [this.year, zeroPad(this.month), zeroPad(this.day)].join('-')
    }
}

/**
 * Build an annual calendar
 * @param {Number} year
 * @param {Number} range
 * @return {Array.<Number>} 
 */
 export function calendarViewYears(year, range = 12) {
    const years = []
    for (let i = year - range; i <= year + range; i++) {
        years.push(i)
    }
    return years
}

/**
 * Week days abbreviation
 * @const {Object} WEEK_DAYS
 */
export const WEEK_DAYS = {
    Sunday: "Su",
    Monday: "Mo",
    Tuesday: "Tu",
    Wednesday: "We",
    Thursday: "Th",
    Friday: "Fr",
    Saturday: "Sa"
}

/**
 * Month abbreviation
 * @const {Object} CALENDAR_MONTHS
 */
export const CALENDAR_MONTHS = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec"
}

/**
 * Number of week to show in calendar month
 * @const {Number} CALENDAR_WEEKS
 */
export const CALENDAR_WEEKS = 6

/**
 * Pads a string value with leading zeroes until length is reached
 * ? Example: zeroPad(8, 3) => "008"
 * ! Not use ATM (i prefere without zero ;))
 * @param {String|Number} value 
 * @param {Number} length 
 * @returns {String}
 */
export const zeroPad = (value, length = 2) => `${value}`.padStart(length, '0')

/**
 * Number days in a month for a given year from 28 - 31
 * @param {Number} month 
 * @param {Number} year 
 * @returns {Number}
 */
export const getMonthDays = (month, year) => month === 2 ? 
    /* Feb */ (year % 4 === 0 ? 29 : 28) :
    /* Others months */ ([4, 6, 9, 11].includes(month) ? 30 : 31)

/**
 * First day of the month for a given year from 1 - 7
 * ? 1 => Sunday, 7 => Saturday
 * @param {Number} month 
 * @param {Number} year 
 * @returns {Number}
 */
export const getMonthFirstDay = (month, year) => +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()) + 1

/**
 * Checks if date is a Date
 * @param {any} date 
 * @returns {Boolean}
 */
export const isDate = date => (Object.prototype.toString.call(date) === '[object Date]') && (date && !Number.isNaN(date.valueOf()))

/**
 * Checks if ISO date is valid
 * @param {String} dateISO 
 * @returns {Boolean}
 */
 export const DateISOIsValid = dateISO => (dateISO.match(/^(\d{4})-(\d{2})-(\d{2})$/) && !isNaN(Date.parse(dateISO))) ? true : false

/**
 * Checks if two date values are of the same month and year
 * @param {Date} date 
 * @param {Date} basedate 
 * @returns {Boolean}
 */
export const isSameMonth = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false
    const basedateMonth = +(basedate.getMonth()) + 1
    const basedateYear = basedate.getFullYear()
    const dateMonth = +(date.getMonth()) + 1
    const dateYear = date.getFullYear()
    return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear)
}

/**
 * Checks if two date are the same day (day, month, year)
 * @param {Date} date 
 * @param {Date} basedate
 * @returns {Boolean}
 */
export const isSameDay = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false
    const basedateDate = basedate.getDate()
    const basedateMonth = +(basedate.getMonth()) + 1
    const basedateYear = basedate.getFullYear()
    const dateDate = date.getDate()
    const dateMonth = +(date.getMonth()) + 1
    const dateYear = date.getFullYear()
    return (+basedateDate === +dateDate) && (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear)
}

/**
 * Return ISO date
 * @param {Date=} date
 * @returns {String}
 */
export const getDateISO = (date = new Date()) => 
    isDate(date) ? [
      date.getFullYear(),
      zeroPad(+date.getMonth() + 1, 2),
      zeroPad(+date.getDate(), 2)
    ].join('-') : null

/**
 * Return previous month
 * @param {Number} month 
 * @param {Number} year 
 * @returns {{month: Number, year: Number}}
 */
export const getPreviousMonth = (month, year) => ({
    month: month > 1 ? month - 1 : 12,
    year: month > 1 ? year : year - 1,
})

/**
 * Return next month
 * @param {Number} month 
 * @param {Number} year 
 * @returns {{month: Number, year: Number}}
 */
export const getNextMonth = (month, year) => ({ 
    month: month < 12 ? month + 1 : 1,
    year: month < 12 ? year : year + 1,
})
