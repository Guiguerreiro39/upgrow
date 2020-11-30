import { reactive, readonly } from "vue";

const state = reactive({
    tasks: {},
});

function initTasks(date) {
    state.tasks[date] = [];
}

function deleteTask(id, date) {
    state.tasks[date].forEach((task, index) => {
        if (task.id == id) {
            state.tasks[date].splice(index, 1);
            return;
        }
    });
}

function toggleTask(id, date) {
    state.tasks[date].forEach((task, index) => {
        if (task.id == id) {
            state.tasks[date][index].active = !task.active;
        }
    });
}

function createTask(value, date) {
    state.tasks[date].push(value);
    state.tasks[date].sort(function (a, b) {
        return b.difficulty - a.difficulty;
    });
}

export const store = readonly({
    state,
    deleteTask,
    toggleTask,
    createTask,
    initTasks,
});
