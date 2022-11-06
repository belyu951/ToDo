// находим элементы на странице

const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

//добавление задачи
form.addEventListener("submit", addTask);

//удаление задачи
tasksList.addEventListener("click", deleteTask);

//отмечаем задачи выполнеными
tasksList.addEventListener("click", doneTask);

//функции
function addTask(event) {
  // отменяем отправку формы
  event.preventDefault();

  // достаем текст из поля ввода

  const taskText = taskInput.value;
  //описываем задачу в виде объекта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  //добавляем задачу в массив с задачами
  tasks.push(newTask);
  //формируем css класс
  const cssClass = newTask.done ? "task-title--done" : "task-title";

  //формируем разметку для новой задачи
  const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${newTask.text}</span>
      <div class="task-item__buttons">
          <button type="button" data-action="done" class="btn-action">
              <img src="./img/tick.svg" alt="Done" width="18" height="18">
          </button>
          <button type="button" data-action="delete" class="btn-action">
              <img src="./img/cross.svg" alt="Done" width="18" height="18">
          </button>
      </div>
  </li>`;

  //добовление задачи на страницу

  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  //очищаем поле ввода и возвращаем на него фокус

  taskInput.value = "";
  taskInput.focus();

  //если в списке дел 1-го элемента, скрываем блок "Список дел"
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

function deleteTask(event) {
  // проверяем что клик был не по кнопке "удалить задачу"
  if (event.target.dataset.action === "delete") {
    // проверяем что клик был по кнопке "удалить задачу"
    const parenNode = event.target.closest(".list-group-item");

    //определяем ID задачи
    const id = Number(parenNode.id);

    // нахлдим индекс задачи в массиве
    const index = tasks.findIndex( (task) => task.id === id);

    //удаляем задачу из массива с задачами
    tasks.splice(index, 1);

    //удаляем задачу из разметки
    parenNode.remove();
  }

  //если в списке дел 1-го элемента, показываем блок "Список дел"
  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

function doneTask(event) {
  if (event.target.dataset.action === "done") {

    
    const parentNode = event.target.closest(".list-group-item");


    const taskTitle = parentNode.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");
  }
}
