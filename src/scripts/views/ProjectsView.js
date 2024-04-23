import UserStorage from "../modules/UserStorage";
import FiltersHandlers from "./FiltersView";
import ProjectClass from "../classes/Project";

class Projects{
    constructor() {
    }

    static formLayout(){
        return (`
        <div class="projects__list__formProject" style="margin-bottom: 8px">
            <input type="text" autocomplete="off" id="fpname" class="projects__list_formProject-input" required minlength="1">
        </div>
        `)
    }
    static filterLayout(name){
        return (`
        <div class="projects__list__project filter">
            <i class="folder fa-regular fa-folder"></i>
            <p class="projects__list__project-name">${name}</p>
            <div class="projects__list__project-btns">
                <i class="options edit-p material-symbols-rounded">edit</i>
                <i class="options delete-p material-symbols-rounded">delete</i>
            </div>
        </div>
        `)
    }
    static Render(){
        const projects = UserStorage.getItem("projects")
        const projectsNames = Object.keys(projects)
        const listOfProjects = app.querySelector(".projects__list")
        projectsNames.forEach((elem, ind) => {
            listOfProjects.insertAdjacentHTML('afterbegin', Projects.filterLayout(projects[elem].name))
            const projectsList = app.querySelectorAll(".projects__list__project")
            const lastProject = projectsList[0]
            const editIcon = lastProject.querySelector(".edit-p")
            const deleteIcon = lastProject.querySelector(".delete-p")

            lastProject.addEventListener('click', (event) => {
                FiltersHandlers.filterTasks(lastProject, projects[elem].index, event)
            })
            editIcon.addEventListener('click', (event) => {
                ProjectsHandlers.editFn(lastProject, event, ind)
            })
            deleteIcon.addEventListener('click', (event) => {
                ProjectsHandlers.deleteFn(event)
            })

            const selectElem = document.getElementById("fproject")
            const option = document.createElement("option")
            option.text = projects[elem].name
            option.value = projects[elem].name
            selectElem.appendChild(option)
        })
    }
}
export class ProjectsHandlers {
    constructor() {
    }
    
