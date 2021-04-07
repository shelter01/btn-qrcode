import QRCode from 'qrcode'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import './public.css'

class BtnQRCode {
  constructor(trigger, options) {
    this.trigger = trigger
    this.options = options
  }

  init() {
    const { url: imgUrl, text: openText = '', btnText = '预览' } = this.options
    const trigger = document.getElementById(this.trigger)
    let openTextDom = ''

    if (Array.isArray(openText) && openText.length !== 0) {
      let textTemp = ''
      openText.forEach((item) => {
        textTemp =
          textTemp + `<a href=${item[1]} target="_blank">${item[0]}</a>`
      })
      openTextDom = `<div id="openTextDom">${textTemp}</div>`
    }

    // translate
    QRCode.toDataURL(imgUrl)
      .then((url) => {
        trigger.innerHTML = `<button id="myButton">${btnText}</button>`

        tippy('#myButton', {
          theme: 'light',
          allowHTML: true,
          duration: [500, 500],
          // Determines if the tippy has interactive content inside of it, so that it can be hovered over and clicked inside without hiding.
          interactive: true,
          content: `<img src=${url} />` + openTextDom,
          // content: `<img src=${url} />`
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

window.BtnQRCode = BtnQRCode
