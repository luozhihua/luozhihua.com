---
title: Mac 10.14.4 Beta安装Travis命令行失败解决方法
layout: post
categories: 未分类
comments: true
thumbnail: //res.luozhihua.com/static/images/thumbs/xxx.jpg?imageView2/1/w/345/h/163
description: ''
date: 2019-03-22 12:19:16
updated: 2019-03-22 12:19:16
tags:
banner:
---

Mac 上使用 gem 安装 Travis 时报错：

```bash
ERROR:  Error installing travis:
	ERROR: Failed to build gem native extension.

    current directory: /usr/local/lib/ruby/gems/2.5.0/gems/ffi-1.9.23/ext/ffi_c
/usr/local/opt/ruby/bin/ruby -r ./siteconf20180305-50317-1bqw1ti.rb extconf.rb
checking for ffi.h... *** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
	--with-opt-dir
	--with-opt-include
	--without-opt-include=${opt-dir}/include
	--with-opt-lib
	--without-opt-lib=${opt-dir}/lib
	--with-make-prog
	--without-make-prog
	--srcdir=.
	--curdir
	--ruby=/usr/local/Cellar/ruby/2.5.0_2/bin/$(RUBY_BASE_NAME)
	--with-ffi_c-dir
	--without-ffi_c-dir
	--with-ffi_c-include
	--without-ffi_c-include=${ffi_c-dir}/include
	--with-ffi_c-lib
	--without-ffi_c-lib=${ffi_c-dir}/lib
	--with-libffi-config
	--without-libffi-config
	--with-pkg-config
	--without-pkg-config
/usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:456:in `try_do': The compiler failed to generate an executable file. (RuntimeError)
You have to install development tools first.
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:590:in `try_cpp'
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:1097:in `block in have_header'
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:947:in `block in checking_for'
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:350:in `block (2 levels) in postpone'
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:320:in `open'
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:350:in `block in postpone'
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:320:in `open'
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:346:in `postpone'
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:946:in `checking_for'
	from /usr/local/Cellar/ruby/2.5.0_2/lib/ruby/2.5.0/mkmf.rb:1096:in `have_header'
	from extconf.rb:16:in `<main>'

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /usr/local/lib/ruby/gems/2.5.0/extensions/x86_64-darwin-17/2.5.0/ffi-1.9.23/mkmf.log

extconf failed, exit code 1
```

查看日志文件`/usr/local/lib/ruby/gems/2.5.0/extensions/x86_64-darwin-17/2.5.0/ffi-1.9.23/mkmf.log`发现以下问题：

```bash
/System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/include/ruby-2.0.0/ruby/ruby.h:24:10: fatal error: 'ruby/config.h' file not found
#include "ruby/config.h"
^
1 error generated.
make: *** [generator.o] Error 1
```

解决方法：

```bash
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
open /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg
```