---
title: 64位 Windows7 IIS下32位和64位模式切换方法
tags:
  - Windows7
id: 167
categories:
  - 笔记
date: 2010-09-09 23:29:35
---

<span style="font-size: small;">
</span><span style="color: #38761d; font-size: small;">启用 32 位模式</span><span style="font-size: small;">：
cscript %SYSTEMDRIVE%\inetpub\adminscripts\adsutil.vbs SET  W3SVC/AppPools/Enable32bitAppOnWin64 1

</span> <span style="color: #ff0000; font-size: small;"><span style="color: #ff9900;">禁用 32 位模式</span>：</span><span style="font-size: small;">
cscript %SYSTEMDRIVE%\inetpub\adminscripts\adsutil.vbs SET  W3SVC/AppPools/Enable32bitAppOnWin64 0 </span>