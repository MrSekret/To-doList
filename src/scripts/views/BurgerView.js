class BurgerHandlers {
    constructor() {
    }

    static openFn = () => {
        const app = document.getElementById("app")

        const content = app.querySelector(".content")
        const logo = app.querySelector(".title")
        const burger = app.querySelector(".burger")
        const firstSpan = burger.querySelectorAll("span")[0]
        const secondSpan = burger.querySelectorAll("span")[1]
        
        const sidebar = document.querySelector(".sidebar")
        firstSpan.style.transform = "rotate(45deg)"
        secondSpan.style.transform = "rotate(-45deg)"
        logo.style.filter = "blur(3px)"
        sidebar.style.animation = "0.15s slideFromLeft ease-in"
        sidebar.style.display = "flex"
        setTimeout(() => {
            sidebar.style.animation = ""
        }, 160)
        content.style.display = "none"
    }
    static closeFn = () => {
        const app = document.getElementById("app")

        const content = app.querySelector(".content")
        const logo = app.querySelector(".title")
        const burger = app.querySelector(".burger")
        const firstSpan = burger.querySelectorAll("span")[0]
        const secondSpan = burger.querySelectorAll("span")[1]

        const sidebar = document.querySelector(".sidebar")
        firstSpan.style.transform = "rotate(0)"
        firstSpan.style.transform = "translateY(5px)"
        secondSpan.style.transform = "rotate(0)"
        secondSpan.style.transform = "translateY(-5px)"
        logo.style.filter = "blur(0)"
        sidebar.style.animation = "0.15s slideFromLeft ease-in reverse"
        setTimeout(() => {
            sidebar.style.display = "none"
        }, 140)
        content.style.display = "block"
    }
    static initialize = () => {
        const app = document.getElementById("app")
        const burger = app.querySelector(".burger")
        let burgerClicked = false
        burger.addEventListener('click', () => {
            burgerClicked = !burgerClicked
            if (burgerClicked) {
                BurgerHandlers.openFn()
            } else {
                BurgerHandlers.closeFn()
            }
        })
    }
}

export default BurgerHandlers