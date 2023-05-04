import { taskStore } from "../utils/task-store";

class IndexController {
    index = (req: any, res: any) => {
        const dark = req.query.toggle_style === "true";

        if (dark) {
            req.userSettings.dark = !req.userSettings.dark;
            res.redirect(req.originalUrl.split("?")[0]);
        } else {
            taskStore.getAll((err, doc) => {
                res.render("index", { dark: req.userSettings.dark, title: "Home page", tasks: doc });
            });
        }
    };
}

export const indexController = new IndexController();
