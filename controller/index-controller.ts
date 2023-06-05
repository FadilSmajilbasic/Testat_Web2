import { taskStore } from "../services/task-store";
import { TaskType } from "../utils/types";

class IndexController {
    index = (req: any, res: any) => {
        const errorMessage = req.userSettings.errorMessage;
        if (errorMessage?.length > 0) {
            req.userSettings.errorMessage = "";
        }

        taskStore.getAll((err, task) => {
            switch (req.userSettings.orderBy) {
                case "title":
                    task = this.sortByTitle(task, req.userSettings.orderDirection);
                    break;
                case "dueDate":
                    task = this.sortByDate(task, req.userSettings.orderDirection, false);
                    break;
                case "creationDate":
                    task = this.sortByDate(task, req.userSettings.orderDirection, true);
                    break;
                case "importance":
                    task = this.sortByImportance(task, req.userSettings.orderDirection);
                    break;
            }

            res.render("index", {
                style: req.userSettings.dark?"dark":"light",
                title: "Home page",
                tasks: task,
                errorMessage: errorMessage?.length > 0 ? errorMessage.toString() : err?.toString(),
                orderIcon: req.userSettings.orderDirection ? " ▽ " : " △ ",
            });
        }, req.userSettings.filterCompleted);
    };

    private sortByTitle(queryResult: any, direction: boolean) {
        return queryResult.sort(function (a: TaskType, b: TaskType) {
            if (direction) {
                return b.title.localeCompare(a.title);
            } else {
                return a.title.localeCompare(b.title);
            }
        });
    }
    private sortByDate(queryResult: any, direction: boolean, creationDate = false) {
        return queryResult.sort(function (a: TaskType, b: TaskType) {
            let date1, date2;

            if (creationDate) {
                date1 = new Date(a.dueDate);
                date2 = new Date(b.dueDate);
            } else {
                date1 = new Date(a.creationDate);
                date2 = new Date(b.creationDate);
            }

            if (date1 > date2) {
                return direction ? -1 : 1;
            } else if (date1 < date2) {
                return direction ? 1 : -1;
            } else {
                return 0;
            }
        });
    }

    private sortByImportance(task: any, orderDirection: any): any {
        return task.sort(function (a: TaskType, b: TaskType) {
            if (orderDirection) {
                return b.importance - a.importance;
            } else {
                return a.importance - b.importance;
            }
        });
    }
}

export const indexController = new IndexController();
