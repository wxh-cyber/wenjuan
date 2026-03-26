import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Component from '../../components/QuestionComponents/QuestionRadio/Component';

const meta = {
    title: 'Question/QuestionRadio',
    component: Component
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args:{}
}

export const SetProps: Story = {
    args: {
        title: 'hello',
        options: [
            { value: 'v1', text: 't1' },
            { value: 'v2', text: 't2' },
            { value: 'v3', text: 't3' }
        ],
        value: 'v1',
        isVertical: true
    }
}
