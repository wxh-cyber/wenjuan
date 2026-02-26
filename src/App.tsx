import React from 'react'
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router';
import 'antd/dist/reset.css';


export default function App() {
  return (
    <div className="App">
        <RouterProvider router={routerConfig} >
          
        </RouterProvider>
    </div>
  )
}

// src/pages 目录 - 页面（React组件）
// src/components 目录 - 组件