---
categories:
- 技术
date: '2010-10-23 23:29:25'
id: 501
title: Javascript智能条形码检测
---

有很多产品管理软件（B/S）需要用到条形码识别，看了不少的解决方法，一般的都是用一个输入框来接收扫描枪的扫描结果再提交查询，这样局限性比较大，非得要输入框获得焦点才行，从用户体验上讲非常的不友好，理想的解决方案应该是只要窗口保持在前端，无论焦点在页面的哪一元素上都能检测到扫描枪的输入。 <!--more-->

其实扫描枪是按照标准的键盘事件来向计算机输入字符的，因此，我写了一个通过检测键盘事件来获取条形码的类，用法很简单，设置好条形码的长度、开始字符（按键），结束字符（按键），回调函数即可。长度默认为14，开始字符（按键）默认为“ctrl”, 结束字符默认为“return”键，回调函数依附于实例执行，即this指向类的实例。

下面是类的源码：

```javascript
/*
 * Class Barcode Catch
 * By www.Luozhihua.com
 * Options ：
    length   : 14    // 条形码长度
    callback : null  // 收集完成时的处理方法
    startKey : "ctrl"   // 开始键：默认ctrl键
    endKey   : "return" // 结束键：默认return（Enter）键
    autoEnable    : true  // 是否自动启用，默认true
    caseSensitive : true  // 是否区分大小写, 默认为true（如果设为false将是大写）

 * Methods:
      disable  : Disable catch when key was pressed（禁用条形码检测）
      enable   : Enabl catch when key was pressed（开启条形码检测）
      toggle   : Disable/Enable catch when key was pressed
      isEnable : is ready to catch barcode？
      toString : get barcode（获取检测到的条形码）

 * Example 1:
    var bc1 = new Barcode
    ({
        length   : 4,
        startKey : "ctrl",
        endKey   : "return",
        //autoEnable : true,
        callback   : function(code){alert("barcode："+this.toString());}
    });
    bc1.enable();
 * Example 2:
    var bc2 = new Barcode
    (
        6, // Barcode lendth(条形码的长度)
        function(code){alert("检测到条形码："+this.toString());} // callback
    );
 */
(function(){
    window.Barcode = function(settings) {
        var  _enable   = false // 是否可用的
            ,_discern  = false // 察觉条形码的开始
            ,_code     = []    // 条形码存储器
            ,options   =
            {
                  length   : 14    // 条形码长度
                , callback : null  // 收集完成时的处理方法
                , startKey : "ctrl"   // 开始键：默认ctrl键
                , endKey   : "return" // 结束键：默认return（Enter）键
                , autoEnable    : true  // 自动启用
                , caseSensitive : true  // 区分大小写
            }

        // 设置参数
        if(typeof(settings) === 'object') {
            for (var key in settings) {
                options[key]=settings[key];
            };
        }

        if (!isNaN(settings)) {
            options.length=arguments[0];
            options.callback=arguments[1];
        }

        if (typeof(settings) === 'function') {
            options.callback=arguments[0];
        }

        var $this=this;

        // 获取条形码结果
        this.toString = function() {
            return _code.join("");
        };

        // 判断是否已经启用侦测
        this.isEnable = function() {
            return _enable;
        };

        // 开启或关闭侦测功能
        this.toggle = function() {
            this.isEnable() ? this.disable() : this.enable();
        };

        // 开启侦测功能
        this.enable = function(){
            if (document.attachEvent) {
                //document.attachEvent("onkeyup", function(event){$this.analysis(event);});
                document.attachEvent("onkeyup", __eventFunc);
            } else {
                //document.addEventListener("keyup", function(event){$this.analysis(event);}, false )
                document.addEventListener("keyup", __eventFunc, false);
            }
            _enable = true;

            return this;
        }

        // 禁止侦测功能
        this.disable = function() {
            if(document.attachEvent) {
                document.detachEvent("onkeyup", __eventFunc);
            } else {
                document.removeEventListener("keyup", __eventFunc, false )
            }
            _enable = false;

            return this;
        };

        options.autoEnable && this.enable();

        // 事件函数
        function __eventFunc () {
            var event = window.event||arguments[0];
            analysis.call($this, event);
            return false;
        }

        // 分析键盘事件
        function analysis(event) {
            // 如果检测到了开始符，则启动字符收集
            if (isStartKey(event) && !isActive()) {
                clear();
                active();
            }

            /*
            - 如果收集的字符长度符合创建实例时设置的长度，并且发现结束符
            - 则执行回调方法，停止继续检测
            - 收集到的条形码暂时保存，等下次开始收集之前再清除
            */
            else if(isEndKey(event) && isActive() && options.length==_code.length) {
                success();
                still();
            }

            // 如果收集的字符超过长度了仍然没有发现结束符
            // 则停止收集并清空已经收集的字符
            else if(options.length < _code.length && !isEndKey(event)) {
                still();
                clear();
            }

            // 如果已经启用字符收集，则收集字符
            else if(isActive()) {
                add(event);
            }
        }

        // 获取键盘输入的字符
        function getChar(event) {
            var key = getKey(event);
            return key.length===1 ? key : (key==="space"?" ":null);
        }

        // 获取键盘输入的字符
        function getKey(event) {
            // 按键的值
            var specialKeys = {
                8:'backspace', 9:'tab',
                13:'return', 16:"shift", 17:"ctrl", 18:"alt", 19:'pause',
                20:'capslock', 27:'esc',
                32:'space', 33:'pageup', 34:'pagedown', 35:'end', 36:'home', 37:'left', 38:'up', 39:'right',
                40:'down', 45:'insert', 46:'del',
                59:";",
                92:"winkey", 93:"contextmenu", 96:'0', 97:'1', 98:'2', 99:'3',
                100:'4', 101:'5', 102:'6', 103:'7', 104:'8', 105:'9', 106:'*', 107:'+', 109: '-',
                110:'.', 111:'/', 112:'f1', 113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8',
                120:'f9', 121:'f10', 122:'f11', 123:'f12',
                145:'scroll', 144:'numlock',
                188:",", 189:"-",
                190:".", 191:'/', 192:"`",
                219:"[",
                221:"]", 222:"'"
            };

            var shiftKeys = {
                "`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^",
                "7":"&", "8":"*", "9":"(", "0":")", "-":"_", "=":"+", "\\":"|",
                "[":"{", "]":"}",
                ";":":", "'":"\"",
                ",":"<", ".":">", "/":"?"
            };

            var _kc = event.keyCode || event.which;
            var special = specialKeys[_kc];
            var char = special || String.fromCharCode(_kc).toLowerCase();

            // 当没有按住Shift键并且设置了区分大小写时返回小写
            // 否则全部返回大写
            char = event.shiftKey
            ? (shiftKeys[char] || String.fromCharCode(_kc)).toUpperCase()
            : options.caseSensitive ? char : char.toUpperCase();

            //alert(kc+" : "+ (!e.shiftKey ? special : shiftKeys[char]));
            return char;
        }

        // 收集到条形码后执行回调函数
        function success (code) {
            code = code||this.toString();
            if(typeof options.callback == "function") options.callback.call($this,code);
        }

        // 判断是否是开始字符
        function isStartKey (event) {
            return options.startKey.toLowerCase()==getKey(event).toLowerCase();
        }

        // 判断是否是结束字符
        function isEndKey (event) {
            return options.endKey.toLowerCase()==getKey(event).toLowerCase();
        }

        // 判断是否已经开启收集功能
        function isActive () {
            return _discern;
        }

        // 开启条形码收集
        function active () {
            _discern=true;
        }

        // 停止条形码收集
        function still () {
            _discern=false;
        }

        // 向条形码存储器添加字符
        function add (event) {
            var code = getChar(event);
            //if(/^[A-Za-z0-9]{1}$/.test(code)){
            code && _code.push(code);
            //}
        }

        // 清空临时存储器
        function clear () {
            _code = [];
        }
    }

    // 接口
    Barcode.prototype={
        disable  : function(){},
        enable   : function(){},
        toggle   : function(){},
        isEnable : function(){},
        toString : function(){}
    }
})();
```
