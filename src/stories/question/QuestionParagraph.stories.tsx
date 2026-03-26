import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Component from '../../components/QuestionComponents/QuestionParagraph/Component';

const meta ={
    title:'Question/QuestionParagraph',
    component:Component
}satisfies Meta<typeof Component>;

export default meta;

type Story=StoryObj<typeof meta>;

export const Default:Story={
    args:{
        text:'hello',
        isCenter:true
    }
}

export const BreakLine:Story={
    args:{
        text:'a\nb\nc'
    }
}
