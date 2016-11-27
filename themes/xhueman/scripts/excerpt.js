/**
* Excerpt Helper
* @description Get the excerpt from a post
* @example
*     <%- excerpt(post) %>
*/

function split(html, maxlength) {
	var fragments = html.split('&#');

	fragments = fragments.slice(0, maxlength);

	return fragments.join('&#');
}

hexo.extend.helper.register('excerpt', function (post) {
    var excerpt;

    if (post.type === 'poem') {
    	excerpt = split(post.content
    		.replace(/\<\/p\>/g, ' / ')
    		.replace(/\<br[\s\/]*\>/g, ' / ')
    		.replace(/\<[^\>]+\>/g, '')
    		.replace(/^\s*\/\s*/, ''), 60) + '...';
    } else if (post.excerpt) {
        excerpt = post.excerpt.replace(/\<[^\>]+\>/g, '');
    } else {
        excerpt = post.content.replace(/\<[^\>]+\>/g, '').substring(0, 200);
    }
    return excerpt;
});