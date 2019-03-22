---
title: 基于IIS的phpMyAdmin 无法登录的解决方法
tags:
  - PHP
id: 184
categories:
  - 笔记
date: 2010-09-09 23:43:20
---

如果phpMyAdmin在Apache下可以登录而IIS下不能登录，那么这是由于IIS不能写入Cookies(Session)导致的，请检查php.ini的配置：

1\. 找到php.ini里面的`session.save_path:D:\php5\temp`;
2\. 如果这里指定的路径不存在，必须新建一个“temp”目录（目录名和路径自定义即可，只要保证可读写就行）
3\. 如果目录已经存在，点击右键》属性》安全，给IIS_IUSRS用户添加读写权限，如果没有该用户则添加该用户