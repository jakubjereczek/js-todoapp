import Tasks from './Tasks.js';

class List {
    constructor() {
        this.tasks = new Tasks();

        this.inputAdd = document.querySelector(".add");
        this.inputSearch = document.querySelector(".search");
        this.button = document.querySelector("button");
        // this.notice = document.querySelector(".notice");
        this.counter = document.querySelector(".counter");
        this.ul = document.querySelector("ul");

        this.button.addEventListener("click", this.addElement.bind(this));
        this.inputSearch.addEventListener("input", this.searchElements.bind(this));
        this.typeSelect = document.querySelector(".box #type");

        this.init();
        this.render();
    }

    deleteElement() {
        console.log('WYKONUJE DELETE');

        const index = event.target.parentNode.dataset.id * 1; // konwersja pod number
        this.tasks.deleteTask(index);

        this.render();
    }

    addElement() {
        const selected = this.typeSelect.options[this.typeSelect.selectedIndex].value * 1; // konwersja
        this.tasks.addTask(this.tasks.tasksList[this.tasks.getLenght() - 1].id + 1, this.inputAdd.value, this.tasks.status[0], selected);
        this.render();
    }

    searchElements(event) {
        const wyszukaneElementy = this.tasks.findTasks(event.target.value);
        this.render(wyszukaneElementy);
    }
    render(elementy = this.tasks.tasksList) {
        this.ul.textContent = "";

        console.log('Wielkosc tablicy ' + elementy.length);

        elementy.forEach((task) => {
            const newElement = document.createElement("li");
            newElement.textContent = task.value;

            const delElement = document.createElement("button")
            if (task.status == "active") {
                console.log('TASK ID:' + task.id);
                newElement.dataset.type = this.tasks.getType(task.id);
                delElement.textContent = "✓";
            } else {
                newElement.dataset.type = "";

                delElement.textContent = "✕";
            }
            newElement.insertBefore(delElement, newElement.firstChild);

            delElement.addEventListener("click", this.deleteElement.bind(this));

            newElement.dataset.id = task.id;
            newElement.dataset.status = task.status;

            this.ul.appendChild(newElement);

        })
        this.counter.textContent = this.tasks.getLenght();

    }
    // load elements from tasks.json 
    init = () => {
        const that = this;
        const request = new XMLHttpRequest();

        request.open('GET', '../tasks.json', true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const data = JSON.parse(this.response);

                data.forEach(task => {
                    that.tasks.addTask(task.key, task.text, task.status, task.type);
                })
                that.render();
            } else {
                console.log('Wystąpił bląd w polączeniu.');
            }
        }
        request.send();
    }
}

export default List;
