
import Tasks from './Tasks.js';
import Type from './Type.js';



class List {
    constructor() {
        this.tasks = new Tasks();
        this.type = new Type();

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
        const index = event.target.parentNode.dataset.id * 1; // konwersja pod number
        this.tasks.deleteTask(index);
        this.render();
    }

    addElement() {
        this.tasks.addTask(this.tasks.getLenght(), this.inputAdd.value, this.tasks.status[0]);
        const selected = this.typeSelect.options[this.typeSelect.selectedIndex].value * 1; // konwersja
        this.type.setType(selected, this.tasks.getLenght()); // blad w nadawaniu id 
        this.render();
    }

    searchElements(event) {
        const wyszukaneElementy = this.tasks.findTasks(event.target.value);
        this.render(wyszukaneElementy);
    }
    render(elementy = this.tasks.tasksList) {
        this.ul.textContent = "";
        elementy.forEach((task, index) => {
            const newElement = document.createElement("li");
            newElement.textContent = task.value;

            const delElement = document.createElement("button")
            if (task.status == "active") {
                delElement.textContent = "✓";
            } else {
                delElement.textContent = "✕";
            }
            newElement.insertBefore(delElement, newElement.firstChild);

            delElement.addEventListener("click", this.deleteElement.bind(this));

            newElement.dataset.id = index;
            newElement.dataset.status = task.status;
            console.log(this.type.tasks);
            newElement.dataset.type = this.type.getType(this.type.tasks[index].type);

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
                    that.tasks.addTask(that.tasks.getLenght(), task.text, task.status);
                    that.type.setType(task.type, that.tasks.getLenght());

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
