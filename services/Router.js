
const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", (event) => {
                event.preventDefault()
                //const url = a.href
                const url = a.getAttribute("href")
                console.log("cccl", url)
                Router.go(url)
            })
        })

        // event handler for URL changes
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route,false)
        })


        // check the initial url
        Router.go(location.pathname)
    },
    go: (route, addToHistory = true) => {
        console.log("gooo", route)
        
        if (addToHistory) {
            history.pushState({route},'',route)
        }

        let pageElement = null

        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page")
                break;
            case "/order":
                pageElement = document.createElement("order-page")
                break;
            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page")
                    const paramId = route.substring(route.lastIndexOf("-") + 1)
                    pageElement.dataset.id = paramId
                }
        }

        const cache = document.querySelector("main")

         cache.innerHTML=""
        // cache.children[0].remove()
        cache.appendChild(pageElement)
        window.scrollX = 0
        window.screenY = 0

    }
}


export default Router