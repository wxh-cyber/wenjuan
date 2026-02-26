import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard';
import { Typography,Empty } from 'antd';
import { useTitle } from 'ahooks'
import styles from './common.module.scss'

const { Title } = Typography;

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
        isStar: true,
        answerCount: 10,
        createTime: '2023-01-02'
    },
    {
        _id: 'q3',
        title: '问卷3',
        isPublished: false,
        isStar: true,
        answerCount: 3,
        createTime: '2023-01-03'
    }
];

const Star: FC = () => {
    useTitle('小慕问卷 - 星标问卷');

    const [questionList, setQuestionList] = useState(rawQuestionList);

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>星标问卷</Title>
                </div>
                <div className={styles.right}>
                    （搜索）
                </div>
            </div>
            <div className={styles.content}>
                {questionList.length===0 && <Empty description="暂无星标问卷" />}
                {
                    questionList.length>0 && questionList.map( question => {
                        const {_id}=question;
                        return <QuestionCard key={_id} {...question} />
                    })
                }
            </div>
            <div className={styles.footer}>
                分页
            </div>
        </div>
    )
}

export default Star;