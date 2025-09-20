
# ohos-binary-sign

Node.js wrapper for the OpenHarmony [binary-sign-tool](https://gitcode.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/binary-sign-tool.md).

## Usage

This tool can be used either through a command line interface or else through its JavaScript API.

Use through command line:
```sh
npm install -g ohos-binary-sign
ohos-binary-sign sign -selfSign 1 -inFile ./my-binary-file -outFile ./my-binary-file
```

Use through JavaScript API:
```js
const { sign, syncSync } = require("ohos-binary-sign")

const options = {
  selfSign: "1",
  inFile: "./my-binary-file",
  outFile: "./my-binary-file"
}

sign(options, (error, stdout, stderr) => {
  console.log('stdout:', stdout);
  if (stderr) {
    console.error('stderr:', stderr);
  }
  if (error) {
    console.error('Error:', error);
  }
})
```

## APIs in different styles

For each operation, this tool provides three different styles of APIs.

```js
const { sign, signSync } = require("ohos-binary-sign")

const options = {
  selfSign: "1",
  inFile: "./my-binary-file",
  outFile: "./my-binary-file"
}

// callback-style asynchronous API
sign(options, (error, stdout, stderr) => {
  console.log('stdout:', stdout);
  if (stderr) {
    console.error('stderr:', stderr);
  }
  if (error) {
    console.error('Error:', error);
  }
})

// promise-style asynchronous API
sign(options)
  .then(({ stdout, stderr }) => {
    console.log('stdout:', stdout);
    if (stderr) {
      console.error('stderr:', stderr);
    }
  })
  .catch(({ error, stdout, stderr }) => {
    console.log('stdout:', stdout);
    if (stderr) {
      console.error('stderr:', stderr);
    }
    console.error('Error:', error);
  });

// synchronous API
const stdout = signSync(options);
console.log('stdout:', stdout);
```

## API Reference

### `sign(options, callback)`
Performs a file signing operation.

- **Parameters**
  - `options` (object): Configuration options, supporting the following keys:
    - `keyAlias`
    - `keyPwd`
    - `appCertFile`
    - `profileFile`
    - `profileSigned`
    - `signAlg`
    - `keystoreFile`
    - `keystorePwd`
    - `inFile`
    - `outFile`
    - `moduleFile`
    - `selfSign`
  - `callback` (function, optional): A callback function for child process. If provided, the return value is `void`; otherwise, a Promise is returned.

- **Returns**
  - If a callback function is provided, the return value is `void`; otherwise, a Promise is returned, which resolves to `{ stdout: string, stderr: string }` and rejects to `{ error: Error, stdout: string, stderr: string }`.

### `signSync(options)`
Synchronous version of the `sign()` function.

- **Parameters**
  - `options` (object): Configuration options, same as `sign()`.

- **Returns**
  - A string that contains the stdout of the child process.

### `displaySign(options, callback)`
Displays the signature information of a file.

- Parameters
  - `options` (object): Configuration options, supporting the following keys:
    - `inFile`
  - `callback` (function, optional): A callback function for child process. If provided, the return value is `void`; otherwise, a Promise is returned.

- **Returns**
  - If a callback function is provided, the return value is `void`; otherwise, a Promise is returned, which resolves to `{ stdout: string, stderr: string }` and rejects to `{ error: Error, stdout: string, stderr: string }`.

### `displaySignSync(options)`
Synchronous version of the `displaySign()` function.

- **Parameters**
  - `options` (object): Configuration options, same as `displaySign()`.

- **Returns**
  - A string that contains the stdout of the child process.

### `selfSign(filePath, callback)`
Performs a self-signing operation on a file.

- **Parameters**
  - `filePath` (string): The path to the file.
  - `callback` (function, optional): A callback function for child process. If provided, the return value is `void`; otherwise, a Promise is returned.

- **Returns**
  - If a callback function is provided, the return value is `void`; otherwise, a Promise is returned, which resolves to `{ stdout: string, stderr: string }` and rejects to `{ error: Error, stdout: string, stderr: string }`.

### `selfSignSync(options)`
Synchronous version of the `selfSign()` function.

- **Parameters**
  - `filePath` (string): The path to the file.

- **Returns**
  - A string that contains the stdout of the child process.

### `getBinarySignToolPath()`
Return the path of the binary sign tool. You can spawn it in your own way.

- **Returns**
  - Path of the binary sign tool.

## More information
- Source code repository of OpenHarmony binary-sign-tool: [link](https://gitcode.com/openharmony/developtools_hapsigner)
- Document of OpenHarmony binary-sign-tool: [link](https://gitcode.com/openharmony/docs/blob/master/zh-cn/application-dev/tools/binary-sign-tool.md)

