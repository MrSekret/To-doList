if (localStorage.getItem("ToDoApp") === null) {
    localStorage.setItem("ToDoApp", JSON.stringify({ settings: { theme: "dark" }, tasks: {}, projects: {} }))
}
class UserStorage {
    constructor() {
    }
    static saveData(data){
        localStorage.setItem("ToDoApp", JSON.stringify(data))
    }
    static setItem(name, value){
        let ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        ToDoApp[name] = value
        this.saveData(ToDoApp)
    }
    static setSetting(name, value) {
        let ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        ToDoApp.settings[name] = value
        this.saveData(ToDoApp)
    }
    static setTask(name, value) {
        let ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        ToDoApp.tasks[name] = value
        this.saveData(ToDoApp)
    }
    static addTask(task) {
        let ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        const tasks = Object.keys(ToDoApp.tasks)
        ToDoApp.tasks[tasks.length] = task
        this.saveData(ToDoApp)
    }
    static addProject(project) {
        let ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        ToDoApp.projects[project.name] = project
        this.saveData(ToDoApp)
    }
    static getItem(name) {
        const ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        return ToDoApp[name]
    }
    static getSetting(name){
        const ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        return ToDoApp.settings[name]
    }
    static getTask(elem){
        const ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        return ToDoApp.tasks[elem]
    }
    static getProject(elem){
        const ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        return ToDoApp.projects[elem]
    }
    static getLastTask(){
        const ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        const allTasks = document.querySelectorAll(".content__tasks-main__task")
        const tasks = ToDoApp.tasks
        const keys = Object.keys(tasks)
        return keys.length == 0 ? allTasks[0] : allTasks[keys.length - 1]
    }
    static deleteTask(name){
        let ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        delete ToDoApp.tasks[name]
        this.saveData(ToDoApp)
    }
    static deleteProject(name){
        let ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        delete ToDoApp.projects[name]
        this.saveData(ToDoApp)
    }
    static setTheme(){
        const ToDoApp = JSON.parse(localStorage.getItem("ToDoApp"))
        const themeElem = app.querySelector('.theme')
        document.documentElement.setAttribute('data-theme', ToDoApp.settings.theme)
        const currentTheme = document.documentElement.getAttribute('data-theme')
        themeElem.innerHTML = currentTheme == 'light' ? "toggle_off" : "toggle_on"
        return
    }
}

export default UserStorage;