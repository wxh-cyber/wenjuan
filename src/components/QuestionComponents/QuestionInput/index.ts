/**
 * @description 问卷输入框
 * @author 小慕
 */
import Component from './Component';
import {QuestionInputDefaultProps} from './interface';

export * from './interface';

//Input组件的配置
export default {
    title:'输入框',
    type:'questionInput',
    Component,
    defaultProps:QuestionInputDefaultProps
}