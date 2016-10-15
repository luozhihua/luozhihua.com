---
title: ckeditor中获取选中的内容
tags:
  - Javascript
id: 765
categories:
  - 笔记
date: 2011-12-24 11:12:22
---

    
    (function(global) {

        /**
         * Tips: 如果页面重置了document.domain, 可能会导致跨域而无法正确获取内容；
         */

        // "content"为创建CKEditor时指定的名称
        var editor = FCKeditorAPI.GetInstance('content');
        var selectedText;

        // 非IE浏览器
        if (window.getSelection) {
            selectedText = editor.EditorWindow.getSelection();
        } else {
            // IE浏览器
            selectedText = editor.EditorDocument.selection.createRange().text;
        }

    }(this));
    