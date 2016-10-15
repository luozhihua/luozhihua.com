---
title: Ubuntu添加开机启动服务
tags:
  - ubuntu
  - 开机启动
  - 服务
id: 1125
categories:
  - 技术
date: 2013-07-28 01:14:21
---

剛好遇到這個問題，但網路上的解，錯誤百出（到底有沒有實際run 過呀～～）,因此在這裡寫下小弟的小小心得，要在 /etc/init.d資料下撰寫一個shell script檔，去執行你要執行的指令，我用shell script去啟動另一個shell script，並且執行java程式，以達到開機時，啟動程式。<!--more-->

假設我在`/etc/init.d`下，擺放run_start.sh，run_start.sh 的檔案內容如下

```shell
===============================
#! /bin/sh
sh /var/java/checker.sh
===============================
```

而檔案擺好之後，要去下指令，才能夠奏效。

則需要下:

```shell
sudo update-rc.d run_start.sh defaults 99 1
```

而網路上文章，將defaults寫成為default，或忘記defaults 後面的 99 1
如果出錯了就會出現以下的文字內容：

```text
usage: update-rc.d [-n] [-f] <basename> remove
update-rc.d [-n] <basename> defaults [NN | SS KK]
update-rc.d [-n] <basename> start|stop NN runlvl [runlvl] [...] .
update-rc.d [-n] <basename> disable|enable [S|2|3|4|5]
-n: not really
-f: force
```

可見，他已經教你如何去下指令了。
而因為之前可能下錯，而導致不能再下指令的可能性。
所以先移除原本的，再重新下指令
執行

```shell
sudo update-rc.d -f run_start.sh remove
```

而重開機測試，結果還是沒執行，為什麼
網路文章又教錯你的另一件事，就是剛剛那個run_start.sh，必須設為執行檔，才有效果。
若為執行檔，他的檔案會顯示為綠色，若為捷徑，則為藍色。
因此，將run_start.sh ，設為可執行檔

則下以下指令

```shell
sudo chmod +x /etc/init.d/run_start.sh
```

接著重開機做測試

使用
`sudo reboot`

開機後，登入，檢查程式是否有執行到。

則下

`ps -ef`

來檢查程式是否執行