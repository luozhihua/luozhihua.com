---
title: 64位windows7中IIS7的HTTP/1.1 500 服务器错误
tags:
  - '500'
  - IIS
  - Window7
id: 207
categories:
  - 笔记
date: 2010-09-10 00:00:20
---

<span style="color: #ff0000; font-size: large;">把IIS解析ASP(VBscript/Javascirpt)的应用程序池设为32位应用程序后会出现该错误。</span>

如果你要让64位的IIS支持PHP，必须把解析PHP的应用程序池和ASP分离开，并将其设为32位应用程序，否则会出现如下错误：

## _<span style="font-size: x-small;">HTTP 错误 404.17 - Not Found</span>__<span style="font-size: x-small;">
请求的内容似乎是脚本，因而将无法由静态文件处理程序来处理。</span>_

设置方法：<span style="font-size: medium;">**打开应用程序池，选中后点右键–高级设置，将“启动32位应用程序”改为“true”

**</span> 在64位的IIS7的同一网站中不可能同时支持PHP和ASP(.net)，想贪心的朋友可能有点失望，不知道能不能同时为一个网站指定两个应用程序池，这样就好办了