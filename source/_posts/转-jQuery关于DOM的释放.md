---
title: '[转] - jQuery关于DOM的释放'
categories:
  - 技术
tags:
  - jQuery
id: 192
date: 2010-09-09 23:51:36
---

<div id="blog_text">
<div>
<div>**原文地址：[http://heatspace.cn/?p=205](http://heatspace.cn/?p=205)**
项目进入尾声，又是最恐怖的性能测试 (对着JS的性能测试我只能做这个表情 -_-!   )

经过多次的代码检查和测试，确认已经把自己定的变量什么的一大堆都已经用_null_处理，并且没有明显的循环引用，但结果进行用户某一动作时，内存还是没被全部回收，而是线性增加，最后发现，问题都是出现在DOM身上

主要是太相信JQuery的_empty()_和 _remove()_,以为他们会把DOM都清理了，结果浪费了我两天的时间 orz ..

但结果是_empty()_是调用_remove()_来进行清空的，而_remove()_则是先清理所有选中的对象及其子对象的所有事件和属性，再使用removeChild()删除自己，而问题就是出现在这里

经在IE6下测试，_removeChild()_有两个很重要特性：

第一，他不会删除DOM中的事件
第二，他不会真正删除（释放）指定对象中的子对象

而JQuery就是犯了第二条， 结果所有子对象都成为了不在DOM树中的“游离子DOM树”,这时JS是无能为力了(因为已经没有引用地址，例如变量名)，即使使用CollectGarbage();都不能释放内存

解决方案(伪代码)：
jQuery( “*”, obj).add([obj]).each(function(){

jQuery.event.remove(this);
jQuery.removeData(this);
});
obj.innerHTML = “”;
PS.:
上面代码意思是：使用JQuery把指定对象及所有子对象的事件和属性去除，这是由于使用_innerHTML_和_removeChild()_一样也不能清除对象的事件，然后使用_innerHTML=”"_ 来清空内容，使用_innerHTML=”_能把所有子对象都完全清空，问题解决

最后多谢我的两位同事**志哥**和**浩哥**提供的技术支持

特别多谢另一位同事**林立**哥哥，没了他就不会有这篇Blog

</div>
</div>
</div>