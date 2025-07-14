"use strict";
let todoLists = [];
let lists = document.querySelector(".tasks ul");
let add = document.querySelector("form button");
let input = document.querySelector("form input");
let saved = localStorage.getItem("todo");
if (saved) {
    todoLists = JSON.parse(saved);
    render();
}
add.addEventListener("click", (e) => {
    e.preventDefault();
    let newTodo = {
        id: Date.now(),
        title: input.value,
    };
    if (!newTodo)
        return;
    todoLists.push(newTodo);
    save();
    input.value = "";
});
function save() {
    localStorage.setItem("todo", JSON.stringify(todoLists));
    render();
}
function render() {
    lists.innerHTML = "";
    todoLists.forEach((todo) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.textContent = todo.title;
        li.classList.add("task");
        // delete
        const delbtn = document.createElement("button");
        delbtn.textContent = "DELETE";
        delbtn.classList.add("del");
        delbtn.addEventListener("click", () => {
            todoLists = todoLists.filter((t) => t.id != todo.id);
            save();
        });
        // edit
        const editbtn = document.createElement("button");
        editbtn.textContent = "EDIT";
        editbtn.classList.add("edit");
        editbtn.addEventListener("click", () => {
            if (span.isContentEditable) {
                span.contentEditable = "false";
                editbtn.textContent = "EDIT";
                todo.title = span.textContent || todo.title;
                save();
            }
            else {
                span.contentEditable = "true";
                span.focus();
                editbtn.textContent = "SAVE";
            }
        });
        li.appendChild(span);
        li.appendChild(delbtn);
        li.appendChild(editbtn);
        lists.appendChild(li);
    });
}
