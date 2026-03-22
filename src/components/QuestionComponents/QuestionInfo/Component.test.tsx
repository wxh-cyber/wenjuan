import React from "react";
import { render, screen } from '@testing-library/react';
import Component from "./Component";

test('默认属性',()=>{
    render(<Component />);       //渲染组件
    const title=screen.getByText('问卷标题');
    expect(title).toBeInTheDocument();
});

test('传入属性',()=>{
    render(<Component title="hello" desc="world" />);

    const h=screen.getByText('hello');
    expect(h).toBeInTheDocument();

    const p=screen.getByText('world');
    expect(p).toBeInTheDocument();
});

test('多行文字',()=>{
    render(<Component desc={'a\nb\nc'} />);

    const span=screen.getByText('a');
    expect(span).toBeInTheDocument();      //断言span标签存在于文档中

    expect(span).toHaveTextContent('a');
    expect(span).not.toHaveTextContent('ab');
});
