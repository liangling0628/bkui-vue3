
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
import { FunctionalComponent } from 'vue';

import BkIcon, { IIconBaseProps } from './icon';
const data = JSON.parse('{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 1024 1024","style":"width: 1em; height: 1em; vertical-align: middle;fill: currentColor;overflow: hidden;"},"elements":[{"type":"element","name":"path","attributes":{"d":"M896 671.3599999999999c0-2.5599999999999996-0.6399999999999999-4.4799999999999995-1.2799999999999998-7.04-0.6399999999999999-1.92-0.6399999999999999-3.84-1.2799999999999998-5.119999999999999s-1.2799999999999998-2.5599999999999996-1.92-3.1999999999999997c-1.2799999999999998-2.5599999999999996-2.5599999999999996-4.4799999999999995-4.4799999999999995-6.3999999999999995 0 0 0 0 0-0.6399999999999999l-356.48-384c-10.239999999999998-11.52-26.88-11.52-37.12 0l-356.48 384c0 0 0 0.6399999999999999 0 0.6399999999999999-1.92 1.92-2.5599999999999996 3.84-3.84 6.3999999999999995-0.6399999999999999 1.2799999999999998-1.92 2.5599999999999996-2.5599999999999996 3.84s-0.6399999999999999 3.1999999999999997-1.2799999999999998 5.119999999999999c-0.6399999999999999 1.2799999999999998-1.2799999999999998 3.84-1.2799999999999998 6.3999999999999995 0 0 0 0.6399999999999999 0 0.6399999999999999 0 1.92 0.6399999999999999 3.1999999999999997 0.6399999999999999 4.4799999999999995 0 2.5599999999999996 0.6399999999999999 4.4799999999999995 1.2799999999999998 7.04s1.92 4.4799999999999995 3.1999999999999997 6.3999999999999995c0.6399999999999999 1.2799999999999998 1.2799999999999998 2.5599999999999996 1.92 3.84 0 0 0 0 0.6399999999999999 0.6399999999999999 1.2799999999999998 1.92 3.1999999999999997 3.1999999999999997 5.119999999999999 4.4799999999999995 1.2799999999999998 0.6399999999999999 2.5599999999999996 1.92 3.84 2.5599999999999996s2.5599999999999996 0.6399999999999999 3.84 1.2799999999999998c1.92 0 3.84 1.2799999999999998 6.3999999999999995 1.2799999999999998 0 0 0.6399999999999999 0 0.6399999999999999 0h712.96c3.84 0 7.68-0.6399999999999999 10.879999999999999-2.5599999999999996 0.6399999999999999 0 0.6399999999999999-0.6399999999999999 1.2799999999999998-0.6399999999999999 3.1999999999999997-1.92 5.76-3.84 8.32-6.3999999999999995 0 0 0 0 0.6399999999999999 0 0.6399999999999999-1.2799999999999998 1.2799999999999998-2.5599999999999996 1.92-3.84 1.2799999999999998-1.92 2.5599999999999996-3.84 3.1999999999999997-6.3999999999999995 0.6399999999999999-1.92 0.6399999999999999-4.4799999999999995 1.2799999999999998-7.04 0-1.92 0.6399999999999999-3.1999999999999997 0.6399999999999999-4.4799999999999995-0.6399999999999999-0.6399999999999999-0.6399999999999999-1.2799999999999998-0.6399999999999999-1.2799999999999998z"}}]}');
const upShape: FunctionalComponent<IIconBaseProps> = (props, context) => {
  const p = { ...props, ...context.attrs };
  return <BkIcon {...p}  data={data} name="upShape"></BkIcon>;
};

upShape.displayName = 'upShape';
upShape.inheritAttrs = false;

export default upShape;
