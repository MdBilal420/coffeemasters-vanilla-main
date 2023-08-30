export default class DetailsPage extends HTMLElement {
    constructor() {
        super()

        this.root = this.attachShadow({ mode: "open" })


        const template = document.getElementById("details-page-template")
        const content = template.content.cloneNode(true)
        const styles = document.createElement("style")

        this.root.appendChild(content)
        this.root.appendChild(styles)


        const loadCSS= async()=> {
            const res = await fetch("components/DetailsPage.css")
            const css = await res.text()
            styles.textContent = css
        }

        loadCSS()
    }

    async renderData() {
        if (this.dataset.productId) {
            
        }
    }

    connectedCallback() {
        this.renderData()
    }

}

customElements.define("details-page",DetailsPage)