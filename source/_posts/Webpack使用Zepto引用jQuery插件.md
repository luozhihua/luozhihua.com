---
title: Webpack使用Zepto引用jQuery插件
layout: post
categories: 技术
comments: true
thumbnail: //res.luozhihua.com/static/images/thumbs/webpack.png?imageView2/1/w/345/h/163
description: '使用Webpack打包一个Web项目时，项目使用了Zepto，在不使用jQuery时如何保障jQuery插件中require("jquery")不会抛出Module Not Found的错误？'
date: 2017-01-08 15:40:35
updated: 2017-01-08 15:40:35
tags: 
    - Webpack
    - Zepto
    - jQuery
banner:
---

因为Zepto体积小，有很多移动端项目使用Zepto代替了jQuery, 最近使用Webpack打包一个Web项目，项目使用了Zepto，同时有引用了jQuery插件，部分jQuery插件内部使用了AMD的`require('jquery')`写法引入jQuery，一般情况下这样没有问题，但是Webpack打包时就会出现无法找到`jquery`模块的错误：

```
Module not found: Error: Cannot resolve module 'jquery' in /Users/colin/Projects/xxx/xxx.js
```

因为已经使用了Zepto，肯定不能另外再使用jQuery，所以必须告诉Webpack如何找到`jquery`模块，因为Zepto的API与jQuery的API基本一致，理论上只要把jquery软链接到zepto就行了，那么问题来了，Webpack如何做这个软链接呢？

1. 使用`resolve.alias`

Webpack提供了alias配置，可以直接把`jquery`链接到`Zepto`库：

```javascript
// webpack.config.js
{
    entry: {
        main: "./main"
    },
    output: {
        filename: "[name].[chunkhash:8].js"
    },
    resolve: {
        alias: {
            jquery: 'path/to/zepto.js' // 把jquery指向Zepto.js
        }
    }
}
```

2. 使用`expose-loader`和`externals`

`externals`的目的是让Webpack直接从全局变量中读取对应的组件，这里我们要读取的是Zepto，但是Webpack默认不会把Zepto暴露为全局变量，即不能通过window.Zepto访问到Zepto，所以首先要把Zepto暴露为全局组件，然后通过webpack的配置项`externals`将`jquery`指向`window.Zepto`全局变量：

```javascript
// webpack.config.js
{
    entry: {
        main: "./main"
    },
    output: {
        filename: "[name].[chunkhash:8].js"
    },
    module: {
        loaders: [
            // 暴露zepto为全局变量：Zepto
            {test: require.resolve("zepto"), loader: "expose-loader?Zepto" }
        ]
    },
    externals: {
        // 将jquery指向window.Zepto全局变量
        jquery: 'window.Zepto', // Usage: var $ = require('jquery');
    }
}
```
