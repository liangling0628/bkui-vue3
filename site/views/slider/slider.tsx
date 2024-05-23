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

import DemoBox from '../../components/demo-box';
import DemoTitle from '../../components/demo-title';
import PropsBox from '../../components/props-box';
import { IPropsTableItem } from '../../typings';
import BaseDemo from './base-demo.vue';
import CustomDemo from './custom-demo.vue';
import InputDemo from './input-demo.vue';
import StepDemo from './step-demo.vue';
import VerticalDemo from './vertical-demo.vue';

const switcherPropsJson: IPropsTableItem[] = [
  {
    // name: 'value',
    // type: 'number/array' as any,
    name: 'model-value / v-model',
    type: 'Number/Array',
    default: '0',
    desc: '使用v-model，将指定变量与slider的值进行绑定',
    optional: [],
  },
  {
    name: 'ext-cls',
    type: 'String',
    default: '',
    desc: '自定义类名',
    optional: [],
  },
  {
    name: 'vertical',
    type: 'Boolean',
    default: 'false',
    desc: '是否垂直',
    optional: ['true', 'false'],
  },
  {
    name: 'height',
    type: 'String',
    default: '200PX',
    desc: '垂直状态下的高度',
    optional: [],
  },
  {
    name: 'disable',
    type: 'Boolean',
    default: 'false',
    desc: '是否禁用',
    optional: [],
  },
  {
    name: 'show-tip',
    type: 'Boolean',
    default: 'false',
    desc: '是否显示滑块的tip',
    optional: [],
  },
  {
    name: 'max-value',
    type: 'Number',
    default: '100',
    desc: '最大值',
    optional: [],
  },
  {
    name: 'min-value',
    type: 'Number',
    default: '0',
    desc: '最小值',
    optional: [],
  },
  {
    name: 'step',
    type: 'Number',
    default: '1',
    desc: '每一步的距离',
    optional: [],
  },
  {
    name: 'range',
    type: 'Boolean',
    default: 'false',
    desc: '是否为分段式',
    optional: [],
  },
  {
    name: 'show-interval',
    type: 'Boolean',
    default: 'false',
    desc: '是否显示间断点',
    optional: [],
  },
  {
    name: 'show-interval-label',
    type: 'Boolean',
    default: 'false',
    desc: '是否显示间断点下的文字',
    optional: [],
  },
  {
    name: 'show-button-label',
    type: 'Boolean',
    default: 'false',
    desc: '是否显示滑块下的问题，不可与showIntervalLabel同时使用',
    optional: [],
  },
  {
    name: 'show-between-label',
    type: 'Boolean',
    default: 'false',
    desc: '是否显示首尾的文字',
    optional: [],
  },
  {
    name: 'show-input',
    type: 'Boolean',
    default: 'false',
    desc: '是否显示输入框',
    optional: [],
  },
  {
    name: 'custom-content',
    type: 'Object',
    default: 'null',
    desc: '自定义内容',
    optional: [],
  },
  {
    name: 'formatter-label',
    type: 'Function',
    default: '(value) => value',
    desc: '自定义间断点下的文字格式',
    optional: [],
  },
  {
    name: 'formatter-button-label',
    type: 'Function',
    default: '(value) => value',
    desc: '自定义滑块下下的文字格式',
    optional: [],
  },
  {
    name: 'formatter-tip-label',
    type: 'Function',
    default: '(value) => value',
    desc: '自定义滑块tip格式',
    optional: [],
  },
  {
    name: 'label-click',
    type: 'Boolean | Function',
    default: 'false',
    desc: '步骤label点击事件，可以设置true或者false，设置true时触发会设置当前值为label所对应的step值，也可以设置自定义函数，返回true或者false或者number，返回true时，会触发change事件，返回number时，会设置当前值为返回的number值，返回false时，不触发change事件',
    optional: [],
  },
];

const switcherChangeJson: IPropsTableItem[] = [
  {
    name: 'change',
    type: 'Function',
    default: '',
    desc: '鼠标弹起时触发',
    optional: [],
  },
];

export default defineComponent({
  setup() {},
  render() {
    return (
      <div>
        <DemoTitle
          desc='用于操作反馈的中间态(loading)、成功、失败等'
          designLink='https://bkdesign.bk.tencent.com/design/139'
          name='Slider 滑动选择器'
        />
        <DemoBox
          componentName='slider'
          demoName='base-demo'
          desc='使用 v-model 将变量与 slider 滑杆进行数据绑定，默认最大值 max-value 为 100, 默认最小值为 min-value 0'
          subtitle=''
          title='基础用法'
        >
          <BaseDemo></BaseDemo>
        </DemoBox>
        <DemoBox
          componentName='slider'
          demoName='step-demo'
          desc=''
          subtitle=''
          title='刻度'
        >
          <StepDemo></StepDemo>
        </DemoBox>
        <DemoBox
          componentName='slider'
          demoName='input-demo'
          desc=''
          subtitle=''
          title='带输入'
        >
          <InputDemo></InputDemo>
        </DemoBox>
        <DemoBox
          componentName='slider'
          demoName='vertical-demo'
          desc=''
          subtitle=''
          title='垂直'
        >
          <VerticalDemo></VerticalDemo>
        </DemoBox>
        <DemoBox
          componentName='slider'
          demoName='custom-demo'
          desc=''
          subtitle=''
          title='自定义'
        >
          <CustomDemo></CustomDemo>
        </DemoBox>
        <PropsBox
          propsData={switcherPropsJson}
          subtitle=''
          title='Slider 属性'
        />
        <PropsBox
          propsData={switcherChangeJson}
          subtitle=''
          title='Slider 事件'
        />
      </div>
    );
  },
});
