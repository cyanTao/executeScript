const vm = require('vm');
const fs = require('fs')

function executeFn() {
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

    const scriptApp = new vm.Script(`(function () { ${scriptText} })()`);

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

    const context = new vm.createContext(sandbox);
    const result = scriptApp.runInContext(context);

    return {
      logs,
      result
    }
  } catch (err) {
    return {
      logs: err,
      result: null
    }
  }
}

console.log(executeFn())

function encodeBase64(str) {
  return Buffer.from(str).toString('base64');
}

function decodeBase64(base64Str) {
  return Buffer.from(base64Str, 'base64').toString();
}