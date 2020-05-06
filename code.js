const inputAdd = document.querySelector(".add");
const inputSearch = document.querySelector(".search");
const button = document.querySelector("button")
const notice = document.querySelector(".notice");
const counter = document.querySelector(".counter");
const ul = document.querySelector("ul")

const elements = [];

const deleteElement = (event) => {
    const index = event.target.parentNode.dataset;
    if (index.status == "done") {
        elements.splice(index.key, 1)
        counter.textContent = elements.length;
        noticeText("Element został usunięty..");
        renderList();
    } else if (index.status == "active") {
        elements[index.key].status = "done";
        index.status = elements[index.key].status;
        noticeText("Element zaznaczony jako wykonany.");
        event.target.textContent = "✕";
        renderList();
    }
}

const addElement = () => {
    let active = true;

    if (!inputAdd.value) {
        noticeText("Nie mozesz dodać pustego elementu.");
        active = false;
    }

    elements.forEach((element) => {
        if (inputAdd.value) {
            if (inputAdd.value == element.lastChild.textContent) {
                noticeText("Nie mozesz dodać tego samego elementu.");
                active = false;;
            }
        }

    })
    if (active) {
        const newElement = document.createElement("li");
        newElement.textContent = inputAdd.value;

        const delElement = document.createElement("button")
        delElement.textContent = "✓";
        newElement.insertBefore(delElement, newElement.firstChild);

        delElement.addEventListener("click", deleteElement);

        elements.push(newElement);
        elements[elements.length - 1].status = "active";
        noticeText("Dodano nowy element.");

        counter.textContent = elements.length;
        renderList();
    }

}

const searchElements = (e) => {
    const text = e.target.value;

    const result = elements.filter(element => element.textContent.toLowerCase().includes(text.toLowerCase()));

    ul.textContent = "";

    result.forEach((element) => {
        ul.appendChild(element);
    })
    noticeText(`Znaleziono ${result.length} elementy zawierajace ${text} w nazwie.`);

}

const renderList = () => {
    ul.textContent = "";

    elements.forEach((element, index) => {
        element.dataset.key = index;
        element.dataset.status = elements[index].status;
        ul.appendChild(element)
    })
}

const noticeText = (text) => {
    notice.textContent = text;
}

// load elements from tasks.json 
const init = () => {
    const request = new XMLHttpRequest();

    request.open('GET', '../tasks.json', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(this.response);

            data.forEach(task => {
                const newElement = document.createElement("li");
                newElement.textContent = task.text;

                const delElement = document.createElement("button")
                if (task.status == "active") {
                    delElement.textContent = "✓";
                } else {
                    delElement.textContent = "✕";
                }
                newElement.insertBefore(delElement, newElement.firstChild);

                delElement.addEventListener("click", deleteElement);

                elements.push(newElement);

                elements[task.key].status = task.status;
            })
            renderList();
        } else {
            console.log('Wystąpił bląd w polączeniu.');
        }
    }
    request.send();
}

button.addEventListener("click", addElement);
inputSearch.addEventListener("input", searchElements); //