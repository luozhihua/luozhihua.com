---
title: 从Jquery Grid ( jqGrid )谈前端框架设计
tags:
  - jQuery
id: 186
date: 2010-09-09 23:44:13
---

原文：[http://www.blogjava.net/OneEyeWolf/archive/2008/08/20/223077.html?opt=admin](http://www.blogjava.net/OneEyeWolf/archive/2008/08/20/223077.html?opt=admin)

设计框架，和使用第三方框架，都基于一个很朴素的目的，Productivity.

首先就要思考的是什么造成了开发效率的低下：

1）重复

2）繁琐、耗时

3）复杂度太高

4）容易出错，不统一，难以维护

解决问题的手段就是：

1）封装
通过不断的封装，信息隐藏，降低复杂度。

2）重用
通过重用，来降低工作量，提高代码质量。

3) 分离
将不稳定的，可变的、同稳定，很少变化的部分分离出来，减少需求变化的冲击。

所以第一步，要分析问题域，去结构化它，然后一条一条的解决：
1）不复杂，但是重复、繁琐

2）复杂，而且重复。

无论怎样都是要命的，都要去设计者尽量去解决。

以前端页面开发为例，我们在前端开发当中，都会遇到一个看似通用的工作，分页查询和表格表现。

这是一个重复、繁琐、耗时的工作，但是不复杂，人人都会做，但要命的是，每个人的做法都不一样，所以造成了不统一、不一致。

分析问题的过程，是一个结构化的过程。我们可以对Grid的工作，做一个结构化的分析，可以将繁琐的问题，变成清晰的结构。

1）分页操作：next, prev, last, first, go to, 自定义显示行数，总页数，总条数，总

2）分页参数传送与状态保持：POST、GET、AJAX

3）斑马条

4）事件: load, mouse over, click

5) 列操作：sort(服务器端排序、客户端排序)、 resize column, 自定义显示列。

6) 行操作：add row, delete row, edit row, select, muliselect, edit, query,

7）数据传输： json, xml, array,

8) 高级功能：subgrid, master/detail 多表关联

9）扩展：Call back function.

10）布局与风格统一：Theme的设计，Caption, title, 查询区，数据区，按钮区

Jquery Grid (jgGrid) 相对比较好的，解决了这些问题，但框架毕竟是框架，

没有最完美的，只有相对合适的，使用者需要分析知道自己的问题在那里，然后去设计开发、使用合适第三方的框架，或直接使用、或二次封装、开发、修改源代码，来解决自己的问题，总之，不要做一个问题的抱怨者，等着别人煮米下锅。

点这里，可以下载 JqGrid [JQuery Grid](http://www.blogjava.net/Files/OneEyeWolf/jqGrid-3.2.zip) 可惜的是里面没有Demo, 以后我会补充一个比较丰富的Demo进去。

[JQuery Grid 的文档下载](http://www.secondpersonplural.ca/jqgriddocs/index.htm)

网址是（可能需要代理)：
[http://trirand.com/jqgrid/jqgrid.html](http://trirand.com/jqgrid/jqgrid.html)
