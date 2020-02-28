---
title: Ubuntu Docker代理和镜像配置方法
layout: post
categories: 技术
comments: true
thumbnail: >-
  //res.luozhihua.com/static/images/thumbs/docker-proxy-mirrors.png?imageView2/1/w/345/h/163
description: ''
date: 2020-02-28 18:44:03
updated: 2020-02-28 18:44:03
tags:
  - Ubuntu
  - Docker
  - proxy
  - mirror
  - 代理
  - 镜像
banner:
---

## Docker 配置镜像
```shell
vi /etc/docker/daemon.json
```
增加 “registry-mirrors”：
```json
{
  // ... 省略其他配置
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://registry.docker-cn.com",
    "https://reg-mirror.qiniu.com"
  ]
}
```
然后重启 **docker** 服务：
 `systemctl restart docker.service`

## Docker 代理配置
```bash
$> cd /etc/systemd/system/docker.service.d # 此目录如果不存在则请手动创建
$> ls -al ./

drwxr-xr-x  2 root root 4096 Feb 28 18:22 .
drwxr-xr-x 17 root root 4096 Feb 24 15:53 ..
-rw-r--r--  1 root root  157 Feb 28 18:21 http-proxy.conf
-rw-r--r--  1 root root  158 Feb 28 18:22 https-proxy.conf
```

目录`/etc/systemd/system/docker.service.d`不存在的话请手动创建，并在此目录下创建两个文件：`http-proxy.conf` 和 `https-proxy.conf`;
`http-proxy.conf`增加以下内容:
```conf
[Service]
Environment="HTTP_PROXY=http://192.168.31.100:8118/" "NO_PROXY=localhost,127.0.0.1,*.edu.cn,*.docker-cn.com,*.qiniu.com"
```
`https-proxy.conf`增加以下内容:
```conf
[Service]
Environment="HTTPS_PROXY=http://192.168.31.100:8118/" "NO_PROXY=localhost,127.0.0.1,*.edu.cn,*.docker-cn.com,*.qiniu.com"
```

重启 Docker服务：
```bash
$> systemctl daemon-reload
$> systemctl restart docker.service
```
