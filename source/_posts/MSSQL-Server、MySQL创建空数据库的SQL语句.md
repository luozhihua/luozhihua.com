---
title: MSSQL Server、MySQL创建空数据库的SQL语句
tags:
  - Mysql
  - SQLServer
  - 数据库
id: 213
categories:
  - 笔记
date: 2010-09-10 00:03:06
---

MSSQL Server 新建数据库：

```sql
use master
go
if exists (select * from sysdatabases where name='test') drop database mlnt
go create database test
on
(
name='test_data',
filename='D:"SQLSERVER2000"MSSQL"Data"test_data.mdf',
size=10mb,
filegrowth=10%
)
log on
(
name='test_log',
filename='D:"SQLSERVER2000"MSSQL"Data"test_log.ldf',
size=10mb,
filegrowth=10%
)
```

PHP 创建MySQL数据库

```php
session_start();

if (mysql_connect("localhost","root","123456") == true) {

    if ($Submit==true) {
        $mysql="create database $database_name ";
        $result=mysql_query($mysql);
        echo mysql_error();

        if ($result == true) {
            echo "数据库创建成功!";
        } else {
            echo "数据库创建失败!";
        }
    } else {
        echo "连接失败";
    }
}
```
