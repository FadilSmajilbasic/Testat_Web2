import { taskStore } from "../services/task-store";
import { TaskType } from "../utils/types";

class IndexController {
    index = (req: any, res: any) => {
        const errorMessage = req.userSettings.errorMessage;
        if (errorMessage?.length > 0) {
            req.userSettings.errorMessage = "";
        }
        taskStore.getAll((err, task: TaskType) => {
            res.render("index", {
                dark: req.userSettings.dark,
                title: "Home page",
                tasks: task,
                errorMessage: errorMessage?.length > 0 ? errorMessage.toString() : err?.toString(),
                orderDirectionInverse: req.userSettings.orderDirection ? false : true,
            });
        });
    };
}

export const indexController = new IndexController();
