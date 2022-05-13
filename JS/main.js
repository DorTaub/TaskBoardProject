let tasksList = [];

let task, date, time;

function saveTask() {
	task = document.getElementById('task').value;
	date = document.getElementById('date').value;
	time = document.getElementById('time').value;

	const newTask = {
		Task: task,
		Date: date,
		Time: time,
		id: tasksList.length,
	};

	if (task === '' || date === '') {
		alert('Please enter the task and the date!');
	} else {
		tasksList.push(newTask);

		localStorage.setItem('AllTasks', JSON.stringify(tasksList));

		createNotes(newTask, tasksList.length - 1);
	}
}

function createNotes(newNote, currIndex) {
	const containerNotes = document.getElementById('container-notes');

	const noteDiv = document.createElement('div');
	containerNotes.appendChild(noteDiv);

	noteDiv.setAttribute('class', 'noteDiv');
	noteDiv.id = currIndex;

	const taskDiv = document.createElement('div');
	taskDiv.innerHTML = newNote.Task;
	noteDiv.appendChild(taskDiv);

	taskDiv.setAttribute('class', 'taskDiv');

	const dateDiv = document.createElement('div');
	dateDiv.innerHTML = newNote.Date;
	noteDiv.appendChild(dateDiv);

	dateDiv.setAttribute('class', 'dateDiv');

	const timeDive = document.createElement('div');
	timeDive.innerHTML = newNote.Time;
	noteDiv.appendChild(timeDive);

	timeDive.setAttribute('class', 'timeDiv');

	const xIcon = document.createElement('span');

	noteDiv.appendChild(xIcon);
	xIcon.setAttribute('class', 'glyphicon glyphicon-remove xIcon');
	xIcon.style = 'opacity : 0';

	noteDiv.addEventListener('mouseover', function () {
		xIcon.style = 'opacity : 1';
	});
	noteDiv.addEventListener('mouseout', function () {
		xIcon.style = 'opacity : 0';
	});
	xIcon.addEventListener('click', function () {
		removeNote(noteDiv, newNote.id);
	});
}

function removeNote(div, id) {
	div.remove();
	for (let i = 0; i < tasksList.length; i++) {
		const object = tasksList[i];
		if (object.id === id) {
			tasksList.splice(i, 1);
		}
	}
	localStorage.setItem('AllTasks', JSON.stringify(tasksList));
}

function loadTasks() {
	let tasksListSave = JSON.parse(localStorage.getItem('AllTasks'));

	if (tasksListSave != null && tasksListSave.length > 0) {
		for (let i = 0; i < tasksListSave.length; i++) {
			createNotes(tasksListSave[i], i);
		}
		tasksList = tasksListSave;
	}
	const saveBtn = document.querySelector('#saveBtn');
	saveBtn.addEventListener('click', saveTask);
}
window.onload = loadTasks;
