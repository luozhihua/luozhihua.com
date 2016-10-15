---
title: Script标签的“src”属性引起的XHTML第一行的语法错误
tags:
  - HTML
  - Javascript
id: 178
date: 2010-09-09 23:37:34
---

如果你在的javascript标签是这样写的，将有可能引起语法错误，而你很难找到该错误的原因：

```html
<script type="text/javascript" src="">
    // Some Javascript Code
</script>
```

问题的关键是在内置的脚本代码标签不应该含有“src”这个属性，如果“src”属性的值是一个正确的路径，在部分浏览器里将会忽 略`<script></script>`之间的代码，而当"src"属性为空时将导致语法错误，这是因为空属性"src"会把“当 前页面的路径”当成“脚本文件”的路径，而浏览器将会提示类似这样的错误：

```text
syntax error ![](chrome://firebug/content/blank.gif "Break on this error")﻿<!DOCTYPE  html PUBLIC "-//W3C//DTDXH.../xhtml1/DTD/xhtml1-transitional.dtd">\n
www.luozhihua.com (第 1 行)
```

**解决方法：**</span>
**在内嵌javascript代码时，<script></script>不要设置“src”属性。**</div>