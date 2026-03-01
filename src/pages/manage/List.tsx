import React, { FC, useState, useEffect, useRef ,useMemo} from 'react'
import { useSearchParams } from 'react-router-dom';
import { Typography, Spin, Empty } from 'antd';
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { getQuestionListService } from '../../services/question';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant';
import styles from './common.module.scss'

const { Title } = Typography;

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷');

  // const [searchParams] = useSearchParams();
  // console.log('keyword',searchParams.get('keyword'));

  const [start,setStart]=useState(false);        //是否已经开始加载（防抖，有延迟时间）
  const [list, setList] = useState<any[]>([]);     //全部的数据，上划加载更多后，不断累计
  const [page, setPage] = useState(1);      //list内部的数据，不在url参数中体现
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;   //有没有更多未加载完成的数据

  const [searchParams] = useSearchParams();    //url参数，虽然没有page和pageSize，但有keyword

  const keyword=searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  //keyword变化时，重置信息
  useEffect(()=>{
      setStart(false);
      setList([]);
      setPage(1);
      setTotal(0);
  },[keyword]);

  //真正加载
  const { run: load, loading } = useRequest(async () => {
    const data = await getQuestionListService({
      page,
      pageSize: LIST_PAGE_SIZE,
      keyword
    });
    return data;
  }, {
    manual: true,
    onSuccess: (result) => {
      const { list: l = [], total = 0 } = result;
      setList([...list, ...l]);    //累计
      setTotal(total);
      setPage(page + 1);
    }
  });

  //尝试触发加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(() => {
    const elem = containerRef.current;
    if (elem === null) return;

    const domRect = elem.getBoundingClientRect();
    if (domRect === null) return;

    const { bottom } = domRect;
    //如果底部DOM真正露出界面，才进行加载
    if (bottom <= document.body.clientHeight) {
      load();      //真正加载数据
      setStart(true);
    }
  }, { wait: 1000 });

  //1.当页面加载，或者url参数（keyword）变化时，触发加载
  useEffect(() => {
    tryLoadMore();        //加载第一页，初始化
  }, [searchParams]);

  //2.当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore);    //页面滚动频繁，引入防抖
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    }
  }, [searchParams, haveMoreData]);

  //LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!start || loading) return <Spin />;        //页面初始化显示加载图标
    if (total === 0) return <Empty description="暂无问卷" />;
    if (!haveMoreData) return <span>没有更多了</span>;
    return <span>开始加载下一页...</span>
  },[start,loading,haveMoreData]);

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
        {/* 问卷列表 */}
        {/* <div style={{ height: '2000px' }}></div> */}
        {
          (list.length > 0) && list.map((question: any) => {
            const { _id } = question;
            return <QuestionCard key={_id} {...question} />;
          })
        }
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>
          {LoadMoreContentElem}
        </div>
      </div>
    </>
  )
}

export default List;