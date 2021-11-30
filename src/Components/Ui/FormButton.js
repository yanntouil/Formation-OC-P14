import React from 'react'

export default function FormButton({ onClick, color = 'primary', type = 'button',  children }) {
    return (
        <button 
            className={`px-8 py-2 leading-6 bg-${color}-700 hover:bg-${color}-800 rounded text-sm font-bold text-gray-50 transition duration-200`}
            type={type}
            onClick={onClick}
        >{children}</button>
    )
}
