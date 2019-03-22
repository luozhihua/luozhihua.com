---
title: Ubuntu 定时任务
id: 1214
categories:
  - 笔记
date: 2014-05-06 23:44:16
tags:
---

crontab命令的功能是在一定的时间间隔调度一些命令的执行。

在/etc目录下有一个crontab文件，这里存放有系统运行的一些调度程序(还有cron.d/ cron.deny cron.monthly/ cron.weekly/cron.daily/ cron.hourly/ crontab)。每个用户可以建立自己的调度crontab(/var/spool/cron 每个用户的文件以自己的名字命名 crontab -u someone -e)。<!--more-->
crontab命令有三种形式的命令行结构：

crontab [-u user] [file]
crontab [-u user] [-e|-l|-r]
crontab -l -u [-e|-l|-r]

第一个命令行中，file是命令文件的名字。如果在命令行中指定了这个文件，那么执行crontab命令，则将这个文件拷贝到crontabs目录下；如果在命令行中没有制定这个文件，crontab命令将接受标准输入（键盘）上键入的命令，并将他们也存放在crontab目录下。

命令行中-r选项的作用是从/var/spool/cron/crontabs目录下删除用户定义的文件crontab；
命令行中-l选项的作用是显示用户crontab文件的内容。

crontab -u user -e命令: 编辑用户user的cron(c)作业。用户通过编辑文件来增加或修改任何作业请求。
crontab -u user -r命令: 删除当前用户的所有的cron作业。

作业与它们预定的时间储存在文件/var/spool/cron/crontabs/username里。

username使用户名，在相应的文件中存放着该用户所要运行的命令。命令执行的结果，无论是标准输出还是错误输出，都将以邮件形式发给用户。文件里的每一个请求必须包含以spaces和tabs分割的六个域。前五个字段可以取整数值，指定何时开始工作，第六个域是字符串，称为命令字段，其中包括了crontab调度执行的命令。

1\. 使用crontab -e命令

这个命令的使用比较简单。直接输入

~# crontab -e

第一次运行,可能要求你选择文本编辑软件,系统推荐使用nano编辑器

nano基本使用命令:

ctrl + o : 保存

ctrl + x : 退出

系统打开一个编辑窗口，第一行会有内容格式的提示：

# m h  dom mon dow   command
具体意义表示：

分钟 小时 日期 月份 星期 命令

在某月（mon）的某天（dom）或者星期几（dow）的几点（h，24小时制）几分（m）执行某个命令（command）

*表示任意时间

注意:一行为一个任务,共计6个参数,通过5个空格或者tab键分隔

</div>
前五个参数取值范围:</div>
m:      0～59  表示分</div>
h:      1～23  表示小时</div>
dom: 1～31  表示日</div>
mon: 1～12  表示月份</div>
dow:  0～6    表示星期（其中0表示星期日）</div>

eg：

