---
title: 利用子进程实现NodeJS程序退出后自动重启
tags:
  - NodeJS
id: 1184
categories:
  - 笔记
date: 2013-10-17 10:19:45
---

```javascript

var child_process = require('child_process');

function start(nodefile) {
    if (typeof start !== 'string') {
        console.log('Has none file. like this: start("app.js")');
    }

    console.log('Master process is running.');

    var proc = child_process.spawn('node', [nodefile]);

    proc.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    proc.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    // 监测退出事件，删除原进程并重启新进程
    proc.on('exit', function (code) {
        console.log('child process exited with code ' + code);
        delete(proc);
        setTimeout(start, 5000);
    });
}

module.exports = start;
```
