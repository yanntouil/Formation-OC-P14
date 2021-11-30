import React, { createContext, useContext, useState } from 'react'
import { v4 as uuid } from "uuid"
import Dropdown, { DropdownList, DropdownItem, DropdownButton } from './Dropdown'
import { ReactComponent as SortASC } from '../../assets/images/icons/sort-text-asc.svg'
import { ReactComponent as SortDESC } from '../../assets/images/icons/sort-text-desc.svg'
import { ReactComponent as SortIcon } from '../../assets/images/icons/sort.svg'
import { ReactComponent as SearchIcon } from '../../assets/images/icons/search.svg'
import { ReactComponent as ChevronLeft } from '../../assets/images/icons/chevron-left.svg'
import { ReactComponent as ChevronRight } from '../../assets/images/icons/chevron-right.svg'


/**
 * Set Context
 */
export const dataTableContext = createContext([]);

/**
 * Data Table
 * @component
 * @param {Object} params
 * @param {Array} params.format
 * @param {Array} params.list
 */
export default function DataTable({format, list}) {
    return (
        <dataTableContext.Provider value={{format, list}}>
            <div className={`grid lg:grid-cols-${format.length} auto-cols-auto mt-8${false && `lg:grid-cols-5`}`}>
                <DataTableHeader />
                <DataTableContent />
            </div>
        </dataTableContext.Provider>
    )
}

/**
 * Show data table header
 * @component
 */
 export function DataTableHeader() {
    /**
     * Context
     */
     const {format} = useContext(dataTableContext)

    /**
     * Render
     */
    return (
        <>
            {format.map((item, index) => (//format.length
                <div className={`px-4 lg:py-4 flex justify-between items-center lg:border-b font-semibold ${((index + 1) % format.length === 0) ? `pb-4` : ``}`} key={uuid()}>
                    {item.header}
                </div>
            ))}
        </>
    )
}

/**
 * Show data table content
 * @component
 */
export function DataTableContent() {
    /**
     * Context
     */
    const {format, list} = useContext(dataTableContext)

    /**
     * Render
     */
    return (
        <>
            {list.map((item, index) => 
                format.map((col, indexCol) => (
                    <div 
                        className={`px-4 lg:py-4 flex justify-between overflow-ellipsis overflow-hidden 
                            ${index % 2 ? `bg-gray-50` : ``} 
                            ${(indexCol % format.length === 0) && `pt-4 font-semibold`}
                            ${((indexCol + 1) % format.length === 0) && `pb-4`}
                        `} 
                        key={uuid()}
                    >
                        {col.content(item)}
                    </div>
                ))
            )}
        </>
    )
}

/**
 * DataTableNav
 * @component
 */
 export function DataTableNav({children}) {
    /**
     * Render
     */
    return (
        <nav className="flex gap-4 flex-wrap lg:flex-nowrap">
            {children}
        </nav>
    )
}



/**
 * DataTableSort
 * @component
 * @param {Object} params
 * @param {Object} params.fields
 * @param {Object} params.sorting
 * @param {Function} params.setSorting
 */
 export function DataTableSort({fields, sorting, setSorting}) {

    /**
     * Shortcut
     */
    const isActive = (field) => field === sorting.name
    const isASC = () => sorting.direction === 'ASC'
    const sortIconClasses = 'w-4 h-4 fill-current'

    /**
     * Toggle sort
     */
    const toggle = (name) => setSorting({
        name, 
        direction: isActive(name) ? (sorting.direction === 'DESC' ? 'ASC' : 'DESC') : 'ASC'
    })
    
    /**
     * Render
     */
    return (
        <Dropdown>
            <DropdownButton showIcon={false} className="h-12 px-4 rounded bg-success-600 text-white">
                Sort 
                <SortIcon className="w-4 h-4 fill-current" />
            </DropdownButton>
            <DropdownList className="w-48">
                {Object.keys(fields).map((key) => (
                    <DropdownItem 
                        className="w-full justify-between items-center gap-4"
                        key={uuid()} 
                        onClick={() => toggle(key)} 
                        active={isActive(key)}
                    >
                        {fields[key]}
                        {isActive(key) && (isASC() ? <SortASC className={sortIconClasses} /> : <SortDESC className={sortIconClasses} />)}
                    </DropdownItem>
                ))}
            </DropdownList>
        </Dropdown>
    )
}

