---
title: Bower支持Packages多版本共存
tags:
  - bower
id: 1265
categories:
  - 技术
date: 2014-09-22 23:35:36
thumbnail: //res.luozhihua.com/static/images/thumbs/bower-api.png?imageView2/1/w/345/h/163
---

![](//res.luozhihua.com/static/images/thumbs/bower-api.png)

Bower是一个Javascript包管理工具，能统一管理前端Javascript依赖，简单方便，于是，我在试用了几天后打算在公司的项目上采用Bower，公司的产品非常多，多达150个应用里面各种Javascript库和框架都有，急切需要一个包管理工具来集中管理第三方的库和框架，但在实施过程中碰到一个问题，我需要同时依赖不同版本的jQuery，但是Bower似乎不允许我这样做，这曾一度让我想放弃Bower。<!--more-->

我们的很多应用是几年前开发的，使用的jquery版本很旧，甚至有1.4的，替换成更高的jQuery版本后出现很多问题，修改代码的成本非常高，而且我们根本就没有多余的时间来重构一些很古老的应用，在这种情况下，似乎依赖多个版本的jQuery相对来说是一个不（tui）错(er)的(qiu)方(qi)案(ci)，但是我在安装完jQuery v1.7.0后再安装jQuery v2.1.1，Bower总是要求我二选一，非常令我纠结。

除了jQuery还有font-awesome，同样有多版本依赖的需求，PC端的应用必须兼容IE7以上浏览器，所以以前有部分应用使用了font-awesome v3.2.1，而现在我们正越来越多的开发移动端的应用，移动端大部分已经使用了font-awesome v4.2.0，而font-awesome官方已经明确表明v4.2.0不再支持IE7, 因此同样需要依赖两个不同的版本。

今天去检查了一下几天前我在github/bower上提的问题，有了[@sheerun](https://github.com/sheerun) 的回复，确认有方法解决时我瞬间感到欣喜若狂，立刻修改配置开始测试，结果终于可以一个package同时存在多个版本了，下面是[@sheerun](https://github.com/sheerun) 给出的解决方案（修改项目根目录的bower.json文件内的dependencies即可）：
> [@luozhihua](https://github.com/luozhihua) Actually you can do something like:
> 
>     {
>     	"dependencies": {
>     	"font-awesome": "~4.2.0",
>     	"font-awesome-old": "font-awesome#3.2.1"
>       }
>     }`</pre>
    后来又仔细的查看了bower官方文档，发现里面已经有了对应的安装方法，可能是我以前没注意到， [官方安装方法(英文)](http://bower.io/docs/api/#install)，下面我把常用的几种安装方法说一下：

1.  基于bower.json安装
    <pre>`#基于bower.json安装
    bower install [&lt;options&gt;]
    `</pre>
2.  安装指定的package， 比如一次性安装jquery, bootstrap, underscore：
    <pre>`# jquery, bootstrap, underscore
    bower install jquery bootstrap underscore [&lt;options&gt;]
    `</pre>
3.  安装指定版本的package, 比如安装jquery v1.9.0:
    <pre>`#安装jquery v1.9.0
    bower install jquery#1.9.0 [&lt;options&gt;]
    `</pre>
4.  同时安装一个package的不同版本（多版本共存）, 比如安装jquery v1.7.0，并且安装v1.9.1以及最新版本的jquery（目前是2.1.1）， 像下面这样安装完成后，你的bower_components目录下就会同时存在jquery-older目录(1.7.0)， jquery-old目录（1.9.1）, jquery目录（最新版）。
    <pre>`# 安装jquery v1.7.0
    bower install jquery-older=juqery#1.7.0 [&lt;options&gt;]
    # 继续安装jquery v1.9.0
    bower install jquery-old=juqery#1.9.1 [&lt;options&gt;]
    # 最后安装最新版的jquery，目前最新版是 v2.1.1
    bower install jquery [&lt;options&gt;]
    `</pre>
    上面的脚本中的安装选项&lt;options&gt;有以下几个可选项([官方说明](http://bower.io/docs/api/#install-options))：
    <pre>`
    -F, --force-latest # 安装时若有冲突则强制安装最新版；
    -p, --production # 不要安装开发依赖的package（一般用于生产环境）；
    -S, --save # 安装完成后将此package记录在bower.json文件的dependencies项中；
    -D, --save-dev # 安装完成后将此package记录在bower.json文件的devDependencies项中(一般用于开发环境)；
