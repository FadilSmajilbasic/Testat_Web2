import { taskStore } from "../services/task-store";
import { TaskType } from "../utils/types";

class TaskController {
    index = (req: any, res: any) => {
        const dark = req.query.toggleStyle === "true";

        if (dark) {
            req.userSettings.dark = !req.userSettings.dark;
            res.redirect(req.originalUrl.split("?")[0]);
        } else {
            res.render("task-create", {
                style: req.userSettings.dark ? "dark" : "light",
                title: "New Task",
                today: this.getDay(),
                dueDate: this.getDay(),
                submitText: "Create",
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
        const urlId = req.url.split("/")[2];
        const action: string = req.body.action;

        const task = {
            title: req.body.title,
            importance: Number(req.body.importance),
            description: req.body.description,
            creationDate: new Date(),
            dueDate: new Date(req.body.dueDate).toLocaleDateString(),
            done: req.body.done === "on",
        } as TaskType;

        if (action?.includes("Update")) {
            taskStore.update({ ...task, id: urlId }, function (err: any, task: any) {
                if (err) {
                    res.redirect("/?errorMessage=" + err);
                }
                if (action.includes("Overview")) {
                    // Update and Overview case
                    res.redirect("/");
                } else {
                    // Update case
                    res.redirect("/task/edit/" + urlId + "/");
                }
            });
        } else {
            taskStore.add(task, function (err: any, task: any) {
                if (err) {
                    res.redirect("/?errorMessage=" + err);
                }
                if (action?.includes("Overview")) {
                    // Create and Overview case
                    res.redirect("/");
                } else {
                    // Create case
                    res.redirect("/task/edit/" + task._id + "/");
                }
            });
        }
    };

    edit = (req: any, res: any) => {
        const id = req.url.split("/")[2];
        const currentDate = this.getDay();
        taskStore.get(id, function (err: any, task: any) {
            if (err) {
                res.redirect("/?errorMessage=" + err);
            }
            if (task == null) {
                res.redirect("/?errorMessage=Task not found with id: " + id);
            }
            res.render("task-create", {
                dark: req.userSettings.dark,
                title: "Edit Task",
                task: task,
                today: currentDate,
                dueDate: new Date(task.dueDate).toISOString().split("T")[0],
                submitText: "Update",
                edit: true,
                low_checked: task.importance === 0 ? "checked" : "",
                medium_checked: task.importance === 1 ? "checked" : "",
                high_checked: task.importance === 2 ? "checked" : "",
                urgent_checked: task.importance === 3 ? "checked" : "",
                checked: task.done ? "checked" : "",
            });
        });
    };

    delete = (req: any, res: any) => {
        const id = req.url.split("/")[2];
        taskStore.delete(id, function (err: any, task: any) {
            if (err) {
                res.redirect("/?errorMessage=" + err);
            }
            res.redirect("/");
        });
    };
}

export const taskController = new TaskController();