/**
 * Show entries per page selector
 * @component
 * @param {Object} params
 * @param {Number} params.entries
 * @param {Function} params.setEntries
 * @param {Array} params.list
 */
 export function DataTableEntries({list, entries, setEntries, setCurrentPage}) {
    return (
        <Dropdown>
            <DropdownButton className="h-12 px-4">
                {entries} entries per page
            </DropdownButton>
            <DropdownList>
                {list.map((entrie) => (
                    <DropdownItem 
                        onClick={() => {
                            setEntries(entrie)
                            setCurrentPage(1)
                        }} 
                        active={entries === entrie}
                        key={uuid()} 
                    >Show {entrie} entries</DropdownItem>
                ))}
            </DropdownList>
        </Dropdown>
    )
}

/**
 * Show search
 * @component
 * @param {Object} params
 * @param {String} params.search
 * @param {Function} params.setSearch
 */
export function DataTableSearch({search, setSearch}) {
    /**
     * State
     */
    const [searchFocused, setSearchFocused] = useState(false)

    /**
     * Render
     */
    return (
        <div 
            className={`flex items-center lg:w-1/2 flex-grow lg:flex-grow-0 rounded border h-12 
                ${searchFocused ? // Focus
                    `ring-2 ring-success-500` : 
                    `` 
                }
            `}
        >
            <label htmlFor="search" className="flex justify-center items-center w-12 h-12">
                <SearchIcon className="w-4 h-4" />
            </label>
            <input 
                className="flex-grow h-full outline-none" 
                type="text" 
                id="search" 
                autoComplete="off"
                placeholder="Search an employee"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
            />
        </div>
    )
}

/**
 * Show pagination
 * @component
 * @param {Object} params
 * @param {Number} params.totalPage
 * @param {Number} [params.neighbours=2]
 * @param {Number} params.currentPage
 * @param {Function} params.setCurrentPage
 */
export function DataTablePagination({totalPage, neighbours = 2,  currentPage, setCurrentPage}) {

    /**
     * Return an array of page
     * @param {Number} from
     * @param {Number} to
     * @param {Number} [step=1]
     * @return {Array.<Number>} 
     */
    const range = (from, to, step = 1) => {
        let i = from
        const range = []
        while (i <= to) {
            range.push(i)
            i += step
        }
        return range
    }

    /**
     * Generate a page navigation array
     * @return {Array.<Number|'left'|'right'>} 
     */
    const pageNumbers = () => {
        const totalNumbers = (neighbours * 2) + 3// Total page numbers to show
        const totalBlocks = totalNumbers + 2// Total buttons to show (+ (<) & (>))
        if (totalPage <= totalBlocks) return range(1, totalPage)
        const startPage = Math.max(2, currentPage - neighbours)
        const endPage = Math.min(totalPage - 1, currentPage + neighbours)
        let pages = range(startPage, endPage)
        const hasLeftSpill = startPage > 2// Hidden pages to the left
        const hasRightSpill = (totalPage - endPage) > 1// Hidden pages to the right
        const spillOffset = totalNumbers - (pages.length + 1)// Number of hidden pages either to the left or to the right
        if (hasLeftSpill && !hasRightSpill) {// Case: (1) < {5 6} [7] {8 9} (10)
            const extraPages = range(startPage - spillOffset, startPage - 1)
            pages = ['left', ...extraPages, ...pages]
        } else if (!hasLeftSpill && hasRightSpill) {// Case: (1) {2 3} [4] {5 6} > (10)
            const extraPages = range(endPage + 1, endPage + spillOffset)
            pages = [...pages, ...extraPages, 'right']
        } else {// Case: (1) < {5 6} [7] {8 9} > (10)
            pages = ['left', ...pages, 'right']
        }
        return [1, ...pages, totalPage]
    }

    /**
     * Render
     */
    return (
        <div className="flex">
            {pageNumbers().map((page) => 
            page === 'left' ? (
                <button // Button previous
                    type="button" 
                    className="flex justify-center items-center w-8 h-8 mx-1 md:mx-4 rounded-full border shadow-sm hover:bg-gray-100"
                    key={uuid()}
                    onClick={() => setCurrentPage(currentPage - 1)}
                ><ChevronLeft className="w-3 h-3 fill-current" /></button>
            ) : page === 'right' ? (
                <button // Button next
                    type="button" 
                    className="flex justify-center items-center w-8 h-8 mx-1 md:mx-4 rounded-full border shadow-sm hover:bg-gray-100"
                    key={uuid()}
                    onClick={() => setCurrentPage(currentPage + 1)}
                ><ChevronRight className="w-3 h-3 fill-current" /></button>
            ) : (
                <button // Page selector
                    className={`flex justify-center items-center px-2 md:px-3 h-8 border text-xs md:text-base font-sans shadow-sm 
                        ${currentPage === page ? // Active page
                            `bg-success-600 text-white` : 
                            `hover:bg-gray-100`}
                    `} 
                    type="button" 
                    key={uuid()}
                    onClick={() => setCurrentPage(page)}
                >{page}</button>
            ))}
        </div>
    )
}