---
title: PHP通过接口实现多重继承
tags:
  - PHP
id: 162
categories:
  - 技术
date: 2010-09-09 23:24:58
---

PHP类虽然是单继承的，但是可以通过其它特殊的方式实现多重继承，比如使用接口实现，只要把类的特征抽象为接口，并通过实现接口的方式让对象有多重身 份，通过这样就可以模拟多重继承了。
下面就是一个用接口模拟多重继承的例子，源代码如下：

```php
interface UserInterface{ // 定义User的接口
    function getname();
}

interface TeacherInterface{ //teacher 相关接口
    function getLengthOfService();
}

class User implements UserInterface { // 实现UserInterface接口
    private $name = "tom";
    public function getName() {
        return $this->name;
    }
}

class Teacher implements TeacherInterface { // 实现TeacherInterface接口
    private $lengthOfService = 5; // 工 龄
    public function getLengthOfService(){
        return $this->lengthOfService;
    }
}

// 继承自User类,同时实现了 TeacherInterface接口.
class GraduateStudent extends User implements TeacherInterface {
    private $teacher ;

    public function __construct() {
        $this->teacher = new Teacher();
    }

    public function getLengthOfService(){
        return $this->teacher->getLengthOfService();
    }
}

class Act{
    //注意这里的类型提示改成了接口类型
    public static function getUserName(UserInterface $_user){
        echo "Name is " . $_user->getName() ."&lt;br>";
    }

    //这里的类型提示改成了 TeacherInterface类型.
    public static function  getLengthOfService(TeacherInterface $_teacher){
        echo "Age is " .$_teacher->getLengthOfService() ."&lt;br>";
    }
}

$graduateStudent = new GraduateStudent();
Act::getUserName($graduateStudent);
Act::getLengthOfService($graduateStudent);
//结果正如我们所要的,实现了有多重身份的一个对象.
```

示例运行结果如下：

```text
Name is tom
Age is
```