import { FC, useCallback } from 'react';
import { Typography } from 'antd';
import { nanoid } from 'nanoid';
import { componentConfigGroup, ComponentConfigType } from '../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { addComponent, ComponentInfoType } from '../../../store/componentsReducer';
import styles from './ComponentLib.module.scss';

const { Title } = Typography;

//定义子组件Props类型
interface ComponentItemProps {
    config: ComponentConfigType
}

//注意：在React中，像useDispatch这样的hooks只能在函数组件中使用，不能在普通的函数中使用。
//如果需要在普通函数中使用dispatch，需要将dispatch作为参数传递进来。
//由于后期还加入了useCallback作为性能优化，因此这里选择直接将其改写为React函数组件
const ComponentItem: FC<ComponentItemProps> = ({ config }) => {
    //改为函数组件后，即可合法地使用useCallback和useDispatch
    const dispatch = useDispatch();
    const { title, type, Component, defaultProps } = config;

    const handleClick = useCallback(() => {
        dispatch(addComponent({
            fe_id: nanoid(),       //前端生成的id
            title,
            type,
            props: defaultProps
        }));
    }, []);

    return (
        <div key={type} className={styles.wrapper} onClick={handleClick}>
            <div className={styles.component}>
                <Component />
            </div>
        </div>
    )
}

const ComponentLib: FC = () => {

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
                            <div>
                                {components.map(c => <ComponentItem key={c.type} config={c} />)}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ComponentLib;
