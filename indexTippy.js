import QRCode from 'qrcode'
import tippy, { animateFill } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css';
// import 'tippy.js/dist/backdrop.css';
// import 'tippy.js/animations/shift-away.css';
import './publicTippy.css'

class BtnQRCode {
  constructor(trigger, options) {
    this.trigger = trigger
    this.options = options
  }

  init() {
    const { imgUrl, openText } = this.options
    const trigger = document.getElementById(this.trigger)

    QRCode.toDataURL(imgUrl)
      .then((url) => {
        trigger.innerHTML = `<button id="myButton">预览</button>`

        tippy('#myButton', {
          // plugins: [animateFill],
          theme: 'light',
          // content allow html
          allowHTML: true,
          duration: [500, 500],
          // animateFill: true,
          // Determines if the tippy has interactive content inside of it, so that it can be hovered over and clicked inside without hiding.
          interactive: true,
          content: `<img src=${url} /><div><a href=${imgUrl} target="_blank">${openText}</a></div>`
          // content: `<img src=${url} />`
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

window.BtnQRCode = BtnQRCode
