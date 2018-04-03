主要内容：

- [ ] 全局对象
- [ ] 常用工具
- [ ] 事件机制
- [ ] 文件系统访问
- [ ] HTTP服务器与客户端

# 全局对象
node.js 的全局对象是global  ，global 最根本的作用是作为全局变量的宿主

_浏览器的全局对象是 window_

## process变量
process模块用来与当前进程互动，可以通过全局变量process访问，不必使用require命令加载。它是一个EventEmitter对象的实例。

看看这个网址，
## [http://nodejs.cn/api/process.html#process_process(http://nodejs.cn/api/process.html#process_process)
 用于返回系统信息

### 属性
process对象提供一系列属性，用于返回系统信息。

- [ ] process.pid：当前进程的进程号。
- [ ] process.version：Node的版本，比如v0.10.18。
- [ ] process.platform：当前系统平台，比如Linux。
- [ ] process.title：默认值为“node”，可以自定义该值。
- [ ] process.argv：当前进程的命令行参数数组。
- [ ] process.env：指向当前shell的环境变量，比如process.env.HOME。
- [ ] process.execPath：运行当前进程的可执行文件的绝对路径。
- [ ] process.stdout：指向标准输出。
- [ ] process.stdin：指向标准输入。
- [ ] process.stderr：指向标准错误。

1. **stdout**
process.stdout用来控制标准输出，也就是在命令行窗口向用户显示内容。它的write方法等console.log。

```
 exports.log = function() {
     process.stdout.write(format.apply(this, arguments) + '\n');
 }
```

2.**.stdin**
标准输入流，初始时它是被暂停的，要想从标准输入读取数据，必须恢复流，并手动编写流的事件响应函数。

```
process.stdin.resume();
process.stdin.on('data', function(data) {
 process.stdout.write('read from console: ' + data.toString());
});
```

3. **argv**
返回命令行脚本的各个参数组成的数组。

### 方法

- [ ] process.exit()：退出当前进程。
- [ ] process.cwd()：返回运行当前脚本的工作目录的路径。_
- [ ] process.chdir()：改变工作目录。

```
 process.cwd()
 '/home/aaa'


 process.chdir('/home/bbb')

 process.cwd()

 '/home/bbb'
```

- [ ] process.nextTick()：)的功能是为事件循环设置一项任务，Node.js 会在下次事件循环调响应时调用 callback。


### 事件

1. **exit事件**
当前进程退出时，会触发exit事件，可以对该事件指定回调函数。这一个用来定时检查模块的状态的好子(hook)(例如单元测试),当主事件循环在执行完’exit’的回调函数后将不再执行,所以在exit事件中定义的定器可能不会被加入事件列表.

```
 process.on('exit', function () {
   fs.writeFileSync('/tmp/myfile', 'This MUST be saved on exit.');
 });
```

2. **uncaughtException事件**
当前进程抛出一个没有被捕捉的意外时，会触发uncaughtException事件。

```
  process.on('uncaughtException', function (err) {
    console.error('An uncaught error occurred!');
    console.error(err.stack);
  });
```

## console
 用于提供控制台标准输出

 **console.log()**
console.log 接受若干个参数，如果只有一个参数，则输出这个参数的字符串形式。如果有多个参数，则以类似于 C 语言 printf() 命令的格式输出。第一个参数是一个字符串，如果没有参数，只打印一个换行

```
 console.log('Hello world');
 console.log('byvoid%diovyb');
 console.log('byvoid%diovyb', 1991);

```
结果：

```
 Hello world
 byvoid%diovyb
 byvoid1991iovyb
```

1. **console.error()**：与 console.log() 用法相同，只是向标准错误流输出。
2. **console.trace()**：向标准错误流输出当前的调用栈。

 ```
console.trace()
结果：

 Trace
     at repl:1:9
     at ContextifyScript.Script.runInThisContext (vm.js
     at REPLServer.defaultEval (repl.js:239:29)
     at bound (domain.js:301:14)
     at REPLServer.runBound [as eval] (domain.js:314:12
     at REPLServer.onLine (repl.js:433:10)
     at emitOne (events.js:120:20)
     at REPLServer.emit (events.js:210:7)
     at REPLServer.Interface._onLine (readline.js:278:1
     at REPLServer.Interface._line (readline.js:625:8)
```



# util 包 (常用工具)
node.js中的util核心包是node.js自带的核心代码,其完全用javascript代码实现,里面实现了一些常用的工具方法.

## inherits
**util.inherits(constructor, superConstructor)是一个实现对象间**原型**继承的函数**

` util.inherits(constructor, superConstructor)`

此方法有2个参数: 此方法参数针对的都是构造函数
constructor : 构造函数
superConstructor: 父类构造函数

```
 var util = require('util');
 function Base() {
  this.name = 'base';
  this.base = 1991;
  this.sayHello = function() {
  console.log('Hello ' + this.name);
  };
 }
 Base.prototype.showName = function() {
  console.log(this.name);
 };
 function Sub() {
  this.name = 'sub';
 }
 util.inherits(Sub, Base);
 var objBase = new Base();
 objBase.showName();
 objBase.sayHello();
 console.log(objBase);
 var objSub = new Sub();
 objSub.showName();
 //objSub.sayHello();
 console.log(objSub);

```


运行结果：

```
base
Hello base
{ name: 'base', base: 1991, sayHello: [Function] }
sub
{ name: 'sub' }
```

**Sub 仅仅继承了 Base 在原型中定义的函数，而构造函数内部创造的 base 属性和 sayHello 函数都没有被 Sub 继承**


## inspect
是一个将任意对象转换为**字符串**的方法，通常用于调试和错误输出
至少接受一个参数Object， 即要转换的对象

 **util.inspect(object, [showHidden], [depth], [colors])**

**showHidden** 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
**depth** 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。
如果**color** 值为 true，输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮
的效果。

**util.inspect 并不会简单地直接把对象转换为字符串，即使该对象定义了 toString 方法也不会调用。**

