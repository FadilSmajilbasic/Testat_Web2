class TodoController {
    newTodo = (req: any, res: any) => {

        const dark = req.query.toggle_style === "true";
		
        if (dark) {
            req.userSettings.dark = !req.userSettings.dark;
            res.redirect(req.originalUrl.split("?")[0]);
        } else {
            res.render("new-todo", { data: "Hello todo", dark: req.userSettings.dark, title: "New Todo" });
        }

    };
}

export const todoController = new TodoController();
