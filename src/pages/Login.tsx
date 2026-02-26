import React, { FC } from 'react'
import { useNavigate,Link } from 'react-router-dom'

const Login:FC=()=>{
    const nav=useNavigate();

    return (
        <div>
            <p>Login</p>
            <div>
                <button onClick={()=>nav(-1)}>返回</button>
                <Link to="/register?a=10">注册</Link>
            </div>
        </div>
    )
}

export default Login;
