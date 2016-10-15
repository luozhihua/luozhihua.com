---
title: 移动Web实现摇一摇
id: 1876
categories:
  - 技术
date: 2015-06-06 14:24:39
tags:
  - javascript
  - 移动Web
thumbnail: http://oezzzs8eh.bkt.clouddn.com/static/images/thumbs/摇一摇.png?imageView2/1/w/345/h/163
---

```javascript

var lastTime = 0,
    x,
    y,
    z,
    lastX,
    lastY,
    lastZ;

function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity,
        curTime = new Date().getTime(),
        diffTime,
        speed;

    // 时间
    if ((curTime - lastTime)> 100) {

        diffTime = curTime - lastUpdate;
        lastTime = curTime;

        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;

        log([x,y,z].join(', '));

        speed = Math.abs(x +y + z - lastX - lastY - lastZ) / diffTime * 10000;

        if (speed > 400) {
            log("摇啊摇!");
        }

        lastX = x;
        lastY = y;
        lastZ = z;
    }
}

function log(text) {
    var console = document.getElementById('console'),

    html = console.innerHTML,
    msg = '&lt;div class="log"&gt;'+ text +'&lt;/div&gt;';

    console.innerHTML = msg + html;
}

if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
}
```
