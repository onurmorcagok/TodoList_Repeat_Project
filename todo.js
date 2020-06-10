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
     document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
     secondCardBody.addEventListener("click", deleteTodo);
     filter.addEventListener("keyup", filterTodos);
     clearButton.addEventListener("click", clearAllTodos);
 }

 function addTodo(e) { // Todo Ekleme Fonksiyonu

     const newTodo = todoInput.value.trim();

     if (newTodo === "") {

         showAlert("danger", "Lütfen bir todo giriniz.");

     } else {

         addTodoToUI(newTodo);

         addTodoToStorage(newTodo);

         showAlert("success", "Todo başarıyla eklendi.")
     }

     e.preventDefault();
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

 function addTodoToStorage(newTodo) { // Todo listItem'ları Local Storage'a ekleyecek

     let todos = getTodosFromStorage();

     todos.push(newTodo);

     localStorage.setItem("todos", JSON.stringify(todos));
 }

 function getTodosFromStorage() { // Todo listItem'ları Local Storage'dan getirecek ve parse edecek

     let todos;

     if (localStorage.getItem("todos") === null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem("todos"));
     }

     return todos;
 }

 function loadAllTodosToUI() { // todo'ları getTodosFromStorage fonksiyonundan çekip UI'da görüntüleyecek

     let todos = getTodosFromStorage();

     todos.forEach(function (todo) {

         addTodoToUI(todo);
     })
 }

 function deleteTodo(e) { // Seçilen todo UI'dan siler

     if (e.target.className === "fa fa-remove") {
         e.target.parentElement.parentElement.remove();
         deleteTodoFromToStorage(e.target.parentElement.parentElement.textContent);
         showAlert("success", "Todo başarıyla silindi.");
     }
 }

 function deleteTodoFromToStorage(deleteTodo) { // Seçilen todo Storage'dan silinir

     let todos = getTodosFromStorage();

     todos.forEach(function (todo, index) {
         if (todo === deleteTodo) {
             todos.splice(index, 1); // Array'den degeri siler
         }
     });

     localStorage.setItem("todos", JSON.stringify(todos));
 }

 function filterTodos(e) {

     const filterValue = e.target.value.toLowerCase();
     const listItems = document.querySelectorAll(".list-group-item");

     listItems.forEach(function (listItem) {

         const text = listItem.textContent.toLowerCase();

         if (text.indexOf(filterValue) === -1) {

             listItem.setAttribute("style", "display : none!important");

         } else {

             listItem.setAttribute("style", "display : block");
         }
     });
 }

 function clearAllTodos(e) {

     if (confirm("Tüm todoları temizlemek istediğinize emin misiniz ?")) {

         while (todoList.firstElementChild != null) {
             todoList.removeChild(todoList.firstElementChild);
         }

         localStorage.removeItem("todos");
     }
 }

 function showAlert(type, message) { // Uyarı mesajlarını gösterecek olan fonksiyon

     const alert = document.createElement("div");

     alert.className = `alert alert-${type}`;
     alert.textContent = message;

     firstCardBody.appendChild(alert);

     // setTimeOut Method

     setTimeout(function () {
         alert.remove();
     }, 1000);
 }