import { EMPLOYEES_ADD, EMPLOYEES_GET } from "../actionsTypes"
import {v4 as uuid} from 'uuid'
// import randomData1000 from '../../randomData1000.json'

/**
 * @const initialState
 */
 const initialState = {
    employees: [],
}

/**
 * Employees reducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
 export default function enployeesReducer(state = initialState, action) {
    switch(action.type) {
        // Add an emmployee
        case EMPLOYEES_ADD : {
            const newEmployee = action.payload
            newEmployee.id = uuid()
            const employeesList = JSON.parse(localStorage.getItem('employees')) || []
            employeesList.push(newEmployee)
            localStorage.setItem('employees', JSON.stringify(employeesList))
            return {...state, employees: employeesList}
        }
        // Get a emmployees list
        case EMPLOYEES_GET : {
            // localStorage.setItem('employees', JSON.stringify(randomData1000))
            const employees = JSON.parse(localStorage.getItem('employees')) || []
            return {...state, employees: employees}
        }
        // Default
        default:
            return state
    }
}