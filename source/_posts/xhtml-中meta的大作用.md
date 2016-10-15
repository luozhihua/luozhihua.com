---
title: xhtml 中meta的大作用
tags:
  - HTML
id: 176
categories:
  - 技术
date: 2010-09-09 23:35:30
---

meta是用来在HTML文档中模拟HTTP协议的响应头报文。meta 标签用于网页的与中，meta 标签的用处很多。meta   的属性有两种：name和http-equiv。name属性主要用于描述网页，对应于content（网页内容），以便于搜索引擎机器人查找、分类（目   前几乎所有的搜索引擎都使用网上机器人自动查找meta值来给网页分类）。这其中最重要的是description（站点在搜索引擎上的描述）和   keywords（分类关键词），所以应该给每页加一个meta值。比较常用的有以下几个：

**name 属性**

1、`<meta name="Generator" contect="">`用以说明生成工具（如Microsoft  FrontPage 4.0）等；

2、`<meta name="KEYWords" contect="">`向搜索引擎说明你的网页的关键词；

3、`<meta name="DEscription" contect="">`告诉搜索引擎你的站点的主要内容；

4、`<meta name="Author" contect="你的姓名">`告诉搜索引擎你的站点的制作的作者；

5、`<meta content='true' name='MSSmartTagsPreventParsing'>`防止微软页面编辑软件在页面上自动添加标签，保证代码原汁原味

6、`<meta name="Robots" contect="all|none|index|noindex|follow|nofollow">`

其中的属性说明如下：

设定为all：文件将被检索，且页面上的链接可以被查询；

设定为none：文件将不被检索，且页面上的链接不可 以被查询；

设定为index：文件将被检索；

设定为follow：页面上的链接可以被查询；

设定为noindex：文件将不被检索，但页面上的链接可以被查询；

设定为nofollow：文件将不被检索，页面上的链接可以被 查询。

**http-equiv属性**

1、`<meta equiv="Content-Type" contect="text/html"  charset="gb_2312-80">`
和 `<meta equiv="Content-Language"  contect="zh-CN">`用以说明主页制作所使用的文字以及语言；

又如英文是ISO-8859-1字符集，还有 BIG5、utf-8、shift-Jis、Euc、Koi8-2等字符集；

2、`<meta equiv="Refresh"  contect="n;url=http://yourlink">`定时让网页在指定的时间n内，跳转到页面http://yourlink；

3、`<meta equiv="Expires" contect="Mon,12 May 2001 00:20:00  GMT">`可以用于设定网页的到期时间，一旦过期则必须到服务器上重新调用。需要注意的是必须使用GMT时间格式；

4、`<meta equiv="Pragma"  contect="no-cache">`是用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出；

5、`<meta equiv="set-cookie" contect="Mon,12 May 2001 00:20:00  GMT">`cookie设定，如果网页过期，存盘的cookie将被删除。需要注意的也是必须使用GMT时间格式；

6、`<meta equiv="Pics-label" contect="">`网页等级评定，在IE的internet选项中有一项内容设置，可以防止浏览一些受限制的网站，而网站的限制级别就是通过 meta属性来设置的；

7、`<meta equiv="windows-Target"  contect="_top">`强制页面在当前窗口中以独立页面显示，可以防止自己的网页被别人当作一个frame页调用；

8、`<meta equiv="Page-Enter" contect="revealTrans(duration=10,transtion=50)">`和`<meta equiv="Page-Exit" contect="revealTrans(duration=20，transtion=6)">`设定进入和离开页面时的特殊效果，这个功能即FrontPage中的“格式/网页过渡”，不过所加的页面不能够是一个frame页面。