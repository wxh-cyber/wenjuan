import React from "react";
import {render,screen} from '@testing-library/react'
import { test, expect } from '@jest/globals';
import Component from "./Component";

test('默认属性',()=>{
    render(<Component />);       //渲染组件
    const title=screen.getByText('问卷标题');
    expect(title).toBeTruthy();
});
