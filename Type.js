import Tasks from './Tasks.js'

class Type extends Tasks {

    constructor() {
        super();
        this.tasks = []
        this.typeOptions = ["wazne", "neutralne", "niewazne"];
        this.type = "neutralne";
        this.setType = function (id, taskId) {
            if (id < this.typeOptions.length && typeof id === "number") {
                let saveOption = {
                    id: taskId,
                    type: id,
                }
                this.tasks.push(saveOption);
                console.log(this.tasks);
            }
        }
        this.getType = function (id) {
            return this.typeOptions[id]
        }
    }
}

export default Type;
