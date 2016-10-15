---
title: Javascript 获取在外部css文件中定义的样式值
tags:
  - Javascript
  - 前端开发
id: 155
categories:
  - 笔记
date: 2010-09-09 23:16:43
---

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Javascript 获取在外部css文件中定义的样式值</title>
<style type="text/css">
    /*
    - 定义body的颜色
    */
    body { color:blue; }
</style>
</head>

<body>

    蓝色的文字

    <script type="text/javascript">
        /*
        + 上面定义了body标签的颜色为blue
        */

        /* 如下面这样是没有办法获取到color值的 */
        alert("获取的color值： "+ document.body.style.color);

        /* 下面的写法在IE和Opera下有效：*/
        try {
            alert("IE和Opera: "+ document.body.currentStyle.color);
        } catch(e) {}

        /* Firefox、 Chrome和Safari请加上下面的判断*/
        if (!document.all) {
            HTMLElement.prototype.__defineGetter__(
                "currentStyle",
                function() {
                    return this.ownerDocument.defaultView.getComputedStyle(this,null);
                }
            );
        }
        alert("Firefox、 Chrome和Safari:\n "+ document.body.currentStyle.color);

    </script>
</body>
</html>
```