import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout:FC=()=>{
    return (
        <div>
            <div>MainLayout Header</div>
            <div>
                <Outlet />
            </div>
            <div>MainLayout Footer</div>
        </div>
    )
}

export default MainLayout;
