import type {Meta,StoryObj} from '@storybook/react-webpack5';

import Component from '../../components/QuestionComponents/QuestionCheckbox/Component';

const meta ={
    title:'Question/QuestionCheckbox',
    component:Component
}satisfies Meta<typeof Component>;

export default meta;

type Story=StoryObj<typeof meta>;

export const Default:Story={
    args:{}
}

export const SetProps:Story={
    args:{
        title:'Hello',
        isVertical:true,
        list:[
            {value:'v1',text:'t1',checked:false},
            {value:'v2',text:'t2',checked:true},
            {value:'v3',text:'t3',checked:false},
        ]
    }
}
