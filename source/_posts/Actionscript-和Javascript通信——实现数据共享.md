---
title: Actionscript 和Javascript通信——实现数据共享
tags:
  - Actionscript
  - Javascript
id: 201
categories:
  - 技术
date: 2010-09-09 23:56:09
---

<pre class="brush:javascript">
`
/* Javascript */
var member = {
	colin :{sex:"male", age:"21", city:"gz"},
	lucy  :{sex:"female", age:"18", city:"gz"}
};
function getInfo(name){
	return member[name];
}
`</pre>
<pre class="brush:javascript">
`
/* ActionScript */
import flash.external.ExternalInterface;
var mem = ExternalInterface.call("getInfo('colin')");
/* 上行的“mem”就是Javascript返回的参数 */
`
</pre>