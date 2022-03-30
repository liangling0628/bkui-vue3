### 定制主题

`bkui-vue`设计规范上支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。

### 样式变量

bkui-vue的样式使用了less作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整。

以下是所有样式变量

```javascript
@bk-prefix: bk;


@primary-color: #3a84ff;
@success-color: #2dcb56;
@warning-color: #ff9c01;
@danger-color: #ea3636;
@default-color: #63656e;
@gray-color: #979ba5;
@light-gray: #c4c6cc;
@white-color: white;
@disable-color: #dcdee5;

@font-size-base: 12px;
@font-size-medium: 14px;
@font-size-large: 16px;

@line-height-base: 16px;
@line-height-medium: 16px;
@line-height-large: 18px;


@component-size-small: 26px;
@component-size-base: 32px;
@component-size-large: 38px;

@border-width-base: 1px;
@border-style-base: solid;
@border-radius-base: 2px;


// input theme
@input-disabled-bg: #fafbfd;
@input-disabled-border: @disable-color;
@input-height-base: @component-size-base;
@input-color: @default-color;
@input-bg: white;
@input-border-color: @light-gray;
@input-broder-radius: 3px;
@input-shadow-color: #a3c5fd;
@input-horizontal-padding: 10px;
@input-block-color: #f4f6fa;
@input-icon-size: @font-size-large;
@input-maxlength-color: #979ba5;

//button theme
@button-primary-hover-color: #5594fa;
@button-danger-hover-color: #ff5656;
@button-success-hover-color: #45e35f;
@button-warning-hover-color: #ffb848;
@button-default-hover-border-color: #979ba5;
@button-primary-active-color: #2c77f4;
@button-danger-active-color: #db2626;
@button-success-active-color: #1ab943;
@button-warning-active-color: #eb9000;

// fixed-navbar theme
@fixed-navbar-background: #fff;
@fixed-navbar-boxshadow-color: rgba(0,0,0,.1);

// switch theme
@switch-default-color: #fff;
@switch-grey-color: #c4c6cc;

// breadcrumb theme
@breadcrumb-black-color: #979ba5;
@breadcrumb-primary-hover-color: #0082ff;
@breadcrumb-fn-main-color: #63656e;

// link theme
@link-default-hover-color: #979ba5;
@link-primary-hover-color: #699df4;
@link-success-hover-color: #45e35f;
@link-warning-hover-color: #ffb848;
@link-danger-hover-color: #ff5656;
@link-default-disabled-color: #dcdee5;
@link-primary-disabled-color: #a3c5fd;
@link-success-disabled-color: #94f5a4;
@link-warning-disabled-color: #ffd695;
@link-danger-disabled-color: #fd9c9c;

// message theme
@message-color: @default-color;
@message-primary-bg-color: #f0f8ff;
@message-primary-border-color: #e1ecff;
@message-warning-bg-color: #fff4e2;
@message-warning-border-color: #ffe8c3;
@message-success-bg-color: #f2fff4;
@message-success-border-color: #dcffe2;
@message-danger-bg-color: #ffeded;
@message-danger-border-color: #ffdddd;

// slider theme
@slider-default-bg: #dcdee5;
@slider-disable-bar-bg: #979ba5;


// menu theme
@menu-bg-color: #182132;
@submenu-bg-color: #151d2c;
@menu-active-bg-color: linear-gradient(90deg, #3f87ff 0%, #3a84ff 100%);
@menu-color: #96a2b9;
@menu-group-color: @default-color;
@menu-width: 260px;
@menu-collapse-width: 60px;
@menu-active-color: white;

// navigation theme
@nav-header-bg-color: #182132;
@nav-bg-color: #182132;

// date-picker theme
@date-picker-disabled-bg: #fafbfd;
@date-picker-dropdown-mb: 4px;
@date-picker-dropdown-bg: #fff;
```

### 使用webpack来定制主题 

在webpack配置设置中对 less-loader 的 options 属性加入以下的配置

```javascript
  rules: [{
    test: /\.less$/,
    use: [
    ...
    {
      loader: 'less-loader', 
+     options: {
+       lessOptions: {  
+         modifyVars: {
+           'primary-color': '#ddd',
+           'success-color': '#ccc',
+         },
+         javascriptEnabled: true,
+       }
+     },
    }],
  }],
```

### 在vue-cli@3 定制主题

在项目中的 `vue.config.js` 中加入如下配置

```javascript
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#ddd',
            'success-color': '#ccc',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
```

### 全局引入时设置自定义主题的 less 变量文件

您还可以将项目中自定义的所有的主题变量设置在一个单独的 less 变量文件中引入来覆盖 bkui-vue 上的主题设置

```javascript
@import '~bkui-vue/dist/style.less'; // 引入官方提供的 less 样式入口文件
@import 'custom-theme.less'; // 用于覆盖上面定义的变量
```