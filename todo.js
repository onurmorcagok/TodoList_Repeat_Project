// Tüm elementleri seçme işlemi 
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() { // Tüm eventListener'lar

    form.addEventListener("submit", addTodo);
}

function addTodo(e) { // Todo Ekleme Fonksiyonu

    const newTodo = todoInput.value.trim();

    if (newTodo === "") {

        showAlert("danger", "Lütfen bir todo giriniz.");

    } else {

        addTodoToUI(newTodo);

        showAlert("success", "Todo başarıyla eklendi.")
    }

    e.preventDefault();
}

function showAlert(type, message) {

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeOut Method

    setTimeout(function () {
        alert.remove();
    }, 1000);
}

function addTodoToUI(newTodo) { // String degerini listItem olarak UI'ya ekleyecek

    // List Item Oluşturma

    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    // Link Oluşturma

    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    // Text Node Ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo List'e List Item Ekleme
    todoList.appendChild(listItem);

    todoInput.value = "";
}