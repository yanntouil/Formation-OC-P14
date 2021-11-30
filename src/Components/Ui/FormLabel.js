import React from 'react'
import propTypes from 'prop-types'

/**
 * Display a form label
 * @component
 * @param {Object} params
 * @param {String} params.name
 */
export default function FormLabel({ name, children }) {


    /**
     * Render
     */
     return (
        <label htmlFor={name}>{children}</label>
    )
}
// Props types
FormLabel.propTypes = {
    name: propTypes.string.isRequired,
}
