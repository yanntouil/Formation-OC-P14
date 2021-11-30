import React, { createContext, useCallback, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import './Alert.css'

/**
 * Create context
 */
export const AlertContext = createContext()

/**
 * Alert
 * @component
 * @param {Object} params
 * @param {String} params.name
 * @param {Boolean} params.showClose
 * @param {Boolean} params.show
 * @param {Function} params.setShow
 */
export default function Alert({ name, showClose = true, show, setShow, children }) {

    /**
     * References
     */
    const ref = useRef(null)

    /**
     * Manage keyboard interaction
     * @param {SyntheticBaseEvent} e 
     */
    const handelKeydown = useCallback((e) => {
        if (e.key === 'Escape') return setShow(false)
    }, [setShow])

    // Focus first element focusable
    useEffect(() => {
        if (show) {
            ref.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')[0].focus()
            document.addEventListener('keydown', handelKeydown)
        } else {
            document.removeEventListener('keydown', handelKeydown)
        }
        return () => {
            document.removeEventListener('keydown', handelKeydown)
        }
    }, [show, handelKeydown, ref])

    /**
     * Render
     */
    return show && (
        <AlertContext.Provider value={{show, setShow}}>
            <div className="alert" aria-labelledby={`${name}-title`} role="dialog" aria-modal="true" ref={ref}>
                <div className="alert-container">
                    <div 
                        className="alert-overlay" 
                        aria-hidden="true"
                        onClick={() => setShow(!show)}
                    ></div>
                    <span className="alert-spacer" aria-hidden="true">&#8203;</span>
                    <div className="alert-wrapper">
                        <div className="alert-modal">
                            {children}
                        </div>
                        {showClose && 
                            <button 
                                className="alert-modal-close"
                                onClick={() => setShow(!show)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"/></svg>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </AlertContext.Provider>
    )
}
// Props types
Alert.propTypes = {
    name: propTypes.string.isRequired,
    showClose: propTypes.bool,
    show: propTypes.bool.isRequired,
    setShow: propTypes.func.isRequired,
}

/**
 * Show title wrapper
 * @component
 */
export function AlertTitle({ children }) {
    return (
        <h3 className="alert-modal-title" id="modal-title">
            {children}
        </h3>
    )
}

/**
 * Show content wrapper
 * @component
 */
export function AlertContent({ children }) {
    return (
        <div className="alert-modal-content">
            {children}
        </div>
    )
}

/**
 * Show icon
 * @component
 * @param {Object} params
 * @param {'primary'|'danger'|'success'|'warning'|'info'} params.color
 */
export function AlertIcon({ color = 'primary', IconComponent }) {
    return (
        <div className={`alert-modal-icon ${color}`}>
            <IconComponent />
        </div>
    )
}
// Props types
AlertIcon.propTypes = {
    color: propTypes.string,
}

/**
 * Show actions wrapper
 * @component
 */
export function AlertActions({ children }) {
    return (
        <div className="alert-modal-actions">
            {children}
        </div>
    )
}