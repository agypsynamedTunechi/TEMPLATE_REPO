export class Project{
    constructor(title){
        this.title = title;
        this.todos = [];
        this.uuid = crypto.randomUUID();
    }

}

export class Todo{
    constructor(title, description,dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.uuid = crypto.randomUUID();
        this.isChecked = false
    }
}

