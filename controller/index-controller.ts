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
        queryResult.sort(function(a:TaskType, b:TaskType){
            return a.title.localeCompare(b.title);
        })
    }
    private sortByDate(queryResult:any) {
        queryResult.sort(function(a:TaskType, b:TaskType){
            return new Date(a.dueDate).is (b.title);
        })
    }
}

export const indexController = new IndexController();
