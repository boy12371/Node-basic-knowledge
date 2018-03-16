**为了让JavaScript像java、C++后端语言一样，有属于自己一套被大众认同的方法也就是API**

_CommonJS API定义很多普通应用程序（主要指非浏览器的应用）使用的API，从而填补了这个空白。它的终极目标是提供一个类似Python，Ruby和Java标准库。这样的话，开发者可以使用CommonJS API编写应用程序，然后这些应用可以运行在不同的JavaScript解释器和不同的主机环境中。_

# CommonJS定义的模块
分为:

- [ ]     模块引用(require)     用来引入外部模块
- [ ]     模块标识(module)     代表模块本身
- [ ]     模块定义(exports)     用于导出当前模块的方法或变量

# commonJS的原理以及简易实现


## 原理：

> var module = {
>   exports: {}
> };
>
> (function(module, exports) {
>   exports.multiply = function (n) { return n * 1000 };
> }(module, module.exports))
>
> var f = module.exports.multiply;
> f(5) // 5000

_上面代码向一个立即执行函数提供 module 和 exports 两个外部变量，模块就放在这个立即执行函数里面。模块的输出值放在 module.exports 之中，这样就实现了模块的加载。_


因为目前浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量。

     module
     exports
     require
     global


由于不兼容性，所以就衍生了很多转换的工具 [Browserify](http://browserify.org/)最常用的工具





nodeJS就是在此的基础下发展成 javaScript在后台运行的平台