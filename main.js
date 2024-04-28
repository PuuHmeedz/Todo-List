let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

// Empty Array To Store The Task

let tasksArray = [];

// Check If There Is Data In Local Storage
if (localStorage.getItem("tasks")) {
	tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger getDataFromLocal Function
getDataFromLocal();

// Add Task

submit.onclick = function () {
	if (input.value != "") {
		addTaskToArray(input.value); // Add Tasks Of Array Tasks
		input.value = ""; // Clear Input Field
	}
};

// Click On Task Elemen
taskDiv.addEventListener("click", function (e) {
	if (e.target.classList.contains("del")) {
		// Delete Task From Local Storage
		deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
		// Delete Element From Page
		e.target.parentElement.remove();
	}
	// Task Element
	if (e.target.classList.contains("task")) {
		// Toggle Completed For the Task
		DoneStatusWith(e.target.getAttribute("data-id"));
		// Add Done Class
		e.target.classList.toggle("done");
	}
});

function addTaskToArray(taskText) {
	// Task Data
	const task = {
		id: Date.now(),
		title: taskText,
		completed: false,
	};
	// Push Tasks To Tasks Array
	tasksArray.push(task);
	// Add Tasks To Page
	todoTasks(tasksArray);
	// Add Tasks To Local Storage
	addToLocal(tasksArray);
}
function todoTasks(tasksArray) {
	// Empty Tasks Div
	taskDiv.innerHTML = "";
	// Looping On Tasks Array
	tasksArray.forEach((task) => {
		// Create Main Div
		let div = document.createElement("div");
		div.className = "task";
		// Check If Task Is Done
		if (task.completed) {
			div.className = "task done";
		}
		div.setAttribute("data-id", task.id);
		div.appendChild(document.createTextNode(task.title));
		// Create Delete Button
		let span = document.createElement("span");
		span.className = "del";
		span.appendChild(document.createTextNode("Delete"));
		// Append Delete Button To Main Div
		div.appendChild(span);
		// Add To Do Tasks
		taskDiv.appendChild(div);
	});
}

function addToLocal(tasksArray) {
	window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function getDataFromLocal() {
	let data = window.localStorage.getItem("tasks");
	if (data) {
		let tasks = JSON.parse(data);
		todoTasks(tasks);
	}
}
// Create Delete Function For Each Task
function deleteTaskWith(taskId) {
	tasksArray = tasksArray.filter((task) => task.id != taskId);
	addToLocal(tasksArray);
}

function DoneStatusWith(taskId) {
	for (let i = 0; i < tasksArray.length; i++) {
		if (tasksArray[i].id == taskId) {
    tasksArray[i].completed = !tasksArray[i].completed;
		}
	}
	addToLocal(tasksArray);
}
