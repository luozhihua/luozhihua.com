---
title: PDO对各种数据库的连接方法
tags:
  - PHP
  - 数据库
id: 197
categories:
  - 笔记
date: 2010-09-09 23:54:16
---

## PgSQL

```php
try {
    $db = new PDO("pgsql:dbname=pdo;host=localhost", "username", "password");
    echo "PDO connection object created";
} catch(PDOException $e) {
    echo $e->getMessage();
}
```

## SQLite

```php
try {
    /*** connect to SQLite database ***/
    $dbh = new PDO("sqlite:/path/to/database.sdb");
} catch(PDOException $e) {
    echo $e->getMessage();
}
```

## PDO还能在内存中创建SQLite并使用

```php
try {
    /*** connect to SQLite database ***/
    $db = new PDO("sqlite::memory");

    /*** a little message to say we did it ***/
    echo 'database created in memory';
} catch(PDOException $e) {
    echo $e->getMessage()
}
```

## MySQL

```php
/*** mysql hostname ***/
$hostname = 'localhost';

/*** mysql username ***/
$username = 'username';

/*** mysql password ***/
$password = 'password';

try {
    $dbh = new PDO("mysql:host=$hostname;dbname=mysql", $username, $password);
    /*** echo a message saying we have connected ***/
    echo 'Connected to database';
} catch(PDOException $e) {
    echo $e->getMessage();
}
```

## Firebird

```php
try {
    $dbh = new PDO("firebird:dbname=localhost:C:\Programs\Firebird\DATABASE.FDB", "SYSDBA", "masterkey");
} catch (PDOException $e) {
    echo $e->getMessage();
}
```

## Informix

```php
try {
    $dbh = new PDO("informix:DSN=InformixDB", "username", "password");
} catch (PDOException $e) {
    echo $e->getMessage();
}
```

## Oracle

简单连接
```php
try {
    $dbh = new PDO("OCI:", "username", "password")
} catch (PDOException $e) {
    echo $e->getMessage();
}
```

带数据库名和字符集连接
```php
try {
    $dbh = new PDO("OCI:dbname=accounts;charset=UTF-8", "username", "password");
} catch (PDOException $e) {
    echo $e->getMessage();
}
```

## ODBC

```php
try {
    $dbh = new PDO("odbc:Driver={Microsoft Access Driver (*.mdb)};Dbq=C:\accounts.mdb;Uid=Admin");
} catch (PDOException $e) {
    echo $e->getMessage();
}
```

## DBLIB

```php
try {
    $hostname = "localhost";
    $port     = 10060;
    $dbname   = "my_database";
    $username = "username";
    $password = "password";

    $dbh = new PDO ("dblib:host=$hostname:$port;dbname=$dbname","$username","$password");
} catch (PDOException $e) {
    echo $e->getMessage();
}
```

## IBM

```php
try {
    $db = new PDO("ibm:DRIVER={IBM DB2 ODBC DRIVER};DATABASE=accounts; HOSTNAME=1.2.3,4;PORT=56789;PROTOCOL=TCPIP;", "username", "password");
} catch (PDOException $e) {
    echo $e->getMessage();
}
```
