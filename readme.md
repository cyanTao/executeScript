# 用 safeify 对传入 js 做沙箱处理

## 参考链接
https://zhuanlan.zhihu.com/p/35992886

## 开发

```bash
# 调试
npm run start
```

## 支持

```bash
# 同步死循环处理, 支持✔
while(true){}

# 异步死循环处理, 支持✔
new Promise(() => {})

# 重新拿回Promise,支持✔
Promise = (async function(){})().constructor; console.log(Promise);
Promise.resolve().then(()=>{while(true){}});

# 直接退出进程,支持✔
this.constructor.constructor("return process")().exit()
```
