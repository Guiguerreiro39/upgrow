import { reactive, readonly } from "vue";
import { monthList } from "./utils/constants.js";

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

function sortedTasks() {
    var tasks = [];
    var today = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
    );

    for (var day in state.tasks) {
        if (new Date(day) >= today && state.tasks[day].length > 0) {
            tasks.push(day);
        }
    }

    tasks.sort(function (a, b) {
        return new Date(a) - new Date(b);
    });

    return tasks;
}

function formattedActiveTasks() {
    var tasks = [];
    sortedTasks().forEach((day) => {
        if (activeTasks(day).length > 0) {
            tasks.push([day, activeTasks(day)]);
        }
    });

    var today = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
    );

    tasks = tasks.map((value) => {
        var date = new Date(value[0]);
        var format = formatDay(date, today);

        if (format.length > 0) {
            return [format, "", date, value[1]];
        }

        var month = monthList[date.getMonth()];
        var day = date.getDate();
        return [day, month, date, value[1]];
    });

    return tasks;
}

function formatDay(date, today) {
    if (date.getFullYear() == today.getFullYear()) {
        if (
            date.getMonth() == today.getMonth() &&
            date.getDate() == today.getDate()
        ) {
            return "Today";
        }

        if (
            date.getMonth() == today.getMonth() &&
            date.getDate() == today.getDate() + 1
        ) {
            return "Tomorrow";
        }

        if (date.getMonth() == today.getMonth() + 1 && today.getDate() == 1) {
            return "Tomorrow";
        }
    }

    return "";
}

function activeTasks(date) {
    if (Object.keys(state.tasks).indexOf(date.toString()) == -1) {
        return [];
    }

    return state.tasks[date].filter((task) => {
        return task.active;
    });
}

function finishedTasks(date) {
    return state.tasks[date].filter((task) => {
        return !task.active;
    });
}

function percentage(date) {
    if (state.tasks[date].length == 0) {
        return 100;
    }

    if (finishedTasks(date).length == 0) {
        return 0;
    }

    return (finishedTasks(date).length / state.tasks[date].length) * 100;
}

export const store = readonly({
    state,
    deleteTask,
    toggleTask,
    createTask,
    initTasks,
    activeTasks,
    finishedTasks,
    formatDay,
    formattedActiveTasks,
    sortedTasks,
    percentage,
});
