import QRCode from 'qrcode'
import './public.css'
class BtnQRCode {
  constructor(trigger, options) {
    this.trigger = trigger
    this.options = options
    this.srcUrl = ''
  }

  init() {
    const { imgUrl } = this.options
    const trigger = document.getElementById(this.trigger)
    QRCode.toDataURL(imgUrl)
      .then((url) => {
        this.srcUrl = url
        trigger.innerHTML = `<div class="qr-pre-box">
                              <button class="qr-pre-btn">
                                <div>预览</div>
                              </button>
                              <div class="qr-pre-img">
                                <div class="qr-pre-img-triangle"></div>
                                <img class="qr-pre-img-pic" src=${this.srcUrl} />
                              </div>
                            </div>`
        const btn = document.querySelector('.qr-pre-btn')
        const imgPic = document.querySelector('.qr-pre-img')
        btn.addEventListener('mouseover', () => {
          imgPic.style.display = 'block'
        })
        btn.addEventListener('mouseleave', () => {
          imgPic.style.display = 'none'
        })
        imgPic.addEventListener('mouseover', () => {
          imgPic.style.display = 'block'
        })
        imgPic.addEventListener('mouseleave', () => {
          imgPic.style.display = 'none'
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

window.BtnQRCode = BtnQRCode
