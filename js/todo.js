function submitFunction(){
    const inputField = document.getElementById("whatToDo");
    const inputValue = inputField.value;

    if(inputValue){
        const newListItem = document.createElement('li');
        newListItem.textContent = inputValue;
        const deleteButton = document.createElement('button');
        const completeButton = document.createElement('button');

        completeButton.textContent = "완료";
        completeButton.className="complete-button";
        completeButton.onclick = function(){
            newListItem.classList.toggle('highlight');
            saveTodos();
        }
        newListItem.appendChild(completeButton);

        deleteButton.textContent = "삭제";
        deleteButton.className="delete-button";
        deleteButton.onclick = function() {
            const registeredLists = document.querySelector(".registeredLists");
            registeredLists.removeChild(newListItem);
            saveTodos();
        }
        newListItem.appendChild(deleteButton);

        const registeredLists = document.querySelector(".registeredLists");
        registeredLists.appendChild(newListItem);

        saveTodos();
    
        inputField.value='';
    }
}

function createListItem(text){
    const newListItem = document.createElement('li');
    newListItem.textContent = text;

    const completeButton = document.createElement('button');
    completeButton.textContent="완료";
    completeButton.className="complete-button";
    completeButton.onclick=function(){
        newListItem.classList.toggle('highlight');
        saveTodos();
    }
    newListItem.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "삭제";
    deleteButton.className="delete-button";
    deleteButton.onclick = function() {
        const registeredLists = document.querySelector(".registeredLists");
        registeredLists.removeChild(newListItem);
        saveTodos();
    }
    newListItem.appendChild(deleteButton);

    return newListItem;
}

document.addEventListener('DOMContentLoaded', (event)=>{
    loadTodos();
});

function loadTodos(){
    const todos = JSON.parse(localStorage.getItem('todos'))|| [];
    const registeredLists = document.querySelector(".registeredLists");
    todos.forEach(todo => {
        const newListItem = createListItem(todo.text);
        if(todo.isHighlighted){
            newListItem.classList.add('highlight');
        }
        registeredLists.appendChild(newListItem);
    });
}

function saveTodos(){
    const todos = [];
    const registeredLists = document.querySelectorAll('.registeredLists li');
    registeredLists.forEach(item => {
        const text = item.firstChild.textContent;
        const isHighlighted = item.classList.contains('highlight');
        todos.push({text, isHighlighted});
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}