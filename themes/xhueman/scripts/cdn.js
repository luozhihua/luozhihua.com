/**
* Thumbnail Helper
* @description Get the thumbnail url from a post
* @example
*     <%- cdn(url) %>
*/
var cdns = hexo.config.cdns || []
var point = 0

hexo.extend.helper.register('cdn', function (url, attrs) {
  var host
  var tag
  var attrList = []

  point = point < cdns.length ? point : 0
  host = cdns[point]
  point += 1

  if (!host.match(/^(https?:)\/\//)) {
    url = '//' + host + '/' + url
  }

  if (attrs) {
    Object.keys(attrs).forEach(function (k) {
      attrList.push(k + '="' + attrs[k] + '"')
    })
  }

  if (url.match(/.js/)) {
    tag = '<script src="'+ url +'" '+ attrList.join(' ') +'></script>'
  } else if (url.match(/.css/)) {
    tag = '<link rel="stylesheet" href="'+ url +'" '+ attrList.join(' ') + '></link>'
  } else if (url.match(/.(png|jpg|jpeg|gif|webp|bmp)/)) {
    tag = '<img src="'+ url +'" '+ attrList.join(' ') +' />'
  }

  return tag;

});
