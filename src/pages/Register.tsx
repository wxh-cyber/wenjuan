import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router';
import styles from './Register.module.scss'
import { Typography, Space, Form, Input, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons'

const { Title } = Typography;

const Register: FC = () => {
    const onFinish = (values: any) => {
        console.log('onFinish', values);
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
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { type: 'string', min: 3, max: 20, message: '用户名长度必须在3到20位之间' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            { required: true, message: '请输入密码' }
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}     //依赖于password，password变化，会重新触发validator
                        rules={[
                            { required: true, message: '请确认密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    // 第一个参数_：（rule对象）
                                    //     包含校验规则的配置信息，如 required、message 等。
                                    //     由于在这个函数逻辑中，并不需要使用rule对象的任何信息，所以写成_的形式，表示占位
                                    // 第二个参数value：（当前输入框的值）
                                    //     用于校验逻辑的比较对象。
                                    // 逻辑解析：
                                    // 1. !value：如果当前框没值，直接通过（让上面的 required 规则去处理空值报错，避免重复报错）。
                                    // 2. getFieldValue('password') === value：核心判断！
                                    //    去获取上面那个名为 'password' 的输入框的值，看它是不是等于当前输入的值。
                                    if (!value || getFieldValue('password') === value) {
                                        //Antd的校验基于Promise
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error('两次输入密码不一致'));
                                    }
                                }
                            })
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="nickname" label="昵称">
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
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