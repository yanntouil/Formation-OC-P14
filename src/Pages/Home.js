import React, { useEffect, useState } from 'react'
import FormText from '../Components/Ui/FormText'
import FormLabel from '../Components/Ui/FormLabel'
import FormSelect from '../Components/Ui/FormSelect'
import FormDate from '../Components/Ui/FormDate'
import FormError from '../Components/Ui/FormError'
import { useDispatch } from 'react-redux'
import { employeesAdd } from '../redux/employees/employeesActions'
import validation, { statesList, departmentList } from '../helpers/employees';
//import Alert, { AlertActions, AlertContent, AlertIcon, AlertTitle } from '../Components/Ui/Alert'
import Alert, { AlertActions, AlertContent, AlertIcon, AlertTitle } from 'projet-14-plugin/dist'
import FormButton from '../Components/Ui/FormButton'
import { ReactComponent as Check } from '../assets/images/icons/check.svg'

/**
 * Home page > Form create employee
 * @componnent
 */
export default function Home() {

    /**
     * States
     */
    const initialEmployee = {firstName: '', lastName: '', dateOfBirth: '', street: '', city: '', state: '', zipcode: '', startDay: '', department: ''}
    const [employee, setEmployee] = useState(initialEmployee)
    const initialFieldsErrors = {firstName: false, lastName: false, dateOfBirth: false, street: false, city: false, state: false, zipcode: false, startDay: false, department: false}
    const [fieldsErrors, setFieldsErrors] = useState(initialFieldsErrors)
    const [validationDone, setValidationDone] = useState(false)
    const [alertValidation, setAlertValidation] = useState(false)
    const dispatch = useDispatch()

    /**
     * Form submit handler
     */
    const createEmployee = () => {
        if (!validEmployee()) return setValidationDone(true)
        // Form is valid
        dispatch(employeesAdd({...employee}))// Create employee
        setValidationDone(false)// Reset validation state
        setAlertValidation(true)// Show alert success
        setEmployee(initialEmployee)// Reset form data
        setFieldsErrors(initialFieldsErrors)// Reset validation errors
    }

    /**
     * Valid form
     */
    const validEmployee = () => {
        const errors = {}
        Object.keys(employee).forEach((key) => errors[key] = !validation[key].rule(employee[key]))
        setFieldsErrors(errors)
        return (Object.values(errors).filter((error) => error === true).length === 0)
    }

    /**
     * Launch auto validation on form change after the first validation
     */    
    useEffect(() => {
        if(validationDone) validEmployee()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employee])

    /**
     * Render
     */
    return (
        <div className="flex flex-col p-8 bg-white md:rounded-lg md:shadow-lg">
            <h1 className="pt-8 pb-8 text-3xl font-bold">Create Employee</h1>
            <div className="grid grid-cols-12 gap-8">
                <h1 className="col-span-12 pt-4 text-lg font-bold">Personal information</h1>
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
                    <FormLabel name="firstName">First Name</FormLabel>
                    <FormText 
                        name="firstName"
                        value={employee.firstName}
                        setValue={(value) => setEmployee({...employee, firstName: value})}
                        fieldError={fieldsErrors.firstName}
                    />
                    <FormError fieldError={fieldsErrors.firstName} message={validation.firstName.message} />
                </div>
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
                    <FormLabel name="lastName">Last Name</FormLabel>
                    <FormText 
                        name="lastName"
                        value={employee.lastName}
                        setValue={(value) => setEmployee({...employee, lastName: value})}
                        fieldError={fieldsErrors.lastName}
                    />
                    <FormError fieldError={fieldsErrors.lastName} message={validation.lastName.message} />
                </div>
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
                    <FormLabel name="dateOfBirth">Date of Birth</FormLabel>
                    <FormDate
                        name="dateOfBirth" 
                        value={employee.dateOfBirth}
                        setValue={(value) => setEmployee({...employee, dateOfBirth: value})}
                        fieldError={fieldsErrors.dateOfBirth}
                    />
                    <FormError fieldError={fieldsErrors.dateOfBirth} message={validation.dateOfBirth.message} />
                </div>
                <div className="col-span-12 lg:col-span-6"></div>
                <h1 className="col-span-12 pt-4 text-lg font-bold">Personal Address</h1>
                <div className="col-span-12 flex flex-col gap-2">
                    <FormLabel name="street">Street</FormLabel>
                    <FormText 
                        name="street"
                        value={employee.street}
                        setValue={(value) => setEmployee({...employee, street: value})}
                        fieldError={fieldsErrors.street}
                    />
                    <FormError fieldError={fieldsErrors.street} message={validation.street.message} />
                </div>
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
                    <FormLabel name="city">City</FormLabel>
                    <FormText 
                        name="city"
                        value={employee.city}
                        setValue={(value) => setEmployee({...employee, city: value})}
                        fieldError={fieldsErrors.city}
                    />
                    <FormError fieldError={fieldsErrors.city} message={validation.city.message} />
                </div>
                <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col gap-2">
                    <FormLabel name="state">State</FormLabel>
                    <FormSelect 
                        name="state" 
                        value={employee.state} 
                        options={[...statesList.map((state => state.name))]}
                        setValue={(value) => setEmployee({...employee, state: value})}
                        fieldError={fieldsErrors.state}
                    />
                    <FormError fieldError={fieldsErrors.state} message={validation.state.message} />
                </div>
                <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col gap-2">
                    <FormLabel name="zipcode">Zip Code</FormLabel>
                    <FormText 
                        name="zipcode"
                        value={employee.zipcode}
                        setValue={(value) => setEmployee({...employee, zipcode: value})}
                        fieldError={fieldsErrors.zipcode}
                    />
                    <FormError fieldError={fieldsErrors.zipcode} message={validation.zipcode.message} />
                </div>
                <h1 className="col-span-12 pt-4 text-lg font-bold">Company information</h1>
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
                    <FormLabel name="startDay">Start Date</FormLabel>
                    <FormDate
                        name="startDay" 
                        value={employee.startDay}
                        setValue={(value) => setEmployee({...employee, startDay: value})}
                        fieldError={fieldsErrors.startDay}
                    />
                    <FormError fieldError={fieldsErrors.startDay} message={validation.startDay.message} />
                </div>
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
                    <FormLabel name="department">Department</FormLabel>
                    <FormSelect 
                        name="department" 
                        value={employee.department} 
                        options={departmentList} 
                        setValue={(value) => setEmployee({...employee, department: value})}
                        fieldError={fieldsErrors.department}
                    />
                    <FormError fieldError={fieldsErrors.department} message={validation.department.message} />
                </div>
                <div className="col-span-12 flex justify-end">
                    <FormButton onClick={createEmployee} color="success">Create Employee</FormButton>
                </div>
            </div>
            <Alert name="create-employee" show={alertValidation} setShow={setAlertValidation}>
                <AlertIcon IconComponent={Check} color="success" />
                <AlertTitle>Create Employee</AlertTitle>
                <AlertContent>The creation of the employee has been registered, you can consult the new employee in the space "show employees"</AlertContent>
                <AlertActions>
                    <FormButton color="success" onClick={() => setAlertValidation(false)}>Close</FormButton>
                </AlertActions>
            </Alert>
        </div>
    )
}
