# @gdyfe/btn-qrcode

## Installation

```
yarn add @gdyfe/btn-qrcode
```

```
npm install --save @gdyfe/btn-qrcode
```

## Usage

```js
import BtnQRCode from '@gdyfe/btn-qrcode'
```

```html
// 自定义属性data-btnqrcode存放url
<button data-btnqrcode="https://www.baidu.com">预览</button>
```

```js
const btnqrcode = new BtnQRCode(options)
// 数据更新时调用（如页码更新dom需重新调用）
btnqrcode.init()
```

## Options
```js
const btnqrcode = new BtnQRCode({
  openUrlText: '打开链接', // 选填，设置打开链接按钮与文字
  openUrlType: 'default', // 选填，打开按钮样式，（success/ghost/<默认值>default）
  copyUrlText: '一键复制', // 选填，设置复制链接按钮与文字
  copyUrlType: 'default', // 选填，复制按钮样式，（success/ghost/<默认值>default）
  urlTextPosTB: 'bottom', // 选填，打开与复制按钮位于二维码方位，（top/<默认值>bottom）
  urlTextPosLR: 'between', // 选填，打开与复制按钮排版格式，（around/left/right/center/<默认值>between）
  noticeText: '提示语句', // 选填，提示语句
  noticeTextColor: '#666', // 选填，提示语句颜色设置
  isShowInput: true, // 选填，是否显示input输入框
  boundaryDom: '.content' // 选填，是否指定定位边界dom元素选择器
  placement: 'bottom' //选填，默认bottom
})

btnqrcode.onCopy = () => {
  // 复制完成时自定义操作，如复制成功通知
}
```