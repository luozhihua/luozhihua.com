---
title: Javascript 数组排序
id: 767
categories:
  - 笔记
date: 2011-12-24 11:13:44
tags:
---

```javascript
function sort( arr) {
    var a = arr || [1,2,3,5,3,2,6,4,9,8,7];
    var N=a.length;
    var temp;

    for (i=0; i<N-1; i++) {
        //外循环执行一次，内循环相应操作的数字少一个
        for(j=0; j<N-i; j++) {
            if (a[j] > a[j+1]) {
                temp = a[j];
                a[j] = a[j+1];
                a[j+1] = temp;
            }
        }
    }

    return a;
}

```
