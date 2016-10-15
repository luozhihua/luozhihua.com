---
title: 解决iframe在iPad内不能滚动的问题
tags:
  - Javascript
  - 多点触控
  - 移动Web
  - 触摸屏
id: 1034
categories:
  - 笔记
date: 2012-07-16 21:05:47
---

在iPad1及iPad2里面浏览含有iframe的Web页面，会出现一个很抓狂的问题，就是iframe内引用的页面内容不能上下滑动（滚动），测试了一下其他的设备，这个问题也同样出现在了Android平台的浏览器上，大部分移动设备都存在这个问题，我估计开发商的初衷是为了方便用户浏览页面，而使iframe的宽度和高度自动匹配其内容尺寸，但是对于iframe内的touch事件却支持不完善，因此出现了iframe滑动无响应的现象。<!--more-->

在网上一艘，这方面的解决方法不少，但是内容和方法似乎都差不多，大多是通过给iframe内的window对象绑定事件，发生touch事件时即时改变iframe上级元素的scrollTop和scrollLeft值来实现，下面是我的实现方法：

1\. **HTML**：

```html
<div id="iframeBox">
    <iframe src="http://luozhihua.com" width="320" height="240"></iframe>
</div>
```

2\. **CSS**：

```css
#iframeBox{
    border:1px solid #000;
    width:400px;
    height:320px;
    overflow:auto;
}

#iframeBox iframe{
    /* 在iPad及部分Android浏览器内下面的width、height无效 */
    width:100%;
    height:100%;
    overflow:auto;
    margin:0px; border:0px;
}
```

3\. **JavaScript**:

```javascript
/**
 * @param iframeID 		iframe的id或者iframeElement[Doc Object]
 * @param iframeWrapper	用于包装iframe的元素
 */
function scrollIframeForIOS(iframe, iframeWrapper) {
    if (!navigator.userAgent.match(/iPad|iPhone/i)) {
        return false;
    }

	var touchY = 0,
	    touchX = 0;

	iframe = typeof(iframe)=="string"
		? document.getElementById(iframe)
		: iframe;

	iframe.onload = function() {

		var ifrWin = iframe.contentWindow,
		    ifrDoc = ifrWin.document;

		// iframe的上一级节点
		iframeWrapper = iframeWrapper||ifrWin.frameElement.parentNode;

		// 记录手指按下的位置
		ifrDoc.body.addEventListener("touchstart", function(event) {
			touchX = event.targetTouches[0].pageX;
			touchY = event.targetTouches[0].pageY;
		});

		ifrDoc.body.addEventListener("touchmove", function(event) {
			e.preventDefault(); // 阻止整个页面拖动

			var moveX = (touchX - event.targetTouches[0].pageX),
			    moveY = (touchY - event.targetTouches[0].pageY);

			iframeWrapper.scrollLeft += moveX;
			iframeWrapper.scrollTop  += moveY;
		});
	}

    return true;
};

// 调用方法：body onload="scrollIframeForIOS('iframeBox');"
```
