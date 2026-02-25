import React from 'react'
import {createBrowserRouter} from 'react-router-dom'

import ManageLayout from '../layouts/ManageLayout'
import MainLayout from '../layouts/MainLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import MyList from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'

const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout />,
        children:[
            {
                path:'/',
                element:<Home />
            },
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/register',
                element:<Register />
            },
            {
                path:'*',      //404路由配置，都写在最后（兜底）
                element:<NotFound />
            }
        ]
    }
]);

export default router;