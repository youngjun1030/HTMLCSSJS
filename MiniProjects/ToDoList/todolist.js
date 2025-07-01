window.onload = function() {
    const savedToDoList = JSON.parse(localStorage.getItem('todolist'))

    if (savedToDoList) {
        for (let todo of savedToDoList) {
            createToDo(todo)
        }
        
    }
    const startBtn = document.querySelector("#addBtn");
    startBtn.addEventListener("click", () => createToDo());

    const inputBox = document.querySelector("#inputBox")
    inputBox.addEventListener("keydown", function(event) {
        if (event.key === 'Enter')
            createToDo();
    });

    // 전체 삭제 버튼 이벤트 리스너 추가
    // 전체 삭제 버튼을 클릭하면 CONFIRM 창이 뜨고, 확인을 누르면 전체 삭제
    const clearBtn = document.querySelector("#clearBtn");
    clearBtn.addEventListener("click", () => {
    if (confirm("정말로 전체 삭제하시겠습니까?")) {
        document.querySelector("#todolist").innerHTML = "";
        localStorage.removeItem('todolist');
    }
    });
}

function createToDo(todo) {
    
    if (todo == "" && inputBox.value == "") return;

    // new li 노드 생성
    const liNode = document.createElement('li');

    const checkBtn = document.createElement('button');
    checkBtn.classList.add("checkBtn");

    const todoText = document.createElement('span');
    if (todo) {
        todoText.innerText = todo.contents;
        if (todo.check) {
            todoText.classList.add('check');
            checkBtn.innerText = 'V';
        }
    } else {
        todoText.innerText = inputBox.value;
    }

    checkBtn.addEventListener("click", function() {
        todoText.classList.toggle('check');
        if (checkBtn.innerText == "")
            checkBtn.innerText = 'V';
        else {
            checkBtn.innerText = "";
        }
        console.log("save to list")
        saveToDoList();
    });


    const delBtn = document.createElement('button');
    delBtn.innerText = 'X';
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", function() {
        liNode.remove();
        saveToDoList();
    });

    // 수정 버튼 추가
    const editBtn = document.createElement('button');
    editBtn.innerText = '✏️';
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", function () {
    const newText = prompt("수정할 내용을 입력하세요:", todoText.innerText);
    if (newText !== null && newText.trim() !== "") {
        todoText.innerText = newText.trim();
        saveToDoList();
    }
    });


    liNode.appendChild(checkBtn);
    liNode.appendChild(todoText);
    liNode.appendChild(editBtn);   // 수정 버튼 추가
    liNode.appendChild(delBtn);

    // ul에 new list append
    const ulNode = document.querySelector('ul');
    ulNode.appendChild(liNode);

    document.querySelector('#todolist').style.display = 'block'

    saveToDoList();
}

function saveToDoList() {
    const todoList = document.querySelectorAll('li');
    if (todoList.length == 0) return;

    const saveItems = [];
    for (let node of todoList) {
        const todo = node.querySelector('span').innerText;
        const check = node.querySelector('span').classList.contains('check');
        const todoObj = {
            contents : todo,
            check : check
        };
        saveItems.push(todoObj);
    }

    const list = JSON.stringify(saveItems);
    localStorage.setItem('todolist', list);
}