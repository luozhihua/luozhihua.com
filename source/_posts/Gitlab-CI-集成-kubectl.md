---
title: Gitlab-CI 集成 kubectl
layout: post
categories: 笔记
comments: true
thumbnail: //res.luozhihua.com/static/images/thumbs/gitlab-kubectl.png?imageView2/1/w/345/h/163
description: ''
date: 2018-12-20 02:29:14
updated: 2018-12-20 02:29:14
tags:
  - Gitlab
  - CI
  - kubectl
  - Kubernetes
banner:
---

# 环境与预备条件：

1. gitlab 官方托管或私有的管理员账号；
2. Kubernetes集群管理员或能使用 kubectl  操作集群权限的账号；
3. gitlab-ci  环境要求可以执行 kubectl  命令；

# 步骤

#### 1. 获取 kubeconfig

 SSH 登录 k8s master 节点，使用以下命令把 /etc/kubernetes/admin.conf内容输出为 base64 格式：

```
cat /etc/kubernetes/admin.conf | base64
```

#### 2. 将上面获取到的 base64 字符串保存为gitlab  ci/cd 的变量；

1.1 浏览器登录到 gitlab；
1.2 进入Groups > your group > Settings > CI/CD,  然后展开右侧的 变量（Variables）；
1.3 如下图所示，变量名自定义，我用的是 `kube_config`, 在后面的 gitlab-ci.yaml  文件中会用到，变量值填入上面获取到的 base64 字符串，然后点绿色按钮保存即可；

![image.png](https://upload-images.jianshu.io/upload_images/2544460-962abec78b7148a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们把变量`kube_config`设置在 Group 级别，因此，在所有归属此 Group 的项目的`gitlab-ci.yml` 文件中都能读取到变量`kube_config`, 如果只想为单个项目设置 kubectl  访问权限，可以进入项目页面的 Settings > CI/CD > Variables  设置，操作方法类似；

#### 3. gitlab-ci.yml  设置

```yaml
before_script:
  - mkdir -p /root/.kube
  - echo ${kube_config} | base64 -d > /root/.kube/config     # 将 kube_config 变量转码后存入文件：/root/.kube/config
  - export KUBECONFIG=/root/.kube/config                     # 设置 kubectl  命令的默认配置文件地址
  - kubectl version                                          # 测试是否可以访问 kube-apiserver
```