class Tasks {
    constructor() {
        this.status = ["active", "done"];
        this.typeOptions = ["wazne", "neutralne", "niewazne"];
        this.tasksList = [];

        this.getElements = function () {
            return this.tasksList;
        }
        this.getElementById = function (id) {
            return this.tasksList[id];
        }
        this.getLenght = function () {
            return this.tasksList.length;
        }
        this.getArrayID = function (id) {
            const arrayID = this.tasksList.findIndex(x => x.id === id);
            return arrayID;
        }
        this.getType = function (id) {
            return this.typeOptions[this.tasksList[this.getArrayID(id)].type];
        }
    }


    addTask(id, value, status = this.status[0], type = 1) {
        console.log(id, value, status, type);
        if (!value || (type > this.typeOptions.length)) {
            return;
        }
        for (const element of this.tasksList) {
            if (element.value == value) {
                return;
            }
        }
        let newTask = {
            id: id,
            value: value,
            status: status,
            type: type
        }
        this.tasksList.push(newTask);
        console.log(this.tasksList);
    }

    deleteTask(id) {
        if (this.tasksList[this.getArrayID(id)].status === this.status[1]) {
            this.tasksList.splice(this.getArrayID(id), 1);
        } else {
            this.changeStatus(this.getArrayID(id));
            return;
        }
    }

    changeStatus(id) {
        if (this.tasksList[id].status === this.status[0]) {
            this.tasksList[id].status = this.status[1];
        }
    }
    findTasks(text) {
        const result = this.tasksList.filter(e => e.value.toLowerCase().includes(text.toLowerCase()));
        return result;
    }



}

export default Tasks;


