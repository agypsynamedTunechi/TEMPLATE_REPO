import "./style.css";
import * as logic from "./logic.js";
import {
  Display,
  projectDialog,
  AddTodoUi,
  projectContainer,
  todoContainer,
  todoDialog,
  editBtn,
} from "./dom.js";
import { renderProject } from "./projectUi.js";
import { renderTodo } from "./todoUi.js";
import { storeProject, loadProject } from "./storage.js";



const projectTitleInput = document.querySelector("#project-title");
const todoTitleInput = document.querySelector("#todo-title");
const todoDescInput = document.querySelector("#todo-description");
const todoDateInput = document.querySelector("#todo-due-date");
const todoPriorityInput = document.querySelector("#todo-priority");
const addBtn = document.querySelector(".add-btn");
const addTodoBtn = document.querySelector(".add-todo-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const editTitle = document.querySelector("#edit-title");
const editCancelBtn = document.querySelector(".edit-cancel-btn");
export const editProjectDialog = document.querySelector("#edit-project-dialog");
const todoCancelBtn = document.querySelector(".todo-cancel-btn");
export const editTodoDialog = document.querySelector("#edit-todo-dialog");
const editTodoBtn = document.querySelector(".edit-todo-btn");
const editTodoTitle = document.querySelector("#edit-todo-title");
const editTodoDesc = document.querySelector("#edit-todo-description");
const editTodoDueDate = document.querySelector("#edit-todo-due-date");
const editTodoPriority = document.querySelector("#edit-todo-priority");
const editTodoCancelBtn = document.querySelector(".edit-todo-cancel-btn");

export const state = {
  projects: [],
  currentProject: null,
};

export const editData = {
  index: null,
};

export function loadSave() {
  const loadStored = loadProject();
  if (loadStored) {
    state.projects = loadStored.projects;
    state.currentProject = loadStored.currentProject;
    render();
  }

  storeProject(state);
}

export function SelectProject(projectId) {
  state.projects.forEach((project) => {
    if (projectId === project.uuid) {
      state.currentProject = project;
    }
  });
  storeProject(state);
  render();
}

export function deleteProject(project) {
  for (let i = 0; i < state.projects.length; i++) {
    const index = state.projects.indexOf(state.projects[i]);
    if (state.projects[i].uuid === project.dataset.id) {
      state.projects.splice(index, 1);
      render();
    }
  }
  storeProject(state);
}

export function deleteTodo(index) {
  if (!state.currentProject) {
    return;
  }

  state.projects.forEach((project) => {
    project.todos.forEach((todo) => {
      console.log("rat");
      if (todo.uuid === index) {
        const position = project.todos.indexOf(todo);
        console.log(position);
        project.todos.splice(position, 1);
        storeProject(state);
      } else {
        return;
      }
    });
    render();
  });
}

function render() {
  renderProject();
  renderTodo();
}


export function eventHandler() {
  addBtn.addEventListener("click", (event) => {
    if (projectTitleInput.value === "") {
      return;
    }
    addProject();
    render();
    event.preventDefault();
    projectDialog.close();
    projectTitleInput.value = "";
  });

  addTodoBtn.addEventListener("click", (event) => {
    if (
      todoTitleInput.value === "" ||
      todoDateInput.value === "" ||
      todoPriorityInput.value === ""
    ) {
      return;
    }
    addTodo();
    event.preventDefault();
    todoDialog.close();
    todoTitleInput.value = "";
    todoDescInput.value = "";
    todoDateInput.value = "";
    render();
  });

  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    editProjectDialog.close();
    projectDialog.close();
    projectTitleInput.value = "";
  
  });

  todoCancelBtn.addEventListener("click", (e) => {
    
    e.preventDefault(todoDialog.close());
    todoTitleInput.value = "";
    todoDescInput.value = "";
    todoDateInput.value = "";
    todoPriorityInput.value = "";
    
  });

  editCancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    editProjectDialog.close();
  });

  editTodoCancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    editTodoDialog.close();
  });

  editBtn.addEventListener("click", (event) => {
    editProject(editData);
    SelectProject(editData.index);
    render();
    event.preventDefault();
    editProjectDialog.close();
    console.log(editData.index);
  });

  editTodoBtn.addEventListener("click", (e) => {
    console.log(editData);
    editTodo(editData);
    render();
    e.preventDefault();
    editTodoDialog.close();
  });
}

function addProject() {
  if (projectTitleInput.value !== "") {
    const project = new logic.Project(projectTitleInput.value);
    state.projects.push(project);
    storeProject(state);
    // todoContainer.textContent = "";

    SelectProject(project.uuid);
    // projectTitleInput.textContent = "";
  }
}

function addTodo() {
  const todo = new logic.Todo(
    todoTitleInput.value,
    todoDescInput.value,
    todoDateInput.value,
    todoPriorityInput.value,
  );
  // state.currentProject.todos.push(todo);
  state.projects.forEach((project) => {
    if (project === state.currentProject) {
      project.todos.push(todo);
      storeProject(state);
    } else {
      return;
    }
  });
}

export function renderProjectEditName(index) {
  state.projects.forEach((project) => {
    if (index === project.uuid) {
      editTitle.value = project.title;
    }
  });
}

export function renderTodoEditName(index) {
  state.currentProject.todos.forEach((todo) => {
    if (todo.uuid === index) {
      editTodoTitle.value = todo.title;
      editTodoDesc.value = todo.description;
      editTodoDueDate.value = todo.dueDate;
      editTodoPriority.value = todo.priority;
    }
  });
}

function editProject() {
  state.projects.forEach((project) => {
    if (project.uuid === editData.index) {
      project.title = editTitle.value;
      console.log(project.title);
      storeProject(state);
    }
  });
}

function editTodo() {
  state.currentProject.todos.forEach((todo) => {
    if (todo.uuid === editData.index) {
      todo.title = editTodoTitle.value;
      todo.description = editTodoDesc.value;
      todo.dueDate = editTodoDueDate.value;
      todo.priority = editTodoPriority.value;

      storeProject(state);
    }
  });
}

export function checkTodo(index) {
  state.projects.forEach((project) => {
    project.todos.forEach((todo) => {
      if (todo.uuid === index) {
        if (todo.isChecked === false) {
          todo.isChecked = true;
          storeProject(state);
        } else{
          todo.isChecked = false;
          storeProject(state);
        }
      }
    });
    render()
  });
}
