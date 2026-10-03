import plusIcon from "../img/plus.svg";
import { editProject, } from "./app.js";

export const main = document.querySelector("#content");
export const projectDialog = document.querySelector("#project-dialog");
export const projectContainer = document.querySelector(".project-container");
export const todoContainer = document.querySelector(".todo-container");
export const todoDialog = document.querySelector("#todo-dialog")
export const editBtn = document.querySelector(".edit-btn")

export function Display() {
  
  const projectHeader = document.createElement("div");
  projectHeader.className = "project-header";
  const projectH2 = document.createElement("h2");
  projectH2.textContent = "PROJECTS";
  const addProject = document.createElement("button");
  addProject.className = "add-project";
  const addProjectImg = document.createElement("img");
  addProjectImg.src = plusIcon;
  const addProjectSpan = document.createElement("span");
  addProjectSpan.textContent = "New Project";

  const projects = document.createElement("div");
  projects.id = "projects"

  

  addProject.appendChild(addProjectImg);
  addProject.appendChild(addProjectSpan);

  projectHeader.appendChild(projectH2);
  projectContainer.appendChild(projectHeader);
  projectContainer.appendChild(addProject);
  projectContainer.appendChild(projects);


  addProject.addEventListener("click", () => {
    projectDialog.showModal();
  });
 
}

export function AddTodoUi(project){ 
  const todoHeader = document.createElement("div");
  todoHeader.className = "todo-header";
  const todoH2 = document.createElement("h2");
  todoH2.textContent = project; 
  

  const addTodo = document.createElement("div");
  addTodo.className = "add-todo";
  const addTodoImg = document.createElement("img");
  addTodoImg.src = plusIcon;
  const addTodoBtn = document.createElement("button");
  addTodoBtn.textContent = "New Task"

  const todos = document.createElement("div");
  todos.className = "todos";


 addTodo.appendChild(addTodoImg)
 addTodo.appendChild(addTodoBtn)
 todoContainer.appendChild(todoH2)
 todoContainer.appendChild(addTodo)
 todoContainer.appendChild(todos)

 addTodo.addEventListener("click", ()=>{
    todoDialog.showModal()
    
 })

  
}