<div class="dp-highlighter bg_plain" style="color: #000000;">
<div class="bar">
<div class="tools" style="color: silver;">**[plain]** [view plain](http://blog.csdn.net/tianhuadihuo/article/details/6620376# "view plain")[copy](http://blog.csdn.net/tianhuadihuo/article/details/6620376# "copy")</div>
</div>
</div>
<div></div>

#每小时的03时执行/home/meng/下的hello.sh脚本  
3 * * * * /home/meng/hello.sh  
  
#MIN HOUR DAY MONTH DAYOFWEEK COMMAND  
#每天早上6点10分  
10 6 * * * date  
  
#每两个小时  
0 */2 * * * date  
  
#晚上11点到早上8点之间每两个小时，早上部点  
0 23-7/2,8 * * * date  
  
#每个月的4号和每个礼拜的礼拜一到礼拜三的早上11点0分  
0 11 4 * mon-wed date  
  
#1月份日早上4点  
0 4 1 jan * date  
19.20.  #每隔5分钟更新本机IP到DNSPOD (动态域名解析)
21.  */5 * * * * /data/kuaipan/ubuntu/ddns-dnspod.sh
**[plain]** [view plain](http://blog.csdn.net/tianhuadihuo/article/details/6620376# "view plain")[copy](http://blog.csdn.net/tianhuadihuo/article/details/6620376# "copy")</div>
</div>
</div>
<div></div>

#MIN HOUR DAY MONTH DAYOFWEEK COMMAND  
10 6 * * * date  
0 */2 * * * date  
0 23-7/2,8 * * * date  

 

在保存之后，根据屏幕下面的提示输入Ctrl+X退出，此时会提示是否保存，输入Y；提示输入文件名，并且有一个临时的文件名，由于只是测试，直接回车保存。

注意：在完成编辑以后，要重新启动cron进程：

~# /etc/init.d/cron restart

或者使用 sudo service cron restart

观察运行结果，会发现hello.sh会每隔一小时，在03分时被执行一次。

在使用这个命令时，最大的担心就是在系统重启以后是否还能顺利执行呢？我重启系统以后发现一切正常，于是打消了这个顾虑。但是，仍然有一个问题，一般情况下，服务器都是在重启后处于登录状态下，并没有用户登入。那么如果我在执行crontab -e命令时，不是使用root账户，那么在系统重启之后是否还会顺利执行呢？

2\. 编辑crontab文件

crontab位于/ect/文件夹，在[http://wiki.ubuntu.org.cn/CronHowto](http://wiki.ubuntu.org.cn/CronHowto)上有关于它的详细介绍，但是我看的不是太懂。

打开crontab文件，如果没有编辑过可以看到如下类似的内容：

<div class="highlighter dp-highlighter" style="color: #000000;">

# /etc/crontab: system-wide crontab
# Unlike any other crontab you don<span class="string" style="color: blue;">'t have to run the `crontab'
# command <span class="keyword" style="font-weight: bold; color: #006699;">to install the new version when you edit this <span class="keyword" style="font-weight: bold; color: #006699;">file
# <span class="keyword" style="font-weight: bold; color: #006699;">and files <span class="keyword" style="font-weight: bold; color: #006699;">in /etc/cron<span class="number">.d. These files also have username fields,
# that none <span class="keyword" style="font-weight: bold; color: #006699;">of the other crontabs <span class="keyword" style="font-weight: bold; color: #006699;">do.
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
# m h dom mon dow user  command
<span class="number">17 *    * * *   root    cd / &amp;&amp; run-parts --report /etc/cron<span class="number">.hourly
<span class="number">25 <span class="number">6    * * *   root    test -x /usr/sbin/anacron || ( cd / &amp;&amp; run-parts --report /etc/cron<span class="number">.daily )
<span class="number">47 <span class="number">6    * * <span class="number">7   root    test -x /usr/sbin/anacron || ( cd / &amp;&amp; run-parts --report /etc/cron<span class="number">.weekly )
<span class="number">52 <span class="number">6    <span class="number">1 * *   root    test -x /usr/sbin/anacron || ( cd / &amp;&amp; run-parts --report /etc/cron<span class="number">.monthly )
 
</div>

由于对脚本的认知有限，不能详细解释每个命令的含义。在第10行，同样定义了文件内容的格式。可以看到比使用crontab -e命令时，多了一个user。它表示了执行命令的用户，如果是root，就表明是系统用户。于是，我加了如下一行：

3 * * * * root /home/meng/hello.sh

然后保存文件。

这时需要的注意是，要重新启动系统，修改才能起作用。（只重启cron守护进程可以吗？）如果以前使用crontab -e进行了修改，建议先注释掉，不然就不知道是哪个方法在起作用了。

当然，结果也在意料之中，脚本定时顺利执行。

虽然解决了问题，但是还有一个疑问：

<span style="color: #0000ff;">在一篇文章中看到，run-parts参数是表示执行文件夹下的所有文件，也就是说，上面的内容可以写成：

<span style="color: #0000ff;">3 * * * * root run-parts /home/meng

<span style="color: #0000ff;">不过，我在测试中好像并没有达到预想结果，也许是我测试步骤出了问题。这里做个记号。