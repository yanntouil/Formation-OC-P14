import React from 'react'

export default function FormError({fieldError, message}) {
    return fieldError ? 
        <div className="text-danger-600">{message}</div> : <></>
}
