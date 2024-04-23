class MainLayout {
    constructor() {
    }
    static Layout(){
        return (
            `
        <header>
            <h1 class="title">to<span>do.</span></h1>
            <div></div>
            <a class="burger" href="#">
                <span class="burger__elem"></span>
                <span class="burger__elem"></span>
            </a>
        </header>
        <div class="cards">
            <aside class="sidebar">
                <div class="filters">
                    <div class="filters__title subtitle">
                        <h2>Filters</h2>
                        <p id="theme" class="material-symbols-rounded theme">toggle_on</p>
                    </div>
                    <p class="filter all selectedFilter"><i class="material-symbols-rounded">inbox</i> All</p>
                    <p class="filter fstarred"><i class="fa-solid fa-star"></i> Starred</p>
                    <p class="filter today"><i class="material-symbols-rounded">today</i> Today</p>
                    <p class="filter week"><i class="material-symbols-rounded">date_range</i> Week</p>
                </div>
                <div class="projects">
                    <div class="projects__title subtitle">
                        <h2>Projects</h2>
                        <i class="fa-solid fa-plus plus"></i>
                    </div>
                    <div class="projects__list">
                        
                    </div>
                </div>
                <div class="github">
                    <a href="https://github.com/mrsekret/to-do"><i class="fa-brands fa-github"></i></a>
                </div>
            </aside>

            <main class="content">
                <div class="content__tasks">
                    <div class="content__tasks-head">
                        <h2 class="content__tasks-head__title subtitle">Tasks</h2>
                        <span class="content__tasks-head__add"></span>
                    </div>
                    <div class="content__tasks-main">
                        <p class="content__tasks-main__not-found">No tasks found</p>
                    </div>
                    <button class="content-button addTaskBtn">Add Task</button>
                </div>
                <div class="content__form">
                    <form class="content__form-add-task">
                        <label for="fname" class="content__form-add-task__title subtitle">Add task</label>
                        <input type="text" autocomplete="off" id="fname" name="fname" minlength="3" required>
                        <label for="fnote" class="content__form-add-task__note subtitle">Note</label>
                        <textarea id="fnote" placeholder="type here..." spellcheck="false" name="fnote"></textarea>
                        <div class="content__form-add-task__add">
                            <div class="content__form-add-task__add-projects">
                                <label for="fproject" class="content__form-add-task__projects">
                                    <h2 class="subtitle">Project</h2>
                                </label>
                                <select id="fproject" name="fproject">
                                    <option value="">None</option>
                                </select>
                            </div>
                            <div class="content__form-add-task__add-date">
                                <label for="fdate" class="content__form-add-task__date subtitle">
                                    <h2 class="subtitle">Date</h2>
                                </label>
                                <input type="date" max="2199-12-31" id="fdate" name="fdate">
                            </div>
                            <i class="add-star fa-regular fa-star"></i>
                        </div>
                        <div class="content__form-add-task__buttons">
                            <button class="back-btn fa-sharp fa-solid fa-chevron-left"></button>
                            <button type="submit" class="content-button addBtn">Add</button>
                        </div>
                    </form>
                </div>
                <div class="content__task">
                    
                </div>
            </main>
        </div>
        `
        )
    }
    static SetLayout(){
        document.querySelector("#app").insertAdjacentHTML("beforeend", MainLayout.Layout())
    }
}

export default MainLayout;