---
title: Javascript Cookie类
tags:
  - Javascript
  - 前端开发
id: 165
categories:
  - 技术
date: 2010-09-09 23:28:37
---

```javascript
(function(global){

    // cookie expires time
    var COOKIE_LIFE ={
        year    : 31536000,
        month   : 2592000,
        week    : 604800,
        day     : 86400,
        hour    : 3600,
        browser : 0
    };

    /**
     + Cookie class
     + @class Cookie
     + @constructor
     + @param {Object} settings cookie options
     */
    function Cookie(settings) {
        var options = settings || {};

        this.expires = options.expires || 'browser';
        this.path    = options.path || null;
        this.domain  = options.domain || null;
        this.secure  = options.secure || null;
    }

    /**
     + Cookie prototype
     + @for Cookie
     + @type {Object}
     */
    Cookie.prototype = {

        /**
         + Set cookie
         + @param {String} fieldName cookie item name
         + @returns {String} get value of cookie name
         */
        get : function(fieldName) {
            if (document.cookie.length&gt;0) {
                c_start=document.cookie.indexOf(fieldName + "=");

                if (c_start !== -1) {
                    c_start = c_start + fieldName.length+1;
                    c_end = document.cookie.indexOf(";",c_start);
                    if (c_end === -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start,c_end));
                }
            }
            return null;
        },

        /**
         + Set cookie
         + @param {String} fieldName cookie item name
         + @param {String} fieldValue cookie item value
         */
        set : function(fieldName, fieldValue) {
            var cookieList;
            cookieList = fieldName+"="+escape(fieldValue);
            cookieList += param('expires', this.expires);
            cookieList += param("path", this.path);
            cookieList += param("domain", this.domain);
            cookieList += param(this.secure);

            document.cookie = cookieList;
        }
    }

    /**
     + get cookie params
     + @param  {String} paramName param key
     + @param  {String} value     param value
     + @return {String}           get a param
     */
    function param(paramName, value) {
        switch (paramName) {
            case "path":
                return value ? (";path="+value) : "";

            case "domain":
                return value ? (";domain="+value) : "";

            case "secure":
                return value ? (";secure") : "";

            case "expires":
                return expiresParam("expires");
        }
    }

    /**
     + parse cookie expires
     + @param  {Number} expires time
     + @return {[type]}         [description]
     */
    function expiresParam(expires) {
        var tm = 0;

        if (typeof(expires)=='string') {
            if (!COOKIE_LIFE[expires]) {
                return "";
            }
            tm = COOKIE_LIFE[expires] * 1000;;
        } else if (typeof(expires) === 'number') {
            tm = expires*1000;
        } else {
            return "";
        }

        expires = ";expires=" + new Date(new Date().getTime()+ tm).toUTCString();
        return expires;
    }

    if (module) {
        // AMD or CMD module
        module.exports = Cookie;
    } else {
        // Global variable
        global.Cookie = Cookie;
    }

}(this));
```
