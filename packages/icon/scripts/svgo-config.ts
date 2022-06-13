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

export default {
  plugins: [
    {
      name: 'removeDoctype',
      desc: 'Remove doctype',
      active: true,
    },
    {
      name: 'removeXMLProcInst',
      desc: 'Remove XML instructions',
      active: true,
    },
    {
      name: 'removeComments',
      desc: 'Remove comments',
      active: true,
    },
    {
      name: 'removeMetadata',
      desc: 'Remove <metadata>',
      active: true,
    },
    {
      name: 'removeXMLNS',
      desc: 'Remove xmlns',
      active: false,
    },
    {
      name: 'removeEditorsNSData',
      desc: 'Remove editor data',
      active: true,
    },
    {
      name: 'cleanupAttrs',
      desc: 'Clean up attribute whitespace',
      active: true,
    },
    {
      name: 'mergeStyles',
      desc: 'Merge styles',
      active: true,
    },
    {
      name: 'inlineStyles',
      desc: 'Inline styles',
      active: true,
    },
    {
      name: 'minifyStyles',
      desc: 'Minify styles',
      active: true,
    },
    {
      name: 'convertStyleToAttrs',
      desc: 'Style to attributes',
      active: true,
    },
    {
      name: 'cleanupIDs',
      desc: 'Clean up IDs',
      active: false,
    },
    {
      name: 'removeRasterImages',
      desc: 'Remove raster images',
      active: false,
    },
    {
      name: 'removeUselessDefs',
      desc: 'Remove unused defs',
      active: true,
    },
    {
      name: 'cleanupNumericValues',
      desc: 'Round/rewrite numbers',
      active: true,
    },
    {
      name: 'cleanupListOfValues',
      desc: 'Round/rewrite number lists',
      active: true,
    },
    {
      name: 'convertColors',
      desc: 'Minify colours',
      active: true,
    },
    {
      name: 'prefixIds',
      desc: 'prefix IDs',
      active: true,
    },
    {
      name: 'removeUnknownsAndDefaults',
      desc: 'Remove unknowns & defaults',
      active: false,
    },
    {
      name: 'removeNonInheritableGroupAttrs',
      desc: 'Remove unneeded group attrs',
      active: true,
    },
    {
      name: 'removeUselessStrokeAndFill',
      desc: 'Remove useless stroke & fill',
      active: true,
    },
    {
      name: 'removeViewBox',
      desc: 'Remove viewBox',
      active: true,
    },
    {
      name: 'cleanupEnableBackground',
      desc: 'Remove/tidy enable-background',
      active: false,
    },
    {
      name: 'removeHiddenElems',
      desc: 'Remove hidden elements',
      active: true,
    },
    {
      name: 'removeEmptyText',
      desc: 'Remove empty text',
      active: true,
    },
    {
      name: 'convertShapeToPath',
      desc: 'Shapes to (smaller) paths',
      active: true,
    },
    {
      name: 'moveElemsAttrsToGroup',
      desc: 'Move attrs to parent group',
      active: true,
    },
    {
      name: 'moveGroupAttrsToElems',
      desc: 'Move group attrs to elements',
      active: true,
    },
    {
      name: 'collapseGroups',
      desc: 'Collapse useless groups',
      active: true,
    },
    {
      name: 'convertPathData',
      desc: 'Round/rewrite paths',
      active: true,
    },
    {
      name: 'convertEllipseToCircle',
      desc: 'Convert non-eccentric <ellipse> to <circle>',
      active: true,
    },
    {
      name: 'convertTransform',
      desc: 'Round/rewrite transforms',
      active: true,
    },
    {
      name: 'removeEmptyAttrs',
      desc: 'Remove empty attrs',
      active: true,
    },
    {
      name: 'removeEmptyContainers',
      desc: 'Remove empty containers',
      active: true,
    },
    {
      name: 'mergePaths',
      desc: 'Merge paths',
      active: false,
    },
    {
      name: 'removeUnusedNS',
      desc: 'Remove unused namespaces',
      active: true,
    },
    {
      name: 'reusePaths',
      desc: 'Replace duplicate elements with links',
      active: false,
    },
    {
      name: 'sortAttrs',
      desc: 'Sort attrs',
      active: false,
    },
    {
      name: 'sortDefsChildren',
      desc: 'Sort children of <defs>',
      active: true,
    },
    {
      name: 'removeTitle',
      desc: 'Remove <title>',
      active: true,
    },
    {
      name: 'removeDesc',
      desc: 'Remove <desc>',
      active: true,
    },
    {
      name: 'removeDimensions',
      desc: 'Prefer viewBox to width/height',
      active: true,
    },
    {
      name: 'removeElementsByAttr',
      desc: 'removes arbitrary elements by ID or className (disabled by default)',
      active: false,
    },
    {
      name: 'removeStyleElement',
      desc: 'Remove style elements',
      active: false,
    },
    {
      name: 'removeScriptElement',
      desc: 'Remove script elements',
      active: false,
    },
    {
      name: 'removeAttrs',
      desc: 'remove attributes by pattern',
      active: true,
      params: {
        attrs: '(stroke|fill|data-name)',
      },
    },
  ],
};
