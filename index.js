function executeFn() {
  try {
    const {
      script,
      params
    } = JSON.parse(decodeBase64(process.argv[2]))
    const result = decodeBase64(script)
    const executeFn = new Function(...params.map(item => item.key), result)
    const executeResult = executeFn(...params.map(item => item.mockValue))
    return executeResult
  } catch (err) {
    return err
  }
}

console.log(executeFn())

function encodeBase64(str) {
  return Buffer.from(str).toString('base64');
}

function decodeBase64(base64Str) {
  return Buffer.from(base64Str, 'base64').toString();
}