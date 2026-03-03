import React, { FC ,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {Button,Typography,message} from 'antd';
import {MANAGE_INDEX_PATHNAME,LOGIN_PATHNAME} from '../router/index'
import {getToken} from '../utils/user-token'
import styles from './Home.module.scss'

import axios from 'axios'
//import '../_mock/index'

const { Title,Paragraph } = Typography;

const Home:FC=()=>{
    const nav=useNavigate();

    useEffect(()=>{
        // fetch('/api/test').then(res=>res.json()).then(data=>{
        //     console.log(data);
        // });

        axios.get('/api/test').then(res=>{
            console.log(res.data);
        });
    },[]);

    function clickUseHandler(){
        const token=getToken();
        if(token){
            //如果保留有token，说明用户已经登录，直接跳转到管理页面
            message.success('登录成功');
            nav(MANAGE_INDEX_PATHNAME);
        }else{
            //如果没有token，说明用户未登录，跳转到登录页面
            message.error('请先登录');
            nav(LOGIN_PATHNAME);
        }
    }

    // useEffect(()=>{
    //     // fetch('/api/test').then(res=>res.json()).then(data=>{
    //     //     console.log(data);
    //     // });
    //     //mock.js只能劫持XMLHttpRequest请求，不能劫持fetch请求

    //     //axios内部使用XMLHttpRequest API，没有使用fetch API
    //     axios.get('/api/test').then(res=>{
    //         console.log(res.data);
    //     });
    // },[]);

    // function clickHandler(){
    //     nav({
    //         pathname:'/login',
    //         search:'b=21'
    //     });
    // }

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>问卷调查 | 在线投票</Title>
                <Paragraph>
                    已累计创建问卷100份，发布问卷90份，收到答卷980份
                </Paragraph>
                <div>
                    <Button type="primary" onClick={clickUseHandler} >开始使用</Button>
                </div>
            </div>
        </div>
    )
}

export default Home;