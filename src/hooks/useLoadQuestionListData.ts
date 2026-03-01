import { useSearchParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionListService } from '../services/question';
import { LIST_SEARCH_PARAM_KEY,LIST_PAGE_PARAM_KEY,LIST_PAGE_SIZE_PARAM_KEY,LIST_PAGE_SIZE } from '../constant';

type OptionType={
    isStar: boolean,
    isDeleted: boolean
}

function useLoadQuestionListData(opt:Partial<OptionType>={}) {
    const {isStar,isDeleted}=opt;
    const [searchParams] = useSearchParams();

    //由于这里的keyword会产生变化，因此将其写成异步函数的形式
    const { data, loading, error } = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
        const page=parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '')||1;
        const pageSize=parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '')||LIST_PAGE_SIZE;

        const data = await getQuestionListService({ keyword,isStar,isDeleted,page,pageSize });     //keyword本身是string类型，但是getQuestionListService期望的是对象类型
        return data;
    },{
        refreshDeps:[searchParams],     //刷新的依赖项
    });

    return {
        data,
        loading,
        error
    }
}

export default useLoadQuestionListData;