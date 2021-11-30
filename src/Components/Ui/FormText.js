import React from 'react'
import propTypes from 'prop-types'

/**
 * Display a form input
 * @component
 * @param {Object} params
 * @param {String} params.name
 * @param {String} params.value
 * @param {Function} params.setValue
 * @param {String} [params.type='text']
 * @param {Boolean} [params.fieldError]
 */
export default function FormText({ name, value, setValue, type = 'text', fieldError = false }) {

    /**
     * Render
     */
     return (
        <input 
            id={name} 
            name={name} 
            type={type} 
            className={`px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded text-gray-600 outline-none 
                ${fieldError ? 'ring-2 ring-danger-500' : 'focus:ring-2 focus:ring-success-500'}
            `}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}
// Props types
FormText.propTypes = {
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    setValue: propTypes.func.isRequired,
    type: propTypes.string,
    fieldError: propTypes.bool,
}
