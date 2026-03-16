import { FC, useState } from "react";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { Typography, Spin ,Table, Divider} from "antd";
import { getQuestionStatListService } from "../../../services/stat";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";

const { Title } = Typography;

type PropsType = {
    selectedComponentId: string;
    setSelectedComponentId: (id: string) => void;
    setSelectedComponentType: (type: string) => void;
}

const PageStat: FC<PropsType> = (props: PropsType) => {
    const {selectedComponentId,setSelectedComponentId,setSelectedComponentType} = props;

    const { id = '' } = useParams();

    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);

    const { loading } = useRequest(async () => {
        const res = await getQuestionStatListService(id, { page: 1, pageSize: 10 });
        return res;
    }, {
        onSuccess: (res) => {
            const { total, list = [] } = res;
            setTotal(total);
            setList(list);
        }
    });

    const {componentList}=useGetComponentsInfo();
    const columns=componentList.map(c => {
        const {fe_id,title,props={}}=c;

        const colTitle=props!.title||title;      //先从props中获取title，如果props中没有title，再从上方的title中进行获取

        return {
            //title:colTitle,       //title也可以是JSX这样的表达式
            title:(<div 
            style={{cursor:'pointer'}}
            onClick={
                    setSelectedComponentId(fe_id);
                    setSelectedComponentType(title);
            }>
                <span style={{color:fe_id===selectedComponentId?'#1890ff':'inherit'}}>
                    {colTitle}
                </span>
            </div>),
            dataIndex:fe_id
        }
    });

    const TableElem=(
        <Table
            columns={columns}
            dataSource={list}
            pagination={false}
        >

        </Table>
    )

    return (
        <div>
            <Title level={3}>答卷数量：{!loading && total}</Title>
            {
                loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )
            }
            {!loading && TableElem}

        </div>
    )
}

export default PageStat;