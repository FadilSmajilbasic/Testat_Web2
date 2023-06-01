import { taskStore } from "../services/task-store";
import { TaskType } from "../utils/types";

class IndexController {
    index = (req: any, res: any) => {
        const errorMessage = req.userSettings.errorMessage;
        if (errorMessage?.length > 0) {
            req.userSettings.errorMessage = "";
        }
        taskStore.getAll((err, task) => {
            console.log(task);

            if (req.userSettings.orderByTitle) {
                task = this.sortByTitle(task);
            } else {
                task = this.sortByDate(task);
            }

            res.render("index", {
                dark: req.userSettings.dark,
                title: "Home page",
                tasks: task,
                errorMessage: errorMessage?.length > 0 ? errorMessage.toString() : err?.toString(),
                orderIcon: req.userSettings.orderDirection ? "▽" : "△",
            });
        }, req.userSettings.filterCompleted);
    };

    private sortByTitle(queryResult:any) {
        return queryResult.sort(function(a:TaskType, b:TaskType){
            return a.title.localeCompare(b.title);
        })
    }
    private sortByDate(queryResult:any) {
        return queryResult.sort(function(a:TaskType, b:TaskType){
            const date1 = new Date(a.dueDate);
            const date2 = new Date(b.dueDate);

            if (date1 > date2) {
                return 1;
              } else if (date1 < date2) {
                return -1;
              } else {
                return 0;
              }
        })
    }
}

export const indexController = new IndexController();
