let tasks = [];
const input = document.getElementById("inputBox");

function handleInput(e) {
  e.preventDefault();
}

function saveTo() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadFromStorage() {
  const localData = localStorage.getItem("tasks");
  if (localData) {
    tasks = JSON.parse(localData);
  }
  displayData();
}
function displayData() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    let spanClass = task.completed ? "completed" : "";
    if (task.editTask) {
      li.innerHTML = `<input value="${task.title}" id="${task.id}"/><button onclick="deleteTask(${task.id})" class="delete-btn">Delete</button><button onclick="updateTask(${task.id})" class="upload-btn">Upload</button>`;
    } else {
      li.innerHTML = `
    <span class="${spanClass}" onclick="toggleTask(${task.id})">${task.title}</span><button onclick="deleteTask(${task.id})" class="delete-btn">Delete</button><button onclick="editTask(${task.id})" class="edit-btn">Edit</button>
    `;
    }
    list.appendChild(li);
  });
}

function addTask() {
  if (!input.value.trim()) {
    alert("Enter a Task");
    return;
  } else {
    const task = {
      title: input.value,
      id: Date.now(),
      completed: false,
      editTask: false,
    };
    tasks = [task, ...tasks];
    input.value = "";
  }
  saveTo();
  displayData();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => {
    return task.id !== taskId;
  });
  saveTo();
  displayData();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        completed: !task.completed,
      };
    } else {
      return task;
    }
  });
  displayData();
}

function editTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        editTask: true,
      };
    } else {
      return {
        ...task,
        editTask: false,
      };
    }
  });
  displayData();
}

function updateTask(taskId) {
  const editInput = document.getElementById(taskId);
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        title: editInput.value,
        editTask: false,
      };
    } else {
      return task;
    }
  });
  saveTo();
  displayData();
}

function clearTask() {
  localStorage.clear;
  tasks = [];
  displayData();
  saveTo();
}
loadFromStorage();
displayData();
