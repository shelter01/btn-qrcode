import QRCode from 'qrcode'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import './public.css'
import ClipboardJS from 'clipboard'

class BtnQRCode {
  constructor(options) {
    this.options = options
  }

  init() {
    const {
      trigger,
      btnText = '预览',
      isShowInput = false,
      openUrlText = '',
      openUrlType = 'default',
      copyUrlText = '',
      copyUrlType = 'default',
      urlTextPosTB = 'bottom',
      urlTextPosLR = 'between',
      noticeText = '',
    } = this.options

    Array.from(document.querySelectorAll(trigger)).forEach((item, index) => {
      const url = item.dataset.btnqrcode

      // 初始化文字链接、输入框链接domx
      let urlTextDom = ''
      let inputDom = ''
      let noticeDom = ''
      let imgDom = ''

      // 可配置显示输入框
      if (isShowInput) {
        inputDom = `<input class="btnqrcode-input-dom" readonly="readonly" value=${url} />`
      }

      if (noticeText) {
        noticeDom = `<div class="btnqrcode-notice-dom"><span>${noticeText}</span></div>`
      }

      // 可配置文字链接、复制操作
      if (openUrlText || copyUrlText) {
        let textTemp = ''
        if (openUrlText) {
          textTemp = `<div class="btnqrcode-open-url-text btnqrcode-open-url-text-${openUrlType}"><a href=${url} target="_blank">${openUrlText}</a></div>`
        }
        if (copyUrlText) {
          textTemp =
            textTemp +
            `<div class="btnqrcode-copy-url-text btnqrcode-copy-url-text-${copyUrlType}" data-clipboard-text="${url}"><a href="javascript:;">${copyUrlText}</a></div>`
          new ClipboardJS('.btnqrcode-copy-url-text')
        }

        urlTextDom = `<div class="btnqrcode-url-text-dom btnqrcode-url-text-dom-${urlTextPosLR}">${textTemp}</div>`
      }

      // 链接转二维码
      QRCode.toDataURL(url)
        .then((url) => {
          item.innerHTML = `<button class="btnqrcode-button-${index}"><span>${btnText}</span></button>`

          imgDom = `<img class="btnqrcode-qrcode" src=${url} />`

          tippy(`.btnqrcode-button-${index}`, {
            theme: 'light',
            allowHTML: true,
            duration: [500, 500],

            // 调试专用
            // hideOnClick: false,
            // trigger: 'click',

            // 气泡框内mouseenter不消失
            interactive: true,
            content:
              urlTextPosTB === 'bottom'
                ? inputDom + imgDom + noticeDom + urlTextDom
                : inputDom + urlTextDom + imgDom + noticeDom,
          })
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }
}

window.BtnQRCode = BtnQRCode
