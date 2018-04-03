_目前先了解node命令行工具_

## 运行第一个 Node.js 程序

运行脚本
> node helloworld.js

运行命令行

> node -e "console.log('Hello World');"


## 建立http链接

![image](https://user-images.githubusercontent.com/20856598/31380200-377b73be-ade3-11e7-8429-b1d8badef94b.png)

node与PHP建立服务的不同

```
 //app.js
 var http = require('http');
 http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Node.js</h1>');
  res.end('<p>Hello World</p>');
 }).listen(3000);
 console.log("HTTP server is listening at port 3000.");
 ```

_当修改了 运行脚本里的代码后，浏览器并不会实时发生变化_
原因： Node.js 只有在第一次引用到某部份时才会去解析脚本文件，以后都会直接访问内存，避免重复载入

缺点： 不利于开发调试

插件supervisor可以解决这个问题，会监视代码的改动，并自动重启 Node.js。

> npm intsall -g  supervisor

> supervisor app.js

## Node的异步I/O操作
Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列

node的每一个方法调用，都有一个回调函数，通过EventEmitter
运行机制如下

> var EventEmitter = require('events').EventEmitter;
> var event = new EventEmitter();
> event.on('some_event', function() {
>  console.log('some_event occured.');
> });
> setTimeout(function() {
>  event.emit('some_event');
> }, 1000);

## Node.js 的事件循环机制
 Node.js 程序由事件循环开始，到事件循环结束，所有的逻辑都是事件的回调函数，所以 Node.js 始终在事件循环中，程序入口就是事件循环第一个事件的回调函数。事件的回调函数在执行的过程中，可能会发出 I/O 请求或直接发射（emit）事件，执行完毕后再返回事件循环，事件循环会检查事件队列中有没有未处理的事件，直到程序结束。

## 模块和包
 作用：将实现程序的各个功能拆分、封装，然后组合起来。

### 模块：

让我们以一个例子来了解模块。创建一个 module.js 的文件，内容是：

> //module.js
> var name;
> exports.setName = function(thyName) {
>  name = thyName;
> };
> exports.sayHello = function() {
>  console.log('Hello ' + name);
> };
> 在同一目录下创建 getmodule.js，内容是：
> //getmodule.js
> var myModule = require('./module');
>
> myModule.setName('BYVoid');
> myModule.sayHello();
> // 运行node getmodule.js，结果是：
> Hello BYVoid

**特点：单次加载**

> //loadmodule.js
> var hello1 = require('./module');
> hello1.setName('BYVoid');
> var hello2 = require('./module');
> hello2.setName('BYVoid 2');
> hello1.sayHello();
输出结果
是 Hello BYVoid 2

原因： 为变量 hello1 和 hello2 指向的是同一个实例，因此 hello1.setName 的结果被 hello2.setName 覆盖

export 和 module.export
    exports 实际上只是一个和 module.exports 指向同一个对象的变量，单独使用时export会在模块执行结束后释放，但是module，SO不可以通过对 exports 直接赋值代替对 module.exports 赋值。


### 包
由N多模块组成的一个功能，用于发布、更新、依赖管理和版本控制，包类似于 C/C++ 的函数库或者 Java/.Net的类库

对包的解释说明文件：package.js

**关于模块和包的区别**
**模块**：平时我们所写能被公用的组件              eg：vue中的组件
**包**：平时调用的插件

### Node.js 包管理器
npm是node官方提供的包管理工具，算是包的标准发布平台

- **获取一个包**

**本地模式与全局模式**
默认安装本地模式，将包安装到当前目录的node_modules子目录下。

> npm [install/i] [package_name]

全局模式

> npm [install/i] -g [package_name]

当我们使用全局模式时，将包安装早user/local/bin中，/usr/local/bin/ 是在PATH 环境变量中默认定义的，因此就可以直接在命令行中运行包的命令了。

 eg:

> npm install -g supervisor
> supervisor script.js

- **创建全局链接**

目的：在本地包和全局包之间创建符号链接

使用全局装的包不能直接通过 require 使用，但通过 npm link命令可以打破这一限制。
 eg：
我们已经通过 npm install -g express 安装了 express，

> npm link express

./node_modules/express -> /usr/local/lib/node_modules/express
我们可以在 node_modules 子目录中发现一个指向安装到全局的包的符号链接。通过这种方法，我们就可以把全局包当本地包来使用了。
**npm link 命令不支持 Windows。**


- **包的发布**

**初始化：**
npm 可以用来发布一个包。以CommonJS为基础包规范，通过npm init 产生一个符合标准的package.js目录，然后运行你npm init

> npm init

**维护**
初始化后，需要获得一个账号用于今后维护自己的包，使用 npm adduser 根据提示输入用户名、密码、邮箱，等待账号创建完成。完成后可以使用 npm whoami 测验是否已经取得了账号。

> npm  adduser


**发布**

在 package.json 所在目录下运行 npm publish，

访问 [ https://registry.npmjs.org/](https://registry.npmjs.org/)就可以找到自己刚刚发布的包了

**更新**

如果你的包将来有更新，只需要在 package.json 文件中修改 version 字段，然后重新使用 npm publish 命令就行了。如果你对已发布的包不满意，可以使用 npm unpublish 命令来取消发布
