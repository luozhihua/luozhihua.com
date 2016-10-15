---
title: 谈Javascript字符串全局替换问题
tags:
  - Javascript
id: 400
categories:
  - 技术
date: 2010-10-13 23:05:21
---

Javascript的字符串替换有现成的方法，那就是string.replace()，在各种编程语言当中都有类似的方法，用法非常简单，但Javascript的replace方法让人感觉很没劲、很遗憾，它只能替换第一次出现的字符串，当一个字符串当中多次出现要替换的子字符（串）时显得无能为力。有没有可以实现全局替换的简单方法呢？

<!--more-->例如：

    var str = "abc_def_ghi_123";
    str =str. replace("_","");  //str的值将是"abcefg_ghi_123"
    `</pre>

    初次接触Javascript的朋友可能感到非常困惑，不过我们可以使用正则表达式实现全局替换，很简单：

    <pre>`
    var str = "abc_def_ghi_123";
    str =str. replace(/_/, "");  //str的值将是"abcefg_ghi_123"
    str =str. replace(/_/g, "");  //str的值将是"abcefgghi123"
    `</pre>

    请注意：str. replace(/_/g, "");里面的参数g，代表全局替换，估计是“global”首字母，如果不加该参数，将会和Javascript的普通模式一样只替换第一个出现的匹配字符。

    另外还有一种不用正则表达式实现全局替换的方法（有点歪门邪道），使用Javascript的内置方法就能实现，你是否对string.split()很熟悉呢？对！它是用来分割字符串的，那么怎么利用它实现全局替换呢？其实很简单，split()的返回结果是一个数组，那么我们就可以使用数组元素的连接方法array.join()方法连接起来就行啦，例子：

    <pre>`
    var str="abcabcabc";
    str = str.split("a").join(""); // 现在str的值是"bcbcbc"

这种方法对于不喜欢使用正则表达式的朋友非常实用（虽然有点歪门邪道），或许有人还担心效率问题，其实不必担心，经过测试：在执行次数2000以下，split+join方法比正则表达式还要快，但是超过一定次数后，正则表达式的速度会快一点，但是也不是那么稳定，有兴趣的朋友可以亲自测试一下。