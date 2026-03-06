import {useSelector} from 'react-redux';
import { StateType } from '../store';
import { ComponentsStateType } from '../store/componentsReducer';

function useGetComponentsInfo(){
    const components=useSelector<StateType>(state => state.components) as ComponentsStateType;

    const {componentList=[],selectedId=''}=components;
    //向外暴露componentList和selectedId
    return {componentList,selectedId};
}

export default useGetComponentsInfo;