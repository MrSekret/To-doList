import UserStorage from "../modules/UserStorage";

class Form{
    constructor(){
    }

    static Layout(starStatus, status="Add task", name="", note="", project="None", date="", button="Add"){
        const allProjects = app.querySelectorAll("option")
        const clasess = starStatus ? 'add-star fa-solid fa-star starred' : 'add-star fa-regular fa-star'
        let optionsHTML = ""
        allProjects.forEach((proj) => {
            const isSelected = proj.textContent == project;
            optionsHTML += `<option value="${proj.value}" ${isSelected ? 'selected' : ''}>${proj.textContent}</option>`;
        });
        return (`
        <form class="content__form-add-task">
            <label for="fname" class="content__form-add-task__title subtitle">${status}</label>
            <input type="text" autocomplete="off" id="fname" name="fname" value="${name}" minlength="3" required>
            <label for="fnote" class="content__form-add-task__note subtitle">Note</label>
            <textarea id="fnote" placeholder="type here..." spellcheck="false" name="fnote">${note}</textarea>
            <div class="content__form-add-task__add">
                <div class="content__form-add-task__add-projects">
                    <label for="fproject" class="content__form-add-task__projects">
                        <h2 class="subtitle">Project</h2>
                    </label>
                    <select id="fproject" name="fproject">
                        ${optionsHTML}
                    </select>
                </div>
                <div class="content__form-add-task__add-date">
                    <label for="fdate" class="content__form-add-task__date subtitle">
                        <h2 class="subtitle">Date</h2>
                    </label>
                    <input type="date" max="2199-12-31" id="fdate" name="fdate" value="${date}">
                </div>
                <i class="${clasess}"></i>
            </div>
            <div class="content__form-add-task__buttons">
                <button class="back-btn fa-sharp fa-solid fa-chevron-left"></button>
                <button type="submit" class="content-button addBtn">${button}</button>
            </div>
        </form>
        `)
    }
    static backFn(event){
        event.preventDefault();
        UserStorage.setSetting("formOpened", false)
        const content__tasks = app.querySelector(".content__tasks")
        const content__form = app.querySelector(".content__form")
        const star = content__form.querySelector(".add-star")
        star.classList.remove("fa-solid")
        star.classList.remove("fa-regular")
        star.classList.add("fa-regular")
        content__form.style.animation = '0.1s slideFromLeft ease-out reverse'
        setTimeout(() => {
            content__form.style.display = 'none'
            content__tasks.style.display = 'flex'
            content__tasks.style.animation = '0.1s slideFromRight ease-out reverse'
        }, 90)
        setTimeout(() => {
            content__tasks.style.animation = ''
            content__form.style.animation = ''
        }, 350)
    }
    static openFn(event){
        event.preventDefault();
        UserStorage.setSetting("formOpened", true)
        const content__tasks = app.querySelector(".content__tasks")
        const content__form = app.querySelector(".content__form")
        content__tasks.style.animation = '0.1s slideFromRight ease-out'
        setTimeout(() => {
            content__tasks.style.display = 'none'
            content__form.style.display = 'flex'
            content__form.style.animation = '0.1s slideFromLeft ease-out'
        }, 90)
        setTimeout(() => {
            content__tasks.style.animation = ''
            content__form.style.animation = ''
        }, 350)
    }
    static RenderView(){
        const addTaskElem =app.querySelector('.addTaskBtn')
        addTaskElem.addEventListener('click', (event) => {
            Form.openFn(event)
        })
        const backButtonElem = app.querySelector('.fa-chevron-left')
        backButtonElem.addEventListener('click', (event) => {
            Form.backFn(event)
        })
    }
}

export default Form