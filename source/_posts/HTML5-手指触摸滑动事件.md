---
title: HTML5 手指触摸滑动事件
id: 941
categories:
  - 技术
date: 2012-03-17 12:00:47
tags:
---

更新了对手指触摸滑动事件的代码，做webApp的朋友可以用到

```javascript
$(document).ready(function() {
    var startX,
        startY,
        endX,
        endY,
        scrollTopVal=0, //左右滑动请自行修改
        touchBox = $("#touchBox");

    /**
     + touch start event handle
     + @param  {Event} event touch start event
     */
    function touchStart(event){
        var touch = event.touches[0];
        startY = touch.pageY;
    }

    /**
     + touch move event handle
     + @param  {Event} event touch move event
     */
    function touchMove(event) {
        var touch = event.touches[0];
        endY = (startY-touch.pageY);

        if (scrollTopVal==0) {
            touchBox.scrollTop((endY+100));
        } else {
            touchBox.scrollTop(scrollTopVal+endY+100);
        }

    }

    /**
     + touch end event handle
     + @param  {Event} event touch end event
     */
    function touchEnd(event) {
        scrollTopVal=$("#touchBox").scrollTop();
    }

    // bind events
    touchBox.bind({
        "touchstart" : touchStart,
        "touchmove"  : touchMove,
        "touchend"   : touchEnd
    });

});
```
    