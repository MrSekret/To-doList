import UserStorage from "../modules/UserStorage"
import Form from "../views/FormView"
import TaskClass from "../classes/Task"

class Task {
    constructor() {
    }

    static Layout(name, starred, status){
        const starClass = starred ? 'fa-solid' : 'fa-regular'
        const starStyle = starred ? 'opacity: 1;' : ''
        if(status){
            return(`
                <div class="content__tasks-main__task" style="transition: 0.2 ease-in; background-color: transparent;">
                    <div class="content__tasks-main__task-checkmark"><input type="checkbox" class="hide-check"><i class="fa-solid fa-circle-check check"></i></div>
                    <p class="content__tasks-main__task-title" style="text-decoration: line-through; color: rgb(132, 132, 157);">${name}</p>
                    <div class="content__tasks-main__task-actions"><i class="options edit material-symbols-rounded" style="display:none; transition: all 0.2s ease-in-out 0s;">edit</i><i class="options delete material-symbols-rounded" style="display: flex; transition: all 0.2s ease-in-out 0s;">delete</i><i class="${starClass} fa-star" style="${starStyle} transition: all 0.2s ease-in-out 0s; display:none;"></i></div>
                </div>
        `)}else{
            return(`
            <div class="content__tasks-main__task" style="transition: 0.2 ease-in;">
                <div class="content__tasks-main__task-checkmark"><input type="checkbox" class="hide-check"><i class="fa-regular fa-circle check"></i></div>
                <p class="content__tasks-main__task-title">${name}</p>
                <div class="content__tasks-main__task-actions"><i class="options edit material-symbols-rounded" style="transition: all 0.2s ease-in-out 0s;">edit</i><i class="options delete material-symbols-rounded" style="display: none; transition: all 0.2s ease-in-out 0s;">delete</i><i class="${starClass} fa-star" style="${starStyle} transition: all 0.2s ease-in-out 0s;"></i></div>
            </div>
        `)}
    }
    static LayoutContent(task, filter=0, folderName=""){
        let styleNote=''
        let styleNoNote=''
        let styleStar='display: none;'
        if(task.note=='') styleNote = "display: none;"
        else styleNoNote = 'display: none;'
        if(task.starred) styleStar = "display: inline-block;"
        const icons = [["inbox", "All"], ["", "Starred"], ["today", "Today"], ["date_range", "Week"], ["folder", folderName]]
        let icon
        if(filter==1){
            icon = `<i class="fa-solid fa-star" style="margin-right: 11px;"></i>`
        }else if(filter==4){
            icon = `<i class="material-symbols-rounded open-folder">${icons[filter][0]}</i>`
        }else{
            icon = `<i class="material-symbols-rounded">${icons[filter][0]}</i>`
        }
        return(`
            <div class="content__task-head">
                ${icon}
                <p class="content__task-head__title">${icons[filter][1]}</p>
            </div>
            <div class="content__task-title-head">
                <h2 class="content__task-title-head__title">${task.name}</h2>
                <i class="open-star fa-solid fa-star" style="${styleStar}"></i>
            </div>
            <div class="content__task-main">
                <hr class="note-line">
                <p class="content__tasks-main__note" style="${styleNote}">${task.note}</p>
                <p id="open-note" style="text-align: center; ${styleNoNote}">No note</p>
            </div>
            <div class="content__task-footer">
                <button class="back-btn fa-sharp fa-solid fa-chevron-left" style="cursor: pointer;"></button>
                <p class="content__task-footer__open-date" style="${task.styleDate[1]}">${task.styleDate[0]}</p>
            </div>
        `)
    }
    static RenderContent(task, taskInd, filter=0, folderName=""){
        const app = document.querySelector("#app")
        const content__task = app.querySelector(".content__task")
        const allTasks = app.querySelectorAll(".content__tasks-main__task")
        allTasks[taskInd].addEventListener('click', () => {
            content__task.innerHTML = ""
            const TaskLayout = Task.LayoutContent(task, filter, folderName)
            content__task.insertAdjacentHTML("beforeend", TaskLayout)
            TaskHanlders.close()
        })
    }
    static Render(filter=0, folderName=""){
        const app = document.querySelector("#app")
        const contentMain = app.querySelector(".content__tasks-main")
        const tasks = UserStorage.getItem("tasks")
        const keys = Object.keys(tasks)
        if (keys.length != 0) {
            contentMain.innerHTML = ''
            keys.forEach((elem, ind) => {
                const TaskLayout = Task.Layout(tasks[elem].name, tasks[elem].starred, tasks[elem].status)
                contentMain.insertAdjacentHTML("beforeend", TaskLayout)
                Task.RenderContent(tasks[elem], ind, filter, folderName)
                TaskHanlders.open(elem, ind)
                TaskHanlders.choose(elem, ind)
                TaskHanlders.edit(elem, ind)
                TaskHanlders.delete(elem, ind)
            })
        }
    }
    static getProps(status){
        return(
            {
                taskBackgroudColor: status ? "var(--component)" : "transparent",
                checkmarkClass: status ? ["fa-solid", "fa-circle-check", "fa-circle", "fa-regular"] : ["fa-circle", "fa-regular", "fa-solid", "fa-circle-check"],
                textColor: status ? "var(--dk-text)" : "rgb(132, 132, 157)",
                textFormat: status ? "none" : "line-through",
                penDisplay: status ? "block" : "none",
                starDisplay: status ? "block" : "none",
                trashDisplay: status ? "none" : "flex",
                trashOpacity: status ? "0" : "1",
            }
        )
    }
    static closeFn(){
        const content__tasks = app.querySelector(".content__tasks")
        const content__task = app.querySelector(".content__task")
        UserStorage.setSetting("taskOpened", false)
        content__task.style.animation = '0.1s slideFromRight ease-out'
        setTimeout(() => {
            content__task.style.display = 'none'
            content__tasks.style.animation = '0.1s slideFromLeft ease-out'
            content__tasks.style.display = 'flex'
        }, 90)
        setTimeout(() => {
            content__task.style.animation = ''
            content__tasks.style.animation = ''
        }, 350)
    }
    static openFn = () => {
        UserStorage.setSetting("taskOpened", true)
        const content__tasks = app.querySelector(".content__tasks")
        const content__task = app.querySelector(".content__task")
        content__tasks.style.animation = '0.1s slideFromLeft ease-out reverse'
        setTimeout(() => {
            content__tasks.style.display = 'none'
            content__task.style.display = 'flex'
            content__task.style.animation = '0.1s slideFromRight ease-out reverse'
        }, 90)
        setTimeout(() => {
            content__tasks.style.animation = ''
            content__task.style.animation = ''
        }, 350)
    }
}
export class TaskHanlders {
    constructor() {
    }
    static close(){
        const content__task = app.querySelector(".content__task")
        const backBtn = content__task.querySelector(".back-btn.fa-sharp.fa-solid.fa-chevron-left")
        backBtn.addEventListener('click', () => {
            Task.closeFn()
        })
    }
    static open(task, taskInd){
        const allTasks = app.querySelectorAll(".content__tasks-main__task")
        const localTask = UserStorage.getTask(task)
        const trash = allTasks[taskInd].querySelector('.delete')
        if(localTask.status){
            allTasks[taskInd].removeEventListener('click', Task.openFn)
            trash.style.opacity = "1"
        }
        else{
            allTasks[taskInd].addEventListener('click', Task.openFn)
            trash.style.opacity = "0"
        }
    }
    static choose(task, taskInd){
        const allTasks = app.querySelectorAll(".content__tasks-main__task")
        const currTask = allTasks[taskInd]
        const checkmark = currTask.querySelector(".content__tasks-main__task-checkmark")
        const checkmarkIcon = currTask.querySelector("i")
        const text = currTask.querySelector(".content__tasks-main__task-title")
        const pen = currTask.querySelector(".edit")
        const star = currTask.querySelector(".fa-star")
        const trash = currTask.querySelector(".delete")
        checkmark.addEventListener('click', (event) => {
            const localTask = UserStorage.getTask(task)
            const taskProps = Task.getProps(localTask.status)
            currTask.style.backgroundColor = taskProps.taskBackgroudColor
            checkmarkIcon.classList.remove(taskProps.checkmarkClass[0])
            checkmarkIcon.classList.remove(taskProps.checkmarkClass[1])
            checkmarkIcon.classList.add(taskProps.checkmarkClass[2])
            checkmarkIcon.classList.add(taskProps.checkmarkClass[3])
            text.style.color = taskProps.textColor
            text.style.textDecoration = taskProps.textFormat
            pen.style.display = taskProps.penDisplay
            star.style.display = taskProps.starDisplay
            trash.style.display = taskProps.trashDisplay
            trash.style.opacity = taskProps.trashOpacity

            if(!localTask.status){
                currTask.removeEventListener('click', Task.openFn)
            }
            else{
                currTask.addEventListener('click', Task.openFn)
            }

            localTask.status = !localTask.status
            UserStorage.setTask(task, localTask)
            event.stopPropagation()
        })
    }
    static chooseStar(){
        const star = app.querySelector(".add-star")
        star.addEventListener('click', () => {
            star.classList.toggle("fa-solid")
            star.classList.toggle("starred")
            star.classList.toggle("fa-regular")
        })
    }
    static checkDate(inputDateStr){
        let currentDate = new Date()
        let currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth() + 1
        let currentDay = currentDate.getDate()
        let parts
        if (inputDateStr != undefined) {
            parts = inputDateStr.split('-')
            let inputYear = parseInt(parts[0], 10)
            let inputDay = parseInt(parts[2], 10)
            let inputMonth = parseInt(parts[1], 10)
            if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth) ||
                (inputYear === currentYear && inputMonth === currentMonth && inputDay < currentDay)) {
                return ['Past due', 'color: rgb(227, 74, 74);']
            } else if (inputYear === currentYear && inputMonth === currentMonth && inputDay === currentDay) {
                return [inputDateStr, 'color: rgb(227, 74, 74);']
            } else {
                return [inputDateStr, '']
            }
        }
    }
    static delete(taskname, taskInd){
        const allTasks = app.querySelectorAll(".content__tasks-main__task")
        const currTask = allTasks[taskInd]
        const deleteElem = currTask.querySelector(".delete")
        deleteElem.addEventListener('click', (event) => {
            TaskHanlders.deleteFn(taskname, currTask, event)
        })
    }
    static deleteFn(taskname, currTask, event){
        UserStorage.deleteTask(taskname)
        currTask.style.animation = "0.2s slideFromLeft ease-out reverse"
        setTimeout(() => {
            currTask.parentNode.removeChild(currTask)
            const leftTasks = app.querySelectorAll(".content__tasks-main__task")
            if (leftTasks.length == 0) {
                const content__tasksMain = app.querySelector(".content__tasks-main")
                content__tasksMain.insertAdjacentHTML("beforeend", `<p class="content__tasks-main__not-found">No tasks found</p>`)
            }
        }, 200)
        event.stopPropagation()
    }
    static submitAdd(){
        const form = app.querySelector(".content__form-add-task")
        const backButtonn = form.querySelector(".back-btn")
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            const formData = new FormData(this)
            const taskName = formData.get('fname')
            const taskNote = formData.get('fnote')
            const taskProject = formData.get('fproject')
            const taskDate = formData.get('fdate')
            const starStatus = form.querySelectorAll(".starred")
            const styleDate = TaskHanlders.checkDate(taskDate)
            const newTask = new TaskClass(taskName, taskNote, taskProject, taskDate, styleDate, starStatus.length != 0, false)
            UserStorage.addTask(newTask)

            Task.Render()
            this.reset()
            Form.backFn(event)
        })
        backButtonn.addEventListener('click', function (event) {
            event.preventDefault()
            Form.backFn(event)
            event.stopPropagation()
        })
    }
    static edit(taskname, taskInd){
        const allTasks = app.querySelectorAll(".content__tasks-main__task")
        const currTask = allTasks[taskInd]
        const content__form = app.querySelector(".content__form")
        const pen = currTask.querySelector(".edit")
        pen.addEventListener('click', (event) => {
            UserStorage.setSetting("formOpened", true)

            const task = UserStorage.getTask(taskname)
            content__form.innerHTML = Form.Layout(task.starred, "Edit task", task.name, task.note, task.project, task.date, "Edit")
            
            this.chooseStar()
            
            const form = content__form.querySelector("form")
            const backButtonn = form.querySelector(".back-btn")
            form.addEventListener('submit', function (event) {
                event.preventDefault()
                const formData = new FormData(this)
                const taskName = formData.get('fname')
                const taskNote = formData.get('fnote')
                const taskProject = formData.get('fproject')
                const taskDate = formData.get('fdate')
                const starStatus = form.querySelectorAll(".starred")
                const styleDate = TaskHanlders.checkDate(taskDate)
                const newTask = new TaskClass(taskName, taskNote, taskProject, taskDate, styleDate, starStatus.length != 0, false)
                UserStorage.setTask(taskname, newTask)

                Task.Render()
                content__form.innerHTML = Form.Layout(false)
                TaskHanlders.submitAdd()
                TaskHanlders.chooseStar()
                Form.backFn(event)
            })
            backButtonn.addEventListener('click', function (event) {
                event.preventDefault()
                Form.backFn(event)
                event.stopPropagation()
            })
            Form.openFn(event)
            event.stopPropagation()
        })
    }
}

export default Task