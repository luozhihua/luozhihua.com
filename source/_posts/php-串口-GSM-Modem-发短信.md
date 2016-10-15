---
title: php 串口+GSM Modem 发短信
tags:
  - PHP
id: 172
categories:
  - 未分类
date: 2010-09-09 23:32:56
---

前几天老板拿来一个短信猫，让我用php做一个发短信的程序，哎，我可是菜鸟，什么都不懂，网上查了很多资料，终于找到了方法：php通过调用串口直接用 短信猫来发短信。

不过虽然源程序在手，但还是不能直接用，期间碰到很多很多问题，发中文短信啊，缺少dio库啊，最后还是解决了。我把代码贴出来，大家有需要的可以参考一 下：

注意几点：

1.必须要有php_dio.dll这个文件，原来我的php是5.2.1的，因为php在5.0的时候已经把dio给去掉了，所有不能用串口了，  说是放在pecl库里了，哎，网上找了半天，才找到php5.2.6和pecl5.2.6，把自己的版本也更新到5.2.6，这样就可以调用串口了

2.发中文遇乱码的问题，在测试的时候都是乱码，后来发现我的文件是utf-8的，改成gb2312就好了

以下是我的程序，我把一些不要的东西去掉了，但可以发短信，在xp+apache+php5.2.6测试成功！

大家可以参考一下原帖[点 击链接](http://happy-net.cn/php/47687.htm)

```php
header('Content-type: charset=gb2312');

function gb2unicode($str) {
    return iconv("gb2312", "UCS-2", $str);
}

function hex2str($hexstring) {
    $str = '';
    for($i=0; $i&lt;strlen($hexstring); $i++){
        $str .= sprintf("%02X",ord(substr($hexstring,$i,1)));
    }
    return $str;
}

function InvertNumbers($msisdn) {
    $len = strlen($msisdn);
    if ( 0 != fmod($len, 2) ) {
        $msisdn .= "F";
        $len = $len + 1;
    }

    for ($i=0; $i&lt;$len; $i+=2) {
        $t = $msisdn[$i];
        $msisdn[$i] = $msisdn[$i+1];
        $msisdn[$i+1] = $t;
    }

    return $msisdn;
}

/*---------------主程序--------------*/
set_time_limit(0);
$DEBUG = 0;
exec('mode COM3: baud=9600 data=8 stop=1 parity=n xon=on');
$fd = dio_open('COM3:', O_RDWR);//opens the file for both reading and  writing.

if (!$fd) {
    die("打开串口COM3失败");
}

$ff = dio_stat($fd);
print_r($ff);

echo "GSMAT is start on COM3\n";
$smsc = "8613800571500";// 短信中心号码（我用的是杭州的，自己改）

$max_len = 280;// 短信最大长?0个汉字，Unicode表示需?80个字?
$invert_smsc = InvertNumbers($smsc);//683108501705F0
$len = 1; $s = chr(13);//'空格'
$msisdn = "86".'13757156000';（接收的号码）
$sms_text = '中文字符能用吗？';//短信内容
$pdu_text = hex2str(gb2unicode($sms_text));
$invert_msisdn = InvertNumbers($msisdn);

// 拆分发送超?0汉字的短?todo: 没有判断全英文的情况)
do {
    $pdu_len = strlen($pdu_text);
    if ( $pdu_len &gt; $max_len ) {
        $pdu_text1 = substr($pdu_text, 0, $max_len);
        $pdu_text = substr($pdu_text, $max_len, $pdu_len - $max_len);
    } else {
        $pdu_text1 = $pdu_text;
        $pdu_text = "";
    }

    $pdu_len1 = sprintf("%02X", strlen($pdu_text1)/2);
    $pdu_text1 = $pdu_len1 . $pdu_text1;

    $pdu_text1 = "11000D91" . $invert_msisdn ."000800" . $pdu_text1;

    $atcmd = "AT+CMGS=" . sprintf("%d", strlen($pdu_text1)/2) .  chr(13);
    $l = strlen($atcmd);
    $ll = @dio_write($fd,$atcmd);//Returns the number of bytes written to  fd.

    sleep(1);

    $pdu_text1 = "0891" . $invert_smsc . $pdu_text1 .  chr(26).chr(13);//26?13是回?
    $l = strlen($pdu_text1);
    $ll = @dio_write($fd,$pdu_text1);

} while ( $pdu_text != "" );

dio_close($fd);

```
