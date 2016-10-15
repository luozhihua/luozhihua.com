---
title: No more JS frameworks (转)
tags:
  - Javascript
  - 前端开发
id: 1258
categories:
  - 笔记
date: 2014-08-03 08:32:34
---

原文：http://bitworking.org/news/2014/05/zero_framework_manifesto

Stop writing Javascript frameworks.

JavaScript frameworks seem like death and taxes; inevitable and unavoidable. I'm sure that if I could be a fly on that wall every time someone started a new web project, the very first question they'd ask is, which JS framework are we using? That's how ingrained the role of JS frameworks are in the industry today. But that's not the way it needs to be, and actually, it needs to stop.
<!--more-->
Let's back up and see how we got here.

Angular and Backbone and Ember, oh my.

For a long time the web platform, the technology stack most succinctly described as HTML+CSS+JS, was, for lack of a better term, a disaster. Who can forget the IE box model, or the layer tag? I'm sure I just started several of you twitching with flashbacks to the bad old days of web development with just those words.

For a long time there was a whole lot of inconsistency between browsers and we, as an industry, had to write frameworks to paper over them. The problem is that there was disagreement even on the fundamental issues among browsers, like how events propagate, or what tags to support, so every framework not only papered over the holes, but designed their own model of how the browser should work. Actually their own models, plural, because you got to invent a model for how events propagate, a model for how to interact with the DOM, etc. A lot of inventing went on. So frameworks were written, each one a snowflake, a thousand flowers bloomed and gave us the likes of jQuery and Dojo and MochiKit and Ext JS and AngularJS and Backbone and Ember and React. For the past ten years we’ve been churning out a steady parade of JS frameworks.

But something else has happened over the past ten years; browsers got better. Their support for standards improved, and now there are evergreen browsers: automatically updating browsers, each version more capable and standards compliant than the last. With newer standards like:

HTML Imports
Object.observe
Promises
HTML Templates
I think it's time to rethink the model of JS frameworks. There's no need to invent yet another way to do something, just use HTML+CSS+JS.

So why are we still writing JS frameworks? I think a large part of it is inertia, it's habit. But is that so bad, it's not like frameworks are actively harmful, right? Well, let's first start off by defining what I mean by web framework. There's actually a gradient of code that starts with a simple snippet of code, such as a Gist, and that moves to larger and larger collections of code, moving up to libraries, and finally frameworks:

gist -> library -> framework

Frameworks aren't just big libraries, they have their own models for how to interact with events, with the DOM, etc. So why avoid frameworks?

Abstractions Well, one of the problems of frameworks is usually one of their selling points, that they abstract away the platform so you can concentrate on building your own software. The problem is that now you have two systems to learn, HTML+CSS+JS, and the framework. Sure, if the framework was a perfect abstraction of the web as a platform you would never have to go beyond the framework, but guess what, abstractions leak. So you need to know HTML+CSS+JS because at some point your program won't work the way you expect it to, and you’ll have to dig down through all the layers in the framework to figure out what's wrong, all the way down to HTML+CSS+JS.

Mapping the iceberg.

A framework is like an iceberg, that 10% floating above the water doesn't look dangerous, it's the hidden 90% that will eventually get you. Actually it's even more apt than that, learning a framework is like mapping an iceberg, in order to use the framework you need to learn the whole thing, apply the effort of mapping out the entire thing, and in the long run the process is pointless because the iceberg is going to melt anyway.

Widgets Another selling point of frameworks is that you can get access to a library of widgets. But really, you shouldn't need to adopt a framework to get access to widgets, they should all be orthogonal and independent. A good example of this today is CodeMirror, a syntax highlighting code editor built in JavaScript. You can use it anywhere, no framework needed.

There is also the lost effort of building widgets for a framework. Remember all those MochiKit widgets you wrote? Yeah, how much good are they doing you now that you've migrated to Ember, or Angular?

Data Binding Honestly I've never needed it, but if you do, it should come in the form of a library and not a framework.

The longer term problem with frameworks is that they end up being silos, they segment the landscape, widgets built for framework A don't work in framework B. That's lost effort.

So what does a post-framework world look like?

HTML+CSS+JS are my framework.

The fundamental idea is that frameworks aren't needed, use the capabilities already built into HTML+CSS+JS to build your widgets. Break apart the monoliths into orthogonal components that can be mixed in any combination. The final pieces that enable all of this fall under the umbrella of Web Components.

