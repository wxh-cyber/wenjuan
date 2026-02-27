import React, { FC, useState } from 'react'
import ListSearch from '../../components/ListSearch';
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space ,Modal} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import styles from './common.module.scss'

const rawQuestionList = [
    {
        _id: 'q1',
        title: '问卷1',
        isPublished: false,
        isStar: true,
        answerCount: 5,
        createTime: '2023-01-01'
    },
    {
        _id: 'q2',
        title: '问卷2',
        isPublished: true,
        isStar: false,
        answerCount: 10,
        createTime: '2023-01-02'
    },
    {
        _id: 'q3',
        title: '问卷3',
        isPublished: false,
        isStar: false,
        answerCount: 3,
        createTime: '2023-01-03'
    }
];

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
    useTitle('小慕问卷 - 回收站');

    const [questionList, setQuestionList] = useState(rawQuestionList);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    function del(){
        confirm({
            title:'确认彻底删除该问卷吗？',
            icon:<ExclamationCircleOutlined/>,
            content:'删除以后将不可找回',
            okText:'确认',
            okType:'danger',
            cancelText:'取消',
            onOk:()=>{
                alert(`删除 ${JSON.stringify(selectedIds)}`)
            }
        });
    }

    const tableColumns = [
        {
            title: '标题',
            dataIndex: 'title',
            //key:'title'       //循环列的key，它会默认取dataIndex的值
            //如果没写dataIndex，就必须手动写上key，否则会报错，且可能导致渲染异常
        },
        {
            title: '是否发布',
            dataIndex: 'isPublished',
            render: (isPublished: boolean) => {
                return isPublished ? <Tag color="processing">已发布</Tag> : <Tag color="red">未发布</Tag>
            }
        },
        {
            title: '答卷',
            dataIndex: 'answerCount',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        }
    ]

    //可以把JSX片段定义为一个变量
    const TableElem = <div>
        <div style={{ marginBottom:'16px' }}>
            <Space>
                <Button type="primary" disabled={selectedIds.length === 0}>恢复</Button>
                <Button danger disabled={selectedIds.length === 0} onClick={del}>彻底删除</Button>
            </Space>
        </div>
        <Table
            dataSource={questionList}
            columns={tableColumns}
            pagination={false}
            rowKey={(q) => q._id}
            rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys) => {
                    console.log(selectedRowKeys);
                    setSelectedIds(selectedRowKeys as string[]);
                }
            }} />
    </div>;

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>回收站</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content}>
                {questionList.length === 0 && <Empty description="暂无回收站问卷" />}
                {questionList.length > 0 && TableElem}
            </div>
        </div>
    )
}

export default Trash;