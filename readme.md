# 用 nodejs 内置模块 vm 对传入 js 做沙箱处理

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

# 重新拿回Promise,再异步中做死循环 不支持❌
Promise = (async function(){})().constructor; console.log(Promise);
Promise.resolve().then(()=>{while(true){}});

# 直接退出进程,不支持❌
this.constructor.constructor("return process")().exit()
```
