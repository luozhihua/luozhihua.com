---
title: Android 4.0设计规范 优先导读 十大改变 （附全文翻译pdf）
id: 798
categories:
  - 笔记
date: 2012-02-02 14:37:26
tags:
---

<div>

转自CDC:[ http://cdc.tencent.com/?p=5082](http://cdc.tencent.com/?p=5082 "http://cdc.tencent.com/?p=5082")

[![](http://blog.luozhihua.com/wp-content/uploads/2012/02/banner1-21.jpg "banner1-21")](http://blog.luozhihua.com/wp-content/uploads/2012/02/banner1-21.jpg)

在拜读和翻译了Android design设计指导后，对比Android 4.0与Android2.3及之前版本的app设计指导，总结了Android 4.0设计的10大改变。<!--more-->如下：

**1\. 导航栏** (详见模式PATTERNS&gt;导航Navigation)
由之前的物理按键导航（返回、菜单、搜索、主页）变成了嵌入屏幕的虚拟按键（返回、主页、最近任务）。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/114.png)

左侧为早期有4个物理按键的手机，右侧为新版只有3个虚拟按钮的手机

把菜单项和搜索项从导航栏去掉，把之前通过长按主页键才出现的最近任务直接展示在导航栏中。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/23.png)
最近任务的界面
把菜单收起的同时，在软件界面的操作栏上增加了“更多操作”（action overflow），如下图中的黄色圆点所示。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/31.png)
黄色圈部分为“更多操作”（action overflow）的位置和点击后内容的展示方式

**2\. 操作栏** (详见模式PATTERNS&gt;操作栏Action bar)
操作栏从之前的app图标＋操作，变成如下图所示：
1向上＋2 Spinner＋3 重要操作＋4 更多操作。
其中，向上按钮，点击后是去到当前界面的上一个层级，非第一层级界面有此按钮，第一层级界面则无向上按钮；Spinner 是用于展示内容的下拉菜单，其内容包括视图的快速切换和显示相关内容的完整信息；更多操作（action overflow）是集合操作栏中不常用的和非重要操作的地方。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/41.png)
操作栏可以拆分成下图中的1主操作栏、2顶部栏和3底部栏。如果需要，顶部栏可以承载选项卡tabs，底部栏可以承载主要操作和被收起的更多操作（action overflow）。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/51.png)
在空间足够的横向屏幕展示界面时，被拆分的操作栏，可以灵活合并在一起。如下图中的手机端横竖屏操作栏所示。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/61.png)

**3\. 多面板布局** (详见模式PATTERNS&gt;多面板布局Multi-pane layouts)
多面板布局更多的是针对平板电脑，把手机端的目录视图和详情视图两个层级的界面，甚至更多的页面，复合展示在同一个界面中，有效地利用平板电脑的屏幕空间，扁平化层级结构，简化导航。这点在iPad上已经运用得相当娴熟了。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/71.png)

**4\. 选择** (详见模式PATTERNS&gt;选择Selection)
Android4.0中的长按与Android2.3及更早期的版本有很大的不同。早期版本长按操作后，是出现情境菜单的浮出层。在 Android4.0中，长按后在操作栏的位置会覆盖一个临时的情境操作栏，不再弹出情境菜单浮出层。在临时情境操作栏的环境下，当前界面的内容项允许被 单个处理，也允许被批量处理。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/81.png)

长按Android2.3及更早期系统版本的内容项时，出现情境菜单的浮出层。
![](http://cdc.tencent.com/wp-content/uploads/2012/01/91.png)

长按Android4.0系统版本的内容项时，情境菜单栏覆盖在操作栏上。
![](http://cdc.tencent.com/wp-content/uploads/2012/01/101.png)

在情境菜单环境下，支持批量操作。

**5\. 返回和向上** (详见模式PATTERNS&gt;返回和向上Navigation with Back and Up)
返回按键用在手机全局的虚拟导航栏中，基于用户最近查看的界面历史，采用时间倒序的方式，连接界面间的关系。向上按钮用在操作栏的左侧，基于层级结构，点击后是去到当前界面的上一个层级，若当前界面已经是最高一级，则没有向上按钮。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/113.png)![](http://cdc.tencent.com/wp-content/uploads/2012/01/121.png)
黄色部分为点击向上按钮后的页面路径，红色部分为点击返回按钮后的页面路径

**6\. 主题样式** (详见风格STYLE&gt;主题样式Themes)
推出三套默认主题：Holo浅色主题、Holo深色主题、Holo浅色底+深色操作栏主题。主推app在这三套默认主题的基础上做设计，以加快app 研发效率，但只是建议使用，并没有完全强制。视觉设计师们可以重点看下STYLE和BUILDING BLOCKS这两章。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/132.png)

**7\. Widgets** (详见开始吧GET STARTED&gt;UI概览UI Overview)
在原apps页里，用选项卡tabs的方式增加了widgets内容。一改用隐晦方式添加widget的操作和把widgets零散放在桌面呈现的方式。在app设计中，应该提高对widget设计的重视程度。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/141.png)

**8\. 兼容性** (详见模式PATTERNS&gt;兼容性Compatibility)
向后兼容，考虑到物理导航按键手机如何兼容Android 4.0系统和虚拟导航手机如何兼容Android2.3和更早期版本的apps。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/151.png)
在物理导航按键手机上安装android4.0系统，点击物理按键，在屏幕下方出现action overflow的内容。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/161.png)
在新的虚拟导航手机上安装为android2.3及更早版本系统设计的app，会在屏幕下方的虚拟导航的右侧出现action overflow按钮（如上图的黄色部分）。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/171.png)
在新的虚拟导航手机上安装android4.0，点击action overflow后的展示状态如上图。

**9\. 强调纯粹的Android应用设计** (详见模式PATTERNS&gt;纯粹的Android)
在Android4.0 app设计准则中，特别强调为Android设计纯粹的Android app，切勿使用其他平台特定元素的注意事项，有以下5个方面：
（1）强调视觉元素的样式要符合android系统；
（2）不用其它平台特有的图标；
（3）不在界面的下方使用选项卡tabs；
（4）区分向上和返回，不在操作栏上使用返回样式的按钮；
（5）不在内容列表里使用向右箭头。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/181.png)

![](http://cdc.tencent.com/wp-content/uploads/2012/01/191.png)

Android系统里，选项卡（tabs）会固定放在屏幕上方，不会放在下方。这点与ios系统不同。

**10\. 其它细节**
增加许多新的交互细节、信息展示和视觉样式等规范，详细见翻译。其中，有几点在此强调下：
（1）新增了横滑移除内容的交互手势。在部分模块中，支持向左或向右横滑移除内容的操作，如最近任务和消息通知抽屉。

![](http://cdc.tencent.com/wp-content/uploads/2012/01/201.png)
（2）视觉的平面化，栅格风正在4.0中上演。
（3）在writing style中明确指出写wording时，要直接使用第二人称“你”。

原文见[http://developer.android.com/design/index.html](http://developer.android.com/design/index.html)
快速查阅，Android Design全文翻译 下载地址：[http://cdc.tencent.com/?download=Android-Design-4.0](http://cdc.tencent.com/?download=Android-Design-4.0)

Android Design全文翻译由CDC D3多媒体小组（江宁、张云）出品。
感谢您的阅读！

</div>