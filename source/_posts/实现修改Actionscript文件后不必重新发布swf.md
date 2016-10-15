---
title: 实现修改Actionscript文件后不必重新发布swf
tags:
  - Actionscript
  - Javascript
id: 199
categories:
  - 笔记
date: 2010-09-09 23:55:22
---

解决方案基于：import  flash.external.ExternalInterface实现，其本质就是通过把as文件转移到Javascript中，并以函数形式返回给 flash来实现：把需要随时更新的as代码封装为匿名函数后转移到js里面然后通过ExternalInterface执行一个javascript函 数将其返回并执行：

看例子吧：

假设：_root中有一个名为“text_1”的动态文本框；现在我想随时修改它的外观和文字等

** javascript文件： **
```javascript
// ./js/External.js
function as() {
    return function() {
        /*  从flash转移出来的as代码写在这里 */
        _root.text_1.text = "这是新文字.";  // 改变文字
    }
}
```

** 这是Flash的代码 **

```javascript
// actionscript
import flash.external.ExternalInterface;
var func= ExternalInterface.call("as"); // 调用js函数将返回一个新的函数并赋值给“func”
	func(); // 执行从js返回的函数/
```
