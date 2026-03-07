import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import {ComponentPropsType} from '../../components/QuestionComponents/index';

export type ComponentInfoType={
    fe_id:string;      //前端生成的id，服务端MongoDB不认这种格式，所以自定义一个fe_id
    type:string;
    title:string;
    props:ComponentPropsType;
}

export type ComponentsStateType={
    selectedId:string;
    componentList:Array<ComponentInfoType>;
}

const INIT_STATE:ComponentsStateType={
    selectedId:'',
    componentList:[]
};

export const componentsSlice=createSlice({
    name:'components',
    initialState:INIT_STATE,
    reducers:{
        //重置所有组件
        resetComponents:(state:ComponentsStateType,action:PayloadAction<ComponentsStateType>)=>{
            return action.payload;
        },

        //修改selectedId
        changeSelectedId:(draft:ComponentsStateType,action:PayloadAction<string>)=>{
            draft.selectedId=action.payload;
        },

        //添加新组件
        addComponent:(draft:ComponentsStateType,action:PayloadAction<ComponentInfoType>)=>{
            const newComponent=action.payload;       //将参数保存为新的component
            const {selectedId,componentList}=draft;
            const index=componentList.findIndex(c => c.fe_id===selectedId);      //获取当前选中元素的索引

            if(index<0){
                //未选中任何组件
                draft.componentList.push(newComponent);
            }else{
                draft.componentList.splice(index+1,0,newComponent);
            }

            draft.selectedId=newComponent.fe_id;
        },

        //修改组件属性
        changeComponentProps:(draft:ComponentsStateType,action:PayloadAction<{fe_id:string,newProps:ComponentPropsType}>)=>{
            const {fe_id,newProps}=action.payload;
            //找到了当前要修改的组件
            const curComp=draft.componentList.find(c => c.fe_id===fe_id);
            if(curComp){       //如果这个组件存在，则传入新的props
                curComp.props={
                    ...curComp.props,
                    ...newProps
                }
            }
        }
    }
});

export const {resetComponents,changeSelectedId,addComponent,changeComponentProps}=componentsSlice.actions;

export default componentsSlice.reducer;
