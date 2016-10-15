---
title: Javascript控制swf动画播放
id: 1742
categories:
  - 笔记
date: 2014-10-15 13:26:55
tags:
---

http://arrixlive.wordpress.com/2005/03/25/javascript-in-love-with-flash-control-swf-from-javascript/

<!--more-->

## Control the play back

If your _swf_ is mainly a sequence of _frames_ without complex programmatic logic, it is a good idea to control the playback from _JavaScript_. The following_Flash Methods _are intended for playback control.

```javascript
/* start playing the _root timeline */
flashObj.Play();

//stop playing the _root timeline
flashObj.StopPlay(); 

// Rewind the _root timeline to the first frame
flashObj.Rewind(); 

// returns true if the movie is playing otherwise false
flashObj.IsPlaying(); 

// moves play head of the MovieClip specified
//by "target" to the frame specified by frameNumber.
flashObj.TGotoFrame("target", frameNumber); 

// moves play head of the MovieClip specified
//by "target" to the frame specified by "label", "label" is the frame label you set in the Flash
//authoring environment
flashObj.TGotoLabel("target", "label");

// set the play head to the frame specified by //frameNumber.
flashObj.GotoFrame(frameNumber);
```

Notice that the frameNumber starts at 0, unlike in _Flash_ where the_ frame_number begins at 1\. Before calling this method, you should ensure that the target _frame_ has already been loaded.

```javascript
if (flashObj.PercentLoaded() == 100) {
    // frameNumber is assigned somewhere else
    flashObj.GotoFrame(frameNumber);
}
```

## Calling a function defined in the Flash movie

There is no direct way to call a method defined in _Flash_ from _JavaScript_because _JavaScript_ and _ActionScript_ functions and types are not compatible. But there are various ways to trigger code execution in a _Flash_ movie from_JavaScript_.

You can place your _ActionScript_ code in a particular _frame_ (latterly referred to as _Frame Function_). Then in _JavaScript_:

```javascript
    flashObj.GotoFrame(frameNumber);
    flashObj.TGotoFrame("target", frameNumber);
    flashObj.TGotoLabel("target", "label"); 
```

These functions control _Flash_ movie playback. Jumping to the specified _frame_will of course trigger the code execution there.

The following two functions execute _ActionScript_ code at specified _frame_without moving the _play head_.

```javascript
    flashObj.TCallFrame("target", frameNumber);
    flashObj.TCallLabel("target", "label");
```
