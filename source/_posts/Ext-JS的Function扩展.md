---
title: Ext JS的Function扩展
id: 396
categories:
  - 笔记
date: 2010-10-13 15:47:54
tags:
---

下列函数已经加入了Function的prototoype对象中。（请注意createSequence与createInterceptor没有被加入。）：

**createCallback**

为这个函数创建回调函数，回调函数已经是有一连串的参数定义好的了。当你打算指定一个函数作为回调函数的时候，指明其引用即可，如（如 callback:myFn）。然而，当打算给函数传入参数的时候，但却希望其返回的是一个Function类型的，就应使用该方法。因为 callback: myFn(arg1, arg2)不是返回函数而是该函数的返回值。要返回函数类型，使用createCallback对函数“加壳”，如下例：
```javascript
var sayHello = function(firstName, lastName){
    alert('Hello ' + firstName + ' ' + lastName);
};
Ext.get('myButton').on('click', sayHello.createCallback('John', 'Smith'));
```

**createDelegate**

与createCallback有点相似，但略为强大。它不但可允许你指定函数的作用域，而且能够控制送入函数的参数其数目。第一个参数是作用域。第二个参数是送入的参数，可以是多个，也就是参数数组。第三个参数是怎么控制调用者执行时期送入的参数。如果该参数为true，将args加载到该函数的后面，如果该参数为数字类型，则args将插入到所指定的位置。

```javascript
      var sayHello = function(firstName, lastName, e){
          alert('Hello ' + firstName + ' ' + lastName);
      };
      Ext.get('myButton').on(
         'click',
         sayHello.createDelegate(this, ['John', 'Smith'])
         //0这里说明我们打算把我们参数插入到最前的位置0
      );
```

**defer**

延迟调用该函数。第一个参数是延迟时间，以毫秒为单位；第二个是作用域的参数。

```javascript
var whatsTheTime = function() {
    alert(new Date());
};

//执行之前等待三秒
whatsTheTime.defer(3000);
```
