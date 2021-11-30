import React, { useCallback, useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import { DateISOIsValid, getDateISO, isDate } from '../../helpers/calendar'
import FormDateYears from './FormDateYears'
import FormDateMonths from './FormDateMonths'
import FormDateMonth from './FormDateMonth'
import calendarIcon from '../../assets/images/icons/calendar-alt.svg'

/**
 * Display a form datepicker
 * @component
 * @param {Object} params
 * @param {String} params.name
 * @param {String} params.value
 * @param {Function} params.setValue
 */
export default function FormDate({ name, value, setValue, fieldError = false }) {

    /**
     * States
     */
    const today = new Date()
    const [showDropdown, setShowDropdown] = useState(false)// Dropdown state show/hide
    const [month, setMonth] = useState(isDate(value) ? value.getMonth() + 1 : today.getMonth() + 1)
    const [year, setYear] = useState(isDate(value) ? value.getFullYear() : today.getFullYear())
    const [view, setView] = useState('month')
    const [input, setInput] = useState(isDate(value) ? `${value.getDate()}/${value.getMonth()}/${value.getFullYear()}` : '')

    /**
     * References
     */
    const ref = useRef(null)

    /**
     * Change view and set calendar current month and year
     * @param {'month'|'months'|'years'} view
     * @param {Object} [date={year: null, month: null}]
     * @param {Number} date.year
     * @param {Number} date.month
     */
    const showDate = (view, date = {year: null, month: null}) => {
        setView(view)
        date.year && setYear(date.year)
        date.month && setMonth(date.month)
    }

    /**
     * Input on change handler
     * @param {String} date
     */
    const updateInput = (value) => {
        setInput(value)
        if (DateISOIsValid(value)) updateValue(new Date(value))// Value is valid
        else setValue('')// Value is not valid
    }

    /**
     * Set new date value
     * @param {Date|String} date
     */
    const updateValue = (value) => {
        setValue(value)
        if (value !== "") setInput(getDateISO(value))
        else setInput('')
        closeDropdown()
    }
    /**
     * Blur search handler
     * @param {SyntheticBaseEvent} e 
     */
     const blurInput = (e) => {
        if (ref && !ref.current.contains(e.relatedTarget)) closeDropdown()
    }

    /**
     * Open dropdown
     */
     const openDropdown = () => {
        setShowDropdown(true)
        setView('month')
    }

    /**
     * Close dropdown
     */
     const closeDropdown = useCallback(() => {
        setShowDropdown(false)
    }, [])

    /**
     * Toggle dropdown
     */
     const toggleDropdown = () => showDropdown ? closeDropdown() : openDropdown()

    /**
     * Backdrop click handler
     * @param {SyntheticBaseEvent} e 
     */
    const clickBackdrop = useCallback((e) => {
        if (ref && !ref.current.contains(e.target)) closeDropdown()
    }, [closeDropdown])

    /**
     * Listen backdrop click
     */
    useEffect(() => {
        if (showDropdown) document.addEventListener('mousedown', clickBackdrop)
        else document.removeEventListener('mousedown', clickBackdrop)
        return () => {
            document.removeEventListener('mousedown', clickBackdrop)
        }
    }, [showDropdown, clickBackdrop])

    /**
     * Clear value from parent component
     */
    useEffect(() => {
        if (value === '') setInput('')
    }, [value])
    

    /**
     * Render
     */
    return (
        <div className="flex flex-col" ref={ref}>
            <div
                className={`flex items-center pr-2 bg-gray-50 border border-gray-200 rounded 
                    ${/* error */ fieldError ? 'ring-2 ring-danger-500' : 
                      /* focus */ showDropdown ? 'ring-2 ring-success-500' : 
                      /* default */ ''
                    }
                `}
            >
                <input 
                    type="text"
                    className="flex-grow py-2 px-2 bg-gray-50 outline-none"
                    placeholder="yyyy-mm-jj"
                    id={name}
                    value={input}
                    onChange={(e) => updateInput(e.target.value)}
                    onClick={openDropdown}
                    onBlur={blurInput}
                />
                <button 
                    type="button"
                    className="flex justify-center items-center w-6 h-6 rounded-full"
                    onClick={toggleDropdown}
                >
                    <img src={calendarIcon} alt="calendarIcon" className="w-4 h-4" />
                </button>
            </div>
            {showDropdown && (
                <div className="relative" >
                    <div className="absolute right-0 flex flex-col w-96 bg-white rounded-lg shadow animate-dropdown">
                        {view === 'years' && <FormDateYears year={year} showDate={showDate} />}
                        {view === 'months' && <FormDateMonths year={year} showDate={showDate} />}
                        {view === 'month' && <FormDateMonth year={year} month={month} current={value} setCurrent={updateValue} showDate={showDate} />}
                    </div>
                </div>
            )}
        </div>
    )
}
// Props types
FormDate.propTypes = {
    name: propTypes.string.isRequired,
    setValue: propTypes.func.isRequired,
    fieldError: propTypes.bool,
}
