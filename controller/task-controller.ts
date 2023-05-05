import { taskStore } from "../utils/task-store";

class TaskController {
    index = (req: any, res: any) => {
        const dark = req.query.toggleStyle === "true";
        const update = req.query.update === "true";

        if (dark) {
            req.userSettings.dark = !req.userSettings.dark;
            res.redirect(req.originalUrl.split("?")[0]);
        } else {
            res.render("task-create", {
                dark: req.userSettings.dark,
                title: "New Task",
                today: this.getDay(),
                submitText: update ? "Update" : "Create",
            });
        }
    };

    private getDay() {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, "0");
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const year = today.getFullYear().toString();
        return `${year}-${month}-${day}`;
    }

    create = (req: any, res: any) => {
        console.log(req.body.dueDate);

        taskStore.add(req.body.title, req.body.importance, req.body.description, req.body.dueDate, req.body.done, function (err: any, doc: any) {
            if (err) {
                console.log("Error inserting document: " + err);
            }
            res.redirect("/?errorMessage=" + err);
        });
    };
}

export const taskController = new TaskController();
