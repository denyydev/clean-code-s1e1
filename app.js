var taskInput = document.getElementById("task-input"); // Input for new task name
var addButton = document.getElementsByTagName("button")[0]; // First button on the page (add task button)
var pendingTasks = document.getElementById("pending-tasks"); // ul of #pending-tasks (list of pending tasks)
var doneTasks = document.getElementById("done-tasks"); // ul of #done-tasks (list of completed tasks)

// New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li"); // Create list item
  listItem.className = "task"; // Add class name to list item

  // input (checkbox)
  var checkBox = document.createElement("input"); // Checkbox for marking task complete
  // label
  var label = document.createElement("label"); // Label for the task
  // input (text)
  var editInput = document.createElement("input"); // Text input for editing task
  // button.edit
  var editButton = document.createElement("button"); // Edit button
  // button.delete
  var deleteButton = document.createElement("button"); // Delete button
  var deleteButtonImg = document.createElement("img"); // Image for delete button

  label.innerText = taskString;
  label.className = "task-label";

  // Each element needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task-edit";

  editButton.innerText = "Edit"; // innerText encodes special characters, HTML does not.
  editButton.className = "edit-btn";

  deleteButton.className = "delete-btn";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  // Append elements to the list item.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function() {
  console.log("Add Task...");
  // Create a new list item with the text from the #task-input
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // Append listItem to pendingTasks
  pendingTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = ""; // Clear the input field
}

// Edit an existing task.
var editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode; // Get parent of edit button

  var editInput = listItem.querySelector("input[type=text]"); // Get input field
  var label = listItem.querySelector("label"); // Get label
  var editBtn = listItem.querySelector(".edit-btn"); // Get edit button
  var containsClass = listItem.classList.contains("edit-mode"); // Check if list item is in edit mode

  // If class of the parent is .edit-mode
  if (containsClass) {
    // switch to normal mode
    // label becomes the input's value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    // switch to edit mode
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
}

// Delete task.
var deleteTask = function() {
  console.log("Delete Task...");

  var listItem = this.parentNode; // Get parent of delete button
  var ul = listItem.parentNode; // Get parent of list item

  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

// Mark task completed
var taskCompleted = function() {
  console.log("Complete Task...");

  // Append the task list item to the #done-tasks
  var listItem = this.parentNode; // Get parent of the checkbox
  doneTasks.appendChild(listItem); // Move task to completed list
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("Incomplete Task...");
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #pending-tasks.
  var listItem = this.parentNode; // Get parent of the checkbox
  pendingTasks.appendChild(listItem); // Move task to pending list
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  // select list item's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]"); // Checkbox for task
  var editButton = taskListItem.querySelector("button.edit-btn"); // Edit button
  var deleteButton = taskListItem.querySelector("button.delete-btn"); // Delete button

  // Bind editTask to edit button.
  editButton.onclick = editTask;
  // Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

// cycle over pendingTasks ul list items
// for each list item
for (var i = 0; i < pendingTasks.children.length; i++) {
  // bind events to list item's children (taskCompleted)
  bindTaskEvents(pendingTasks.children[i], taskCompleted);
}

// cycle over doneTasks ul list items
for (var i = 0; i < doneTasks.children.length; i++) {
  // bind events to list item's children (taskIncomplete)
  bindTaskEvents(doneTasks.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

// Prevent creation of empty tasks.

// Change edit to save when you are in edit mode.
