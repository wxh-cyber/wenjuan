import type {Meta, StoryObj} from '@storybook/react-webpack5';

import Component from '../../components/QuestionComponents/QuestionInput/Component';

const meta ={
    title:'Question/QuestionInput',
    component:Component
}satisfies Meta<typeof Component>;

export default meta;

type Story=StoryObj<typeof meta>;

export const Default:Story={
    args:{}
}

export const SetProps:Story={
    args:{
        title:'Custom title',
        placeholder:'Type Here...'
    }
}
