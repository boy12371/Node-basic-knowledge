/**
 * Created by yanqin on 2017/10/12.
 */
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