HTML Imports, HTML Templates, Custom Elements, and Shadow DOM are the enabling technologies that should allow us to cut the cord from frameworks, allowing the creation of reusable elements and functionality. For a much better introduction see these articles and libraries:

HTML Imports
Polymer
X-Tag
Bosonic
So, we all create <x-flipbox>'s, declare victory, and go home?

No, not actually, the first thing you need for working with Web Components are polyfills for that functionality, such as X-Tag and Polymer. The need for those will decrease over time as browsers flesh out their implementations of those specifications.

A point to be stressed here is that these polyfills aren't frameworks that introduce their own models to developing on the web, they enable the HTML 5 model. But that isn't really the only need, there are still minor gaps in the platform where one browser deviates in a small way from current standards, and that's something we need to polyfill. MDN seems to have much of the needed code, as the documentation frequently contains short per-function polyfills.

So one huge HTML 5 Polyfill library would be good, but even better would be what I call html-5-polyfill-o-matic, a set of tools that allows me to write Web Components via bog standard HTML+JS and then after analyzing my code, either via static analysis or via Object.observe at runtime, it produces a precise subset of the full HTML 5 polyfill for my project.

This sort of functionality will be even more important as I start trying to mix and match web components and libraries from multiple sources, i.e. an <x-foo> from X-Tag and a <core-bar> from Polymer, does that mean I should have to include both of their polyfill libraries? (It turns out the answer is no.) And how exactly should I get these custom elements? Both X-Tag and Brick have custom bundle generators:

Brick Download
X-Tag Download
If I start creating custom elements do I need to create my own custom bundler too? I don't think that's a scalable idea, I believe we need idioms and tools that handle this much better. This may actually mean changing how we do open source; a 'widget' isn't a project, so our handling of these things needs to change. Sure, still put the code in Git, but do you need the full overhead of a GitHub project? Something lighter weight, closer to a Gist than a current project might be a better fit. How do I minimize/vulcanize all of this code into the right form for use in my project? Something like Asset Graph might be a good start on that.

So what do we need now?

Idioms and guidelines for building reusable components.
Tools that work under those idioms to compile, crush, etc. all that HTML, CSS, and JS.
A scalable HTML 5 polyfill, full or scaled down based on what's really used.
That's what we need to build a future where we don't need to learn the latest model of the newest framework, instead we just work directly with the platform, pulling in custom elements and libraries to fill specific needs, and spend our time building applications, not mapping icebergs.

Q&A
Q: Why do you hate framework authors.

A: I don’t hate them. Some of my best friends are framework authors. I will admit a bit of inspiration from the tongue-in-cheek you have ruined javascript, but again, no derision intended for framework authors.

Q: You can’t do ____ in HTML5, for that you need a framework.

A: First, that's not a question. Second, thanks for pointing that out. Now let's work together to add the capabilities to HTML 5 that allows ____ to be done w/o a framework.

Q: But ___ isn't a framework, it's a library!

A: Yeah, like I said, it’s a gradient from gist to framework, and you might draw the lines slightly differently from me. That's OK, this isn't about the categorization of any one particular piece of software, it's about moving away from frameworks.

Q: I've been doing this for years, with ___ and ___ and ___.

A: Again, that's not a question, but regardless, good for you, you should be in good shape to help everyone else.

Q: So everyone needs to rewrite dropdown menus, tabs, sliders and toggles themselves?

A: Absolutely not, the point is there should be a way to create those elements in a way that doesn't require buying into one particular framework.

Q: Dude, all those HTML Imports are going to kill my sites performance.

A: Yes, if you implemented all this stuff naively it would, which is why I mentioned the need for tools to compile and crush all the HTML, CSS, and JS.

Q: So I'm not supposed to use any libraries?

A: No, that's not what I said, I was very careful to delineate a line between libraries and frameworks, a library providing an orthogonal piece of functionality that can be used with other libraries. Libraries are fine, it's the frameworks that demand 100% buyin that I'd like to see us move away from.

Q: But I like data binding!

A: Lot's of people do, I was only expressing a personal preference. I didn't say that you shouldn't use data binding, but only that you don't need to adopt an entire framework to get data-binding, there are standalone libraries for that.

2014-05-09