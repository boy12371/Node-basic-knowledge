# 事件驱动
Node.js 最重要的模块，几乎被所有的模块依赖。

## 事件发射器
events 模块只提供了一个对象： events.EventEmitter
EventEmitter的核心 ： 是事件发射与事件监听器功能的封装

_事件发射就是事件被触发的意思，相当于JQuery中的Object.triggle('click')_

当事件发射时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

虽然很简单，但是我还是c一下代码吧

> var events = require('events');
> var emitter = new events.EventEmitter();
> emitter.on('someEvent', function(arg1, arg2) {
>  console.log('listener1', arg1, arg2);
> });
> emitter.on('someEvent', function(arg1, arg2) {
>  console.log('listener2', arg1, arg2);，昆明
> });
> emitter.emit('someEvent', 'byvoid', 1991);

结果

> listener1 byvoid 1991
> listener2 byvoid 1991


## EventEmitter常用的API

**EventEmitter.on(event, listener)** 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数 listener。
**EventEmitter.emit(event, [arg1], [arg2], [...])** 发射 event 事件，传递若干可选参数到事件监听器的参数表。
**EventEmitter.once(event, listener)** 为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。
**EventEmitter.removeListener(event, listener)** 移除指定事件的某个监听器，listener 必须是该事件已经注册过的监听器。
**EventEmitter.removeAllListeners([event])** 移除所有事件的所有监听器，如果指定 event，则移除指定事件的所有监听器。

更详细的 API 文档参见[ http://nodejs.org/api/events.html]( http://nodejs.org/api/events.html)。


## EventEmitter的error事件

EventEmitter 定义了一个特殊的事件 error，它包含了“错误”的语义，我们在遇到异常的时候通常会发射 error 事件。当 error 被发射时，EventEmitter 规定如果没有响应的监听器，Node.js 会把它当作异常，退出程序并打印调用栈。我们一般要为会发射 error事件的对象设置监听器，避免遇到错误后整个程序崩溃


> var events = require('events');
> var emitter = new events.EventEmitter();
> emitter.emit('error');

运行时会显示以下错误：

> node.js:201
>             throw e; // process.nextTick error, or 'error' event on first tick
>                       ^
> Error: Uncaught, unspecified 'error' event.
>  at EventEmitter.emit (events.js:50:15)
>  at Object.<anonymous> (/home/byvoid/error.js:5:9)
>  at Module._compile (module.js:441:26)
>  at Object..js (module.js:459:10)
>  at Module.load (module.js:348:31)
>  at Function._load (module.js:308:12)
>  at Array.0 (module.js:479:10)
>  at EventEmitter._tickCallback (node.js:192:40)

## 继承 EventEmitter

大多数时候不会直接使用 EventEmitter，而是在`对象中继承`它。包括 fs、net、http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。
为什么要这样做呢？原因有两点。首先，具有某个实体功能的对象实现事件符合语义，事件的监听和发射应该是一个对象的方法。其次 JavaScript 的对象机制是基于原型的，支持部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

