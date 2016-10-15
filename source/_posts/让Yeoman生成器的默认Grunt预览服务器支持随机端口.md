---
title: 让Yeoman生成器的默认Grunt预览服务器支持随机端口
id: 1756
categories:
  - 技术
date: 2014-10-27 21:31:24
tags:
thumbnail: http://oezzzs8eh.bkt.clouddn.com/static/images/thumbs/yeoman.png?imageView2/1/w/345/h/163
---

![](http://oezzzs8eh.bkt.clouddn.com/static/images/thumbs/yeoman.png)

使用Yeoman初始化的项目会默认使用Grunt作为构建工具，Grunt配置了connect任务，可以直接使用命令“grunt serve”在本机启动一个用于预览的Web服务器，默认监听了9000端口，另外，启动的预览服务器还会额外监听35729端口用来即时检测项目的文件是否被更改，一旦在任意编辑器修改了项目所属的文件时，服务器就会即时通过35729端口通知浏览器自动刷新打开的页面，此功能极大的提升了前端的开发效率，如果配置了多台显示器在写代码时更是得心应手。

在开发单个项目时，Yeoman的grunt serve命令没有任何问题，但是如果有两个或更多项目需要并行开发，则会遇到端口冲突的错误，虽然可以在Gruntfile.js文件里面的修改端口配置解决此问题，但项目多了就不知道哪些端口是可用的了，对于钟爱自动化的我简直是件不能忍受的事情，下面给出我的解决方法，分别是自动分配端口和手动配置端口两种方案的详细步骤：<!--more-->

#### 自动分配端口

1.  使用编辑器打开项目根目录的Gruntfile.js;
2.  注册一个自定义的Grunt Task，Task名称随便定义，这里我用“setServerPort”做为示范，Task配置的代码片段如下：

    ```javascript
    // 自定义一个 Grunt Task，用来自动给预览服务器和即时刷新服务分配随即端口;
    grunt.registerTask('setServerPort', function() {
      var freeport = require('freeport');
      var times = 0;
      var async = this.async();

      function done() {
        if (times === 2) {
          async();
        }
      }

      // 获取一个空闲端口
      // 并设置为预览服务器的端口;
      freeport(function(err, port) {
        grunt.config.set('connect.options.port', port);
        times += 1;
        done();
      });

      // 获取一个空闲端口
      // 并设置为即时刷新服务的端口;
      freeport(function(err, port) {
        grunt.config.set('connect.options.livereload', port);
        times += 1;
        done();
      });
    });
    ```

3.  将上面注册的Task：“setServerPort”注入Task “server”内：

    ```javascript
    var desc = 'start the server and preview your app, --allow-remote for remote access';
    grunt.registerTask('serve', desc, function (target) {

      if (grunt.option('allow-remote')) {
        grunt.config.set('connect.options.hostname', '0.0.0.0');
      }

      if (target === 'dist') {
        return grunt.task.run(['build', 'connect:dist:keepalive']);
      }

      grunt.task.run([
        'setServerPort', // &lt;= 将注册的自定义Task "setServerPort" 注入在此处。
        'clean:server',
        'wiredep',
        'concurrent:server',
        'autoprefixer',
        'connect:livereload',
        'watch'
      ]);
    });
    ```

4.  修改 Task "watch" 内所有属性名为livereload的options的值如下：

    ```json
    "options": {
          "livereload": "&lt;%= connect.options.livereload %&gt;"
    }
    ```

#### 手动配置端口

1.  打开项目根目录的Gruntfile.js文件；
2.  找到下面配置项，修改其中的port和livereload参数值为可用的端口（两个不能相等）；

    ```json
    "connect": {
          "options": {
            "port": 9000,
            // change this to '0.0.0.0' to access the server from outside
            "hostname": "localhost",
            "livereload": 35729
          },
          //...
    }
    ```

3.  修改 Task "watch" 内所有属性名为livereload的options的值如下：

    ```json
    "options": {
        "livereload": "&lt;%= connect.options.livereload %&gt;"
    }
    ```
