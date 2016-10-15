---
title: JSON与Object/Array互相转换
tags:
  - Javascript
  - JSON
id: 190
categories:
  - 技术
date: 2010-09-09 23:49:00
---

花了一晚上时间，写好的Javascript原型扩展，支持由Object和Array类型转为JSON数据格式，并且可以由JSON轻松的还原对象，在不同格式之间可以轻松自如的互相转换真的是一件非常美好的事情。

Object的子对象、属性、方法以及Array的子集合可以是任何Javascript数据类型，包括String、Number、Boolean、Array、Function、Object；甚至支持null和undefined；另外，Object和Array可以包含无限级的子对象和子集合。

Function在与JSON格式互相转换后仍然可以正常执行，Object的方法带有调用句柄，例如：a.functionName(); 而Array的方法则作为匿名函数，例如这样：myArray[0]();

把Object转为JSON:

```javascript
Object.prototype.toJSON = function() {
    var temp = [],
        prop,
        propValue;

    temp.push("{");
    for (prop in this) {
        propValue = this[prop];
        switch (typeof(propValue)) {
            case "function":
                temp.push (
                    "\""+ prop +"\":"+propValue.toString().
                        replace(/ {0,}[\t\r\v\f\n] {0,}/g,"").
                        replace(/\s{2,}/g, " ")
                );
                break;

            case "object" :
                temp.push(propValue===null
                    ? "\"" + prop + "\":" + propValue
                    : "\"" + prop + "\":" + propValue.toJSON());
                break;

            case "undefined" :
            case "number"    :
            case "boolean"   : temp.push("\""+prop+"\":"+propValue); break;

            case "string"    :
            default          : temp.push("\""+prop+"\":\"" + propValue.replace(/"/g,'\\"')+"\""); break;
        }
        temp.push(", ");
    }
    temp.push("}");
    var strTemp = temp.join("").replace(/, {0,}$/,"");
    return strTemp;
}
```

把Array转为JSON：

```javascript
Array.prototype.toJSON = function() {
    var temp = ["["];
    for (var i=0; i < this.length; i++) {
        switch (typeof(this[i])) {
            case "function":
                temp.push (
                    this[i].toString().
                        replace(/ {0,}[\t\r\v\f\n] {0,}/g,"").
                        replace(/\s{2,}/g, " ")
                );
                break;
            case "undefined" :
            case "number"    :
            case "boolean"   : temp.push(""+this[i]); break;
            case "object"    : temp.push(this[i]===null ? this[i] : this[i].toJSON()); break;
            case "string"    :
            default          : temp.push("\""+this[i].replace(/"/g,'\\"')+"\""); break;
        }

        temp.push(i==(this.length-1) ? "" : ", ");
    }
    temp.push("]");
    return temp.join("");
}
```

由JSON还原为JS对象:

```javascript
String.prototype.unJSON = function() {
    var strToObj = "strToObj="+this;
    try {
        return new Function("return" + strToObj);
    } catch(e) {
        strToObj = this;
    }
    return strToObj;
}
```

实例：

```javascript
function _func() {
    var str = "";
    alert(str);
}

var _array = [_func,1,'ab"c',true,,{a:1,b:[1,2,3],c:'ab"c'}];

var _json  = _array.toJSON();
alert(_json); // 转换后的JSON

var _unjson = _json.unJSON();
_unjson[0](); // 从JSON还原对象中执行函数
```
