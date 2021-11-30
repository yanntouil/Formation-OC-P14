import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react'
import { ReactComponent as CaretDownIcon } from '../../assets/images/icons/caret-down.svg'



export const DropdownContext = createContext([]);

export default function Dropdown({children, options}) {


    /**
     * States
     */
    const [showDropdown, setShowDropdown] = useState(false)// Dropdown state show/hide

    /**
     * References
     */
    const ref = useRef(null)

    /**
     * Open dropdown
     */
    const openDropdown = () => {
        setShowDropdown(true)
    }

    /**
     * Close dropdown
     */
    const closeDropdown = () => {
        setShowDropdown(false)
    }

    /**
     * Toggle dropdown
     */
    const toggleDropdown = () => showDropdown ? closeDropdown() : openDropdown()

    /**
     * Backdrop click handler
     */
     const clickBackdrop = useCallback((e) => {
        if (ref && !ref.current.contains(e.target)) closeDropdown()
    }, [])

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
     * Render
     */
    return (
        <DropdownContext.Provider value={{showDropdown, openDropdown, closeDropdown, toggleDropdown}}>
            <div className="flex flex-col" ref={ref}>
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

/**
 * DropdownButton
 */
export function DropdownButton({children, className, showIcon = true}) {
    /**
     * Context
     */
    const {showDropdown, toggleDropdown} = useContext(DropdownContext)

    /**
     * Render
     */
    return (
        <button 
            type="button" 
            className={`flex items-center gap-4 ${className}`}
            onClick={toggleDropdown}
        >
            {children}
            {showIcon && (
                <CaretDownIcon className={`w-4 h-4 fill-current transition duration-200 ease-in-out ${showDropdown ? 'transform rotate-180' : ''}`}/>
            )}
        </button>
    )
}


/**
 * DropdownList
 */
export function DropdownList({children, className, side = 'right'}) {
    /**
     * Context
     */
    const {showDropdown} = useContext(DropdownContext)

    const sidePosition = side === 'left'  ? 'left-0' : 'right-0'
    /**
     * Render
     */
    return showDropdown ? (
        <div className="relative">
            <div className={`absolute top-0.5 ${sidePosition} overflow-y-auto scrollbar-dark flex flex-col py-2 bg-white rounded-lg shadow animate-dropdown ${className}`}>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
    ) : ''
}

/**
 * DropdownItem
 */
export function DropdownItem({children, onClick, active, className}) {
    /**
     * Context
     */
    const {closeDropdown} = useContext(DropdownContext)

    /**
     * Render
     */
    return (
        <li className={`flex  ${active ? `bg-success-600 text-white` : `hover:bg-success-100`}`}>
            <button 
                className={`flex-grow min-w-max flex px-4 py-2 ${className}`}
                onClick={() => {
                    onClick()
                    closeDropdown()
                }}
            >{children}</button>
        </li>
    )
}

