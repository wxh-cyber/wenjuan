import React, { FC, useState } from 'react'
// import { useSearchParams } from 'react-router-dom';
import {Typography} from 'antd';
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard';
import styles from './common.module.scss'

const { Title } = Typography;

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
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
    isStar: false,
    answerCount: 3,
    createTime: '2023-01-03'
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 15,
    createTime: '2023-01-04'
  },
];
const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');

  // const [searchParams] = useSearchParams();
  // console.log('keyword',searchParams.get('keyword'));

  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          （搜索）
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {
          questionList.length > 0 && questionList.map((question) => {
            const { _id } = question;
            return <QuestionCard key={_id} {...question} />;
          })
        }
      </div>
      <div className={styles.footer}>
        底部
      </div>
    </>
  )
}

export default List;