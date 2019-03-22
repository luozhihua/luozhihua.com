---
title: Sublime Text 2调试NodeJS最方便的方法
tags:
  - NodeJS
  - Sublime Text
id: 1181
categories:
  - 笔记
date: 2013-10-16 12:50:28
---

一个非常好的调试nodejs的Sublime Text 2组件：

# **[NodejsDebug](https://github.com/houfeng0707/NodejsDebug "组件地址")
**

目前支持Windows和Linux系统，使用非常方便，安装完成后直接按快捷键“ctrl+alt+b”，或者在编辑器内点击右键 > nodejs debug便可以启动调试，下面是安装方法<!--more-->

### 要求

*   [NodeJS](http://github.com/ry/node) version &gt;0.6.0
*   [npm](http://github.com/isaacs/npm) ——nodejs包管理器
*   [node-inspector](https://github.com/dannycoates/node-inspector)——调试NodeJS的组件
*   此外，您必须安装一个用于调试的webkit内核的浏览器（Chrome或Safari）

### [](https://github.com/houfeng0707/NodejsDebug#install)安装方法

1.  用npm命令安装全局模式的 node-inspector组件：

    $ `npm install -g node-inspector`

    ps: 如果您在window7或xp下安装node-inspector时遇到问题，可以在这里找到答案：[http://stackoverflow.com/questions/11695739/installing-node-inspector-on-windows](http://stackoverflow.com/questions/11695739/installing-node-inspector-on-windows)
2.  下载**[NodejsDebug](https://github.com/houfeng0707/NodejsDebug "组件地址")**并解压，在您的Sublime Text编辑器的菜单找到“Preferences &gt; Browser packages...”并点击打开，然后将解压好的NodejsDebug复制到刚打开的Packages目录；
3.  进入组件目录(NodejsDebug), 打开 'nodejs_debug.sublime-settings' 文件， 把'chrome_path'的值设置为您的chrome浏览器所在的路径；

### [使用方法](https://github.com/houfeng0707/NodejsDebug#debugging)

1.  打开一个nodejs文件；
2.  按快捷键 **ctrl+alt+b** 或者 点击右键菜单的 '**Nodejs Debug**'
然后会自动打开浏览器并进入调试模式，使用chrome等webkit浏览器调试nodejs代码的方法跟在浏览器调试web页面的js代码完全一样。