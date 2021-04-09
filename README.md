# @gdyfe/btn-qrcode

## Installation

```
yarn add @gdyfe/btn-qrcode
```
or
```
npm install --save @gdyfe/btn-qrcode
```

## Usage

```js
import '@gdyfe/btn-qrcode'
or
import '@gdyfe/btn-qrcode/dist/btnqrcode.js'
```

```html
<html>
  <body>
    <div id="btn-qrcode"></div>
  </body>
</html>
```

```js
const btn = new  new BtnQRCode('btn-qrcode', options)
btn.init()
```

## Options
|属性|说明|类型|必填|参考值|默认值|
| :--: | :--: | :--: | :--: | :--: | :--: |
|url|需转成二维码的url|string|是|1|-|
|btnText|按钮显示文字|string|否||预览|
|text|二维码下方文字链接|array|否||' '|

## Demo
```js
const btn = new BtnQRCode('btn-qrcode', {
  url: 'https://www.baidu.com',
  btnText: '预览',
  text: [
    ['打开', 'https://www.baidu.com'],
    ['链接', 'https://www.baidu.com'],
  ],
})
btn.init()
```