

import home from "./home.js";



class toDo{
    constructor(title,description,dueDate,priority,completed){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    get list(){
        return {title: this.title,description: this.description,dueDate: this.dueDate,priority: this.priority};
    }

    set list(_list){
        if (_list && typeof _list === 'object') {
            this.title = _list.title ?? this.title;
            this.description = _list.description ?? this.description;
            this.dueDate = _list.dueDate ?? this.dueDate;
            this.priority = _list.priority ?? this.priority;
            this.completed = _list.completed ?? this.completed;
        }
    }
}

class Project{
    constructor(name){ 
        this._name = name;
        this._toDoList = new Map();
    }

    addToDo(toDoName, toDoItem){
        if(toDoItem instanceof toDo){
            this._toDoList.set(toDoName,toDoItem);
        }
    }

    get getToDoList(){
        return this._toDoList;
    }

    get name(){
        return this._name;
    }

    removeToDo(toDoName){
        this._toDoList.delete(toDoName);
    }
}

function DOM(){
    const toDoDialog = document.querySelector("#task-dialog");
    
    const showButton = document.querySelector("#addToDo");
    const toDoSubmit = document.querySelector("#task-dialog button");
    const toDoForm = document.querySelector("#to-do-form");
    
    const projectDialog = document.querySelector("#project-dialog");
    const projectButton = document.querySelector(".new-project");
    const projectSubmit = document.querySelector("#project-dialog button");
    const projectForm = document.querySelector("#project-form");

    const projectList = document.querySelector("#project-list");

    

    showButton.addEventListener("click", () => {
        toDoDialog.showModal();
    });

    projectButton.addEventListener("click", () => {
        projectDialog.showModal();
    });

    toDoSubmit.addEventListener("click", (event) => {
        event.preventDefault(); // We don't want to submit this fake form
        const formData = new FormData(toDoForm);
        const jsonData = Object.fromEntries(formData);
        const newToDo = new toDo(jsonData.title,jsonData.description,jsonData.dueDate,jsonData.priorityLevel,jsonData.taskCompleted == "yes" ? true:false);
        console.log(currentProject.name);
        currentProject.addToDo(jsonData.title,newToDo);
        displayToDoItems(currentProject);
        
        toDoForm.reset();
    });

    projectSubmit.addEventListener("click", (event) => {
        event.preventDefault(); // We don't want to submit this fake form
        const formData = new FormData(projectForm);
        const jsonData = Object.fromEntries(formData);
        const newProject = new Project(jsonData.title);
        displayNewProject(newProject);
        projectForm.reset();
        projectDialog.close();
    });

    function displayNewProject(project){
        const newProjectButton = document.createElement("button");
        newProjectButton.classList.add("item");
        newProjectButton.setAttribute('project-class', project);
        newProjectButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>clipboard-clock</title><path d="M16.5 16.25L19.36 17.94L18.61 19.16L15 17V12H16.5V16.25M23 16C23 19.87 19.87 23 16 23C14.09 23 12.37 22.24 11.11 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H9.18C9.6 1.84 10.7 1 12 1S14.4 1.84 14.82 3H19C20.11 3 21 3.9 21 5V11.11C22.24 12.37 23 14.09 23 16M11 4C11 4.55 11.45 5 12 5S13 4.55 13 4 12.55 3 12 3 11 3.45 11 4M21 16C21 13.24 18.76 11 16 11S11 13.24 11 16 13.24 21 16 21 21 18.76 21 16Z" /></svg>
        <p>${project.name}</p>
        `;

        newProjectButton.addEventListener("click", () => {
            displayToDoItems(project);
            currentProject = project;
        });
        
        projectList.appendChild(newProjectButton);
    }

    function displayToDoItems(project){
        const content = document.querySelector(".content");
        content.innerHTML = "";

        let toDoList = project.getToDoList;

        for(const value of toDoList.values()){
            const newToDoItemGrid = document.createElement("div");
            newToDoItemGrid.classList.add("card");
            newToDoItemGrid.innerHTML = `
                <p class="card-title">${value.title}</p>
                <p class="card-text">${value.description}</p>
                <div class="card-icons">
                    <p>Due: <span>${value.dueDate}</span></p>
                    <p>Priority: <span>${value.priority}</span></p>
                    <p>Completed: <span>${value.completed}</span></p>
                </div>
            `;

            content.appendChild(newToDoItemGrid);
        }


        

    }

    return {displayNewProject,displayToDoItems};
}


//home();
const myDOM = DOM();


const defaultProject = new Project("Default Project");
let currentProject = defaultProject;
myDOM.displayNewProject(defaultProject);
myDOM.displayToDoItems(defaultProject);

/*
const workoutPlan = new Project("Workout Plan");
myDOM.displayNewProject(workoutPlan);

const dumbellPress = new toDo("10 reps Dumbell Press","I will press the dumbells 10 times","08-15-2024",2,false);
const dumbellPresss = new toDo("10 reps Dumbell Press","I will press the dumbells 10 times","08-15-2024",2,false);
workoutPlan.addToDo("press1",dumbellPress);
workoutPlan.addToDo("press2",dumbellPresss);

console.log(workoutPlan.getToDoList);

workoutPlan.removeToDo("press2");

console.log(workoutPlan.getToDoList);

myDOM.displayToDoItems(workoutPlan);

let currentProject = defaultProject;
*/