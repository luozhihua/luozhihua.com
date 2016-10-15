---
title: 网站/Blog支持Gravatar
tags:
  - PHP
id: 180
categories:
  - 笔记
date: 2010-09-09 23:39:49
---

Gravatar是Globally Recognized Avatar的缩写，是 http://www.gravatar.com  推出的一项服务，意为“全球通用头像”。如果在Gravatar的服务器上设置了你自己的头像，那么在任何支持Gravatar的blog或者留言本上留  言时，只要提供你与这个头像关联的email地址，就能够显示出你的Gravatar头像来。

**网站和Blog支持Gravatar的方法：**

```php
< ?php
    if ( !empty( $email变量) ) {
        $mailTomd5 = md5( $email变量 );
        $default = urlencode( "默认图片地址");
        echo '![](http://www.gravatar.com/avatar.php?gravatar_id=$mailTomd5 &amp;size=60&amp;default=$default)';
    }
?>
```
