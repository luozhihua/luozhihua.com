---
title: 利用openssl完成X509证书和PFX证书之间的互转
id: 1115
categories:
  - 笔记
date: 2013-06-30 13:05:15
tags:
---

完成两种格式的数字证书的互转，只需要几条openssl的命令，很方便。

1.将X509格式的数字证书转换成微软的PFX格式

```shell
openssl pkcs12 -export -inkey server.key -in server.crt -out server.pfx
```

2.将微软的PFX数字证书转换成X509格式

```shell
openssl pkcs12 -in server.pfx -nodes -out server.pem # 生成明文所有内容
openssl rsa -in server.pem -out server.key # 取 key 文件
openssl x509 -in server.pem -out server.crt # 取证书
```