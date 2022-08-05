const todoInput=document.querySelector(".todo-title");
const todoDescription=document.querySelector(".todo__description")
const addTodo=document.querySelector(".add");
const filterTodo=document.querySelector(".filter-todos");
const todoList=document.querySelector(".todolist");
const isCheck=document.querySelector(".todo-check__dec");
const closeButton = document.querySelector(".edit");
const modal=document.querySelector(".modal");
const typeTodo=document.querySelector(".type-todos");


addTodo.addEventListener("click",addTodofunc);
todoList.addEventListener("click",checkRemove);
filterTodo.addEventListener("click",filterTodosfunc);
document.addEventListener('DOMContentLoaded',getLocalTodos);
isCheck.addEventListener('click',isChecked);
//closeButton.addEventListener("click", toggleModal);
//window.addEventListener("click", windowOnClick);


function addTodofunc(e){
   
    e.preventDefault();
    if (todoInput.value===""){
        alert("Please enter task title");
        return false;
    }
    if(addTodo.textContent==="Edit"){
        addTodo.textContent="New";
        const todoDiv=document.createElement("div");
        todoDiv.classList.add("todoi");
        const newTodo=`<i class="fa-duotone fa-plus mr-2"></i>`;
        todoDiv.innerHTML=newTodo;
        addTodo.appendChild(todoDiv);
    }
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo=` 
       <div>
       <li>${todoInput.value}</li>
        
        <p>${todoDescription.value}</p>
        
      </div>
      
      <div class="todo-icon">
      <div class="todo-icon-type">${typeTodo.value}</div>
           <span><i class="fa-solid fa-check"></i></span>
           <span><i class="fa-solid fa-pen"></i></span>
           <span><i class="fa-regular fa-trash-can"></i></span> 
     </div>   
    `;
    todoDiv.innerHTML=newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value,todoDescription.value,typeTodo.value);
    todoInput.value="";
    todoDescription.value="";
    isCheck.checked = false;
    todoDescription.style.display = "none";
    

}

function checkRemove(e){
   const classList=[...e.target.classList];
  
   const item=e.target;
   
   if (classList[1]==='fa-check'){
    const todo=item.parentElement.parentElement.parentElement;
    todo.classList.toggle("complete");
    
    
   }
   else if (classList[1]==='fa-trash-can'){
    const todo=item.parentElement.parentElement.parentElement;
    todo.remove();
    removeLocalTodos(todo);

   }
   else if (classList[1]==='fa-pen'){
    const todo=item.parentElement.parentElement.parentElement;
    const todoType=item.parentElement.parentElement;
    const items=todo.children[0].innerText.split("\n");
    typeTodo.value=todoType.children[0].innerText;
    todoInput.value=items[0];
    if (items.length===2){
        todoDescription.value=items[2];
    }
    addTodo.textContent="Edit";
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todoi");
    const newTodo=`<i class="fa-solid fa-pencil mr-2"></i>`;
    todoDiv.innerHTML=newTodo;
    addTodo.appendChild(todoDiv);
    todo.remove();
    

   }

}

function filterTodosfunc(e){
    const todos=[...todoList.childNodes];
    
    todos.forEach((todo) => {
        console.log(todo);
        switch(e.target.value){
            case 'all':
            todo.style.display="flex";
            break;
            case 'complete':
                if (todo.classList.contains("complete")){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
            break;
            case 'uncomplete':
                if (!todo.classList.contains("complete")){
                    todo.style.display="flex";
                }
                else{
                     todo.style.display="none";
                 }
            break;
        }
        
    });


}
 function saveLocalTodos(todo,todoDes,type){
    let savedTodos=localStorage.getItem("todos")
       ? JSON.parse(localStorage.getItem("todos"))
       : [];
    savedTodos.push([todo,todoDes,type]);
    console.log(savedTodos);
    localStorage.setItem('todos',JSON.stringify(savedTodos));

 }
 function getLocalTodos(){

    let savedTodos=localStorage.getItem("todos")
       ? JSON.parse(localStorage.getItem("todos"))
       : [];
    
    savedTodos.forEach((todo)=> {
        //console.log(savedTodos);
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo=`
    <div>
    <li>${todo[0]}</li>
    
      <p>${todo[1]}</p>

</div>

<div class="todo-icon">
     <p>${todo[2]}</p>
     <span><i class="fa-solid fa-check"></i></span>
     <span><i class="fa-solid fa-pen"></i></span>
     <span><i class="fa-regular fa-trash-can"></i></span> 
</div>    
    `;
    todoDiv.innerHTML=newTodo;
    todoList.appendChild(todoDiv);
       
    });

 }

 function removeLocalTodos(todo){
    //console.log(todo.children[0].innerText);
    let savedTodos=localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    const filteredTodos=savedTodos.filter(
        (t) => t !== todo.children[0].innerText);
    localStorage.setItem('todos',JSON.stringify(filteredTodos));

 }

 function isChecked() {
    // Get the checkbox
   
    if (isCheck.checked == true){
        todoDescription.style.display = "block";
    } 
    if (isCheck.checked == false){
        todoDescription.style.display = "none";
      } 
    
  }


  function toggleModal1() {
    
    modal.classList.toggle("show-modal");
}
  function toggleModal() {
      modal.classList.toggle("show-modal");
  }
  
  function windowOnClick(event) {
      if (event.target === modal) {
          toggleModal();
      }
  }
  
 