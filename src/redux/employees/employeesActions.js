import { EMPLOYEES_ADD, EMPLOYEES_GET } from "../actionsTypes"



/**
 * Add an employee
 * @param {Object} employee
 * @returns {Object}
 */
export const employeesAdd = (employee) => {
    return { type: EMPLOYEES_ADD, payload: employee }
}

/**
 * Get employees list
 * @param {Object} employee
 * @returns {Object}
 */
 export const employeesGet = () => {
    return { type: EMPLOYEES_GET }
}
