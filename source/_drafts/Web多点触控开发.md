---
title: Web多点触控开发
tags:
  - TouchEvent
  - 多点触控
  - 触摸屏
id: 949
categories:
  - 技术
date: 2012-03-19 23:28:36
---

## 前言

* * *

诸如智能手机和平板电脑一类的移动设备通常会有一个电容式触摸屏（capacitive touch-sensitive screen），以捕捉用户的手指所做的交互。随着移动网络的发展，其能够支持越来越复杂的应用，web开发者需要一种方法来处理这些事件。例如，几乎所 有的快节奏游戏都需要玩家一次按下多个按钮，这种方式，在触摸屏情况下，意味着多点触摸。

Apple在iOS 2.0中引入了[触摸事件API](http://developer.apple.com/library/safari/#documentation/UserExperience/Reference/TouchEventClassReference/TouchEvent/TouchEvent.html#//apple_ref/doc/uid/TP40009358)，Android正迎头赶上这一事实标准，缩小差距。最近一个W3C工作组正合力制定这一[触摸事件规范](http://dvcs.w3.org/hg/webevents/raw-file/tip/touchevents.html)。

在本文中，我会深入研究iOS和Android设备提供的触摸事件API，探索一下可以构建哪些类型的应用，给出一些最佳做法，并论及一些使得可触控应用（touch-enabled application）的开发变得更加容易的有用技术。<!--more-->

触摸事件

* * *

三种在规范中列出并获得跨移动设备广泛实现的基本触摸事件：

1\. touchstart：手指放在一个DOM元素上。
2\. touchmove：手指拖曳一个DOM元素。
3\. touchend：手指从一个DOM元素上移开。

每个触摸事件都包括了三个触摸列表：

1\. touches：当前位于屏幕上的所有手指的一个列表。
2\. targetTouches：位于当前DOM元素上的手指的一个列表。
3\. changedTouches：涉及当前事件的手指的一个列表。

例如，在一个touchend事件中，这就会是移开的手指。

这些列表由包含了触摸信息的对象组成：

1\. identifier：一个数值，唯一标识触摸会话（touch session）中的当前手指。
2\. target：DOM元素，是动作所针对的目标。
3\. 客户/页面/屏幕坐标：动作在屏幕上发生的位置。
4\. 半径坐标和 rotationAngle：画出大约相当于手指形状的椭圆形。

可触控应用

* * *

touchstart、touchmove和touchend事件提供了一组足够丰富的功能来支持几乎是任何类型的基于触摸的交互——其中包括常见的多点触摸手势，比如说捏缩放、旋转等待。

下面的这段代码让你使用单指触摸来四处拖曳一个DOM元素：

```javascript
var obj = document.getElementById('id');
obj.addEventListener('touchmove', function(event) {
    // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        obj.style.left = touch.pageX + 'px';
        obj.style.top = touch.pageY + 'px';
    }
}, false);
```

下面是一个示例，该例子显示了屏幕上当前所有的触点，它的作用就是用来感受一下设备的响应性。

[![](http://cdn.yeeyan.org/upload/attached/2011-06/27/20110627090657_73223.png)](https://github.com/borismus/MagicTouch/blob/master/samples/tracker.html)

```javascript
// 设置画布并通过ctx变量来暴露上下文
canvas.addEventListener('touchmove', function(event) {
    for (var i = 0; i < event.touches.length; i++) {
        var touch = event.touches[i];
        ctx.beginPath();
        ctx.arc(touch.pageX, touch.pageY, 20, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.stroke();
    }
}, false);
```

演示

到处都有着许多有意思的多点触摸演示，比如说这个由Paul Irish和其他人实现的[基于画布的绘画演示](http://paulirish.com/demo/multi)。

[![](http://cdn.yeeyan.org/upload/attached/2011-06/27/20110627090626_52463.png)](http://paulirish.com/demo/multi)

还有[Browser Ninja](http://smus.com/x/browser-ninja/)，一个技术演示，是一个使用了CSS3的转换、过渡和画布的Fruit Ninja克隆。

[![](http://cdn.yeeyan.org/upload/attached/2011-06/27/20110627090623_84597.png)](http://smus.com/x/browser-ninja)

最佳做法

* * *

阻止缩放

缺省的多点触摸设置不是特别的好用，因为你的滑动和手势往往与浏览器的行为有关联，比如说滚动和缩放。

要禁用缩放功能的话，使用下面的元标记设置你的视图区（viewport），这样其对于用户来说就是不可伸缩的了：

content="width=device-width, initial-scale=1.0, user-scalable=no"&gt;

看看[这篇关于移动HTML 5](http://www.html5rocks.com/mobile/mobifying.html#toc-meta-viewport)的文章，了解更多关于视图区设置的信息。

阻止滚动

一些移动设备有缺省的touchmove行为，比如说经典的iOS overscroll效果，当滚动超出了内容的界限时就引发视图反弹。这种做法在许多多点触控应用中会带来混乱，但要禁用它很容易。

```javascript
document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, false);
```
细心渲染

如果你正在编写的多点触控应用涉及了复杂的多指手势的话，要小心地考虑如何响应触摸事件，因为一次要处理这么多的事情。考虑一下前面一节中的在屏幕上画出所有触点的例子，你可以在有触摸输入的时候就立刻进行绘制：

```javascript
canvas.addEventListener('touchmove', function(event) {
    renderTouches(event.touches);
})
```

不过这一技术并不是要随着屏幕上的手指个数的增多而扩充，替代做法是，可以跟踪所有的手指，然后在一个循环中做渲染，这样可获得更好的性能：

```javascript
var touches = []

canvas.addEventListener('touchmove', function(event) {
    touches = event.touches;
}, false);

// 设置一个每秒60帧的定时器
timer = setInterval(function() {
    renderTouches(touches);
}, 15);
```

提示：setInterval不太适合于动画，因为它没有考虑 到浏览器自己的渲染循环。现代的桌面浏览器提供了requestAnimationFrame这一函数，基于性能和电池工作时间原因，这是一个更好的选 择。一但浏览器提供了对该函数的支持，那将是首选的处理事情的方式。

### 使用targetTouches和changedTouches

要记住的一点是，event.touches是与屏幕接触的所有手指的一个数组，而不仅是位于目标DOM元素上的那些。你可能会发现使用 event.targetTouches和event.changedTouches来代替event.touches更有用一些。

最后一点，因为你是在为移动设备做开发，因此你应该要留心移动的最佳做法，这些在[Eric Bidelman的文章](http://www.html5rocks.com/mobile/mobifying.html)中有论及，以及要了解[这一W3C文档](http://www.w3.org/TR/mwabp/)。

设备支持

* * *

遗憾的是，触摸事件的实现在完备性和质量方面的差别很大。我编写了一个诊断脚本来显示一些关于触摸API实现的基本信息，其中包括哪些事件是支持的，以及 touchmove事件触发的解决方案。我在Nexus One和Nexus S硬件上测试了Android 2.3.3，在Xoom上测试了Android 3.0.1，以及在iPad和iPhone上测试了iOS 4.2。

简而言之，所有被测试的浏览器都支持touchstart、touchend和touchmove事件。

规范提供了额外的三个触摸事件，但被测试的浏览器没有支持它们：

1\. touchenter：移动的手指进入一个DOM元素。
2\. toucheleave：移动手指离开一个DOM元素。
3\. touchcancel：触摸被中断（实现规范）。

被测试的浏览器还在每个触摸列表内部都提供了touches、targetTouches和changedTouches列表。不过，被测试的浏 览器没有支持 radiusX、radiusY或是rotationAngle属性，这些属性指明触摸屏幕的手指的形状。在一次touchmove期间，事件大约一秒钟 触发60次，所有的被测试设备都是这样。

### Android 2.3.3 (Nexus)

Android的Gingerbread浏览器（在Nexus One和Nexus S上测试）不支持多点触摸，这是一个[已知的问题](http://code.google.com/p/android/issues/detail?id=11909)。

### Android 3.0.1 (Xoom)

Xoom的浏览器对多点触摸有一个基本的支持，不过只能是在单个的DOM元素上起作用。浏览器不能正确响应同时发生在不同DOM元素上的两处触摸，换句话说，下面的代码会对两个同时发生的触摸的给出反应：

```javascript
obj1.addEventListener('touchmove', function(event) {
    for (var i = 0; i < event.targetTouches; i++) {
        var touch = event.targetTouches[i];
        console.log('touched ' + touch.identifier);
    }
}, false);
```

但下面的代码则不会：

```javascript
var objs = [obj1, obj2];

for (var i = 0; i < objs.length; i++) {
    var obj = objs[i];
    obj.addEventListener('touchmove', function(event) {
        if (event.targetTouches.length == 1) {
            console.log('touched ' + event.targetTouches[0].identifier);
        }
    }, false);
}
```

### iOS 4.x (iPad, iPhone)

iOS设备完全支持多点触摸，能够跟踪多个手指，并在浏览器中提供一个非常敏感的触摸体验。

开发者工具

* * *

在移动开发中，一种较为容易的做法是，先在桌面上开始原型设计，然后再在打算要支持的设备上处理移动特有的部分。多点触摸正是难以在PC上进行测试的那些功能之一，因为大部分的PC都没有触摸输入。

不得不在移动设备上进行的测试有可能会拉长你的开发周期，因为你所做的每项改变都需要提交代码到服务器上，接着再加载到设备上。然后，一旦运行后，对应用也就没有太多的调试了，因为平板电脑和智能手机都很缺乏web开发者所用的工具。

这个问题的一个解决方案是在开发机器上模拟触发事件。对于单点触摸，触摸事件可以基于鼠标事件来模拟。如果你有触摸输入设备的话，比如说现代的App MacBook，那么多点触摸也可以被模拟。

单点触摸事件

如果你想在桌面上模拟单点触摸事件的话，试一下[Phantom Limb](http://www.vodori.com/blog/phantom-limb.html)，该程序在网页上模拟触摸事件并提供一只巨手来引导。

另外还有[Touchable](https://github.com/dotmaster/Touchable-jQuery-Plugin)这一jQuery插件，该插件跨平台地统一了触摸和鼠标事件。

多点触摸事件

为了能够让你的多点触摸web应用在你的浏览器或是多点触摸控板（比如说Apple MacBook或是MagicPad）上起作用，我创建了这一个[MagicTouch.js填充工具](http://github.com/borismus/MagicTouch)，其捕捉来自触控板的触摸事件，然后把它们转换成标准兼容的触摸事件。

1\. 下载[npTuioClient NPAPI插件](https://github.com/fajran/npTuioClient)并把它安装到~/Library/Internet Plug-Ins/目录下。

2\. 下载这一Mac MagicPad的[TongSeng TUIO应用](https://github.com/fajran/tongseng)并启动这一服务器。

3\. 下载[MagicTouch.js](http://github.com/borismus/MagicTouch)这一javascript库来基于npTuioClient回调模拟规范兼容的触摸事件。

4\. 以如下方式把magictouch.js脚本和npTuioClient插件包含到你的应用中：

```html
<head>
...
<script src="/path/to/magictouch.js"></script>
</head>

<body>
...
<object id="tuio" type="application/x-tuio" style="width: 0px; height: 0px;">
Touch input plugin failed to load!
</object>
</body>

我只在Chrome 10上测试了这一方法，不过只要稍做调整它应该能够在其他的现代浏览器上工作。

如果你的计算机没有多点触摸输入的话，你可以使用其他的TUIO跟踪器，比如说[reacTIVision](http://reactivision.sourceforge.net/)来模拟触摸事件。欲了解更多信息，请参阅[TUIO项目页面](http://www.tuio.org/)。

需要注意的一点是，你的手势可以是和OS层面的多点触摸手势相同的。在OS X上，你可以通过进入System Preferences中的Trackpad偏好设定版面来配置系统范围的事件。

随着多点触摸功能逐渐得到跨移动浏览器的的广泛支持，我非常高兴地看到新的web应用充分利用了这一丰富的API。