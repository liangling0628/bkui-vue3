/*
 * Tencent is pleased to support the open source community by making
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) is licensed under the MIT License.
 *
 * License for 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition):
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import { defineComponent } from 'vue';

import { tabPanelProps, tabProps } from '../../../packages/tab/src/props';
import DemoBox from '../../components/demo-box';
import DemoTitle from '../../components/demo-title';
import PropsBox from '../../components/props-box';
import { IPropsTableItem } from '../../typings';
import { resolvePropsToDesData } from '../utils';
import DemoAdd from './demo-add.vue';
import DemoBase from './demo-base.vue';
import CardDemo from './demo-card.vue';
import DemoCardGrid from './demo-card-grid.vue';
import DemoCardTab from './demo-card-tab.vue';
import DemoDrag from './demo-drag.vue';
import DemoExtend from './demo-extend.vue';
import DemoJsx from './demo-jsx';
import DemoPosition from './demo-position.vue';

const tabPropsJson: IPropsTableItem[] = resolvePropsToDesData(tabProps);
const tabPanelPropsJson: IPropsTableItem[] = resolvePropsToDesData(tabPanelProps);
// const tabEventPropsJson: IPropsTableItem[] = resolvePropsToDesData(tabEventProps);
const tabEventPropsJson = [
  {
    name: 'add',
    desc: '切换事件',
    params: '{ e: MouseEvent }',
  },
  {
    name: 'change',
    desc: '切换事件',
    params: 'name',
  },
  {
    name: 'remove',
    desc: '移除事件',
    params: 'index, panel',
  },
  {
    name: 'sort',
    desc: '排序事件',
    params: 'dragTabIndex, dropTabIndex, sortType',
  },
  {
    name: 'drag',
    desc: '拖拽事件',
    params: 'dragTabIndex, dragEvent',
  },
];
const eventColumnMap = {
  name: '名称',
  desc: '说明',
  params: '参数',
};
export default defineComponent({
  render() {
    return (
      <div>
        <DemoTitle
          desc='选项卡切换组件。'
          designLink='https://bkdesign.bk.tencent.com/design/80'
          name='Tab 选项卡'
        />
        <DemoBox
          componentName='tab'
          demoName='demo-base'
          desc='基础的、简洁的标签页。'
          title='基础用法'
        >
          <DemoBase />
        </DemoBox>
        <DemoBox
          componentName='tab'
          demoName='demo-card'
          desc='通过配置 type 属性，设置选项卡样式。支持的属性有 card, border-card, unborder-card, vertical-card card-grid'
          title='选项卡样式'
        >
          <CardDemo />
        </DemoBox>
        <DemoBox
          componentName='tab'
          demoName='demo-card-tab'
          desc='通过配置 type 属性，设置选项卡样式。支持的属性有 card, border-card, unborder-card, vertical-card card-grid'
          title='标签样式 '
        >
          <DemoCardTab />
        </DemoBox>
        <DemoBox
          componentName='tab'
          demoName='demo-card-grid'
          desc='通过配置 type 属性，设置选项卡样式。支持的属性有 card, border-card, unborder-card, vertical-card card-grid'
          title='card-grid'
        >
          <DemoCardGrid />
        </DemoBox>
        <DemoBox
          componentName='tab'
          demoName='demo-position'
          desc='通过配置 tab-position 属性，设置选项卡位置。支持的属性有 left, right, top。当 tab-position 属性配置为 left 和 right 时，addable 属性以及 closable 属性无效。'
          title='选项卡位置'
        >
          <DemoPosition />
        </DemoBox>
        <DemoBox
          componentName='tab'
          demoName='demo-add'
          desc='配置 addable 属性可动态添加选项卡；配置 closable 可以动态删除选项卡'
          title='可增删的选项卡'
        >
          <DemoAdd />
        </DemoBox>
        <DemoBox
          componentName='tab'
          demoName='demo-drag'
          desc='sortType 为replace时，为交换位置；为jump时，为插入当前位置。bk-tab :sortable=“true” 。tab 可拖拽排序。bk-tab-panel :unsortable=“ture”,此选项不可排序'
          title='拖拽排序'
        >
          <DemoDrag />
        </DemoBox>
        <DemoBox
          componentName='tab'
          demoName='demo-extend'
          desc='通过使用 slot 自定义选项卡内容'
          title='自定义选项卡内容'
        >
          <DemoExtend />
        </DemoBox>
        <DemoBox
          componentName='tab'
          demoName='demo-jsx'
          desc='tsx 写法'
          suffix='.tsx'
          title='tsx用法'
        >
          <DemoJsx />
        </DemoBox>
        <PropsBox
          propsData={tabPropsJson}
          title='tab 属性'
        />
        <PropsBox
          columnMap={eventColumnMap}
          propsData={tabEventPropsJson}
          title='tab 事件'
        />
        <PropsBox
          propsData={tabPanelPropsJson}
          title='tab-Panel 属性'
        />
      </div>
    );
  },
});
