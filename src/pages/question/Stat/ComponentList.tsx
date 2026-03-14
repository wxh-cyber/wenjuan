import { FC, useState } from 'react';
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import styles from './ComponentList.module.scss';
import classNames from 'classnames';

const ComponentList: FC = () => {
    const { componentList } = useGetComponentsInfo();

    const [selectedComponentId, setSelectedComponentId] = useState('');

    return (
        <div className={styles.container}>
            {
                componentList
                    .filter(c => !c.isHidden)          //过滤隐藏的组件
                    .map(c => {
                        const { fe_id, props, type } = c;

                        const componentConfig = getComponentConfigByType(type);
                        if (!componentConfig) return null;

                        const { Component } = componentConfig;

                        //拼接class name
                        const wrapperDefaultClassName = styles['component-wrapper'];
                        const selectedClassName = styles.selected;
                        const wrapperClassName = classNames({
                            [wrapperDefaultClassName]: true,
                            [selectedClassName]: fe_id === selectedComponentId
                        });

                        return (
                            <div
                                className={wrapperClassName}
                                key={fe_id}
                                onClick={() => setSelectedComponentId(fe_id)}>
                                <div className={styles.component}>
                                    <Component {...props} />
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default ComponentList;