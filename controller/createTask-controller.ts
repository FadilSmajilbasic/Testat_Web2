class CreateTaskController {
    create = (req: any, res: any) => {
        res.redirect("/?created=true");
    };
}

export const createTaskController = new CreateTaskController();
