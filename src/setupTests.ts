import '@testing-library/jest-dom';

// jsdom 环境中 ResizeObserver 未定义，antd TextArea 等组件依赖它
/**
 * Jest默认在Node中跑测试，前端项目一般会配置成使用 jsdom 环境：
 * • jsdom 是一个用 Node 实现的“虚拟浏览器”，会模拟 DOM API（document、window 等），但不是所有浏览器 API 都实现了。
 * • 比如 ResizeObserver、matchMedia 等在 jsdom 里就没有，需要你自己 mock。
 * 
 * Jest 本身只知道 toBe、toEqual 这些基础断言，不知道“在不在文档里”这种 DOM 语义。
 */
class ResizeObserverMock {
  observe = () => null;
  unobserve = () => null;
  disconnect = () => null;
}

global.ResizeObserver = ResizeObserverMock as any;

/**
 * ResizeObserverMock 与 global.ResizeObserver
 * • jsdom 目前没有实现 ResizeObserver，这是一个已知问题。
 * • antd 的 TextArea 等组件内部使用了 ResizeObserver，在测试环境里就会抛出 ReferenceError。
 * • 通过 global.ResizeObserver = ResizeObserverMock，你在全局挂了一个“空实现”的 mock：
 *     ◦ 组件调用 new ResizeObserver() 不会报错；
 *     ◦ observe / unobserve / disconnect 都是空函数，对测试没影响，但能保证组件正常挂载和渲染。
 */
