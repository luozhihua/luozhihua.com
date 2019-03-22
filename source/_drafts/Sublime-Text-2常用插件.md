---
title: Sublime Text 2常用插件
tags:
  - Sublime Text
id: 1153
categories:
  - 笔记
date: 2013-08-14 18:56:17
---

1. package control

我们用sublime几乎都会首先安装这个插件，这个插件是管理插件的功能，先安装它，再安装其他插件就方便了。  安装方法：
点击sublime的菜单栏 view->show console(ctrl+`) 现在打开了控制台， 这个控制台有上下两栏， 上面一栏会实时显示sublime执行了什么插件，输出执行结果， 如果你安装的某个插件不能正常运行，应该先在这里看看有没有报错。下面栏是一个输入框，可以运行python代码。我们输入下面的代码点击回车运行， 就能安装好package control了.<!--more-->

```
import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ',' ')).read())
```

然后我们按住 ctrl+shift+p。此时会输出一个输入框， 输入install。  选择package contrl： install package 回车 ，需要稍定一会儿，右下角状态栏会显示正在连接的提示文字。 使用sublime时注意看右下角状态栏，很多插件的提示信息都显示在这里，这个状态栏很小，初次使用的人都有可能没有注意到它

如果要卸载插件， ctrl+shift+p 输入 remove， 选择package control:remove package 然后再选择已安装的插件， 回车即可卸载。

如果package control 安装插件时失败了， 我们可以采用手动安装的方式， 在google上去搜索插件， 下载插件的源代码。在sublime的菜单栏点击 preferences->Browse package..  此时会打开插件目录。然后把你下载的插件源代码复制进去就可以了。

### 2\. emmet (ex - zencoding)

敲打html和css神器啊，强烈推荐。在window显示下方输入框命令是ctrl+alt+enter.在mac下面是control+alt+enter.

### 3\. ctags

这个插件能跨文件跳转，跳转到指定函数声明的地方。 使用package control 搜索ctags 进行安装（安装ctags插件就可以了， 还有一个 CTags for PHP 插件没什么用）。注意安装好插件后要需要安装ctags命令。window 下载ctags.exe  [http://vdisk.weibo.com/s/7QZd7](http://vdisk.weibo.com/s/7QZd7) 。 将ctags.exe文件放在一个环境变量能访问到的地方。打开cmd， 输入ctags，如果有这个命令，证明成功了。 ubuntu下安装运行命令：sudo apt-get install exuberant-ctags 。

然后在sublime项目文件夹右键， 会出现Ctag:Rebuild Tags 的菜单。点击它，然后会生成.tags的文件。

### 4\. sublimecodeintel 代码提示

sublime默认的代码提示只能提示系统函数，用户自己创建的函数、类不能提示。 如果想要提示自己建立的函数。 可以安装sublimecodeintel插件。
sublimecodeintel 安装后需要配置，文件：编辑~/.codeintel/config

```json
{
    "PHP": {
        "php": '/usr/local/php/bin/php',
        "phpExtraPaths": [],
        "phpConfigFile": '/etc/php.ini'
    },
    "JavaScript": { 
        "javascriptExtraPaths": []
    }
}
```

### 5\. 错误语法提示sublimelint 和 Phpcs

我们需要在写代码的时候如果有语法错误，能立即提示我们， 可以安装这两个插件：sublimelint 和Phpcs ， sublimeint 需要系统有php命令。 所以需要设置好php的环境变量。 sublimelint的语法错误提示是显示在状态栏上面的，所以在编写程序的时候注意时常看看状态栏。 而Phpcs的语法错误提示是在我们保存文件时弹出万能面板显示错误，sublimelint的错误提示实时但不明显。 Phpcs的错误提示不是实时的，但很明显。 因此我们一般这两个插件都要安装。

### 6\. goto document

这个插件能帮助我们快速查看手册。 比如我们在写php代码时， 突然忘记了某个函数怎么用了，将鼠标放在这个函数上，然后按F1，它能快速打开PHP手册中说明这个函数用法的地方。
安装好 goto document插件后我们再配置快捷键F1 跳转到文档。 打开sublime的菜单栏Preferences->key bindings -User  设置快捷键：


```json
[
    {
        "keys": ["f1"],
        "command": "goto_documentation"
    }
]
```

### 7\. function name display

这个插件可以在状态栏显示出当前光标处于哪个函数中

### 8\. GBK Encoding Support

sublime本身不支持GBK编码， 可以安装这个插件让它支持。

### 9\. SVN插件

windows下可以安装Tortoise和 Tortoisesvn的客户端。然后在sublime中在目录或文件右键都可以提交svn了。 在ubuntu下可以安装rabbitvcs 结合这个插件：[https://github.com/kervin/sublime-svn/downloads](https://github.com/kervin/sublime-svn/downloads) 实现同样的功能。

### 10\. 代码注释格式化 additional PHP snippet和 DocBlockr

additional PHP snippet插件能提示phpdocument格式的代码，还能快速输出开源协议， 输入php- 会有提示。
安装DocBlockr 插件，能形成注释块，输入/**然后回车，会有惊喜哦。

### 11.成对匹配的增强 BracketHighlighter

像这些符号是成对的：花括号{}， 中括号[],括号：() ，引号“” 等。 这些符号当我们鼠标放在开始符号的位置的时候， 希望能明显看到结尾符号在哪儿sublime默认是下划线，很不明显， 想要明显一点，可以安装插件  BracketHighlighter。

### 12.格式化PHP代码 php-beautifier

安装 php-beautifier 插件，使用php-beautifier还需要安装 PHP Beutifier的pear包：
pear install PHP_Beautifier

安装好后， 打开PHP文件,ctrl+alt+f 就能为你自动格式化代码。

### 13.Thinkphp

使用框架开发的可以安装此插件，包括CI等都有。

我的配置(preferrences.sublime-settings)：

```json
{
    "color_scheme": "Packages/Color Scheme - Default/Monokai.tmTheme",
    "font_face": "Courier New",
    "font_size": 11,
    "highlight_line": true,
    "ignored_packages": ["Vintage"],
    "theme": "Soda Light.sublime-theme",
    "word_wrap": true
}
```
