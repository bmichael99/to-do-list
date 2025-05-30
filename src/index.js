

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
    constructor(){ 
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

    removeToDo(toDoName){
        this._toDoList.delete(toDoName);
    }
}


//home();

const workoutPlan = new Project;

const dumbellPress = new toDo("10 reps Dumbell Press","I will press the dumbells 10 times","08-15-2024",2,false);
const dumbellPresss = new toDo("10 reps Dumbell Press","I will press the dumbells 10 times","08-15-2024",2,false);
workoutPlan.addToDo("press1",dumbellPress);
workoutPlan.addToDo("press2",dumbellPresss);

console.log(workoutPlan.getToDoList);

workoutPlan.removeToDo("press2");

console.log(workoutPlan.getToDoList);