import { FC } from 'react';
import { Typography } from 'antd';
import {nanoid} from 'nanoid';
import { componentConfigGroup, ComponentConfigType } from '../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { addComponent,ComponentInfoType } from '../../../store/componentsReducer';
import styles from './ComponentLib.module.scss';

const { Title } = Typography;

//注意：在React中，像useDispatch这样的hooks只能在函数组件中使用，不能在普通的函数中使用。
//如果需要在普通函数中使用dispatch，需要将dispatch作为参数传递进来。
function genComponent(c: ComponentConfigType,dispatch:any) {
    const { title, type, Component,defaultProps } = c;

    function handleClick(){
        dispatch(addComponent({
            fe_id:nanoid(),
            title,
            type,
            props:defaultProps
        }));
    }

    return (
        <div key={type} className={styles.wrapper} onClick={handleClick}>
            <div className={styles.component}>
                <Component />
            </div>
        </div>
    )
}

const ComponentLib: FC = () => {
    const dispatch = useDispatch();

    return (
        <div>
            {
                componentConfigGroup.map((group, index) => {
                    const { groupId, groupName, components } = group;

                    return (
                        <div key={groupId}>
                            <Title
                                level={3}
                                style={{
                                    fontSize: '16px',
                                    marginTop: index > 0 ? '20px' : '0'
                                }}>{groupName}</Title>
                            <div>{components.map(c => genComponent(c,dispatch))}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ComponentLib;
