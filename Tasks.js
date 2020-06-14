class Tasks {
    constructor() {
        this.status = ["active", "done"];
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

    }

    addTask(id, value, status = this.status[0]) {
        console.log(id, value, status);
        if (!value) {
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
            status: status
        }
        this.tasksList.push(newTask);
    }

    deleteTask(id) {
        console.log(this.tasksList[id]);
        if (this.tasksList[id].status === this.status[1]) {
            this.tasksList.splice(id, 1);
        } else {
            this.changeStatus(id);
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