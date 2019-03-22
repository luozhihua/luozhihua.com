---
title: 终于解决“Git Windows客户端保存用户名与密码”的问题
tags:
  - Git Server
id: 1122
categories:
  - 笔记
date: 2013-07-06 00:46:19
---

[转自] [http://www.cnblogs.com/dudu/archive/2011/07/06/git_save_username_password.html](http://www.cnblogs.com/dudu/archive/2011/07/06/git_save_username_password.html)

自从上次[用 Bonobo Git Server 搭建好 Git 服务器](http://www.cnblogs.com/dudu/archive/2011/06/24/git_on_windows.html)，博客园开发团队就将源代码管理工具从SVN切换至Git。

传说中的Git果然名不虚传：速度快，想分就分，想合就合（分支管理方便）...

但有一个地方不爽，很不爽：每次Pull或Push时都要输入用户名与密码，无法保存用户名与密码。<!--more-->

开始干活：

1\. 先从服务器端下手，下载Bonobo Git Server的源代码看一下服务器端是如何验证的。

web.config中就有答案，原来用的是http basic authentication。
<div>
<div></div>
<div><a title="复制代码"><span style="line-height: 16px;">&lt;location path="Git.aspx"&gt;</span></a></div>
<div>    &lt;system.web&gt;
&lt;authorization&gt;
&lt;allow users="?" /&gt;
&lt;/authorization&gt;
&lt;/system.web&gt;
&lt;/location&gt;</div>
<div></div>
</div>
有了这个答案就可以和服务器端说88，并投入客户端的怀抱...

2\. 客户端用的是msysgit+TortoiseGit，TortoiseGit只是壳，msysgit才是真相。

pull与push操作实际上都是调用msysgit中的git pull与git push命令，但git命令并没有传递用户名与密码的参数。

怎么办？... 问Google呗，对Google说话要精炼，不能哆嗦，我是这样说的：“git username password”；还是Google给力，第1页最后1条就给出了线索 —— [Setup a remote git repository using http with push support and digest auth](http://www.mabishu.com/blog/2011/02/09/setup-a-remote-git-repository-using-http-with-push-support-and-digest-auth/)，见下图：

![](http://pic002.cnblogs.com/images/2011/1/2011070614410252.jpg)

虽然Google出来的文章是针对Linux的，但不要轻易认为问题是Windows下的，对Linux下的解决方法看都不看一眼。直接找到答案很难，更多的时候我们是在找线索，并在发现的蛛丝马迹中不断地思考可能的解决方法。

这里的“.netrc”就是线索，利用这个线索继续对Google说：“git netrc windows”...

第1页第5个，"Stack Overflow"的大名映入眼帘：

[Git - How to use netrc file on windows - Stack Overflow](http://stackoverflow.com/questions/6031214/git-how-to-use-netrc-file-on-windows)

Google再怎么+1也比不上品牌的力量，看到Stack Overflow，就看到了希望，就有点击的冲动。

点开一看，立即有“百度”（这里是“众里寻她千百度”的缩写）的感觉：

![](http://pic002.cnblogs.com/images/2011/1/2011070615040764.jpg)

这就是正确答案，我们已经验证过了，下面详细描述一下解决方法：

1\. 在Windows中添加一个HOME环境变量，值为%USERPROFILE%，如下图：

![](http://pic002.cnblogs.com/images/2011/1/2011070615112192.jpg)

2\. 在“开始》运行”中打开%Home%，新建一个名为“_netrc”的文件。

3\. 用记事本打开_netrc文件，输入Git服务器名、用户名、密码，并保存。示例如下：
<div>
<div>machine git.cnblogs.com
login cnblogs_user
password cnblogs_pwd</div>
</div>
问题解决，Git更给力了！