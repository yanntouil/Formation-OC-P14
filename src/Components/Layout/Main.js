import React from 'react'


export default function Main({ children }) {
    return (
        <main className="flex-grow sm:p-8 bg-gray-100">
            { children }
        </main>
    )
}
