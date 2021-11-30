import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { employeesGet } from '../redux/employees/employeesActions'
import { employeesSelector } from '../redux/employees/employeesSelectors'
import DataTable, { DataTableNav, DataTableSort, DataTableEntries, DataTableSearch, DataTablePagination } from '../Components/Ui/DataTable'

/**
 * Show Employees pages
 * @component
 */
export default function ShowEmployees() {

    /**
     * States
     */
    const {employees} = useSelector(employeesSelector)// Data
    const [filteredEmployees, setFilteredEmployees] = useState(employees)// Sorting
    const [sorting, setSorting] = useState({name: 'firstName', direction: 'ASC' })// Sorting
    const fields = {// List of field use in sorting
        firstName: 'First name', lastName: 'Last name', dateOfBirth: 'Date of birth', street: 'Street', city: 'City', 
        state: 'State', zipcode: 'Zip code', startDay: 'Start day', department: 'Department'
    }
    const [search, setSearch] = useState('')// Search input
    const [entriesPerPage, setEntriesPerPage] = useState(5)// Number of entries per page
    const [numberOfPage, setNumberOfPage] = useState(0)// Number of page
    const [currentPage, setCurrentPage] = useState(1)// Current page
    const dispatch = useDispatch()
    const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' }

    /**
     * Search in data
     * @param {Array} data
     */
    const filterSearch = (data) => {
        // Format terms
        const words = search
            .toLowerCase()
            .trim()// Remove whitespace
            .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"")// Remove punctuation 
            .split(' ')
        // Search method
        const searcInText = (text, term) => text.toLowerCase().includes(term)
        const searhInDate = (date, term) => 
            (new Date(date)).toLocaleDateString('en-US', dateFormat).toLowerCase().includes(term) ||
            (new Date(date)).toLocaleDateString('en-US').includes(term)
            ? true : false
        // Search each terms
        let results = [...data]
        words.forEach((word) => 
            results = results.filter((item) => (
                searcInText(item.firstName, word) ||
                searcInText(item.lastName, word) ||
                searhInDate(item.dateOfBirth, word) ||
                searcInText(item.street, word) ||
                searcInText(item.city, word) ||
                searcInText(item.state, word) ||
                searcInText(`${item.zipcode}`, word) ||
                searhInDate(item.startDay, word) ||
                searcInText(item.department, word)
            ))
        )
        return results;
    }

    /**
     * Sort data
     */
    const filterSort = (data) => {
        return data.sort((a, b) => {
            const aa = a[sorting.name], bb = b[sorting.name]
            if (['dateOfBirth', 'startDay'].includes(sorting.name))// Date comparison
                return sorting.direction === 'ASC' ? new Date(bb) - new Date(aa) : new Date(aa) - new Date(bb)
            return sorting.direction === 'ASC' ? aa.localeCompare(bb) : bb.localeCompare(aa)
        })
    }

    /**
     * Paginate data
     */
    const paginate = (data) =>  data.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)

    /**
     * Get data
     */
    useEffect(() => {
        if(employees.length === 0) dispatch(employeesGet())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * Watch employees, search, sorting, entriesPerPage
     * and refresh data filtered and number of pages
     */
    useEffect(() => {
        const data = filterSort(filterSearch(employees))
        setFilteredEmployees(data)
        setNumberOfPage(Math.ceil(data.length / entriesPerPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employees, search, sorting, entriesPerPage])

    /**
     * Render
     */
    return (
        <div className="flex flex-col p-8 bg-white md:rounded-lg md:shadow-lg">
            <h1 className="pt-8 pb-8 text-3xl font-bold">Show Employees</h1>
            <DataTableNav>
                <DataTableSearch search={search} setSearch={setSearch} />
                <DataTableSort fields={fields} sorting={sorting} setSorting={setSorting} />
                <div className="flex-grow hidden lg:block"></div>
                <DataTableEntries list={[5, 10, 25, 50, 100]} setCurrentPage={setCurrentPage} entries={entriesPerPage} setEntries={setEntriesPerPage} />
            </DataTableNav>
            <DataTable 
                list={paginate(filteredEmployees)} 
                format={[{
                    header: 'Name',
                    content: (item) => `${item.lastName} ${item.firstName}`,
                    type: 'text',
                }, {
                    header: 'Date of Birth',
                    content: (item) => (new Date(item.dateOfBirth).toLocaleDateString('en-US', dateFormat)),
                    type: 'numeric',
                }, {
                    header: 'Address',
                    content: (item) => (<>{item.street}<br/>{item.city}, {item.state}, {item.zipcode}</>),
                    type: 'text',
                }, {
                    header: 'Start Day',
                    content: (item) => (new Date(item.startDay)).toLocaleDateString('en-US', dateFormat),
                    type: 'numeric',
                }, {
                    header: 'Department',
                    content: (item) => item.department,
                    type: 'text',
                }]}
            />
            {filteredEmployees.length > 0 ? (// Data counter and pagination
                <div className="flex justify-center lg:justify-between items-center mt-8 flex-wrap lg:flex-nowrap gap-4">
                    <div className="w-full text-center lg:w-auto">{filteredEmployees.length} results</div>
                    <DataTablePagination totalPage={numberOfPage} neighbours={2} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            ) : (// Not found message
                <div className="flex justify-center items-center mt-8">
                    No matching records found
                </div>
            )}
        </div>
    )
}


