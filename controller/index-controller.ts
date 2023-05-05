import { taskStore } from "../utils/task-store";

class IndexController {
    index = (req: any, res: any) => {
        const dark = req.query.toggleStyle === "true";

        if (dark) {req.query.errorMessage?.toString().length > 0
            req.userSettings.dark = !req.userSettings.dark;
            res.redirect(req.originalUrl.split("?")[0]);
        } else {
            taskStore.getAll((err, doc) => {
                res.render("index", {
                    dark: req.userSettings.dark,
                    title: "Home page",
                    tasks: doc,
                    errorMessage: req.query.errorMessage?.toString().length > 0 ? req.query.errorMessage?.toString() : err?.toString(),
                });
            });
        }
    };
}

export const indexController = new IndexController();
