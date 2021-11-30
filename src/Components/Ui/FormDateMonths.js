import React, { useState } from 'react'
import propTypes from 'prop-types'
import { v4 as uuid } from "uuid";
import chevronRightIcon from '../../assets/images/icons/chevron-right.svg'
import chevronLeftIcon from '../../assets/images/icons/chevron-left.svg'
import { CALENDAR_MONTHS } from '../../helpers/calendar';


/**
 * Display monthly selector
 * @component 
 * @param {Object} params
 * @param {Number} year
 * @param {Function} showDate
 */
export default function FormDateMonths({year, showDate}) {

    /**
     * State
     */
    const [yearBase, setYearBase] = useState(year)

    /**
     * Handler
     */
    const previousYear = () => setYearBase(yearBase - 1)
    const nextYear = () => setYearBase(yearBase + 1)

    /**
     * Render
     */
    return (
        <>
            <div className="flex p-4">
                <button 
                    type="button" 
                    className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-50"
                    onClick={previousYear}
                >
                    <img src={chevronLeftIcon} alt="chevronLeftIcon" className="w-4 h-4" />
                </button>
                <button 
                    type="button"
                    className="flex-grow flex justify-center items-center font-semibold font-sans"
                    onClick={() => showDate('years', {year: yearBase})}
                >
                    {yearBase}
                </button>
                <button 
                    type="button" 
                    className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-50"
                    onClick={nextYear}
                >
                    <img src={chevronRightIcon} alt="chevronLeftIcon" className="w-4 h-4" />
                </button>
            </div>
            <div className="grid grid-cols-4 p-4">
                {Object.keys(CALENDAR_MONTHS).map((month, key) => (
                    <button
                        type="button" 
                        key={uuid()}
                        className="py-2 font-sans hover:bg-gray-50"
                        onClick={() => showDate('month', {year: yearBase, month: key + 1})}
                    >{CALENDAR_MONTHS[month]}</button>
                ))}
            </div>
        </>
    )
}
// Props types
FormDateMonths.propTypes = {
    year: propTypes.number.isRequired,
    showDate: propTypes.func.isRequired,
}
