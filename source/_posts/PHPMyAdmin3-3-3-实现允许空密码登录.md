---
title: PHPMyAdmin3.3.3 实现允许空密码登录
id: 151
categories:
  - 笔记
date: 2010-09-09 23:12:32
tags:
---

打开PHPMyAdmin根目录下的config.inc.php

找到：`$cfg['Servers'][$i]['AllowNoPassword'] = false;`
把后面的false改为true

如果找不到这一行那就加上吧：`$cfg['Servers'][$i]['AllowNoPassword'] = true;`

这好像与其他版本的配置有些不同，以前用的3.1.4的配置是：
`$cfg['Servers'][$i]['AllowNoPasswordRoot'] = true;`