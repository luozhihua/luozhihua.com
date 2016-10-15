---
title: PDO 使用方法
tags:
  - PDO
  - PHP
id: 205
categories:
  - 技术
date: 2010-09-09 23:59:29
---

数据库的连接：
我们通过下面的例子来分析PDO连接数据库，

```php

$dbms   = 'mysql';     //数据库类型 oracle 用ODI,对于开发者来说，运用 不同的数据库，只要改这个，不用记得 那么多的函数了
$host   = 'localhost'; //数据库主机名
$dbName = 'test';    //运用 的数据库
$user   = 'root';      //数据库连接用户名
$pass   = '';          //对应的密码
$dsn    = "$dbms:host=$host;dbname=$dbName";

try {
    // 原始化一个PDO对象，就是建立了数据库连接对象$dbh;
    $dbh = new PDO($dsn, $user, $pass);
    echo "连接成功";

    // 你还可以实行 一次搜索操作;
    /*
    foreach ($dbh->query('Select * from FOO') as $row) {
        print_r($row); //你可以用 echo($GLOBAL); 来看到这些值
    }
    */
    $dbh = null;
} catch (PDOException $e) {
    die ("Error!: " . $e->getMessage() . "<br/>");
}
```
