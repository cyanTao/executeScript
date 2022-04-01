const fs = require('fs')
const {
  Safeify
} = require('safeify')

const safeVm = new Safeify({
  timeout: 500, //超时时间，默认 50ms
  asyncTimeout: 500, //包含异步操作的超时时间，默认 500ms
  quantity: 4, //沙箱进程数量，默认同 CPU 核数
  memoryQuota: 500, //沙箱最大能使用的内存（单位 m），默认 500m
  cpuQuota: 0.5, //沙箱的 cpu 资源配额（百分比），默认 50%
});

async function executeFn() {
  try {
    const {
      script,
      params
    } = JSON.parse(decodeBase64(process.argv[2]))
    // const scriptText = decodeBase64(script)

    // TODO: 调试脚本
    const scriptText = fs.readFileSync('./testScript.js', 'utf-8')

    // 储存打印日志
    let logs = []

    // 参数
    const paramsData = params.reduce((obj, item) => {
      const {
        key,
        value,
        mockValue
      } = item
      obj[key] = mockValue
      return obj
    }, {})

    // 沙箱配置
    const sandbox = {
      ...paramsData,
      console: {
        log(...args) {
          logs = logs.concat(args)
        }
      }
    };
    const result = await safeVm.run(scriptText, sandbox);

    return {
      logs,
      result
    }
  } catch (err) {
    return {
      logs: err,
      result: undefined
    }
  }
};

(async function () {
  console.log(await executeFn())
  process.exit()
})()

function encodeBase64(str) {
  return Buffer.from(str).toString('base64');
}

function decodeBase64(base64Str) {
  return Buffer.from(base64Str, 'base64').toString();
}