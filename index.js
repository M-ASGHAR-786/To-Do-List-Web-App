const taskList = document.querySelector(".taskList");
const taskRow = document.querySelector(".taskRow")

let taskArray = [];
window.onload = ()=>{
    const savedTasks = JSON.parse(localStorage.getItem("tasks"))
    taskArray = savedTasks || [];
    displayTaskList(taskArray);
}



function addTask() {
    const taskText = document.querySelector("#inputText").value;
    if (taskText.length === 0) {
        window.alert("You need to enter the task first!");
    } else {
        try {
            taskArray.unshift({ Task: taskText, completed: false });
            displayTaskList();
        } catch (error) {
            window.alert(error);
        }
    }
}

function displayTaskList() {
    taskList.textContent = "";
    taskText = document.querySelector("#inputText").value = "";
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    taskArray.forEach((taskObject,i) => {
        try {
            const row = document.createElement("div");
            row.dataset.index = i;
            const text = document.createElement("span");
            const taskbtns = document.createElement("div");
            const checktask = document.createElement("button");
            const edittask = document.createElement("button");
            const removetask = document.createElement("button");

           
            checktask.addEventListener("click", () => completed(checktask));
            edittask.addEventListener("click", () => edit(edittask));
            removetask.addEventListener("click", () => deleted(removetask));


            // Tick Toggler begins
            if(taskObject.completed){
                checktask.style.color = "black";
                checktask.style.backgroundColor = "green"; 
                text.style.textDecoration = "line-through";
                text.style.opacity = "0.6";
            } else {
                checktask.style.color = "white";
                checktask.style.backgroundColor = "gray"; 
                text.style.textDecoration = "none";
                text.style.opacity = "1";               
            } //Tick Toggler Ends


            // add classes
            row.classList.add("taskRow");
            text.classList.add("taskText");
            taskbtns.classList.add("taskButtons");
            checktask.classList.add("completebtn");
            edittask.classList.add("editbtn");
            removetask.classList.add("deletebtn");

            // button text
            text.textContent = taskObject.Task;
            checktask.textContent = "✔";
            edittask.textContent = "✎";
            removetask.textContent = "🗑️";

            // combine
            taskbtns.append(checktask, edittask, removetask);
            row.append(text, taskbtns);
            taskList.append(row);
            
        }
        
        catch (error) {
            window.alert(error);
            console.error(error);
        }
    });
}

function displayTaskCard() {
    if (taskList.style.display === "none") {
        taskList.style.display = "block";
    } else {
        taskList.style.display = "none";
    }
}




/* Edit Popup begins here*/
const editPopup = document.querySelector(".editPopup");
const editArea = document.querySelector(".editArea")
const confirmEdit = document.querySelector(".confirmEdit");
const cancelEdit = document.querySelector(".cancelEdit");
const text = document.querySelector("#inputText");

let currentEditTast;
let index;
let row;
function edit(editText){
    editPopup.style.display = "block";
    row = editText.closest(".taskRow");
    row.style.backgroundColor = "yellow"
    index = +row.dataset.index;
    let textElement = row.querySelector(".taskText");
    editArea.value = textElement.textContent;
    currentEditTast = textElement;

    

    
}
cancelEdit.addEventListener("click", () => {
    row.style.backgroundColor = "whitesmoke";
    editPopup.style.display = "none";
})

confirmEdit.addEventListener("click",() => {
    row.style.backgroundColor = "whitesmoke";
    currentEditTast.textContent = editArea.value;
    taskArray[index].Task =  editArea.value;;
    localStorage.setItem("tasks",JSON.stringify(taskArray));
    editPopup.style.display = "none"
    })


/* Edit Popup ends here*/




/*Marks completed Task */
function completed(currentEdit) {
    const row = currentEdit.closest(".taskRow");
    const index = +row.dataset.index;
    const task =taskArray[index];
    const taskText = row.querySelector(".taskText")
    if(task.completed){
        currentEdit.style.color = "white";
        currentEdit.style.backgroundColor = "gray"; // mark as completed
        taskText.style.textDecoration = "none";
        taskText.style.opacity = "1";  
        task.completed = false;
    } else {
        currentEdit.style.color = "black";
        currentEdit.style.backgroundColor = "green"; // mark as uncompleted
        taskText.style.textDecoration = "line-through";
        taskText.style.opacity = "0.6";               
        task.completed = true;
    }

    localStorage.setItem("tasks", JSON.stringify(taskArray));


}




/*Deletes Single Task */
function deleted(deleteCurrentTask){
    const row = deleteCurrentTask.closest(".taskRow");
    index = +row.dataset.index;
    row.remove();
    taskArray.splice(index,1);
    
    localStorage.setItem("tasks",JSON.stringify(taskArray));

}



/*Deletes All Tasks */
const deleteAll = document.querySelector(".deleteAll")

function reset() {
    taskList.textContent = "";
    taskArray = [];
    localStorage.removeItem("tasks")
    
}



