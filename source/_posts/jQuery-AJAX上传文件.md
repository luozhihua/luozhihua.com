---
title: jQuery AJAX上传文件
tags:
  - AJAX
  - jQuery
id: 170
date: 2010-09-09 23:32:12
---

在上传文件时，经常需要填写表单的其他信息，很多时候都是用iframe来实现的，如果通过jquery的ajax_upload插件来完成就没有 那些问题了。

1.首先去[下载插件](http://valums.com/s/p/ajax-upload/jquery.ajax_upload.0.3.js)

2.包含文件

```html
<script src="path-to-jquery.js"></script>
<script src="path-to-jquery.ajax_upload.0.3.min.js"></script>
```

3.调用方法：

```javascript
$.ajax_upload('#example3_button', {
    action : 'upload.php',// 处理页面
    name: 'myfile', // 文件名
    onSubmit : function(file, ext){
        var allowed = ['jpg', 'png', 'gif', 'jpeg'];//----允许格式
        if ($.inArray(ext, allowed ) === -1) {
            $('#example3_message').text('Error: only images are allowed');

            return false;
        }

        $('<li></li>').appendTo($('#example3_files')).text(file);
    },
    
    onSuccess : function(file){
        $('#example3_message').text(file + ' uploaded');
    },

    onError : function(file, response){
        $('#example3_message').text(response);
    }
});
```

html 页面

```html
<div id="example3">
    <p>3\. You can allow only certain file types</p>
    <div id="example3_wrapper">
        <div id="example3_button">Upload</div>
    </div>
    <p id="example3_message"></p>
</div>
```

4.php处理页面

```php
$uploaddir = '/var/www/uploads/';
$uploadfile =  $uploaddir.basename($_FILES['userfile']['name']);

if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    echo "success";
} else {
    echo "error";
}
```
