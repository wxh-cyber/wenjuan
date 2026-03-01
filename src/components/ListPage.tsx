import { FC ,useState,useEffect} from 'react'
import {useSearchParams,useNavigate,useLocation} from 'react-router-dom';
import { Pagination } from 'antd';
import { LIST_PAGE_SIZE ,LIST_PAGE_PARAM_KEY,LIST_PAGE_SIZE_PARAM_KEY} from '../constant';
import styles from './ListPage.module.scss';

type PropsType = {
    total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
    const { total } = props;

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);

    const [searchParams] = useSearchParams();

    //从url参数中找到page和pageSize，并同步到Pagination组件中
    useEffect(()=>{
        const page=parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '')||1;
        const pageSize=parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '')||LIST_PAGE_SIZE;
        setCurrent(page);
        setPageSize(pageSize);
    },[searchParams]);

    //当page或pageSize改变时，跳转页面（改变url参数）
    const nav=useNavigate();
    const {pathname}=useLocation();
    function handlePageChange(page:number,pageSize:number){
        searchParams.set(LIST_PAGE_PARAM_KEY,page.toString());
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString());
        nav({
            pathname,
            search:searchParams.toString()     //除了改变page和PageSize，其他参数都保持不变
        });
    }

    return (
        <div className={styles['list-page']}>
            <Pagination
                current={current}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange} />
        </div>
    )
}

export default ListPage;


