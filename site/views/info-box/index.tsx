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
import BaseDemo from './base-demo.vue';
import ConfirmDemo from './confirm-demo.vue';
import StatusDemo from './status-demo.vue';
import UpdateDemo from './update-demo.vue';

import type { IPropsTableItem } from '../../typings';

const props: IPropsTableItem[] = [
  {
    name: 'isShow',
    type: 'Boolean',
    default: 'false',
    desc: '初始化时否展示',
    optional: [],
  },
  {
    name: 'onClose',
    type: 'Function',
    default: '',
    desc: '关闭执行函数',
    optional: [],
  },
  {
    name: 'onConfirm',
    type: 'Function',
    default: '',
    desc: '确定执行函数',
    optional: [],
  },
  {
    name: 'confirmText',
    type: 'String',
    default: '确定',
    desc: '确认按钮文字',
    optional: [],
  },
  {
    name: 'cancelText',
    type: 'String',
    default: '取消',
    desc: '取消按钮文字',
    optional: [],
  },
  {
    name: 'title',
    type: 'String',
    default: '',
    desc: '弹框的标题',
    optional: [],
  },
  {
    name: 'subTitle',
    type: 'String|VNode',
    default: '',
    desc: '弹窗内容',
    optional: [],
  },
  {
    name: 'headerAlign',
    type: 'String',
    default: 'left',
    desc: '显示 header 的位置',
    optional: ['left', 'center', 'right'],
  },
  {
    name: 'footerAlign',
    type: 'String',
    default: 'right',
    desc: '显示 footer 的位置',
    optional: ['left', 'center', 'right'],
  },
  {
    name: 'theme',
    type: 'String',
    default: 'primary',
    desc: '颜色按钮类型',
    optional: ['primary', 'warning', 'success', 'danger'],
  },
  {
    name: 'width',
    type: 'String | Number',
    default: 480,
    desc: '自定义对话框宽度',
    optional: [],
  },
  {
    name: 'height',
    type: 'String | Number',
    default: 240,
    desc: '自定义对话框高度',
    optional: [],
  },
  {
    name: 'extCls',
    type: 'String | Array',
    default: '',
    desc: '配置自定义样式类名',
    optional: [],
  },
  {
    name: 'scrollable',
    type: 'Boolean',
    default: 'true',
    desc: '弹框出现时，是否允许页面滚动',
    optional: [],
  },
  {
    name: 'closeIcon',
    type: 'Boolean',
    default: 'true',
    desc: '是否显示右上角的关闭 icon',
    optional: [],
  },
  {
    name: 'escClose',
    type: 'Boolean',
    default: 'true',
    desc: '是否允许 esc 按键关闭弹框',
    optional: [],
  },
  {
    name: 'showMask',
    type: 'Boolean',
    default: 'true',
    desc: '是否允许出现遮罩',
    optional: [],
  },
  {
    name: 'quickClose',
    type: 'Boolean',
    default: 'true',
    desc: '是否允许点击遮罩关闭弹框',
    optional: [],
  },
  {
    name: 'fullscreen',
    type: 'Boolean',
    default: 'false',
    desc: '是否全屏',
    optional: [],
  },
  {
    name: 'size',
    type: 'String',
    default: '',
    desc: '对话框尺寸',
    optional: ['normal', 'small', 'medium', 'large'],
  },
  {
    name: 'draggable',
    type: 'Boolean',
    default: 'true',
    desc: '是否可拖拽',
    optional: [],
  },
  {
    name: 'infoType',
    type: 'String',
    default: '',
    desc: '实现成功，错误，警告，加载中的不同Icon提示的弹窗类型',
    optional: ['success', 'danger', 'warning', 'loading'],
  },
];
const infoBox: IPropsTableItem[] = [
  {
    name: 'show',
    type: 'Function',
    default: '',
    desc: '展示',
    optional: [],
  },
  {
    name: 'hide',
    type: 'Function',
    default: '',
    desc: '隐藏',
    optional: [],
  },
  {
    name: 'update',
    type: 'Function',
    default: '',
    desc: '更新',
    optional: [],
  },
];
export default defineComponent({
  render() {
    return (
      <div>
        <DemoTitle
          desc='用户操作后的消息提示，用于成功、失败、警告等消息提醒。'
          link='https://www.google.com.hk/'
          name='infoBox 消息提示'
        />
        <DemoBox
          componentName='info-box'
          demoName='base-demo'
          desc='调用 InfoBox 方法，配置 title, subTitle 等参数'
          subtitle=''
          title='基础用法'
        >
          <BaseDemo />
        </DemoBox>
        <DemoBox
          componentName='info-box'
          demoName='status-demo'
          desc='配置 infoType 的值，实现成功，错误，警告，加载中的不同类型'
          subtitle=''
          title='各种状态'
        >
          <StatusDemo />
        </DemoBox>
        <DemoBox
          componentName='info-box'
          demoName='confirm-demo'
          desc='对话框分为4种类型。通过 dialogType 属性 设置为 confirm 实现'
          subtitle='confirm 确定按钮'
          title='Confirm'
        >
          <ConfirmDemo />
        </DemoBox>
        <DemoBox
          componentName='info-box'
          demoName='confirm-demo'
          desc='对话框分为4种类型。通过 dialogType 属性 设置为 confirm 实现'
          subtitle='Update 动态更新'
          title='Update 动态更新'
        >
          <UpdateDemo />
        </DemoBox>
        <PropsBox
          propsData={props}
          subtitle='InfoBox函数参数（以Dialog为准）'
        />
        <PropsBox
          propsData={infoBox}
          subtitle='InfoBox函数返回实例'
        />
      </div>
    );
  },
});
