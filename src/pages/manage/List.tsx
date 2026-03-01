import React, { FC } from 'react'
// import { useSearchParams } from 'react-router-dom';
import { Typography, Spin } from 'antd';
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import styles from './common.module.scss'

const { Title } = Typography;

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');

  // const [searchParams] = useSearchParams();
  // console.log('keyword',searchParams.get('keyword'));

  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
        {/* 问卷列表 */}
        {
          (!loading && list.length > 0) && list.map((question: any) => {
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