---
title: PHP实现计划任务
tags:
  - PHP
id: 168
categories:
  - 笔记
date: 2010-09-09 23:30:54
---

原文：[http://www.linuxdiyf.com/viewarticle.php?id=103589](http://www.linuxdiyf.com/viewarticle.php?id=103589)

函数-ignore_user_abort，这个函数可以帮助我们实现像linux中的cron一样实现计划任务，下面一起来看下该如何来实现。

首先看下php手册对这个函数的解释

Description
int ignore_user_abort ([ bool $setting ] )
Sets whether a client disconnect should cause a script to be aborted.

也就是说无论客户端是否关闭浏览器，下面的程序都会执行.

再看下其参数

Parameters

setting
If not set, the function will only return the current setting.

这个函数接受一个参数，来决定是否启用ignore_user_abort的功能。

再看其返回值：

Return Values
Returns the previous setting, as a boolean.

这里说返回前一次的设置，并且是bool值得，经过我的测试，这个说法是不对的，返回的明明是int型的，不相信的话大家可以写一个php文件来测试下。

说了这么多了，到底该如何用php的这个函数实现计划任务呢？还跌借助另外一个函数，这个函数是set_time_limit，通过  set_time_limit0)可以设置程序的执行时间为无限制，php默认的执行时间是30秒，通过set_time_limit(0)可以让程序无   限制的执行下去。在程序执行之前加上ignore_user_abort（1）和set_time_limit(0)即可以了，最终程序该如何写呢？给大家一个例子。

**QUOTE:**

```php
ignore_user_abort(); // run script in background
set_time_limit(0); // run script forever
$interval=60*15; // do every 15 minutes...

do{
    //    add the script that has to be ran every 15 minutes here
    //   ...
    sleep($interval); // wait 15 minutes
} while (true);
```
