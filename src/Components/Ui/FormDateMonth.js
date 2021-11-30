import React from 'react'
import propTypes from 'prop-types'
import { v4 as uuid } from "uuid";
import { calendarViewMonth, getDateISO, getNextMonth, getPreviousMonth, CALENDAR_MONTHS, WEEK_DAYS } from '../../helpers/calendar'
import chevronRightIcon from '../../assets/images/icons/chevron-right.svg'
import chevronLeftIcon from '../../assets/images/icons/chevron-left.svg'


/**
 * Display monthly calendar
 * @component 
 * @param {Object} params
 * @param {Number} params.month
 * @param {Number} params.year
 * @param {Date} params.current
 * @param {Function} params.setCurrent
 * @param {Function} params.showDate
 */
export default function FormDateMonth({month, year, current, setCurrent, showDate}) {

    /**
     * Handler
     */
    const previousMonth = () => showDate('month', {...getPreviousMonth(month, year)})
    const nextMonth = () => showDate('month', {...getNextMonth(month, year)})
    const showToday = () => showDate('month', {year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1})
    const changeYear = () => showDate('years')

    /**
     * Render
     */
    return (
        <>
            <div className="flex p-4">
                <button 
                    type="button" 
                    className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-50"
                    onClick={previousMonth}
                >
                    <img src={chevronLeftIcon} alt="chevronLeftIcon" className="w-4 h-4" />
                </button>
                <button 
                    className="flex-grow flex justify-center items-center font-semibold font-sans"
                    onClick={changeYear}
                >
                    {Object.keys(CALENDAR_MONTHS)[month - 1]} {year}
                </button>
                <button 
                    type="button" 
                    className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-50"
                    onClick={nextMonth}
                >
                    <img src={chevronRightIcon} alt="chevronLeftIcon" className="w-4 h-4" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2 p-4">
                {Object.keys(WEEK_DAYS).map((key) => (
                    <div key={uuid()} className="text-center font-semibold">{WEEK_DAYS[key]}</div>
                ))}
                {calendarViewMonth(month, year).map((date) => (
                    <div key={uuid()} className="flex justify-center items-center">
                        <button 
                            type="button" 
                            className={`flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out font-sans 
                                ${ getDateISO(current) === date.iso ? 
                                    /* Current day */ `bg-success-600 hover:bg-success-500 text-white` :
                                    getDateISO() === date.iso ? 
                                    /* Today */ `ring-2 ring-success-400 font-semibold` :
                                    /* Not today */ `bg-white  
                                        ${date.month !== month ? 
                                            /* Not this month */ `text-gray-400` : /* This month */ `` 
                                        }`
                                }`
                            }
                            onClick={() => setCurrent(new Date(date.iso))}
                        >{date.day}</button>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center px-4 pb-4">
                <button 
                    type="button"
                    className="hover:bg-gray-50 px-4 py-2"
                    onClick={() => setCurrent('')}
                >Clear</button>
                <button 
                    type="button"
                    onClick={showToday}
                    className="hover:bg-gray-50 px-4 py-2"
                >Today</button>
            </div>
        </>
    )
}
// Props types
FormDateMonth.propTypes = {
    month: propTypes.number.isRequired,
    year: propTypes.number.isRequired,
    setCurrent: propTypes.func.isRequired,
    showDate: propTypes.func.isRequired,
}
