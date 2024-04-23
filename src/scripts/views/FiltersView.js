import UserStorage from "../modules/UserStorage"
import Form from "./FormView"
import Task from "./TaskView"
import BurgerHandlers from "./BurgerView"

class FiltersHandlers {
    constructor() {
    }
    static isInCurrentWeek(dateString) {
        const objectToCheck = new Date(dateString)
        const today = new Date()
        if(today.getFullYear()>objectToCheck.getFullYear() || today.getMonth()>objectToCheck.getMonth()) return false
        const dateTocheck = objectToCheck.getDate()
        const todayDate = today.getDate()
        const todayDayOfMonth = today.getDay() == 0 ? 7 : today.getDay()
        const currWeekStart = todayDate+1-todayDayOfMonth
        const currWeekEnd = currWeekStart+6
        return currWeekStart<=dateTocheck && dateTocheck<=currWeekEnd
    }
    static filterOn(tasks, filtredTitles){
        tasks.forEach((elem) => {
            const title = elem.querySelector("p").innerHTML
            if (filtredTitles.includes(title)) {
                elem.style.display = "none"
            }
        })
    }
    static filterOff(tasks){
        tasks.forEach((elem) => {
            elem.style.display = "flex"
        })
    }
    static filterTasks(e, ind, event){
        let projectTitle = ind == 4 ? e.querySelector("p").innerHTML : e.innerHTML
        Task.Render(ind, projectTitle)

        const icon = app.querySelectorAll(".folder.fa-solid")
        if(icon.length!=0){
            icon[0].classList.add("fa-regular")
            icon[0].classList.remove("fa-solid")
        }
        if (UserStorage.getSetting("formOpened")) Form.backFn(event)
        else if (UserStorage.getSetting("taskOpened")) Task.closeFn()
        const content__task = app.querySelector(".content__task")
        content__task.style.display = "none"
    
        let TasksElem = app.querySelectorAll(".content__tasks-main__task")
        FiltersHandlers.filterOff(TasksElem)
    
        const currSelectedFIlter = app.querySelector(".selectedFilter")
        if(currSelectedFIlter) currSelectedFIlter.classList.remove("selectedFilter")
        e.classList.add("selectedFilter")
    
        const AllTasks = UserStorage.getItem("tasks")
        let tasksNames = Object.values(AllTasks)
        let filtredTasks = []
        if (ind == 0) {
            filtredTasks = []
        } else if (ind == 1) {
            filtredTasks = tasksNames.filter((elem) => !elem.starred)
        } else if (ind == 2) {
            filtredTasks = tasksNames.filter((elem) => !(elem.styleDate[0] != 'Past due' && elem.styleDate[1] == 'color: rgb(227, 74, 74);'))
        } else if (ind == 3) {
            filtredTasks = tasksNames.filter((elem) => !FiltersHandlers.isInCurrentWeek(elem.date))
        }else{
            projectTitle = e.querySelector("p").innerHTML
            const icon = e.querySelector(".folder")
            icon.classList.remove("fa-regular")
            icon.classList.add("fa-solid")
            filtredTasks = tasksNames.filter((elem) => !(projectTitle == elem.project))
        }
        const filtredTitles = filtredTasks.map(elem => elem.name)
        if(filtredTitles.length == tasksNames.length){
            const content__tasksMain = app.querySelector(".content__tasks-main")
            content__tasksMain.innerHTML = `<p class="content__tasks-main__not-found">No tasks found</p>`
        }
        FiltersHandlers.filterOn(TasksElem, filtredTitles)
    }
    static filters(isMobile=false){
        let filters = [...app.querySelectorAll(".filter")]
        filters.forEach((e, ind) => {
            e.addEventListener('click', (event) => {
                if(isMobile) BurgerHandlers.closeFn()
                FiltersHandlers.filterTasks(e, ind, event)
            })
        })
    }
}

export default FiltersHandlers