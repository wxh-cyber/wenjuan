import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Logo from '../components/Logo';
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Logo />
                </div>
                <div className={styles.right}>登录</div>
            </Header>
            <Layout className={styles.main}>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
            <Footer className={styles.footer}>
                小慕问卷 &nbsp; 2026 - present. Created by 小慕
            </Footer>
        </Layout>
    )
}

export default MainLayout;
