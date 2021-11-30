import React, { useState } from 'react'
import propTypes from 'prop-types'
import { v4 as uuid } from "uuid";
import { calendarViewYears } from '../../helpers/calendar';
import chevronRightIcon from '../../assets/images/icons/chevron-right.svg'
import chevronLeftIcon from '../../assets/images/icons/chevron-left.svg'


/**
 * Display annual selector
 * @component 
 * @param {Object} params
 * @param {Number} params.year
 * @param {Function} params.showDate
 */
export default function FormDateYears({year, showDate}) {

    /**
     * State and const
     */
    const [yearBase, setYearBase] = useState(year)
    const range = 12
    const years = calendarViewYears(yearBase, range)

    /**
     * Handler
     */
    const previousYears = () => setYearBase(yearBase - range * 2 - 1)
    const nextYears = () => setYearBase(yearBase + range * 2 + 1)

    /**
     * Render
     */
     return (
        <>
            <div className="flex p-4">
                <button 
                    type="button" 
                    className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-50"
                    onClick={previousYears}
                >
                    <img src={chevronLeftIcon} alt="chevronLeftIcon" className="w-4 h-4" />
                </button>
                <div className="flex-grow flex justify-center items-center font-semibold font-sans">
                    {years[0]} - {years[years.length - 1]}
                </div>
                <button 
                    type="button" 
                    className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-50"
                    onClick={nextYears}
                >
                    <img src={chevronRightIcon} alt="chevronLeftIcon" className="w-4 h-4" />
                </button>
            </div>
            <div className="grid grid-cols-5 p-4">
                {years.map((y)=> (
                    <button 
                        type="button"
                        key={uuid()}
                        className="py-2 font-sans hover:bg-gray-50"
                        onClick={() => showDate('months', {year: y})}
                    >{y}</button>
                ))}
            </div>
        </>
    )
}
// Props types
FormDateYears.propTypes = {
    year: propTypes.number.isRequired,
    showDate: propTypes.func.isRequired,
}
