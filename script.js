let tasks = [];
const input = document.getElementById("inputBox");

function handleInput(e) {
  e.preventDefault();
}
function displayData() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");

    //toggle task
    if (task.completed) {
      li.className = "completed";
    } else {
      li.className = "";
    }

    if (task.editTask) {
      li.innerHTML = `<input value="${task.title}" id="${task.id}"/><button onclick="deleteTask(${task.id})">Delete</button><button onclick="updateTask(${task.id})">Upload</button>`;
    } else {
      li.innerHTML = `
    <span onclick="toggleTask(${task.id})">${task.title}</span><button onclick="deleteTask(${task.id})">Delete</button><button onclick="editTask(${task.id})">Edit</button>
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
  displayData();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => {
    return task.id !== taskId;
  });
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
  displayData();
}
displayData();
