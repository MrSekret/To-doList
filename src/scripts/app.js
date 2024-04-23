import MainLayout from "./modules/Layout.js"
import Form from "./views/FormView.js"
import Task from "./views/TaskView.js"
import Projects from "./views/ProjectsView.js"
import UserStorage from "./modules/UserStorage.js"
import Handlers from "./modules/Handlers.js"

class App {
    constructor() {
    }
    
    static Layout(){
        MainLayout.SetLayout()
    }
    static render(){
        Form.RenderView()
        Task.Render()
        Projects.Render()
    }
    static loadSettings(){
        UserStorage.setTheme()
    }
    static addHandlers(){
        Handlers.Theme()
        Handlers.Filters()
        Handlers.Tasks()
        Handlers.Projects()
        Handlers.Burger()
    }
}

export default App