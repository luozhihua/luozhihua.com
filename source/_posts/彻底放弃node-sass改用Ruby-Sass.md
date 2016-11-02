---
title: 彻底放弃node-sass改用Ruby Sass
layout: post
categories: 技术
comments: true
description: ''
date: 2016-10-13 13:28:39
updated: 2016-10-13 13:28:39
tags:
    - sass
thumbnail: http://oezzzs8eh.bkt.clouddn.com/static/images/thumbs/no-node-sass.jpg?imageView2/1/w/345/h/163
banner:
---

<!-- toc -->

[Sass](http://sass-lang.com)、[Less](http://lesscss.org/)、[Stylus](http://stylus-lang.com/)等CSS预处理器的出现大大的提升了CSS的开发速度和代码可读性，相对来说[Sass](http://sass-lang.com)功能更全面、使用的更广泛，之前好几个项目我都用了[Sass](http://sass-lang.com)，刚一开始我本机用着都一切安好，后来慢慢的发现不少问题。

编译[Sass](http://sass-lang.com)的工具我选了用于[Grunt](http://gruntjs.com/)的[grunt-sass](https://www.npmjs.com/package/grunt-sass)和用于[Webpack](https://webpack.github.io/)的[sass-loader](https://www.npmjs.com/package/sass-loader)，这样可以避免单独配置[Ruby](https://www.ruby-lang.org/)和ruby-sass，但是我一直没察觉这为后面埋下了无数个地雷，每一次迁移环境或者给新同事搭建环境时，都会遇到node-sass安装失败，刚开始连VPN就好了，后来Node的版本升级越来越频繁，每一次更换Node版本都需要执行`npm rebuild node-sass`重新编译`node-sass`, 再后来，团队使用Jenkins自动化部署时同样的问题再次出现，Jenkins服务器不可能为了安装个node-sass单独连VPN，于是只能寻找解决方法。

仔细看了[NPM](https://www.npmjs.com/)上了两个类似的库的说明文档：[grunt-sass](https://www.npmjs.com/package/grunt-sass)和[grunt-contrib-sass](https://www.npmjs.com/package/grunt-contrib-sass), 对比了`grunt-sass`和`grunt-contrib-sass`后，决定改用后者，下面是我的一些对比结果

*grunt-sass:*

1. 依赖`node-sass`库，不需要另外安装[Ruby](https://www.ruby-lang.org/)和Sass编译工具；
2. 安装时需要翻墙；
3. 每次更新Node版本时，需要重新编译`node-sass`(喜欢使用nvm的同学简直了);

*grunt-contrib-sass*:

1. 依赖 [Ruby](https://www.ruby-lang.org/)和`ruby-sass`，（配置一劳永逸）;
2. 有时候`gem install sass`安装时有点慢，但使用[淘宝的RubyGems镜像](https://ruby.taobao.org/)可以改善；

而Webpack的用户同样有一些替代的Loader可以使用，一般都直接使用[sass-loader](https://www.npmjs.com/package/sass-loader)，如果你同样遇到我所遇到的那些问题，并且感到深深的不爽，那么可以试试用这两个库：

1. [sass-loader-china](https://www.npmjs.com/package/sass-loader-china)：据说是专为国情优化过的；
2. [ruby-sass-loader](https://www.npmjs.com/package/ruby-sass-loader)：这是一个使用原生Ruby和ruby-sass的Loader, 需要先配置Ruby环境并安装ruby-sass;

# 大概步骤

## Grunt

1. 卸载*grunt-sass*: `cd ${YourProjectDir} && npm uninstall grunt-sass --save-dev`;
2. 安装*Ruby*: Mac已经自带了Ruby, Linux和Windows请自行Google;
3. 安装*ruby-sass*: `gem install sass`, 如果Mac或Linux有遇到权限错误，请使用`sudo gem install sass`安装；
4. 安装*grunt-contrib-sass*: `npm install grunt-contrib-sass`;
5. 已完成，Gruntfile中Sass任务的配置不用修改，两个库的配置属性是一样的；

## Webpack
1. 卸载*sass-loader*: `npm uninstall sass-loader --save-dev`;
2. 安装*Ruby*: Mac已经自带了Ruby, Linux和Windows请自行Google;
3. 安装*ruby-sass*: `gem install sass`, 如果Mac或Linux有遇到权限错误，请使用`sudo gem install sass`安装；
4. 安装[sass-loader-china](https://www.npmjs.com/package/sass-loader-china)或[ruby-sass-loader](https://www.npmjs.com/package/ruby-sass-loader)，这两个根据你自己的爱好任选其一;
5. 根据步骤4选择的Loader, 对于的修改您项目中`webpack.config.js`的sass-loader的配置；