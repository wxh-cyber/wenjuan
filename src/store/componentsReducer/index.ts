import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import {ComponentPropsType} from '../../components/QuestionComponents/index';

export type ComponentInfoType={
    fe_id:string;
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
        }
    }
});

export const {resetComponents,changeSelectedId,addComponent}=componentsSlice.actions;

export default componentsSlice.reducer;
