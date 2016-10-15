---
title: TBC 前端JavaScript编写规范
tags:
  - Javascript
  - 前端开发
id: 1196
categories:
  - Javascript高级应用
---

<span style="font-size: 26px; line-height: 33.59720230102539px;">1\. Javascript代码应符合JSLint检验标准</span>

### 1-1\.    语句必须以分号结尾

除了for, function, if, switch, try, while，其他语句如果不使用分号结尾，在JS压缩后会导致无穷多的错误；

### 1-2\.    只有长语句可以考虑断行，如：

TEMPL_SONGLIST.replace('{TABLE}', da['results'])

             .replace('{PREV_NUM}', prev)

             .replace('{NEXT_NUM}', next)

             .replace('{CURRENT_NUM}', current)

             .replace('{TOTAL_NUM}', da.page_total);

为了避免和JSLint的检验机制冲突，“.”或“＋”这类操作符放在行尾，上面代码应改为：

TEMPL_SONGLIST.replace('{TABLE}', da['results']).

              replace('{PREV_NUM}', prev).

              replace('{NEXT_NUM}', next).

              replace('{CURRENT_NUM}', current).

              replace('{TOTAL_NUM}', da.page_total);

## 1-3\.       避免额外的逗号。如：

var arr = [1, 2, 3,];

## 1-4\.       所有的循环体和判断体都需要用"{}"括起来。如：

错：

if (condition)

       statement;

  或

if (condition) statement;

对:

    if (condition) {

   statement;

  }

  或

if (condition) { statement; }

## 1-5\.       for-in循环体中必须用hasOwnProperty方法检查成员是否为自身成员，避免来自原型链上的污染，除非真的要检查整个原型链。

## 1-6\.       变量声明。变量声明应放在function的最上面。避免使用未声明的变量。

错：

if (n &gt; 0) {

var isvalid = true;

}

for (var i=0,len=arr.length; i&lt;len; i++) {

         // do

}

对：

var isvalid, i, len;

if (n &gt; 0) {

   isvalid = true;

}

for (i=0,len=arr.length; i&lt;len; i++){

// do

}

## 1-7\.       不要使用with, void, eval。

## 1-8\.       使用严格的条件判断符。

用===代替==，用!==代替!=， 使用==或!=会导致一些意想不到问题：

false == 0   // true

false === 0 // false

null == undefined      // true

null === undefined    // false

## 1-9\.       下面类型的对象不建议用new构造：

new Number, new String, new Boolean, new Object(用{}代替), new Array(用[]代替)。

错误：var o = new Object;

正确：var o = {};

错误：var a = new Array();  // 功能模棱两可, 如:

new Array(1,2,3).length === 3;

而

new Array(6).length === 6;

正确：var a = [];

## 1-10\.    引用对象成员用obj.prop1代替obj[“prop1”]，除非属性名是变量或者属性名含有特殊字符。

注：如果模块代码中，使用其它全局变量想跳过JSLint的检查，可以在该文件中加入/*global*/声明，如： /*global alert: true, console: true, top: true, setTimeout: true */

# 2\.     Javascript命名规则

## 2-1\.          构造器的首字母大写。如：

function Dialog (config) {

  statement;

}

var dlg = new Dialog({…});

## 2-2\.          对象的属性或方法名采用小驼峰式(lower camel-case)

如"init", "bindEvent", "updatePosition"：

Dialog.prototype = {

init       : function () {},

bindEvent : function () {},

updatePosition: function () {}

…

};

## 2-3\.          私有变量名推荐使用闭包实现，而不是用下划线开头来标识。

用下划线标识只是形式，实际上还是公共变量。如："_current", "_defaultConfig"

## 2-4\.          常量名全部大写，单词间用下划线分隔。

如：“CSS_BTN_CLOSE”, "TXT_LOADING"

## 2-5\.          变量名前缀：

<div dir="ltr">
<table><colgroup> <col width="131" /> <col width="200" /> <col width="292" /></colgroup>
<tbody>
<tr>
<td>

Prefix

</td>
<td>

Element

</td>
<td>

Example

</td>
</tr>
<tr>
<td>

is, can, has

</td>
<td>

boolean

</td>
<td>

[Boolean name]ConditionName

</td>
</tr>
<tr>
<td>

Get

</td>
<td>

accessor method

</td>
<td>

getMethodName

</td>
</tr>
<tr>
<td>

Set

</td>
<td>

accessor method

</td>
<td>

setMethodName

</td>
</tr>
</tbody>
</table>
</div>
&nbsp;

