---
title: jquery.jstree选中或取消选中节点
layout: post
categories: 技术
comments: true
thumbnail: http://oezzzs8eh.bkt.clouddn.com/static/images/thumbs/jstree-checkbox.jpg?imageView2/1/w/345/h/163
description: ''
date: 2016-10-24 13:14:42
updated: 2016-10-24 13:14:42
tags:
banner:
---

{% qnimg thumbs/jstree-checkbox.jpg title: alt: 'class:class1 class2' extend:?imageView2/2/w/600 %}

jQuery.jstree组件有个checkbox的plugin，支持在treeview的每个节点前显示一个checkbox，对于后台管理系统UI和交互这是个非常有价值的功能，但是官方除了一个简单的实例却没有详细的文档说明，让很多开发者饶了不少弯，下面是我使用时发现的一些常用方法。

###. 官方的checkbox Demo：
```html 
    <div id="jstreeContainer"></div>
    <script>
        jQuery(function($) {

            $("#jstreeContainer").jstree({
                "core": {
                    'data': [
                       {"id": "id1", "parent": "#", "text": "Root node", "state": {
                            "opened": true,
                            "selected": true
                       }},
                       {"id": "id2", "parent": "#", "text": "Root node 2" },
                       {"id": "id3", "parent": "id2", "text": "Child 1" },
                       {"id": "id4", "parent": "id2", "text": "Child 2" },
                    ]
                },
                "checkbox": {
                    "keep_selected_style": true
                },
                "plugins": [ "checkbox" ]
            });

        });
    </script>
```

### 默认选中jstree的指定节点:
```javascript
    // 选中单个节点
    $("#jstreeContainer").jstree('check_node', 'id1');
    
    // 批量选中节点
    $("#jstreeContainer").jstree('check_node', ['id1', 'id2', 'id4']);
```

### 取消选中jstree的指定节点:
```javascript
    // 取消选中单个节点
    $("#jstreeContainer").jstree('uncheck_node', 'id1');
    
    // 批量取消选中节点
    $("#jstreeContainer").jstree('uncheck_node', ['id1', 'id2', 'id4']);
```

### 选中jstree的所有节点:
```javascript
$("#jstreeContainer").jstree('check_all');
```

### 取消选中jstree的所有节点:
```javascript
$("#jstreeContainer").jstree('uncheck_all');
```

### 获取被选中的节点:
```javascript
var checkedNode = $("#jstreeContainer").jstree('get_checked');
console.log(checkedNode);
```

我看到网上很多开发者在问一些如何默认选中节点的问题，没有看到一个完全可用的答案，比如如何选中checkbox，甚至有人回答说通过JS给节点增加css classname: `node_checked`，这个完全是治标不治本的做法，其实根本没有选中想要的节点，只是改变了tree node上的Checkbox的外观，当你调用`$("#jstreeContainer").jstree("get_checked")`获取已选中节点时，就会发现获取到的结果永远是一个空数组，jstree获取被选中节点的原理是读取JSON数据`this._data.checkbox.selected`中的节点，而不是判断节点的css classname有没有被选中。

- JSTree 源码: https://github.com/vakata/jstree
- JSTree 官网: http://jstree.com