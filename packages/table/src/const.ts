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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const enum BORDER_OPTION {
  NONE = 'none',
  ROW = 'row',
  COL = 'col',
  OUTER = 'outer'
}

/**
 * 边框配置可选项
 */
export const BORDER_OPTIONS = [BORDER_OPTION.NONE, BORDER_OPTION.ROW, BORDER_OPTION.COL, BORDER_OPTION.OUTER];

export const enum EVENTS {
  /** 点击排序事件 */
  ON_SORT_BY_CLICK = 'onSortByClick',
  ON_FILTER_CLICK = 'onFilterClick',
  ON_SETTING_CHANGE = 'onSettingChange',

  ON_ROW_EXPAND_CLICK = 'onRowExpandClick'
}

export const enum EMITEVENTS {
  COLUMN_PICK = 'columnPick',
  COLUMN_SORT = 'columnSort',
  COLUMN_FILTER = 'columnFilter',
  COLUMN_FILTER_SAVE = 'colFilterSave',

  ROW_CLICK = 'rowClick',
  ROW_DBL_CLICK = 'rowDblclick',
  ROW_EXPAND_CLICK = 'rowExpand',

  PAGE_LIMIT_CHANGE = 'pageLimitChange',
  PAGE_VALUE_CHANGE = 'pageValueChange',

  SETTING_CHANGE = 'settingChange',

  SCROLL_BOTTOM = 'scrollBottom'
}

const EMPTY = (..._args) => true;

export const EMIT_EVENT_TYPES = {
  [EMITEVENTS.COLUMN_PICK]: EMPTY,
  [EMITEVENTS.COLUMN_FILTER]: EMPTY,
  [EMITEVENTS.COLUMN_SORT]: EMPTY,
  [EMITEVENTS.ROW_CLICK]: EMPTY,
  [EMITEVENTS.ROW_DBL_CLICK]: EMPTY,
  [EMITEVENTS.ROW_EXPAND_CLICK]: EMPTY,
  [EMITEVENTS.PAGE_LIMIT_CHANGE]: EMPTY,
  [EMITEVENTS.PAGE_VALUE_CHANGE]: EMPTY,
  [EMITEVENTS.SETTING_CHANGE]: EMPTY,
  [EMITEVENTS.SCROLL_BOTTOM]: EMPTY,
  [EMITEVENTS.COLUMN_FILTER_SAVE]: EMPTY,
};

/**
 * Table Row Attributes
 */
export const TABLE_ROW_ATTRIBUTE = {
  ROW_INDEX: '__$table_row_index',
  ROW_UID: '__$uuid',
  ROW_EXPAND: '__row_expand',
};

/**
 * Y 轴滚动条宽度
 */
export const SCROLLY_WIDTH = 4;

/**
 * 默认行高
 */
export const LINE_HEIGHT = 42;

export const SETTING_SIZE = {
  large: 78,
  medium: 60,
  small: 42,
};

export const DEFAULT_SIZE_LIST = [
  { value: 'small', label: '小', height: SETTING_SIZE.small },
  { value: 'medium', label: '中', height: SETTING_SIZE.medium },
  { value: 'large', label: '大', height: SETTING_SIZE.large },
];

/**
 * Provide key: init column when use <column { ...props }> template
 */
export const PROVIDE_KEY_INIT_COL = 'InitColumns';
