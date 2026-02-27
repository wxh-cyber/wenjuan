import React, { FC } from 'react'
import {Link} from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router';
import styles from './Register.module.scss'
import { Typography, Space, Form, Input,Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons'

const { Title } = Typography;

const Register: FC = () => {
    const onFinish=(values:any)=>{
        console.log('onFinish',values);
    }

    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}><UserAddOutlined /></Title>
                    <Title level={2}>注册新用户</Title>
                </Space>
            </div>
            <div>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}>
                    <Form.Item name="username" label="用户名">
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="密码">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="confirm" label="确认密码">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="nickname" label="昵称">
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{span:16,offset:6}}>
                        <Space>
                            <Button type="primary" htmlType="submit">注册</Button>
                            <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register;