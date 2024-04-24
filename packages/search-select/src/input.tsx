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
import { computed, defineComponent, nextTick, PropType, Ref, ref, watch } from 'vue';

import { useLocale, usePrefix } from '@bkui-vue/config-provider';
import { clickoutside } from '@bkui-vue/directives';
import Popover from '@bkui-vue/popover';
import { debounce, random } from '@bkui-vue/shared';

import SearchSelectMenu from './menu';
import {
  GetMenuListFunc,
  ICommonItem,
  IMenuFooterItem,
  ISearchItem,
  MenuSlotParams,
  SearchInputMode,
  SearchItemType,
  SearchLogical,
  SelectedItem,
  useSearchSelectInject,
  ValidateValuesFunc,
  ValueBehavior,
} from './utils';
export default defineComponent({
  name: 'SearchSelectInput',
  directives: {
    clickoutside,
  },
  props: {
    data: {
      type: Array as PropType<ISearchItem[]>,
      required: true,
    },
    showInputBefore: Boolean,
    showCondition: Boolean,
    clickOutside: Function,
    placeholder: String,
    conditions: {
      type: Array as PropType<ICommonItem[]>,
      default: () => [],
    },
    defautUsingItem: Object as PropType<SelectedItem>,
    mode: {
      type: String as PropType<SearchInputMode>,
      default: SearchInputMode.DEFAULT,
    },
    getMenuList: Function as PropType<GetMenuListFunc>,
    validateValues: Function as PropType<ValidateValuesFunc>,
    valueBehavior: String as PropType<ValueBehavior>,
  },
  emits: ['focus', 'add', 'delete'],
  setup(props, { emit, expose }) {
    const t = useLocale('searchSelect');
    const { resolveClassName } = usePrefix();
    const inputRef = ref<HTMLDivElement>(null);
    const popoverRef = ref<HTMLDivElement>(null);

    const keyword = ref('');
    const showNoSelectValueError = ref(false);
    const isFocus = ref(false);
    const showPopover = ref(false);
    const usingItem: Ref<SelectedItem> = ref(props.defautUsingItem);
    const menuHoverId = ref('');
    const loading = ref<boolean>(false);
    const debounceSetMenuList = debounce(300, setMenuList);
    // const selectMenuList = ref<ICommonItem[]>([]);
    let isBindEvent = false;

    const remoteMenuList = ref<ICommonItem[]>([]);
    const menuList: Ref<ISearchItem[]> = ref([]);

    const { editKey, onValidate, searchData } = useSearchSelectInject();
    const valueLoagic = computed(() => usingItem.value?.logical || SearchLogical.OR);

    watch(editKey, () => {
      if (props.mode === SearchInputMode.DEFAULT && editKey.value) {
        showPopover.value = false;
      }
    });

    // effects
    // watchEffect(
    //   () => {
    //     if (!keyword.value) {
    //       setInputText();
    //     }
    //   },
    //   { flush: 'pre' },
    // );

    watch([menuList, showPopover], () => {
      if (menuList.value?.some(item => !item.disabled) && showPopover.value) {
        if (!isBindEvent) {
          if (props.valueBehavior === ValueBehavior.NEEDKEY) {
            menuHoverId.value = menuList.value.find(item => !item.disabled).id;
          } else {
            menuHoverId.value = '';
          }
          isBindEvent = true;
          document.addEventListener('keydown', handleDocumentKeydown);
        }
      } else {
        document.removeEventListener('keydown', handleDocumentKeydown);
        isBindEvent = false;
        if (props.valueBehavior !== ValueBehavior.NEEDKEY) {
          menuHoverId.value = '';
        }
      }
    });

    // events
    function handleDocumentKeydown(e: KeyboardEvent) {
      switch (e.code) {
        case 'ArrowDown':
        case 'ArrowUp':
          documentArrowEvent(e);
          break;
        case 'Enter':
        case 'NumpadEnter':
          documentEnterEvent(e);
          break;
      }
    }
    function documentArrowEvent(e: KeyboardEvent) {
      e.preventDefault();
      inputRef.value?.blur();
      const len = menuList.value.length;
      let i = len;
      let index = menuList.value.findIndex(set => set.id === menuHoverId.value);
      while (i >= 0) {
        index = e.code === 'ArrowDown' ? index + 1 : index - 1;
        // eslint-disable-next-line no-nested-ternary
        index = index > len - 1 ? 0 : index < 0 ? len - 1 : index;
        const item = menuList.value[index];
        if (item && !item.disabled) {
          i = -1;
          const dom = document.getElementById(item.id);
          dom?.focus();
          menuHoverId.value = item.id;
          return;
        }
        i -= 1;
      }
    }
    function documentEnterEvent(e: KeyboardEvent) {
      if (isBindEvent) {
        e.preventDefault();
        const item = menuList.value.find(item => item.id === menuHoverId.value);
        item && handleSelectItem(item);
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (!popoverRef.value?.contains(e.target as Node) && props.clickOutside?.(e.target, popoverRef.value)) {
        if (props.mode === SearchInputMode.EDIT || usingItem.value) {
          handleKeyEnter();
          return;
        }
        showPopover.value = false;
        emit('focus', isFocus.value);
      }
    }
    function inputFocusForWrapper() {
      inputRef.value?.focus();
    }
    function handleInputFocus() {
      if (props.mode === SearchInputMode.EDIT && usingItem.value && !isFocus.value) {
        const range = document.createRange();
        const selection = window.getSelection();
        let nodeList = [];
        if (usingItem.value.values.length) {
          nodeList = Array.from(inputRef.value.querySelectorAll('[data-type="value"]'));
        } else {
          nodeList = Array.from(inputRef.value.querySelectorAll(`[data-type="${usingItem.value.type}"]`));
        }
        if (!nodeList.length) return;
        range.selectNodeContents(nodeList.at(-1));
        selection?.removeAllRanges();
        selection.addRange(range); // 注意这里会触发focu事件
        setInputFocus(true, false);
        return;
      }
      setMenuList();
      setInputFocus(false, !isFocus.value);
    }
    function str2SeletedItem(str: string) {
      const [key, value] = str.split(':');
      if (key?.trim()) {
        const selectedItem = searchData.value.find(item => item.name === key.trim());
        if (selectedItem) {
          const item = new SelectedItem(
            {
              ...selectedItem,
            },
            'default',
          );
          item.addValues(value);
          return item;
        }
      }
      return undefined;
    }
    // async function validateSelectItem(selectedItem: SelectedItem) {
    //   const res = await Promise.all(selectedItem?.values.map(item => validateUsingItemValues(item)))
    //     .then(() => true)
    //     .catch(() => false);
    //   return res;
    // }
    function handleInputPaste(event: ClipboardEvent) {
      event.preventDefault();
      const { clipboardData } = event;
      const pastedData = clipboardData.getData('text');
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = pastedData;
      const formattedText = (tempDiv.textContent || tempDiv.innerText || '').trim();
      if (!usingItem.value) {
        const formateItem = str2SeletedItem(formattedText);
        if (formateItem) {
          usingItem.value = formateItem;
          setInputFocus(true, true);
          return;
        }
        keyword.value = formattedText
          .split(/(\s|\||,|、|\/|\n\r|\n)/gm)
          .filter(v => !!v.trim())
          .join(valueLoagic.value);
        inputRef.value.innerText = keyword.value;
        setInputFocus();
        debounceSetMenuList();
        return;
      }
      usingItem.value.addValues(formattedText);
      debounceSetMenuList();
    }
    function handleInputChange(event: Event) {
      const text = (event.target as HTMLDivElement).innerText;
      if (!usingItem.value) {
        keyword.value = text;
        debounceSetMenuList();
        return;
      }

      keyword.value = usingItem.value.isSpecialType()
        ? text.trim()
        : text.replace(usingItem.value.name, '').replace(':', '').trim();
      console.info(keyword.value, '+++++++++');
      debounceSetMenuList();
    }
    function handleInputKeyup(event: KeyboardEvent) {
      switch (event.code) {
        case 'Enter':
        case 'NumpadEnter':
          if (
            props.valueBehavior === ValueBehavior.NEEDKEY &&
            menuList.value.some(item => item.id === menuHoverId.value)
          )
            return;
          handleKeyEnter(event).then(v => v && clearInput());
          break;
        case 'Backspace':
          handleKeyBackspace(event);
        default:
          showNoSelectValueError.value = false;
          break;
      }
    }
    async function handleKeyEnter(event?: KeyboardEvent) {
      event?.preventDefault();
      debugger;
      // resolve 中文输入时直接按下enter的错误表现
      await new Promise(r => setTimeout(r, 0));
      if (!usingItem.value) {
        if (!keyword.value || props.valueBehavior === ValueBehavior.NEEDKEY) return;
        const formatItem = str2SeletedItem(keyword.value);
        const valueList = formatItem?.values || [{ id: keyword.value, name: keyword.value }];
        const res = await Promise.all(valueList.map(item => validateUsingItemValues(item)))
          .then(() => true)
          .catch(() => false);
        if (!res) return;
        emit('add', formatItem || new SelectedItem({ ...valueList[0] }, 'text'));
        keyword.value = '';
        setMenuList();
        return true;
      }
      if (keyword.value?.length) {
        let valueList = [];
        if (usingItem.value.isSpecialType()) {
          const formatItem = str2SeletedItem(keyword.value);
          if (formatItem) {
            usingItem.value = formatItem;
            valueList = formatItem.values;
          }
        }
        if (!valueList.length) {
          valueList = usingItem.value.str2Values(keyword.value);
        }
        const res = await Promise.all(valueList.map(item => validateUsingItemValues(item)))
          .then(() => true)
          .catch(() => false);
        if (!res) return;
        if (usingItem.value.type === 'text') {
          usingItem.value.name = keyword.value;
          usingItem.value.id = keyword.value;
        } else {
          usingItem.value.values = valueList;
        }
        emit('add', usingItem.value);
        keyword.value = '';
        usingItem.value = null;
        setInputFocus(true);
        return true;
      }
      if (!usingItem.value?.isSpecialType() && usingItem.value?.values?.length < 1) {
        showNoSelectValueError.value = true;
        return false;
      }
      const res = await validateUsingItemValues();
      if (!res) return false;
      setSelectedItem();
      return false;
    }
    function handleKeyBackspace(event: KeyboardEvent) {
      // 删除已选择项
      if (!usingItem.value && !keyword.value) {
        emit('delete');
        setTimeout(setMenuList, 16);
        return;
      }
      if (usingItem.value?.values.length) {
        // if (hasSelectAllContent) {
        // }
        event.preventDefault();
        const selection = window.getSelection();
        if (selection?.rangeCount > 0) {
          const range: Range = selection.getRangeAt(0);
          const startPos = range.startContainer;
          let node: Node | HTMLSpanElement = startPos;
          while (node && node.parentNode !== inputRef.value) {
            node = node.parentNode;
          }
          const editIndex: number | string = (node as HTMLSpanElement)?.dataset?.index || -1;
          usingItem.value.values.splice(+editIndex, 1);
          keyword.value = '';
          setInputFocus(false, false);
          return;
        }
      } else if (!keyword.value) {
        usingItem.value = null;
        keyword.value = '';
        setMenuList();
      }
      onValidate('');
    }
    async function handleSelectItem(item: ICommonItem, type?: SearchItemType) {
      // 快捷选中
      if (item.value?.id) {
        if ((props.valueBehavior === ValueBehavior.NEEDKEY && item.value) || !props.validateValues) {
          const seleted = new SelectedItem({ ...item, id: item.realId ?? item.id }, type);
          seleted.addValues(item.value.name, false);
          setSelectedItem(seleted);
          if (props.valueBehavior === ValueBehavior.NEEDKEY && menuHoverId.value) {
            setInputFocus(true);
          }
          menuHoverId.value = '';
          return;
        }
        usingItem.value = new SelectedItem({ ...item, id: item.realId ?? item.id }, type);
        usingItem.value.addValues(item.value.name, false);
        const res = await Promise.all(usingItem.value.values.map(v => validateUsingItemValues(v)));
        if (!res) {
          usingItem.value = null;
          return;
        }

        setSelectedItem(usingItem.value);
        menuHoverId.value = '';
        setInputFocus(true);
        return;
      }
      if (!usingItem.value) {
        usingItem.value = new SelectedItem(item, type);
        keyword.value = '';
        const isCondition = type === 'condition';
        isCondition && setSelectedItem();
        showPopover.value = isCondition || !!usingItem.value.children.length;
        setInputFocus(props.valueBehavior === ValueBehavior.NEEDKEY && !!menuHoverId.value);
        return;
      }
      if (usingItem.value?.type === 'condition') {
        usingItem.value = new SelectedItem(item, type);
        setSelectedItem();
        return;
      }
      usingItem.value?.addValue(item);
      keyword.value = '';
      const res = await validateUsingItemValues(item);
      if (!res) return;
      if (!usingItem.value.multiple) setSelectedItem();
      if (props.valueBehavior === ValueBehavior.NEEDKEY && usingItem.value?.multiple) {
        setInputFocus();
      }
    }
    function handleSelectCondtionItem(item: ICommonItem) {
      handleSelectItem(item, 'condition');
    }
    function handleMenuFooterClick(item: IMenuFooterItem) {
      switch (item.id) {
        case 'confirm':
          if (!usingItem.value?.values.length) return;
          keyword.value = '';
          handleKeyEnter();
          break;
        case 'cancel':
          usingItem.value.values = [];
          showPopover.value = false;
          break;
      }
    }

    // functions
    async function validateUsingItemValues(value?: ICommonItem) {
      if (!usingItem.value) {
        return await validateValues(null, [value]);
      }
      const { searchItem, validate, values } = usingItem.value;
      if (validate && typeof props.validateValues === 'function') {
        return await validateValues(searchItem, value ? [value] : values);
      }
      onValidate('');
      return true;
    }
    async function validateValues(searchItem?: ISearchItem, value?: ICommonItem[]) {
      const validateStr = await props.validateValues?.(searchItem ?? null, value).catch(() => false);
      if (typeof validateStr === 'string' || validateStr === false) {
        onValidate(validateStr || '校验错误');
        return false;
      }
      onValidate('');
      return true;
    }
    function setCursorToEnd() {
      if (!inputRef.value) return;
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(inputRef.value);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    function setInputFocus(refleshMenuList = false, needCursorToEnd = true) {
      if (refleshMenuList) {
        setTimeout(setMenuList, 16);
      }
      isFocus.value = true;
      showPopover.value = true;
      showNoSelectValueError.value = false;
      needCursorToEnd && nextTick(setCursorToEnd);
      emit('focus', isFocus.value);
    }
    async function setMenuList() {
      let list = [];
      if (
        typeof props.getMenuList === 'function' &&
        (typeof usingItem.value?.searchItem?.async === 'undefined' || usingItem.value.searchItem.async === true)
      ) {
        loading.value = true;
        list = await props.getMenuList(usingItem.value?.searchItem, keyword.value).catch(() => []);
        loading.value = false;
      } else if (!usingItem?.value) {
        if (!keyword.value?.length) {
          list = props.data.filter(item => !item.isSelected).slice();
        } else
          props.data
            .filter(item => !item.isSelected)
            .forEach(item => {
              const isMatched = item.name.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase());
              if (isMatched) {
                list.push(item);
                const filterList = [];
                item.children?.forEach(child => {
                  filterList.push({
                    ...item,
                    realId: item.id,
                    id: random(10),
                    value: child,
                  });
                });
                !filterList.length &&
                  !item.onlyRecommendChildren &&
                  filterList.push({
                    ...item,
                    realId: item.id,
                    id: random(10),
                    value: {
                      id: keyword.value,
                      name: keyword.value,
                    },
                  });
                list.push(...filterList);
              } else {
                const filterList = [];
                item.children?.forEach(child => {
                  if (child.name.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase())) {
                    filterList.push({
                      ...item,
                      realId: item.id,
                      id: random(10),
                      value: child,
                    });
                  }
                });
                !filterList.length &&
                  !item.onlyRecommendChildren &&
                  filterList.push({
                    ...item,
                    value: {
                      id: keyword.value,
                      name: keyword.value,
                    },
                  });
                list.push(...filterList);
              }
            });
      } else if (usingItem.value.type === 'condition') {
        list = props.conditions;
      } else if (!usingItem.value.values?.length || usingItem.value.multiple || props.mode === SearchInputMode.EDIT) {
        list = usingItem.value.children.filter(item =>
          item.name.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase()),
        );
      }
      menuList.value = list;
      if (props.valueBehavior === ValueBehavior.NEEDKEY) {
        const hoverItem = list.find(item => !item.disabled);
        if (
          hoverItem &&
          (!menuHoverId.value || (menuHoverId.value && !list.some(item => item.id === menuHoverId.value)))
        ) {
          menuHoverId.value = hoverItem.id;
        }
      }
    }
    function setSelectedItem(item?: SelectedItem) {
      emit('add', item ?? usingItem.value);
      usingItem.value = null;
      keyword.value = '';
      setInputFocus(true, true);
      nextTick(clearInput);
    }
    function clearInput() {
      if (!inputRef.value) return;
      inputRef.value.innerText = '';
    }
    function handleLogicalChange(logical: SearchLogical) {
      if (!usingItem.value) return;
      usingItem.value.logical = logical;
    }

    // expose
    expose({
      inputFocusForWrapper,
      handleInputFocus,
      isFocus,
    });

    return {
      popoverRef,
      inputRef,
      keyword,
      loading,
      remoteMenuList,
      menuList,
      menuHoverId,
      isFocus,
      usingItem,
      showPopover,
      showNoSelectValueError,
      debounceSetMenuList,
      documentArrowEvent,
      handleClickOutside,
      handleInputFocus,
      handleInputChange,
      handleInputPaste,
      handleLogicalChange,
      handleInputKeyup,
      handleSelectItem,
      handleSelectCondtionItem,
      handleMenuFooterClick,
      resolveClassName,
      t,
    };
  },
  render() {
    const { multiple, values, placeholder, inputInnerHtml } = this.usingItem || {};
    const showInputAfter = !this.keyword?.length && !values?.length && placeholder;
    const showPopover = this.loading || this.showNoSelectValueError || (this.showPopover && !!this.menuList?.length);
    const showCondition = !this.usingItem && this.showCondition;
    const menuSlots = Object.assign(
      {},
      this.$slots.menu
        ? {
            default: (data: MenuSlotParams) => this.$slots.menu?.(data),
          }
        : {},
    );
    const inputContent = () => (
      <div
        ref='inputRef'
        class={{
          'div-input': true,
          'input-before': this.showInputBefore && !this.keyword?.length,
          'input-after': showInputAfter,
        }}
        contenteditable={true}
        data-placeholder={!inputInnerHtml && !this.keyword ? this.placeholder : ''}
        data-tips={placeholder || ''}
        spellcheck='false'
        v-clickoutside={this.handleClickOutside}
        onPaste={this.handleInputPaste}
        onFocus={this.handleInputFocus}
        onInput={this.handleInputChange}
        onKeydown={this.handleInputKeyup}
      >
        {this.usingItem?.name &&
          (!this.usingItem.isSpecialType() ? (
            <span
              data-key={this.usingItem.name}
              data-type={this.usingItem.type}
              key={this.usingItem.nameRenderkey}
              onMousedown={e => e.preventDefault()}
              contenteditable={false}
              style={{ color: '#979BA5' }}
            >
              {this.usingItem.name}:&nbsp;
            </span>
          ) : (
            <span
              data-key={this.usingItem.name}
              data-type={this.usingItem.type}
              key={this.usingItem.nameRenderkey}
            >
              {this.usingItem.name}
            </span>
          ))}
        {this.usingItem?.values?.map((item, index) => (
          <span
            key={index}
            data-key={item.name}
            data-type='value'
            data-id={item.id}
            data-index={index}
          >
            {index > 0 ? ` ${this.usingItem.logical} ` : ''}
            {item.name}
          </span>
        ))}
      </div>
    );
    const popoverContent = () => {
      if (this.loading) {
        return <div>{this.t.loading}</div>;
      }
      if (this.showNoSelectValueError) {
        return <div>{this.t.filterQueryMustHasValue}</div>;
      }
      return this.menuList?.length ? (
        <div
          ref='popoverRef'
          class={this.resolveClassName('search-select-popover')}
        >
          <SearchSelectMenu
            list={this.menuList}
            keyword={this.keyword}
            multiple={!!multiple}
            hoverId={this.menuHoverId}
            selected={values?.map(item => item.id) || []}
            conditions={showCondition ? this.conditions : []}
            logical={this.usingItem?.logical}
            showLogical={this.usingItem?.showLogical}
            onUpdate:logical={this.handleLogicalChange}
            onSelectItem={this.handleSelectItem}
            onSelectCondition={this.handleSelectCondtionItem}
            onFooterClick={this.handleMenuFooterClick}
            v-slots={{ ...menuSlots }}
          />
        </div>
      ) : undefined;
    };

    return (
      <Popover
        trigger='manual'
        theme='light'
        placement='bottom-start'
        arrow={false}
        disableOutsideClick={true}
        isShow={showPopover}
      >
        {{
          default: inputContent,
          content: popoverContent,
        }}
      </Popover>
    );
  },
});
