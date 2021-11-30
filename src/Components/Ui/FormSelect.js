import React, { useEffect, useRef, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { v4 as uuid } from "uuid";
import caretDownIcon from '../../assets/images/icons/caret-down.svg'
import timesIcon from '../../assets/images/icons/times.svg'



/**
 * FormSelect
 * @component
 * @param {Object} params
 * @param {String} params.name
 * @param {String} params.value
 * @param {Array.<string>} params.options
 * @param {Function} params.setValue
 */
export default function FormSelect({ name, value, options, setValue, fieldError = false }) {

    /**
     * States
     */
    const [showDropdown, setShowDropdown] = useState(false)// Dropdown state show/hide
    const [showClear, setShowClear] = useState(false)// Clear search button state show/hide
    const [search, setSearch] = useState('')// Input search value
    const [hoverOption, setHoverOption] = useState('')// Option hovered

    /**
     * References
     */
    const ref = useRef(null)
    const refSearch = useRef(null)
    const refDropdown = useRef(null)
    const refOptions = useRef({})

    /**
     * Computed filtered options
     */
    const filteredOptions = () => 
        search === '' ? options : options.filter(option => option.toLowerCase().includes(search.toLowerCase()))

    /**
     * Select an option
     */
    const selectOption = (option) => {
        refSearch.current.focus()
        setShowDropdown(false)
        setValue(option)
        setSearch(option)
    }

    /**
     * Change search handler
     * @param {SyntheticBaseEvent} e 
     */
     const updateSearch = (e) => {
        openDropdown()
        setSearch(e.target.value)
        if (e.target.value === '') setValue('')
        else if (options.includes(e.target.value)) setValue(e.target.value)
    }

    /**
     * Clear search field
     */
    const clearSearch = () => {
        setSearch('')
        setValue('')
        refSearch.current.focus()
    }

    /**
     * Blur search handler
     * @param {SyntheticBaseEvent} e 
     */
    const blurSearch = (e) => {
        if (ref && !ref.current.contains(e.relatedTarget)) closeDropdown()
    }

    /**
     * Open dropdown
     */
    const openDropdown = () => {
        setShowDropdown(true)
        setShowClear(true)
    }

    /**
     * Close dropdown
     */
    const closeDropdown = useCallback(() => {
        setShowDropdown(false)
        setShowClear(false)
        if (options.includes(search)) setValue(search)
        else if (value !== '') setSearch(value)
        else setSearch('')
    }, [options, search, setValue, value])

    /**
     * Toggle dropdown
     */
    const toggleDropdown = () => showDropdown ? closeDropdown() : openDropdown()

    /**
     * Backdrop click handler
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
     * Manage keyboard interaction
     * @param {SyntheticBaseEvent} e 
     * @returns {void}
     */
    const manageKeyboard = (e) => {
        if (!['Enter', 'ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape'].includes(e.key)) return
        if (e.key === 'Escape') return closeDropdown()// Escape => Close
        if (e.key === 'Enter') return filteredOptions().includes(hoverOption) && selectOption(hoverOption)// Enter => Select option or do nothing
        e.preventDefault()
        openDropdown()
        let index = filteredOptions().findIndex((option) => option === hoverOption)
        if (index < 0) index = 0// Set default
        if (e.key === 'ArrowDown' && ++index === filteredOptions().length) index = 0// ArrowDown => Go to next or first if is last
        else if (e.key === 'ArrowUp' && --index < 0) index = filteredOptions().length -1// ArrowUp => Go to previous or last if is first
        else if (e.key === 'Home') index = 0// Home => Go to first
        else if (e.key === 'End') index = filteredOptions().length -1// End => Go to last
        setHoverOption(filteredOptions()[index])
        // Scroll management
        const refD = refDropdown.current// Shortcut scrollable element
        const refO = refOptions.current[index]// Shortcut hovered option element
        if (refO.offsetTop < refD.scrollTop)// Top
            refD.scrollTop = refO.offsetTop
        else if ((refO.offsetTop + refO.offsetHeight) > (refD.scrollTop + refD.offsetHeight))// Bottom
            refD.scrollTop = refO.offsetTop + refO.offsetHeight - refD.offsetHeight
    }
    
    /**
     * Clear value from parent component
     */
    useEffect(() => {
        if (value === '') setSearch('')
    }, [value])
    
    /**
     * Render
     */
    return (
        <div className="flex flex-col" ref={ref}>
            <div 
                className={`flex items-center gap-2 pr-2 bg-gray-50 border border-gray-200 rounded 
                    ${fieldError ? 'ring-2 ring-danger-500' : (showDropdown ? 'ring-2 ring-success-500' : '')}
                `}
                onMouseEnter={() => setShowClear(true)}
                onMouseLeave={() => !showDropdown && setShowClear(false)}
            >
                <input 
                    id={name} 
                    type="text"
                    autoComplete="off"
                    className="flex-grow pr-2 pl-4 py-2 bg-gray-50 text-sm text-gray-600 outline-none"
                    ref={refSearch}
                    value={search}
                    onChange={updateSearch}
                    onClick={openDropdown}
                    onKeyDown={manageKeyboard}
                    onFocus={openDropdown}
                    onBlur={blurSearch}
                />
                <button 
                    type="button" 
                    className={`flex justify-center items-center w-6 h-6 rounded-full ${showClear && search ? '' : 'invisible' }`}
                    onBlur={blurSearch}
                    onClick={clearSearch}
                >
                    <img src={timesIcon} alt="Icon cross" className="w-4 h-4" />
                </button>
                <button 
                    type="button" 
                    className="flex justify-center items-center w-6 h-6 rounded-full"
                    tabIndex="-1"
                    onClick={toggleDropdown}
                >
                    <img src={caretDownIcon} alt="Icon caret down" className={`w-4 h-4 transition duration-200 ease-in-out ${showDropdown ? 'transform rotate-180' : ''}`} />
                </button>
            </div>
            {filteredOptions().length > 0 && showDropdown && (
                <div className="relative">
                    <div 
                        className="absolute top-0.5 right-0 left-0 overflow-y-auto scrollbar-dark flex flex-col max-h-40 py-2 bg-white rounded-lg shadow animate-dropdown"
                        ref={refDropdown}
                    >
                        {filteredOptions().map((option, index) => (
                            <button 
                                className={`px-4 py-2 text-left cursor-pointer ${option === hoverOption ? 'bg-gray-100' : '' }`}
                                tabIndex="-1"
                                key={uuid()}
                                ref={(el) => refOptions.current[index] = el}
                                onClick={() => selectOption(option)}
                                onMouseEnter={() => setHoverOption(option)}
                                onMouseLeave={() => setHoverOption('')}
                            >{option}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
// Props types
FormSelect.propTypes = {
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    options: propTypes.array.isRequired,
    setValue: propTypes.func.isRequired,
}