import React from 'react'
import { NavLink } from 'react-router-dom'
import logoImg from '../../assets/images/logo.jpg'
import logoSMImg from '../../assets/images/logo-sm.jpg'
import usersIcon from '../../assets/images/icons/users.svg'
import userPlusIcon from '../../assets/images/icons/user-plus.svg'

export default function Header() {
    return (
        <header className="flex-shrink-0 flex flex-col w-16 xl:w-80  pb-14">
            <div className="flex justify-center items-center">
                <img src={logoImg} alt="Logo Wealth Health" className="hidden xl:block w-80 rounded-2xl" />
                <img src={logoSMImg} alt="Logo Wealth Health" className="block m-4 w-8 h-8 xl:hidden rounded-2xl" />
            </div>
            <nav className="xl:pt-4">
                <ul className="flex flex-col">
                    <NavLink to="/" end className={
                        ({ isActive }) => isActive ? 'block bg-success-100' : 'block'
                    } >
                        <li className="flex items-center">
                            <img src={userPlusIcon} alt="icon add user " className="w-8 h-8 m-4 flex-shrink-0" />
                            <span className="hidden xl:flex flex-grow mr-8">Create Employee</span>
                        </li>
                    </NavLink>
                    <NavLink to="/show-employees" end className={
                        ({ isActive }) => isActive ? 'block bg-success-100' : 'block'
                    } >
                        <li className="flex items-center">
                            <img src={usersIcon} alt="Icon users" className="w-8 h-8 m-4 flex-shrink-0" />
                            <span className="hidden xl:flex flex-grow mr-8">Show Employees</span>
                        </li>
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}
