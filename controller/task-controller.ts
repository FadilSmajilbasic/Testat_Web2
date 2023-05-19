import { taskStore } from "../services/task-store";

class TaskController {
    index = (req: any, res: any) => {
        const dark = req.query.toggleStyle === "true";

        if (dark) {
            req.userSettings.dark = !req.userSettings.dark;
            res.redirect(req.originalUrl.split("?")[0]);
        } else {
            res.render("task-create", {
                dark: req.userSettings.dark,
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
        const id = req.url.split("/")[2];
        const action: string = req.body.action;

        if (action === "Overview") {
            // Overview case
            res.redirect("/");
        } else if (action?.includes("Update")) {
            taskStore.update(
                id,
                req.body.title,
                req.body.importance,
                req.body.description,
                new Date(req.body.dueDate).toISOString(),
                req.body.done === "on",
                function (err: any, task: any) {
                    if (err) {
                        console.log("Error updating task: " + err);
                        res.redirect("/?errorMessage=" + err);
                    }
                    if (action.includes("Overview")) {
                        // Update and Overview case
                        res.redirect("/");
                    } else {
                        // Update case

                        res.redirect("/task/edit/" + id + "/");
                    }
                }
            );
        } else {
            taskStore.add(
                req.body.title,
                req.body.importance,
                req.body.description,
                new Date(req.body.dueDate).toISOString(),
                function (err: any, task: any) {
                    if (err) {
                        console.log("Error creating task: " + err);
                        res.redirect("/?errorMessage=" + err);
                    }
                    if (action?.includes("Overview")) {
                        // Create and Overview case
                        res.redirect("/");
                    } else {
                        // Create case
                        res.redirect("/task/edit/" + task._id + "/");
                    }
                }
            );
        }
    };

    edit = (req: any, res: any) => {
        const id = req.url.split("/")[2];
        const currentDate = this.getDay();
        taskStore.get(id, function (err: any, task: any) {
            if (err) {
                console.log("Task not found: " + err);
                res.redirect("/?errorMessage=" + err);
            }
            if (task == null) {
                console.log("Task not found: " + id);
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
                low_checked: task.importance === "Low" ? "checked" : "",
                medium_checked: task.importance === "Medium" ? "checked" : "",
                high_checked: task.importance === "High" ? "checked" : "",
                urgent_checked: task.importance === "Urgent" ? "checked" : "",
                checked: task.done ? "checked" : "",
            });
        });
    };

    delete = (req: any, res: any) => {
        const id = req.url.split("/")[2];
        taskStore.delete(id, function (err: any, task: any) {
            if (err) {
                console.log("Error deleting task: " + err);
                res.redirect("/?errorMessage=" + err);
            }
            res.redirect("/");
        });
    };
}

export const taskController = new TaskController();
