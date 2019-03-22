---
title: Ubuntu 14.04安装ruby 2.1.1的方法
tags:
  - gitlab
  - ruby
  - ubuntu
id: 1216
categories:
  - 笔记
date: 2014-05-12 00:30:05
---

为了在ubuntu上安装gitlab，卡在了ruby的安装上，总是报错，找遍了各种论坛和官方文档，整了两天还是没有头绪，今天google无意中发现一篇英文文章：[文章地址](http://blog.blenderbox.com/2014/04/21/installing-ruby-2-1-1-on-ubuntu-14-04-x86_64/)，按照其提供的解决方案，终于搞定了：

<!--more-->

I was trying to install ruby on the newly released Ubuntu 14.04 and I was running into some issues with readline.

The error looked something like

> readline.c:1977:26: error: ‘Function’ undeclared (first use in this function) rl_pre_input_hook = (Function *)readline_pre_input_hook; ^

The solution is to configure ruby with our lib_readline.so

## Install ruby

```shell
    sudo apt-get install openssl libreadline-dev curl zlib1g zlib1g-dev libssl-dev libyaml-dev libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison libcurl4-openssl-dev
```

Grab the source from http://www.ruby-lang.org/en/downloads/

```shell
cd / && mkdir srcs && cd srcs
    wget http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.1.tar.gz
    tar xzfv ruby-2.1.1.tar.gz
    cd ruby-2.1.1
    ./configure –with-readline-dir=/usr/lib/x86_64-linux-gnu/libreadline.so
    sudo make &amp;&amp; sudo make install
```
NOTE: make sure the ./configure – -with-readline-dir has two dashes. For some reason WP is stripping that.