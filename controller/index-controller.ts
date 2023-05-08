import { taskStore } from "../utils/task-store";
import { TaskType } from "../utils/types";

class IndexController {
    index = (req: any, res: any) => {
        const dark = req.query.toggleStyle === "true";

        if (dark) {
            req.query.errorMessage?.toString().length > 0;
            req.userSettings.dark = !req.userSettings.dark;
            res.redirect(req.originalUrl.split("?")[0]);
        } else {
            taskStore.getAll((err, task: TaskType) => {
                res.render("index", {
                    dark: req.userSettings.dark,
                    title: "Home page",
                    tasks: task,
                    errorMessage: req.query.errorMessage?.toString().length > 0 ? req.query.errorMessage?.toString() : err?.toString(),
                });
            });
        }
    };
}

export const indexController = new IndexController();
