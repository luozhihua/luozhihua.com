---
title: NodeJS版本的Gitlab API
tags:
  - gitlab
  - NodeJS
id: 1796
categories:
  - 技术
date: 2014-11-08 15:01:34
thumbnail: http://oezzzs8eh.bkt.clouddn.com/static/images/thumbs/gitlab-api-nodejs.png?imageView2/1/w/345/h/163
---

![](http://oezzzs8eh.bkt.clouddn.com/static/images/thumbs/gitlab-api-nodejs.png)

Gitlab 是一个非常优秀的开源Git仓库管理工具，能部署到自己的服务器上，不仅提供了仓库服务器，重要的是其提供了一个用户体验相当优秀的UI界面，可以方便直观的管理源代码和团队对所有成员提交的代码进行review，对初步接触Git的用户更是有非常大的帮助，能快速上手。

除此之外，Gitlab还为用户提供了完善的API，Gitlab API支持的客户端语言有PHP、Python、Ruby、NodeJS、Java和MS.NET，没错，常用的语言都支持，对我来说最重要的是支持NodeJS，真可谓踏破铁鞋无觅处，得来全不费工夫。<!--more-->

最近正好计划使用node-webkit开发一个桌面工具，用来管理前端开发团队的整个工作流，这个工具可以自动为开发者生成一个web应用的模型，并自动在公司的Gitlab服务器上创建一个仓库，在这个工具内利用Git实现一键部署到开发环境、测试环境及预发布环境、以及封装源码管理的功能，这些是我使用GItlab API的前提，下面进入正题。

NodeJS API是基于HTTP协议的Restfull API, 由来自法国巴黎的 [@Manfred Touron](https://github.com/moul) 和来自英国莱斯特的 [@Dave Irvine](https://github.com/dave-irvine)开发和维护，封装了Gitlab提供的[官方API](https://github.com/moul/gitlabhq/tree/master/doc/api)，使其调用方式更简单、更符合NodeJS编码风格。

### 安装方法

1.  必须安装NodeJS以及NPM；
2.  使用NPM命令安装gitlab 模块；

    `npm install gitlab`

    ### 使用方法

    支持CoffeeScript和原生JavaScript两种语法，可以选择你熟悉的写法：

    #### CoffeeScript:

    # 连接服务
    ```python
        gitlab = (require 'gitlab')
          url:   'http://gitlab.example.com'
          token: 'abcdefghij123456'

        # 列出所有用户
        gitlab.users.all (users) ->;
          console.log "##{user.id}: #{user.email}, #{user.name}, #{user.created_at}" for user in users

        # 列出所有托管的项目
        gitlab.projects.all (projects) -&gt;
          for project in projects
            console.log "##{project.id}: #{project.name},"
            console.log "path: #{project.path},"
            console.log "default_branch: #{project.default_branch},"
            console.log "private: #{project.private},"
            console.log "owner: #{project.owner.name} (#{project.owner.email})",
            console.log "date: #{project.created_at}"`</pre>
    ```
    
    ####  JavaScript:

    ```javascript
    // 连接服务
    var gitlab = require('gitlab')({
      url   : 'http://gitlab.example.com',
      token : 'abcdefghij123456'
    });

    // 列出所有用户
    gitlab.users.all(function(users) {
      for (var i = 0; i &lt; users.length; i++) {
        console.log([
            "#" + users[i].id + ": " + users[i].email,
            users[i].name,
            users[i].created_at
        ].join(','));
      }
    });

    // 列出所有项目
    gitlab.projects.all(function(projects) {
      for (var i = 0; i &lt; projects.length; i++) {
        console.log([
            "#" + projects[i].id + ": " + projects[i].name,
            "path           : " + projects[i].path,
            "default_branch : " + projects[i].default_branch,
            "private        : " + projects[i]["private"],
            "owner          : " + projects[i].owner.name + " (" + projects[i].owner.email+ ")",
            "date           : " + projects[i].created_at
        ].join(', '));
      }
    });
    ```

更多的实例请访问这个页面：[#Example](https://github.com/moul/node-gitlab/tree/master/examples)