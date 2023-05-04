import { taskStore } from "../utils/task-store";

class CreateTaskController {
    create = (req: any, res: any) => {
        console.log(req.body.dueDate);
        
        taskStore.add(
            req.body.title,
            req.body.importance,
            req.body.description,
            req.body.dueDate,
            req.body.done,
            function (err: any, doc: any) {
                if (err) {
                    console.log("Error inserting document: " + err);
                } else {
                    console.log("Task created: " + doc);
                }

                res.redirect("/");
            }
        );
    };
}

export const createTaskController = new CreateTaskController();
