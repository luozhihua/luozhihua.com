---
title: Javascript函数扩展
id: 1109
categories:
  - 未分类
tags:
---

/**
* 扩展Function原型
*/
Function.prototype.bind = Function.prototype.bind || function() {
var func = this,
target = arguments[0],
args = Array.prototype.slice.call(arguments, 1);

return function() {
var argsMerged = Array.prototype.concat.apply(args, arguments);
return func.apply(target, argsMerged);
}
}