    static statusEditOrAdd(currFolder, currFilter, addProjectBtn){
        if(currFolder){
            currFolder.classList.toggle("fa-solid")
            currFolder.classList.toggle("fa-regular")
        }
        if(currFilter) currFilter.classList.toggle("selectedFilter")
        addProjectBtn.classList.toggle('plus')
        addProjectBtn.classList.toggle('rotated')
    }
    static add(){
        const addProjectBtn = app.querySelector(".fa-plus")
        
        addProjectBtn.addEventListener('click', (event) => {
            const currFilter = app.querySelector(".selectedFilter")
            const currFolder = app.querySelector(".folder.fa-solid")
            const projectList = app.querySelector(".projects__list")
            let formProject = app.querySelector('.projects__list__formProject')
            
            ProjectsHandlers.statusEditOrAdd(currFolder, currFilter, addProjectBtn)

            const cancelCreation = () => {
                formProject.parentNode.removeChild(formProject);
                currFilter.classList.add("selectedFilter");
                const currFolder = currFilter.querySelector(".folder")
                if(currFolder){
                    currFolder.classList.toggle("fa-solid")
                    currFolder.classList.toggle("fa-regular")
                }
                addProjectBtn.classList.add('plus');
                addProjectBtn.classList.remove('rotated');
                document.removeEventListener('click', clickOutInputPlus);
            }
            const clickOutInputPlus = function (event) {
                const cross = app.querySelectorAll(".rotated");
                if (addProjectBtn.contains(event.target) && cross.length == 0) {
                    cancelCreation()
                } else if (!formProject.contains(event.target)) {
                    cancelCreation()
                } else if (formProject.contains(event.target)) {
                    return
                }
            }

            if (!formProject) {
                projectList.insertAdjacentHTML('afterbegin', Projects.formLayout())
                formProject = app.querySelector('.projects__list__formProject')

                const allProjects = document.querySelectorAll(".projects__list__project")
                allProjects.forEach(e => {
                    e.style.animation = "0.2s slideFromTop ease-out"
                    setTimeout(() => {
                        e.style.animation = ""
                    }, 1900);
                })
                formProject.style.animation = "0.2s slideFromTop ease-out"
                setTimeout(() => {
                    formProject.style.animation = ""
                }, 1900);
                formProject.querySelector("input").focus()

                document.removeEventListener('click', clickOutInputPlus)
                document.addEventListener('click', clickOutInputPlus)

                formProject.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {                        
                        const title = formProject.querySelector("input").value
                        projectList.insertAdjacentHTML('afterbegin', Projects.filterLayout(title))
                        const allProjects = document.querySelectorAll(".projects__list__project")
                        const ind = allProjects.length-1
                        const project = new ProjectClass(title, ind)
                        UserStorage.addProject(project)
                        
                        addProjectBtn.classList.toggle('plus');
                        addProjectBtn.classList.toggle('rotated');

                        document.removeEventListener('click', clickOutInputPlus)
                        formProject.parentNode.removeChild(formProject)

                        const selectElem = document.getElementById("fproject")
                        const option = document.createElement("option")
                        option.text=title
                        option.value = title
                        selectElem.appendChild(option)

                        const currProject = allProjects[0]
                        currProject.classList.add("selectedFilter")
                        currProject.classList.add("filter")

                        const icon = currProject.querySelector("i")
                        const pen = currProject.querySelector(".edit-p")
                        const trash = currProject.querySelector(".delete-p")
                        icon.classList.remove("fa-regular")
                        icon.classList.add("fa-solid")

                        FiltersHandlers.filterTasks(currProject, project.ind, event)

                        currProject.addEventListener('click', (event) => {
                            FiltersHandlers.filterTasks(currProject, project.ind, event)
                        })
                        trash.addEventListener('click', (event) => {
                            ProjectsHandlers.deleteFn(event)
                        })
                        pen.addEventListener('click', (event) => {
                            ProjectsHandlers.editFn(currProject, event, project.ind)
                        })
                    }
                })
            }
            event.stopPropagation()
        })
    }
    static deleteFn(event){
        const parent = event.target.parentNode;
        const grandParent = parent.parentNode;
        const title = grandParent.querySelector("p").innerHTML
        UserStorage.deleteProject(title)

        const prevOption = (Array.from(app.querySelectorAll("option"))).filter(e => e.innerHTML==title)[0]
        const prevOptionValue = prevOption.value
        const optionToRemove = app.querySelector(`option[value="${prevOptionValue}"]`);
        optionToRemove.remove()
        
        grandParent.style.animation = "0.2s slideFromLeft ease-out reverse"
        setTimeout(() => {
            grandParent.parentNode.removeChild(grandParent)
            const allFilter = app.querySelector(".filter.all")
            FiltersHandlers.filterTasks(allFilter, 0, event)
        }, 190)
        event.stopPropagation()
    }
    static editFn(lastProject, event, ind){
        const prevTitle = lastProject.querySelector("p").innerHTML
        const editField = document.createElement('form');
        editField.classList.add("projects__list__formProject");
        editField.style.marginBottom = "8px";
        editField.style.animation = "0.2s showIn ease-out"
        editField.innerHTML = `
            <input type="text" autocomplete="off" id="fpname" class="projects__list_formProject-input" minlength="1" required value="${prevTitle}">
        `;
        lastProject.replaceWith(editField)
        editField.querySelector("input").focus()

        const currFolder = app.querySelector(".folder.fa-solid")
        const currFilter = app.querySelector(".selectedFilter")
        const addProjectBtn = app.querySelector(".fa-plus")
        ProjectsHandlers.statusEditOrAdd(currFolder, currFilter, addProjectBtn)

        const cancelEditing = () => {
            editField.replaceWith(lastProject)
            if(currFilter){ 
                currFilter.classList.add("selectedFilter");
                const currFolder = currFilter.querySelector(".folder")
                if(currFolder){
                    currFolder.classList.toggle("fa-solid")
                    currFolder.classList.toggle("fa-regular")
                }
            }
            addProjectBtn.classList.add('plus');
            addProjectBtn.classList.remove('rotated');
            document.removeEventListener('click', clickOutInput);
        }
        const clickOutInput = function (event) {
            const cross = app.querySelectorAll(".rotated");
            if (addProjectBtn.contains(event.target) && cross.length == 0) {
                cancelEditing()
            } else if (!editField.contains(event.target)) {
                cancelEditing()
            } else if (editField.contains(event.target)) {
                return
            }
        }

        document.removeEventListener('click', clickOutInput)
        document.addEventListener('click', clickOutInput)

        editField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {                        
                const title = editField.querySelector("input").value
                const filterElement = document.createElement('div');
                filterElement.classList.add("projects__list__project", "filter", "selectedFilter");
                filterElement.innerHTML = `
                    <i class="folder fa-solid fa-folder"></i>
                    <p class="projects__list__project-name">${title}</p>
                    <div class="projects__list__project-btns">
                        <i class="options edit-p material-symbols-rounded">edit</i>
                        <i class="options delete-p material-symbols-rounded">delete</i>
                    </div>
                `;
                editField.replaceWith(filterElement)

                addProjectBtn.classList.toggle('plus')
                addProjectBtn.classList.toggle('rotated')

                const project = new ProjectClass(title, ind)
                UserStorage.deleteProject(prevTitle)
                UserStorage.addProject(project)

                document.removeEventListener('click', clickOutInput)

                const prevOption = (Array.from(app.querySelectorAll("option"))).filter(e => e.innerHTML==prevTitle)
                const option = document.createElement("option") 
                option.text=title
                option.value = title
                prevOption[0].replaceWith(option)

                FiltersHandlers.filterTasks(filterElement, project.ind, event)

                const trash = filterElement.querySelector(".delete-p")
                const pen = filterElement.querySelector(".edit-p")
                filterElement.addEventListener('click', (event) => {
                    FiltersHandlers.filterTasks(filterElement, project.ind, event)
                })
                trash.addEventListener('click', (event) => {
                    ProjectsHandlers.deleteFn(event)
                })
                pen.addEventListener('click', (event) => {
                    ProjectsHandlers.editFn(filterElement, event, project.index)
                })
            }
        })

        event.stopPropagation()
    }
}

export default Projects