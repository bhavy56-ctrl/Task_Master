// DOM elements
const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");

// Check token
const token = localStorage.getItem("token");
if (token) showApp();

function showApp() {
authSection.classList.add("hidden");
appSection.classList.remove("hidden");
loadTasks();
}

function showLogin() {
appSection.classList.add("hidden");
authSection.classList.remove("hidden");
}

async function login() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const res = await fetch(${API}/api/auth/login, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password }),
});
const data = await res.json();
if (data.token) {
localStorage.setItem("token", data.token);
showApp();
} else {
alert(data.message || "Login failed");
}
}

async function register() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const res = await fetch(${API}/api/auth/register, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password }),
});
const data = await res.json();
alert(data.message);
}

taskForm.addEventListener("submit", async (e) => {
e.preventDefault();
const title = document.getElementById("title").value;
const description = document.getElementById("description").value;

await fetch(${API}/api/tasks, {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer " + localStorage.getItem("token"),
},
body: JSON.stringify({ title, description }),
});

taskForm.reset();
loadTasks();
});

async function loadTasks() {
const res = await fetch(${API}/api/tasks, {
headers: {
"Authorization": "Bearer " + localStorage.getItem("token"),
},
});
const tasks = await res.json();
taskList.innerHTML = "";
tasks.forEach((task) => {
const li = document.createElement("li");
li.innerHTML = <span style="text-decoration: ${task.completed ? "line-through" : "none"}"> ${task.title} </span> <div class="actions"> <button onclick="toggleComplete('${task._id}')">✅</button> <button onclick="deleteTask('${task._id}')">❌</button> </div> ;
taskList.appendChild(li);
});
}

async function toggleComplete(id) {
await fetch(${API}/api/tasks/${id}/complete, {
method: "PATCH",
headers: {
"Authorization": "Bearer " + localStorage.getItem("token"),
},
});
loadTasks();
}

async function deleteTask(id) {
await fetch(${API}/api/tasks/${id}, {
method: "DELETE",
headers: {
"Authorization": "Bearer " + localStorage.getItem("token"),
},
});
loadTasks();
}

function logout() {
localStorage.removeItem("token");
showLogin();
}