---
title: 深入了解iPad上的MouseEvent
id: 943
categories:
  - 技术
date: 2012-03-17 17:08:34
tags:
---

iPad上没有鼠标，所以手指在触发触摸事件（TouchEvent）的时候，系统也会产生出模拟的鼠标事件（MouseEvent）。

这对于普通网页的浏览需求而言，基本可以做到与PC端浏览器无明显差异。但是如果你正在做一款与用户有着强交互的WebAPP程序，比如一个html5小游戏或者图片处理工具什么的，那么依赖默认模拟恐怕不能满足产品的需求。

一个通常的建议是：在iPad上(或者说各个移动终端上)，你的WebAPP应该能处理好TouchEvent，而不再依赖于MouseEvent。

然而如果你的WebAPP需要同时面向PC和iPad两种平台的浏览器用户，而迫于时间或者人力配备你没法分别提供两种版本的时候。。。你也许有必要了解一下下面这些有关iPad上MouseEvent相关的细节，然后砍掉两个平台上有明显差异的一些花哨特性，这样才能做出一个较好地兼容两个平台的WebAPP。<!--more-->

在阅读下文前，我假设你已经熟悉PC浏览器上MouseEvent的运作，也对TouchEvent有了粗略的了解。如果你并不了解，那理解以下各个细节可能有困难。

safari只对可点击(clickable)的HTML元素才会产生MouseEvent。这在ADC文档中也提到了。
什么叫可点击，ADC文档定义是只要HTML元素响应mousemove、mousedown、mouseup、click四种MouseEvent中的一个就算是可点击。如果你有个网页菜单只响应mouseover、mouseout，那可能不能工作，加个onclick="void(0)"就行了。但实际测试发现，只要响应任意一个MouseEvent就算可点击了，估计safari已修正此问题。
注意：下文所有关于“可点击”“不可点击”的描述都是针对是否响应MouseEvent而言，而不是指TouchEvent。

与W3C规范建议的不同，iPad是在手指离开屏幕以后才可能会产生MouseEvent。所以像手指单击屏幕这种操作的实际事件序列通常是： touchstart-&gt;touchend-&gt;mousemove-&gt;mousedown-&gt;mouseup-&gt;click；而不是我们期望的这样的时序：touchstart-&gt;mousedown-&gt;touchend-&gt;mouseup-&gt;click。

手指快速单击屏幕触发的MouseEvent并不是紧跟在TouchEvent之后的，有一个时延。这是为了等待可能的双击操作。iPad2 Safari的实测时延大约为375ms。所以实际时序大约是这样的：(手指按下)touchstart-&gt;(手指快速提起)touchend-&gt;(等待约375ms)mousemove-&gt;mousedown-&gt;mouseup-&gt;click。

这对WebAPP的直接影响就是由于从用户操作完（手指提起）到onclick执行有375ms的延时，用户总觉得你的软件反应有点慢半拍。

但如果单击速度较慢，即手指按下到提起之间的时延超过大约120ms，touchend到其他MouseEvent之间就不再会有这个375ms的时延。因为系统认为这已经不满足手指快速双击操作的判定条件。

手指快速双击屏幕操作不会触发任何MouseEvent。我是说“任何”，就是说不光不会触发dblclick事件，连mousedown、mouseup、click等等所有MouseEvent都不会有。本操作默认的事件流是：touchstart-&gt;touchend-&gt;touchstart-&gt;touchend。如果页面开发人员不做任何限制，浏览器默认行为是尝试缩放网页。
一次手指单击操作不会同时产生mouseover和(mousedown、mouseup、click)两组事件。如果一个响应mouseover事件的元素从渲染完毕或者上一次收到mouseout之后尚未收到mouseover事件，则单击触发的事件流为：touchstart-&gt;touchend-&gt;mouseover-&gt;mousemove；反之，单击触发的事件流为：touchstart-&gt;touchend-&gt;mousemove-&gt;mousedown-&gt;mouseup-&gt;click。
不响应mouseover事件的元素只会收到上述后一种事件流，这避免绝大多数链接需要手指点击两次才能跳转页面。

一个HTML元素收到mouseover之后，只有在手指点击另一个可点击的HTML元素时，才会收到mouseout事件。因为没有鼠标，所以不能像PC机上一样在鼠标移入移除元素区域时触发mouseover和mouseout事件，只能靠手指点击来切换mouseover；又因为不可点击的元素不会触发任何MouseEvent，所以只有在另一个HTML元素上触发MouseEvent时前一个可点击元素才会收到mouseout事件。

手指在屏幕上移动，不会触发大量的mousemove事件。如第2点所说，只有在手指离开屏幕时，才可能产生MouseEvent消息，所以你只可能收到一次mousemove事件，包括本次操作触发的其他所有MouseEvent，坐标都是手指提起位置的坐标。所以在PC浏览器上通过mousemove实现的逻辑，在iPad上需要通过TouchEvent来实现。

实测发现，似乎手指在屏幕上缓慢移动时，提起手指才会触发MouseEvent；如果手指快速移动，则提起手指不会触发任何MouseEvent。原因不明。

如果一个HTML元素响应TouchEvent，手指在该元素上按下并移动，即使手指移出该元素的区域，该元素仍然会收到touchmove事件，直到手指提起收到一个touchend结束。也就是说一个HTML元素通常总能收到一个完整的 touchstart-&gt;(N个)touchmove-&gt;touchend事件序列，除非系统给它发出一个touchcancel事件。这跟PC浏览器上MouseEvent特性也不太相同。

一旦在一次手指操作的事件序列touchstart-&gt;(0-N个)touchmove-&gt;touchend中的任何一个事件函数里调用了event.preventDefault()，本次操作不再产生任何MouseEvent。所以不能期望在touchstart中调用preventDefault只阻止mousedown事件的产生。

以上各个特性在iPad2/iOS4.3.3的safari上测试验证过，对于其他safari内核的浏览器(如QQ浏览器HD等)都是适用的。

至于其他非safari内核的浏览器，在MouseEvent的支持上基本都不如safari完整和合理。例如Opera Mini只有手指单击屏幕时产生MouseEvent，并且不支持TouchEvent；UC浏览器虽然将mousedown移到了touchstart之后，但是手指移动后提起来却不能产生mouseup事件。有兴趣的可以做进一步测试。Android用户也可以在Android平板电脑上做一些测试，如果能将测试结果分享给我，我将非常感谢。

【**附录及参考文档**】

1\. 测试页面链接：http://hokyhu.sinaapp.com/event_test.html
你还可以在这个页面上体验iPad强大的多点触摸功能，试试看最多能检测到几个触点。
2\. W3C关于TouchEvent的技术草案：https://dvcs.w3.org/hg/webevents/raw-file/tip/touchevents.html
该草案主要定义了TouchEvent相关的技术细节，并少量涉及TouchEvent与MouseEvent之间的配合。
3\. ADC文档：https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/SafariWebContent.pdf
文档在“Handling Events”这一章描述了对MouseEvent的支持。