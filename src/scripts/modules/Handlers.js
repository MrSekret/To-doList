import UserStorage from "./UserStorage"
import { TaskHanlders } from "../views/TaskView"
import FiltersHandlers from "../views/FiltersView"
import { ProjectsHandlers } from "../views/ProjectsView"
import BurgerHandlers from "../views/BurgerView"

class Hanlders {
    constructor(root) {
        this.app = document.querySelector(root)
    }
    
    static Theme(){
        const themeElem = app.querySelector('.theme')
        themeElem.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme')
            const theme = currentTheme == 'light' ? "dark" : "light"
            themeElem.innerHTML = currentTheme == 'light' ? "toggle_on" : "toggle_off"
            document.documentElement.setAttribute('data-theme', theme)
            UserStorage.setSetting("theme", theme)
        })
    }
    static Filters(){
        const isMobile = window.innerWidth <= 480
        FiltersHandlers.filters(isMobile)
    }
    static Tasks(){
        TaskHanlders.chooseStar()
        TaskHanlders.submitAdd()
    }
    static Projects(){
        ProjectsHandlers.add()
    }
    static Burger(){
        BurgerHandlers.initialize()
    }
}


export default Hanlders;