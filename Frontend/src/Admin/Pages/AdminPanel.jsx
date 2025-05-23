import React from 'react'
import Header from '../Components/Header'
import Sidemenu from '../Components/Sidemenu'
import { Outlet } from 'react-router-dom'

export default function AdminPanel() {
    return (

        <div className='max-w-full grid grid-cols-5'>
            
            <div className='col-span-1'>
                <Sidemenu />
            </div>

            <div className='col-span-4'>
                <Header />
                <Outlet />
            </div>

        </div>

    )
}
