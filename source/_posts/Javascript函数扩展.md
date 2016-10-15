---
title: Javascript函数扩展
tags:
  - Javascript
id: 1110
categories:
  - 笔记
date: 2013-06-26 19:42:25
---

```javascript
/**
 - 扩展Function原型
 */
Function.prototype.bind = Function.prototype.bind || function() {
    var func   = this,
        target = arguments[0],
        args   = Array.prototype.slice.call(arguments, 1);

    return function() {
        var argsMerged = Array.prototype.concat.apply(args, arguments);
        return func.apply(target, argsMerged);
    }
}
```