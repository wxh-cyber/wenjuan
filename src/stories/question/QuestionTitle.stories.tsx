import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Component from '../../components/QuestionComponents/QuestionTitle/Component';

const meta ={
    title:'Question/QuestionTitle',
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
        level:2,
        isCenter:true
    }
}


