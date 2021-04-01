import QRCode from 'qrcode'
import { createPopper } from '@popperjs/core'
import './public2.css'

class BtnQRCode {
  constructor(trigger, options) {
    this.trigger = trigger
    this.options = options
    this.srcUrl = '',
    this.popperInstance = null
  }

  init() {
    const { imgUrl } = this.options
    const trigger = document.getElementById(this.trigger)

    QRCode.toDataURL(imgUrl)
      .then((url) => {
        this.srcUrl = url
        // imgurl to qrcode
        trigger.innerHTML = `<button id="button" aria-describedby="tooltip">My button</button>
                              <div id="tooltip" role="tooltip">
                                <img class="qr-pre-img-pic" src=${this.srcUrl} />
                                <div id="arrow" data-popper-arrow></div>
                              </div>`
        const button = document.querySelector('#button')
        const tooltip = document.querySelector('#tooltip')
        this.popperInstance = createPopper(button, tooltip, {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
            {
              name: 'arrow',
              options: {
                element: arrow,
                padding: 10,
              },
            },
          ],
        })

        function show() {
          tooltip.setAttribute('data-show', '')
          this.popperInstance.setOptions({
            modifiers: [{ name: 'eventListeners', enabled: true }],
          })
          this.popperInstance.update()
        }

        function hide() {
          tooltip.removeAttribute('data-show')
          this.popperInstance.setOptions({
            modifiers: [{ name: 'eventListeners', enabled: false }],
          })
        }

        const showEvents = ['mouseenter', 'focus']
        const hideEvents = ['mouseleave', 'blur']

        showEvents.forEach((event) => {
          button.addEventListener(event, show)
        })

        hideEvents.forEach((event) => {
          button.addEventListener(event, hide)
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

window.BtnQRCode = BtnQRCode
