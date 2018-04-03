# 文件系统 fs

fs 模块是文件操作的封装，它提供了文件的读取、写入、更名、删除、遍历目录、链接等POSIX
文件系统操作
所有的操作都提供了**异步**和**同步**两个版本

## fs.readFile

**1. 异步**

 fs.readFile(filename,[encoding],[callback(err,data)])

必选参数 filename: 读取的文件名。
encoding: 是可选的，表示文件的字符编码。
callback 是回调函数，用于接收文件的内容。回调函数提供两个参数 err 和 data，err 表示有没有错误发生，data 是文件内容
_如果不指定 encoding，则 callback 就是第二个参数。。如果指定了 encoding，data 是一个解析后的字符串，否则 data 将会是以 Buffer 形式表示的二进制数据。_

具体代码见 **3fileRead.js**

**2. 同步**

 **fs.readFileSync(filename,[encoding])**

Node.js 中异步函数大多没有返回值
比起同步，异步方法性能更高，速度更快，而且没有阻塞。  对于同步方法，知道有这个方法就好了

## fs.open

 **fs.open(path, flags, [mode], [callback(err, fd)])**

**path**：文件路径
**flags** :  打开的方式

flags 可以是以下值。

- [ ]  r ：以读取模式打开文件。
- [ ]  r+ ：以读写模式打开文件。
- [ ]  w ：以写入模式打开文件，如果文件不存在则创建。
- [ ]  w+ ：以读写模式打开文件，如果文件不存在则创建。
- [ ]  a ：以追加模式打开文件，如果文件不存在则创建。
- [ ]  a+ ：以读取追加模式打开文件，如果文件不存在则创建。

** mode ** ：创建文件时给文件指定权限，默认 0666(可读，可写)

_文件权限指的是 POSIX 操作系统中对文件读取和访问权限的规范，通常用一个八进制数来表示。例如 0754 表示文件所有者的权限是 7 （读、写、执行），同组的用户权限是 5 （读、执行），其他用户的权限是 4 （读），写成字符表示就是 -rwxr-xr--。_

## fs.read

 fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead,buffer)])
 // 是 POSIX read 函数的封装，相比 fs.readFile 提供了更底层的接口。

fs.read的功能是从指定的文件描述符 fd 中读_取数据并写入 buffer 指向的缓冲区对象_。

**offset** 是buffer 的写入偏移量。

**length**是要从文件中读取的字节数。

**position** 是文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。

回调函数传递bytesRead 和 buffer，分别表示读取的字节数和缓冲区对象。

代码： 3fs.read.js
eg:

```
 var fs = require('fs');
 fs.open('content.txt', 'r', function(err, fd) {
  if (err) {
  console.error(err);
  return;
  }

  var buf = new Buffer(8);
  fs.read(fd, buf, 0, 8, null, function(err, bytesRead, buffer) {
  if (err) {
  console.error(err);
  return;
  }

  console.log('bytesRead: ' + bytesRead);
  console.log(buffer);
  })
 });

```
结果：

```
 bytesRead: 8
 <Buffer e9 bb 84 e5 9f b9 e5 87
```

#

## fs.writeFile

**fs.writeFile(file, data, [options], callback)**

如果文件存在，该方法写入的内容会覆盖旧的文件内容。

**参数**
参数使用说明如下：

- file - 文件名或文件描述符。
- data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
- options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
- callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

代码 ：3fs.write.js
```

 var fs = require("fs");

 console.log("准备写入文件");
 fs.writeFile('3fs.write.txt', '今天是2017/10/12喔！，再也没看到天下3',  function(err) {
     if (err) {
         return console.error(err);
     }
     console.log("数据写入成功！");
     console.log("--------我是分割线-------------")
     console.log("读取写入的数据！");
     fs.readFile('3fs.write.txt', function (err, data) {
         if (err) {
             return console.error(err);
         }
         console.log("异步读取文件数据: " + data.toString());
     });
 });

```

结果：

 ```
准备写入文件
 数据写入成功！
 --------我是分割线-------------
 读取写入的数据！
 异步读取文件数据: 今天是2017/10/12喔！，再也没看到天下3
```
