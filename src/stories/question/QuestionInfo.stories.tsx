import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Component from '../../components/QuestionComponents/QuestionInfo/Component';

// Meta 用于告诉 Storybook：这个 stories 文件对应哪个组件，以及在侧边栏如何分组展示。
const meta = {
  title: 'Question/QuestionInfo',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

// Story 类型基于上面的 meta 推导，能自动获得 args 的类型提示与校验。
type Story = StoryObj<typeof meta>;

// 默认示例：通过 args 传入组件 props，方便在 Storybook 面板中实时调参。
export const Default: Story = {
  args: {
    title: '问卷标题',
    desc: '问卷描述',
  },
};

export const DescBreakLine:Story={
  args:{
    title:'hello',
    desc:'a\nb\nc'
  }
}
