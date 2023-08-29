export class MenuPage extends HTMLElement {
    constructor() {
        super()

        this.root = this.attachShadow({ mode: "open" })

        const styles = document.createElement("style")
        this.root.appendChild(styles)


        const loadCSS= async()=> {
            const res = await fetch("components/MenuPage.css")
            const css = await res.text()
            styles.textContent = css
        }

        loadCSS()
    }

    connectedCallback() {
        const template = document.getElementById("menu-page-template")
        const content = template.content.cloneNode(true)
        this.root.appendChild(content)


        window.addEventListener("appmenuchange", () => {
            this.render()
        })
    }

    render() {
        if (app.store.menu) {
            this.root.querySelector("#menu").innerHTML = ""
            for (let cat of app.store.menu) {
                const licat = document.createElement("li")
                licat.innerHTML = `
                    <h3>${cat.name}</h3>
                    <ul class="category">
                    </ul>
                `
                this.root.querySelector("#menu").appendChild(licat)

                cat.products.forEach(element => {
                    const item = document.createElement("product-item")
                    item.dataset.product = JSON.stringify(element)
                    licat.querySelector("ul").appendChild(item)
                });

            }
        } else {
            this.root.querySelector("#menu").innerHTML = "Loading..."
        }
    }

}

customElements.define("menu-page",MenuPage)