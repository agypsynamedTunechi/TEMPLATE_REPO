import editIcon from "../img/file-edit.svg";
import deleteIcon from "../img/trash-can.svg";
import { projectContainer, editBtn, todoContainer, AddTodoUi } from "./dom.js";
import {
  SelectProject,
  deleteProject,
  editProject,
  editProjectDialog,
  renderEditName,
  editData,
  state
} from "./app.js";

function createProject(title, projectId) {
// const projects = document.createElement("div");
//   projects.id = "projects"

  const project = document.createElement("div");
  project.className = "project";
  project.dataset.id = projectId;
  const paraDiv = document.createElement("div");
  paraDiv.className = "project-name";
  const para = document.createElement("p");
  para.textContent = title;
  const edit = document.createElement("div");
  edit.className = "edit";
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  const editImg = document.createElement("img");
  const editSpan = document.createElement("span");
  editSpan.textContent = "edit";
  editImg.src = editIcon;
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  const deleteImg = document.createElement("img");
  const deleteSpan = document.createElement("span");
  deleteSpan.textContent = "delete";
  deleteImg.src = deleteIcon;

  editButton.appendChild(editImg);
  editButton.appendChild(editSpan);
  deleteButton.appendChild(deleteImg);
  deleteButton.appendChild(deleteSpan);
  edit.appendChild(editButton);
  edit.appendChild(deleteButton);

  paraDiv.appendChild(para);
  project.appendChild(paraDiv);
  project.appendChild(edit);
  // projects.appendChild(project)

    project.addEventListener("click", (event) => {
    const child = event.target.closest(".project")
    if (!child) {
      return;
    }

    if (event.target.closest(".delete-button")) {
      console.log(child);
      deleteProject(child);
    } else if (event.target.closest(".edit-button")) {
      console.log("edit");
      editProjectDialog.showModal();

      const index = child.dataset.id;
      console.log(index);
      renderProjectEditName(index);
      editData.index = index;
    } else {
      const index = event.target.dataset.id;
      console.log(index);
      todoContainer.textContent = "";
      SelectProject(index);
    }
  });

 return project
}

export function renderProject() {
  const projectList = document.querySelector("#projects");
  projectList.textContent = ""
  state.projects.forEach((project) => {
    const projectElement = createProject(project.title, project.uuid)    
    projectList.appendChild(projectElement)

  });


   


}
