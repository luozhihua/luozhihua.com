---
title: 用OpenSSL命令行生成证书文件
tags:
  - OpenSSL
id: 1117
categories:
  - 技术
date: 2013-06-30 14:05:21
---

证书文件生成

也许很多人和本人一样深有体会，使用OpenSSL库写一个加密通讯过程，代码很容易就写出来了，可是整个工作却花了了好几天。除将程序编译成功外（没有可以使用的证书文件，编译成功了，它并不能跑起来，并不表示它能正常使用，所以......）,还需生成必要的证书和私钥文件使双方能够成功验证对方。
找了n多的资料，很多是说的很模糊，看了n多的英文资料，还是没有办法（不知道是不是外国朋友都比较厉害，不用说明得太清？），无意间找到yawl(yawl@nsfocus.com)写的文章，难得的汉字（呵呵）。里面有生成证书部分，说到生成了Certificate Signing Request (CSR)文件后，就有点不太清楚了。后面生成自签字证书在很多地方都可以找到的，签名这部分，yawl说mod_ssl有比较好的脚本，但是笔者一时找不到，就自己用openssl的ca命令来完成了，也不是很麻烦。

说说本人的操作环境：无盘工作站（有权限问题使用起来不太方便），操作目录是openssl/bin（没办法改不了环境变量，如果你可以改的话，就不用在这个目录下工作了），为了方便本人把apps下的openssl.cnf也复制到了这个目录下来。文件名都是以本人使用的来说了：

1.首先要生成服务器端的私钥(key文件):
openssl genrsa -des3 -out server.key 1024
运行时会提示输入密码,此密码用于加密key文件(参数des3便是指加密算法,当然也可以选用其他你认为安全的算法.),以后每当需读取此文件(通过openssl提供的命令或API)都需输入口令.如果觉得不方便,也可以去除这个口令,但一定要采取其他的保护措施!
去除key文件口令的命令:
openssl rsa -in server.key -out server.key

2.openssl req -new -key server.key -out server.csr -config openssl.cnf
生成Certificate Signing Request（CSR）,生成的csr文件交给CA签名后形成服务端自己的证书.屏幕上将有提示,依照其指示一步一步输入要求的个人信息即可.

3.对客户端也作同样的命令生成key及csr文件:
openssl genrsa -des3 -out client.key 1024
openssl req -new -key client.key -out client.csr -config openssl.cnf

4.CSR文件必须有CA的签名才可形成证书.可将此文件发送到verisign等地方由它验证,要交一大笔钱,何不自己做CA呢.
openssl req -new -x509 -keyout ca.key -out ca.crt -config openssl.cnf

5.用生成的CA的证书为刚才生成的server.csr,client.csr文件签名:
Openssl ca -in server.csr -out server.crt -cert ca.crt -keyfile ca.key -config openssl.cnf
Openssl ca -in client.csr -out client.crt -cert ca.crt -keyfile ca.key -config openssl.cnf

现在我们所需的全部文件便生成了.

另：
client使用的文件有：ca.crt,client.crt,client.key
server使用的文件有：ca.crt,server.crt,server.key
.crt文件和.key可以合到一个文件里面，本人把2个文件合成了一个.pem文件（直接拷贝过去就行了）