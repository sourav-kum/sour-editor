let showingMenu = false

window.addEventListener('load', () => {
  const menu = new Menu()

  document.getElementById('menu-btn').onclick = () => {
    menu.toogle()
  }
}, { once: true })


class Menu {
  showing = false

  constructor() {
    this.root = document.createElement('div')

    this.root.style.cssText = (`
      position: absolute;
      top: 60px;
      background: white;
      width: 100%;
      height: calc(100% - 50px);
    `)

    this.init()
  }

  async init() {
    const data = await fetch('paths.json').then(e => e.json())
    // const prev = document.getElementById('prev-btn')

    for (let id in data) {
      if(data[id].type == 'file') this.addItem(data[id].name, data[id].path)
      if(data[id].type == 'folder') this.addFolder(data[id].name, data[id].path)
    }
  }

  addFolder(name, src) {
    const root = this.root.appendChild(document.createElement('div'))
    root.style.cssText = `
      border-top: 1px solid darkgray;
      padding: 20px
    `

    const a = root.appendChild(document.createElement('a'))
    a.href = src
    a.innerText = name
  }

  addItem(name, src) {
    const root = this.root.appendChild(document.createElement('div'))
    root.style.cssText = `
      border-top: 1px solid darkgray;
      padding: 20px
    `

    const a = root.appendChild(document.createElement('a'))
    a.href = src
    a.innerText = name
  }

  show() {
    this.showing = true
    document.body.appendChild(this.root)
  }

  hide() {
    this.showing = false
    this.root.remove()
  }

  toogle() {
    if (this.showing = !this.showing) {
      this.show()
    } else this.hide()
  }
}