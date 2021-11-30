import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import logoImg from '../../assets/images/logo-text.jpg'

export default function Layout({ children }) {
    return (
        <>
            <div className="flex xl:container md:my-8 md:mx-8 xl:mx-auto min-h-full bg-white md:rounded-2xl shadow-md">
                <Header />
                <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-center px-8 h-16 rounded-tr-2xl text-3xl font-extrabold text-success-900">
                        HRnet
                        <img src={logoImg} alt="Logo Wealth Health" className="block m-4 -mr-2 h-8 xl:hidden" />
                    </div>
                    <Main>
                        { children }
                    </Main>
                    <Footer />
                </div>
            </div>
        </>
    )
}
