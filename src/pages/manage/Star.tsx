import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import ListPage from '../../components/ListPage';
import { Typography, Empty, Spin, Pagination } from 'antd';
import { useTitle } from 'ahooks'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import styles from './common.module.scss'

const { Title } = Typography;

const Star: FC = () => {
    useTitle('小慕问卷 - 星标问卷');

    const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
    const { list = [], total = 0 } = data;

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>星标问卷</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content}>
                {loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )}
                {!loading && list.length === 0 && <Empty description="暂无星标问卷" />}
                {
                    list.length > 0 && list.map((question: any) => {
                        const { _id } = question;
                        return <QuestionCard key={_id} {...question} />
                    })
                }
            </div>
            <div className={styles.footer}>
                <ListPage total={total} />
            </div>
        </div>
    )
}

export default Star;