---
title: '[转] – php5将xml转换成json最简单的办法'
tags:
  - JSON
  - PHP
  - XML
id: 194
comment: false
categories:
  - 技术
date: 2010-09-09 23:52:14
---

**原文地址：[http://heatspace.cn/?p=205](http://heatspace.cn/?p=205)**

```php
	$xml = <books>
			<book id="1">
				<title>Code Generation in Action</title>
				<author><first>Jack</first><last>Herrington</last></author>
				<publisher>Manning</publisher>
			</book>
			<book id="2">
				<title>PHP Hacks</title>
				<author><first>Jack</first><last>Herrington</last></author>
				<publisher>O‘Reilly</publisher>
			</book>
			<book id="3">
				<title>Podcasting Hacks</title>
				<author><first>Jack</first><last>Herrington</last></author>
				<publisher>O’Reilly</publisher>
			</book>
		</books>
```

```php
echo $json = json_encode (simplexml_load_string($xml));
```
