---
title: PDO抽象类
tags:
  - PDO
  - PHP
id: 203
categories:
  - 技术
date: 2010-09-09 23:58:55
---

原文地址：[http://hi.baidu.com/hjkgame/blog/item/d263159bb45bd6b3c9eaf4db.html](http://hi.baidu.com/hjkgame/blog/item/d263159bb45bd6b3c9eaf4db.html)

想为公司整个B/S方便团队管理     网上逛了半天后 还是得自己写个     恶补PHP中 转一篇经典帖子 收藏..

### 17.3 PDO数据库抽象类

### 17.3.1 PDO简介

PDO（PHP Data Objects Layer） 提供一个公共的数据库系统接口，它使用C语言做底层开发，运行速度比较快。

PDO以PHP 5.1为基础进行设计，设计沿承PHP的特点，以简洁易用为准，从严格意义上讲，PDO应该归为PHP 5的SPL库之一，而不应该归于数据抽象层，因为其本身和MySQL和MySQLi扩展库的功能类似。

### 17.3.2 PDO的安装

PDO本身结果是模块化的，它被分成一个公共核心，以及一个或多个驱动程序扩展，公共核心提供了在脚本（PDO本身）中使用的API，驱动程序扩展则为PDO和本地RDBMS客户机API库架起一座桥梁，用来访问指定的数据库系统。比如，IBM  DB2用户会希望使用PDO_ODBC驱动程序，Oracle用户会用Oci8_PDO接口，MySQL用户则会用pdo_mysql驱动程序。

PDD的核心在PHP 5.2下默认为开启状态，驱动程序除pdo_sqlite之外，都需要手工打开。

下面是在FreeBSD环境下使用Ports安装PDO核心驱动程序的步骤：

```shell
cd /ports/database/pecl-PDO
make install
```

安装后，它会自动修改php.ini配置文件，如果没有该项则自行加入：

`extension=pdo.so`

安装PDO MySQL驱动程序：

```shell
cd /ports/database/pecl-PDO_MYSQL/
make install
```

修改php.ini文件，在刚才的项后加入该段：

`extension=pdo_mysql.so`

使用`apachectl –k restart`命令重新启动Apache后，即可完成PDO的安装了。

在Win32环境中，由于PHP 5.1版本以上的压缩包里已经自带PDO扩展库文件，因此只要在php.ini文件中打开该扩展即可，不需要再安装。

### 17.3.3 PDO连接数据库

其实，PDO与其他数据库接口和数据库抽象层使用区别不大，首先创建一个连接句柄：

```php

// 连接MySQL数据库的账号
$login = "root";
$passwd = "root";
$db = new PDO('mysql:host=localhost;dbname=test'，$login， $passwd);

//如果连接失败，则抛出异常
try {
    foreach($db->query('select * from test') as $row) { //查询数据库
        print_r($row);
    }

    $db=null;//关闭数据库连接
} catch (PDOException $e) {
    echo $e->getMessage();
}

```

（1）**使用持久连接pconnect**

持久连接的好处是能够避免在每个页面命中时都打开和关闭数据库服务器连接，速度更快，如Oracle数据库的一个进程创建了两个连接，PHP则会把原有连接与新的连接合并共享为一个连接。pdo_connect.php脚本如下：

```php

//连接MySQL数据库的账号
$login = "root";
$passwd = "root";
$opt = array(PDO::ATTR_PERSISTENT => TRUE);

try {
    $db = new PDO('mysql:host=localhost;dbname=test'，$login，$passwd,$opt);
} catch (PDOException $e) {
    echo $e->getMessage();
}

```

（2）**使用DSN- ODBC方式连接数据库**

一个DSN（数据源名称）是一个标识符，定义为一个ODBC的数据源驱动。格式为：

Database name数据库名称

Directory目录

Database driver数据库驱动

User ID登录

Password密码

在UNIX系统下，DSN的配置通常存储在ini文件中，使用PDO读取文件配置，代码如下：

```php

ini_set("pdo.dsn.dbserver"， "mysql::test");

try {
    $db = new PDO("dbserver");
} catch (PDOException $e) {
    echo $e->getMessage();
}
```

### 17.3.4 使用PDO查询

使用PDO进行查询执行，可以使用两种方法。

第一种方法是预处理句柄（Prepared Statements），推荐使用，速度快而且安全。请看下例：

```php
require_once('pdo_connect.php');
$rs = $db->prepare("SELECT * FROM test");
$rs->execute();
while($row = $rs->fetch()){
    print_r($row);
}
```

Prepared预处理语句的作用是，编译一次，可以多次执行，可以有效防止SQL注入，在执行单个查询时快于直接使用`query()/exec()`的方法。

#### 1．绑定参数

使用Prepared预处理语句做INSERT操作时的参数需要赋一个名字，以及绑定一个变量。

```php
$stmt = $db->prepare('INSERT INTO users VALUES(:name，:pass，:mail)');

foreach (array('name'，'pass'，'mail') as $v) {
    $stmt->bindParam(':'.$v，$$v);
}
$fp = fopen("./users.csv"， "r");

while (list($name，$pass，$mail) = fgetcsv($fp，4096)) {
    $stmt->execute();
}
```

#### 2．绑定结果列

结果列可以绑定为变量，请看下面例子。

```php
$qry = "SELECT :type， :data FROM images LIMIT 1";
$stmt = $db->prepare($qry);
$fp = fopen(tempname("/tmp"， "LOB")， "w");
$stmt->bindColumn(':type'，$type);
$stmt->bindColumn(':type'，$fp， PDO::PARAM_LOB);
$stmt->execute(PDO::FETCH_BOUND);

header("Content-Type: ".$type);
fflush($fp);
fseek($fp， 0， SEEK_SET);
fpassthru($fp);
fclose($fp);
```

第二种方法就是直接执行。

直接执行常见于直接查询操作或更新数据库操作，可以使用exec()方法，请看下面的例子。

```php
$db = new PDO("DSN");
$db->exec("INSERT INTO foo (id) VALUES('bar')");
$db->exec("UPDATE foo SET id='bar'");
```

该方法返回的是操作影响的行数，若执行错误，则返回False值。

在一些UPDATE的查询执行后，若没有影响到列，则返回0值，我们可以根据它返回的值或布尔值来进行相关处理。例如：

```php
$qry = "UPDATE foo SET id='bar'";
$res = $db->exec($qry) or die(); //错误的返回

if (!$res) //未执行成功

if ($res !== FALSE) // 执行正确并返回
```

一个完整的例子：

```php
$dsn = "mysql:host=localhost;dbname=test";
$db = new PDO($dsn， 'root'， '');

//如果为持续性连接，则修改为下面样式
//$db = new PDO($dsn， 'root'， ''， array(PDO::ATTR_PERSISTENT => true));

$count = $db->exec("INSERT INTO foo SET id = NULL，name = 'john'，gender='male'，time=NOW()");

echo $count;

$db = null;

```

### 17.3.5 错误与异常处理

PDO提供两个方法来取得错误信息：

Ø errorCode()——SQL语句错误，如：42000 == 语法错误；

Ø errorInfo()——更详细的错误信息。

如下所示为错误信息内容：

```php
array(
    [0] => 42000，
    [1] => 1064
    [2] => Syntax Error
)
```
#### 1．面向过程的处理

```php

$db = new PDO('mysql:host=localhost;dbname=test'， $user， $pass);
$rs = $db->query("SELECT aa，bb，cc FROM foo");

if ($db->errorCode() != '00000'){
    print_r($db->errorInfo());
    exit;
}

$arr = $rs->fetchAll();
print_r($arr);
$db = null;
```

PDO和  PDOStatement对象有errorCode()和errorInfo()方法，如果没有任何错误，errorCode()返回的是00000；否  则，就会返回一些错误代码。errorInfo()返回的是一个数组，包括PHP定义的错误代码和MySQL的错误代码及错误信息。数组结构如下：

```php
Array(
    [0] => 42S22
    [1] => 1054
    [2] => Unknown column 'aaa' in 'field list'
)
```

每次执行查询以后，`errorCode()`的结果都是最新的，所以我们可以很容易地自己控制错误信息显示。

#### 2．面向对象的处理

标准的错误句柄，应该是一个面向对象方法来扩展PDO，以允许错误句柄取得系统异常。

请看下面的例子，如果查询出错，将抛出异常。

```php
$db->setAttribute(
    PDO::ATTR_ERRMODE，
    PDO::ERRMODE_EXCEPTION
);
```

一个完整的例子：

```php
try {
    $db = new PDO('mysql:host=localhost;dbname=test'， $user， $pass);
    $db = null;
} catch (PDOException $e) {
    print "Error: " . $e->getMessage() . "&lt;br/>";
    die();
}
```

使用PHP 5的异常处理：这里利用PHP 5面向对象的异常处理特征，如果里面有异常，就调用PDOException来初始化一个异常类。

PDOException异常类的属性结构如下：

```php
class PDOException extends Exception {

    //错误信息，可以调用 PDO::errorInfo() 或 PDOStatement::errorInfo()来访问
    public $errorInfo = null;

    //异常信息，可以使用 Exception::getMessage() 来访问
    protected $message;

    //SQL状态错误代码，可以使用 Exception::getCode() 来访问
    protected $code;
}
```

这个异常处理类使用了PHP 5的异常处理类，下面简单地看一下PHP 5内置的异常处理类结构。

```php

class Exception{

    //属性
    protected $message = 'Unknown exception'; //异常信息
    protected $code = 0; //用户自定义异常代码
    protected $file; //发生异常的文件名
    protected $line; //发生异常的代码行号

    //方法
    final function getMessage(); //返回异常信息
    final function getCode(); //返回异常代码
    final function getFile(); //返回发生异常的文件名
    final function getLine(); //返回发生异常的代码行号
    final function getTrace(); //backtrace()数组
    final function getTraceAsString(); //已格式化成字符串的 getTrace() 信息
}
```

相应的，在代码中可以合适地调用getFile()和getLine()来进行错误定位，以更方便地进行调试。