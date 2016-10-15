---
title: Javascript事件委托
id: 1208
categories:
  - 技术
date: 2014-05-06 13:31:18
tags:
---

事件委托对于web应用程序的性能有如下几个优点：

> 1.需要管理的函数变少了
> 2.占用的内存少了
> 3.javascript代码和Dom结构之间的关联更少了
> 4.在改变DOM结构中的innerHTML时，不需要改动事件处理函数
<!--more-->

原文：http://younglab.blog.51cto.com/416652/274132

### 传统的事件处理

事件委托就是在一个页面上使用一个事件来管理多种类型的事件。这并不是一个新的想法，但对于把握性能来说却很重要。通常情况，你会在web应用程序中看到这样的代码：

```javascript
document.getElementById("help-btn").onclick = function(event){ openHelp(); };
document.getElementById("save-btn").onclick = function(event){ saveDocument(); };
document.getElementById("undo-btn").onclick = function(event){ undoChanges(); };
```

这种传统的编码方式给每个元素分配单独的事件处理方法。对于交互少的站点来说，这样做是可以的。然而，对于大型的wen应用程序，当存在大量的事件处理的时候，就会显得反应迟钝。这里要关注的不是速度问题，而是内存占用问题。如果有数百个交互，DOM元素和JavaScript代码就会有数百个关联。web应用需要占用的内存越多，它的响应速度就越慢。事件委托能将这个问题减小。

### 事件冒泡及捕获

要不是事件的下面这些属性，事件委托将成为可能。早期的web开发，浏览器厂商很难回答一个哲学上的问题：当你在页面上的一个区域点击时，你真正感兴趣的是哪个元素。这个问题带来了交互的定义。在一个元素的界限内点击，显得有点含糊。毕竟，在一个元素上的点击同时也发生在另一个元素的界限内。例如单击一个按钮。你实际上点击了按钮区域、body元素的区域以及html元素的区域。

伴随着这个问题，两种主流的浏览器Netscape和IE有不同的解决方案。Netscape定义了一种叫做事件捕获的处理方法，事件首先发生在DOM树的最高层对象(document)然后往最深层的元素传播。在图例中，事件捕获首先发生在document上，然后是html元素，body元素，最后是button元素。
IE的处理方法正好相反。他们定义了一种叫事件冒泡的方法。事件冒泡认为事件促发的最深层元素首先接收事件。然后是它的父元素，依次向上，知道document对象最终接收到事件。尽管相对于html元素来说，document没有独立的视觉表现，他仍然是html元素的父元素并且事件能冒泡到document元素。所以图例中噢噢那个button元素先接收事件，然后是body、html最后是document。

在定义DOM的时候,W3C显然看到了这两种方案各自的优点，所以DOM Level 2的事件规范中同时定义了这两种方案。首先document元素获得事件，然后捕获阶段向与事件最相关的元素传播，当事件被此元素捕获后，再冒泡到document元素。addEventListener()方法接受三个参数：事件名，事件处理函数，一个用于指定事件在捕获阶段处理还是在冒泡阶段处理的布尔值。大部分的web开发者都会使用false作为第三个参数这样就跟IE中的attachEvent()一样了。

```javascript
//bubbling phase handler
document.addEventListener("click", handleClick, false);
//capturing phase handler
document.addEventListener("click", handleClick, true);
```

### 通过冒泡实现事件委托

事件委托的关键就是在通过冒泡方式实现在最高层(通常是document)处理事件。不是所有的事件都支持冒泡，但是鼠标和键盘事件支持，并且这也是你所关心的。回顾下前面的例子，你可以通过在document上分配一个事件来处理所有的单击事件，只需要通过区别节点来决定处理事件的方法。

```javascript
document.onclick = function(event) {
    //IE doesn't pass in the event object
    event = event || window.event;

    //IE uses srcElement as the target
    var target = event.target || event.srcElement,
        id = target.id;

    switch (id) {
        case "help-btn":
            openHelp();
            break;
        case "save-btn":
            saveDocument();
            break;
        case "undo-btn":
            undoChanges();
            break;
        //others?
    }
};
```

使用事件委托，数个事件处理函数可以使用一个函数来管理。所有的单击事件被委托给一个合适的函数来处理。同样，mousedown, mouseup, mousemove, mouseover, mouseout, dblclick, keyup, keydown, 和keypress事件也可以这样处理。但是，在事件委托中mouseover和mouseout的处理方法是不同的，当鼠标从一个元素移动到它的子元素内的时候，被认为是"out"。

注意：你也可以使用事件捕获来完成事件委托，但这只能用在支持事件捕获的非IE浏览器中。

### 优点

事件委托对于web应用程序的性能有如下几个优点：

1.需要管理的函数变少了
2.占用的内存少了
3.javascript代码和Dom结构之间的关联更少了
4.在改变DOM结构中的innerHTML时，不需要改动事件处理函数

从传统的事件处理方法转向事件委托提高了大型web应用的性能。正因为它如此的重要，一些类似于YUI、jQuey的javascript库也开始将事件委托应用在它们的核心接口中。实现事件委托是很轻松的，却能带来性能上很大的提高。尤其表现在你将数十个事件处理函数整合到一个函数里。试一下事件委托，你就不会再使用传统的事件处理方法了。