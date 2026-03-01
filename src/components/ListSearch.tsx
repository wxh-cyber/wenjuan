import React, { FC, useState,useEffect } from 'react';
import type { ChangeEvent } from 'react';
import {useNavigate,useLocation,useSearchParams} from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
import { Input } from 'antd';
import styles from './ListSearch.module.scss';

const { Search } = Input;

const ListSearch: FC = () => {
    const nav=useNavigate();
    const {pathname}=useLocation();
    //获取url参数，并设置到input value
    const [searchParams] = useSearchParams();

    const [value, setValue] = useState<string>('');

    useEffect(()=>{
        //每当searchParams变化时，都会执行这个函数
        const curVal=searchParams.get(LIST_SEARCH_PARAM_KEY)||'';
        setValue(curVal);
    },[searchParams]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function handleSearch(value: string) {
        //跳转页面，增加url参数
        nav({
            pathname,
            search:`?${LIST_SEARCH_PARAM_KEY}=${value}`
        });
    }

    return (
        <div className={styles['search-container']}>
            <Search
                size="large"
                allowClear
                placeholder="输入关键字"
                value={value}
                onSearch={handleSearch}
                onChange={handleChange} />
        </div>
    )
}

export default ListSearch;