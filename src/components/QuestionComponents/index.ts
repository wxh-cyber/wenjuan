/**
 * @description 问卷组件的配置
 * @author 小慕
 */
import { FC } from 'react';
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle';

//各个组件的PropsType
//通过交叉类型的方式进行统一整合
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;

//组件的配置
export type ComponentConfigType = {
    title: string;
    type: string;
    Component: FC<ComponentPropsType>;
    PropComponent: FC<ComponentPropsType>;
    defaultProps: ComponentPropsType;
}

//全部组件配置的列表
//由于单个的QuestionInputConfig和QuestionTitleConfig的type内部都是可选属性，所以可以这样配置
const componentConfigList: ComponentConfigType[] = [
    QuestionInputConfig,
    QuestionTitleConfig
];

//组件分组
export const componentConfigGroup=[
    {
        groupId:'textGroup',
        groupName:'文本显示',
        components:[QuestionTitleConfig]
    },
    {
        groupId:'inputGroup',
        groupName:'用户输入',
        components:[QuestionInputConfig]
    }
]

export function getComponentConfigByType(type: string) {
    return componentConfigList.find(item => item.type === type);
}