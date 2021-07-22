/* eslint-disable */
import QRCode from 'qrcode'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import './public.css'
import ClipboardJS from 'clipboard'

export default class BtnQRCode {
  constructor(options = {}) {
    this.options = options
    this.clipboard = null
    this.instances = []
  }

  onCopy() {}

  init() {
    // 清除实例
    if (this.instances.length) {
      this.instances.forEach((v) => {
        v.destroy()
      })
      this.instances = []
    }

    const {
      isShowInput = false,
      openUrlText = '',
      openUrlType = 'default',
      copyUrlText = '',
      copyUrlType = 'default',
      urlTextPosTB = 'bottom',
      urlTextPosLR = 'between',
      noticeText = '',
      noticeTextColor = '',
      boundaryDom = '', // 边界元素定位
    } = this.options

    const timer = setInterval(async () => {
      if (document.querySelector('[data-btnqrcode]')) {
        clearInterval(timer)

        const nodeList = Array.from(
          document.querySelectorAll('[data-btnqrcode]')
        )

        let index = 0

        while (index < nodeList.length) {
          const item = nodeList[index]
          // item.innerHTML = `<button class="btnqrcode-button-${index}"><span>${btnText}</span></button>`
          item.dataset[`btnqrcodeBtn${index}`] = index

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
            let noticeColorStyle
            if (noticeTextColor) {
              noticeColorStyle = `style="color:${noticeTextColor}"`
            }
            noticeDom = `<div class="btnqrcode-notice-dom" ${noticeColorStyle}><span>${noticeText}</span></div>`
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
            }

            urlTextDom = `<div class="btnqrcode-url-text-dom btnqrcode-url-text-dom-${urlTextPosLR}">${textTemp}</div>`
          }

          // 链接转二维码
          await QRCode.toDataURL(url)
            .then((url) => {
              imgDom = `<img class="btnqrcode-qrcode" src=${url} />`

              // tippy(`.btnqrcode-button-${index}`, {
              const instance = tippy(`[data-btnqrcode-btn${index}]`, {
                theme: 'light',
                allowHTML: true,
                duration: [500, 500],
                // appendTo: document.querySelector('.center-content'),
                // 调试专用
                // trigger: 'click',

                popperOptions: {
                  modifiers: [
                    {
                      name: 'flip',
                      options: {
                        boundary: boundaryDom
                          ? document.querySelector(boundaryDom)
                          : 'clippingParents',
                      },
                    },
                    {
                      name: 'preventOverflow',
                      options: {
                        boundary: boundaryDom
                          ? document.querySelector(boundaryDom)
                          : 'clippingParents',
                      },
                    },
                  ],
                },

                // 气泡框内mouseenter不消失
                interactive: true,
                content:
                  urlTextPosTB === 'bottom'
                    ? inputDom + imgDom + noticeDom + urlTextDom
                    : inputDom + urlTextDom + imgDom + noticeDom,
              })
              this.instances.push(instance[0])
            })
            .catch((err) => {
              console.error(err)
            })

          // gdyfe ivu-btn:last-child marginRight: 0 private
          if (
            Array.from(item.parentElement.lastElementChild.classList).includes(
              'ivu-btn'
            )
          ) {
            item.addEventListener('mouseenter', (e) => {
              const tempArr = Array.from(
                e.target.parentElement.querySelectorAll('.ivu-btn')
              )
              const tempE = tempArr[tempArr.length - 1]
              tempE.style.marginRight = 0
            })
          }

          index++
        }

        // 避免多次出发复制成功事件
        if (this.clipboard) {
          this.clipboard.destroy()
        }
        this.clipboard = new ClipboardJS('.btnqrcode-copy-url-text')
        this.clipboard.on('success', () => {
          this.onCopy()
        })
      }
    }, 100)
  }
}
