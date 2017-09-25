---
title: Magic Scenes项目整理
layout: post
categories: 项目
comments: true
description: ''
date: 2016-10-14 16:24:01
updated: 2016-10-14 16:24:01
tags:
thumbnail: //res.luozhihua.com/static/images/magicscene/0.jpg?imageView2/1/w/345/h/163
banner:
---

{% cdnres static/images/magicscene/0.jpg title:MagicScenes项目 alt:MagicScenes项目 'class:class1 class2' %}

这是我在[魔窗](http://www.magicwindow.cn)的第一个项目，是一个在线制作H5场景应用的工具，为魔窗的活动运营服务的宣传和推广提供辅助支持，制作好的H5场景应用可以投放在APP内，也可以通过微信、QQ等社交媒体分享给更多的人，再通过功能按钮下载App或回流，不幸的是由于时间和人员紧缺，要优化的细节和用户提出的各种新需求需要花大量的时间成本来维护和迭代，而其他核心项目却面临没人开发的尴尬局面，这个项目投入使用一段时间后被停止了，继而改为使用第三方的H5制作工具[云来](http://www.liveapp.cn/)，而我把主要精力转移到魔窗的[H5活动](http://www.magicwindow.cn/operation.html)、[SDK](http://www.magicwindow.cn/download.html)、[Deeplink](http://www.magicwindow.cn/deeplink.html)等与业务核心相关的研发工作。

从项目启动一直到产品初现雏形，除了一名后端工程师负责协助开发API外，一直没有产品经理和设计师来负责相关的工作，因此从界面设计、功能规划以及前端技术选型、架构搭建和编码都是我一个人苦撑着，为了减少界面设计和产品交互设计等工作，选用了[Angular 1.3.15](https://angularjs.org/)(当时的最新版本)作为主框架，界面交互选用了[Angular Material](https://material.angularjs.org/)UI库，正式因为Angular Material的应用，不仅节省了大量在UI设计、交互设计方面的工作，而且最终的UI风格和交互整体看上去十分简洁大气、时尚美观，交互体验也非常不错。

{% blockquote 百度百科 http://baike.baidu.com/link?url=hY92tKEovI8mvsfLbFuUQgBaIW5-RXPkz99T0QKFk2rLERUH6WuH2_zI7KZ3bDHBaVN8MOytmfhoLwtHbvAOWCNbaZ8vEAQCyEEQpRLuuJO %}
Material Design，中文名：质感设计，是由Google推出了全新的设计语言，谷歌表示，这种设计语言旨在为手机、平板电脑、台式机和“其他平台”提供更一致、更广泛的“外观和感觉”。
{% endblockquote %}

因为这是一个移动端简单的类似PPT的工具，用户在使用过程中会产生大量的素材图片、背景图片、音频和视频，所以，用户上传的所有静态资源文件、素材和音频视频全部使用七牛托管，这避免了大量的SA运维工作量；制作好的场景应用全部生成静态HTML文件，使用Nginx提供简单的浏览服务，并对静态的HTML文件使用CDN分发来应对分享到朋友圈和QQ等社交媒体后产生的大量并发访问。

工具类的产品界面交互一般都比较复杂，需要良好的规划功能和代码架构设计，否则，随着功能增多、项目维护会变得越来越繁琐，为了给用户提供简单有效的交互体验并且尽可能清晰的组织代码结构，我把需要往场景内插入素材和各种组件的功能全部做成小工具，排列在界面顶部的工具栏，对画布中已插入的组件样式编辑、动画设置等功能作为小面板，排列在场景画布的右边，右击画布中的每一个组件都能快速打开编辑面板，可以快速的设置每一个组件的尺寸、背景颜色、透明度、文字样式和颜色、边距、边框样式、背景、圆角、阴影、旋转角度，切换到动画标签页可以快速给每一个组件设置入场动画、退场动画，包括（动画类似、动画延迟和持续时间、动画过程效果、循环次数等）； 画布左边则是页面列表，能快速切换页面、重命名页面、复制克隆页面；界面正中间是画布，画布内每一个组件可以进行自由拖动排列、层次调整、大小调整、复制粘贴和直接克隆；

下面贴一些界面的截图：

{% cdnres static/images/magicscene/1.jpg title:场景第一页 alt:场景第一页 'class:class1 class2' %}


{% cdnres static/images/magicscene/2.jpg title:场景第二页 alt:场景第二页 'class:class1 class2' %}


{% cdnres static/images/magicscene/3.jpg title:场景第三页 alt:场景第三页 'class:class1 class2' %}


{% cdnres static/images/magicscene/4.jpg title:画布内组件的功能菜单 alt:画布内组件的功能菜单 'class:class1 class2' %}


{% cdnres static/images/magicscene/5.jpg title:组件样式编辑面板 alt:组件样式编辑面板 'class:class1 class2' %}


{% cdnres static/images/magicscene/6.jpg title:组件边框编辑面板 alt:组件边框编辑面板 'class:class1 class2' %}


{% cdnres static/images/magicscene/7.jpg title:组件动画编辑面板 alt:组件动画编辑面板 'class:class1 class2' %}


{% cdnres static/images/magicscene/8.jpg title:图片素材管理和选择器 alt:图片素材管理和选择器 'class:class1 class2' %}


{% cdnres static/images/magicscene/9.jpg title:图片批量上传工具 alt:图片批量上传工具 'class:class1 class2' %}


{% cdnres static/images/magicscene/10.jpg title:页面背景图片和背景颜色管理器 alt:页面背景图片和背景颜色管理器 'class:class1 class2' %}


{% cdnres static/images/magicscene/11.jpg title:背景音乐管理器 alt:背景音乐管理器 'class:class1 class2' %}


{% cdnres static/images/magicscene/12.jpg title:输入组件编辑器 alt:输入组件编辑器 'class:class1 class2' %}


{% cdnres static/images/magicscene/13.jpg title:功能按钮编辑器 alt:功能按钮编辑器 'class:class1 class2' %}


{% cdnres static/images/magicscene/14.jpg title:场景预览和发布 alt:场景预览和发布 'class:class1 class2' %}


{% cdnres static/images/magicscene/15.jpg title:发布成功提示框 alt:发布成功提示框 'class:class1 class2' %}

