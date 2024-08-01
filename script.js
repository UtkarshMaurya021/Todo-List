const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters .btn"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list")) || [];

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".btn.active").classList.remove("active");
    btn.classList.add("active");
    showTodo();
  });
});

function showTodo() {
  let filter = document.querySelector(".btn.active").id;
  let liTag = "";
  if (todos.length > 0) {
    todos.forEach((todo, id) => {
      let completed = todo.status === "completed" ? "checked" : "";
      if (filter === todo.status || filter === "all") {
        liTag += `<li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <input type="checkbox" id="${id}" ${completed} onclick="updateStatus(this)" />
                      <span class="task-name ${completed}">${todo.name}</span>
                    </div>
                    <div class="task-actions">
                      <i class='bx bx-pencil' onclick='editTask(${id}, "${todo.name}")'></i>
                      <i class='bx bx-trash' onclick='deleteTask(${id})'></i>
                    </div>
                  </li>`;
      }
    });
  } else {
    liTag = `<span class="text-center">You don't have any task here</span>`;
  }
  taskBox.innerHTML = liTag;
  clearAll.classList.toggle("active", todos.length > 0);
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.nextElementSibling;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
}

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

clearAll.addEventListener("click", () => {
  todos = [];
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

taskInput.addEventListener("keyup", e => {
  let userTask = taskInput.value.trim();
  if (e.key === "Enter" && userTask) {
    if (!isEditTask) {
      todos.push({ name: userTask, status: "pending" });
    } else {
      todos[editId].name = userTask;
      isEditTask = false;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});

showTodo();