# 3\. 代码格式化要求

## 3-1\. 代码缩进：

推荐使用4个空格代替tab缩进，NodeJS代码推荐2个空格缩进(NodeJS因为采用的是事件+回调机制，嵌套层级通常会比较深，所以缩进太多会不利于代码阅读)；

## 3-2\. 用来包含语句的"()"前后需要跟空格。

诸如： if / for / while / switch ( statements ) { … } 等

错：

if(false){}

for(t in selected){ if(!hash[t])deselect(t) }

对：

    if (true) {…}

for (t in selected) {

if ( selected.hasOwnProperty(t) &amp;&amp; !hash[t] ) {

deselect(t);

}

}

## 3-3\. "="前后需要跟空格

错：var x=1, y=2;

对：var x = 1, y = 2;

## 3-4\. 长语句采用断行:

不好：

           TEMPL_SONGLIST.replace('{TABLE}', da['results']).replace('{PREV_NUM}', prev).replace('{NEXT_NUM}', next).replace('{CURRENT_NUM}', current).replace('{TOTAL_NUM}', da.page_total);

好：

       TEMPL_SONGLIST.replace('{TABLE}', da['results']).

                   replace('{PREV_NUM}', prev).

                      replace('{NEXT_NUM}', next).

                      replace('{CURRENT_NUM}', current).

                      replace('{TOTAL_NUM}', da.page_total);

## 3-5\. 格式化对象参数：

不好：

             embedSWF(id, { url: '/swf/player30792.swf?url=' + el.href, width: 261, height: 30, params: { wmode:'transparent' }, attributes: { id: "player-sample" + i, name: "player-sample" + i }});

好：

                 embedSWF(id, {

            url : '/swf/player30792.swf?url=' + el.href,

            width  : 261,

            height : 30,

            params : { wmode:'transparent' },

            attributes: {

                id  : "player-sample" + i,

                name: "player-sample" + i

            }

        });

# 4\.     性能

## 4-1\.     尽可能的采用prototype实现继承，而不是把每一个属性和方法都写在构造方法内部:

function ClassA () {

this.a = 1;

this.b = 2;

this.func1 = function(){…}

this.func2 = function(){…}

}

var  obj1 = new ClassA ();

var  obj2 = new ClassA ();

var  obj3 = new ClassA ();

&nbsp;

// 上面的代码中obj1、obj2、obj3都有ClassA的每一个方法和属性的副本

&nbsp;

function ClassB(){

this.a = 1;

this.b = 2;

}

ClassB.prototype = {

func1 : function(){…},

func2 : function(){…}

}

var  obj1 = new ClassB ();

var  obj2 = new ClassB ();

var  obj3 = new ClassB ();

&nbsp;

// 而这里，obj1/obj2/obj3除了a、b两个属性都有之外，func1和func2都是共用原型链prototype上的方法

## 4-2\.     需要重复调用的对象属性或方法，必须定义为变量；比如：

$(‘body’).click(function(){

   $(this).find(‘.cur’).removeClass(‘cur’);

   $(this).find(‘:last’).addClass(‘last-child’);

   $(this).find(‘:first).addClass(‘first-child’);

   $(this).find(‘input’).focus(function(){

    // do some thing.

 });

});

&nbsp;

可优化为：

&nbsp;

$(‘body’).click(function(){

&nbsp;

 var $this = $(this);

&nbsp;

 $this.find(‘.cur’).removeClass(‘cur’);

 $this.child(‘:last’).addClass(‘last-child’);

 $this.child(‘:first).addClass(‘first-child’);

 $this.find(‘input’).focus(function(){

    // do some thing.

 });

});

## 4-3\.     避免重复代码：

&lt;div id=”ajax-place”&gt;&lt;/div&gt;

$(‘# ajax-place’).load(‘http://url’, function(){

   var $this = $(this);

   // 为了保证新load的a标签响应click事件，

 // 每次load后都会执行下面的代码给a标签绑定click事件；

 $this.find(‘a’).click(function(){

    // just do it…

 });

});

&nbsp;

但是，下面的写法可以避免重复的绑定click事件：

&nbsp;

var div = $(‘#ajax-place).delegate(‘a’, ‘click’, function(){

   // just do it…

});

或:

var div = $(‘#ajax-place’).on(‘click’, ‘a’, function(){

   // just do it…

});

div.load(‘http://url-1’);

div.load(‘http://url-2’);

div.load(‘http://url-3’);

…

div.load(‘[http://url-30000000000000000](http://url-30000000000000000)’);