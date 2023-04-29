class TodoController {
    newTodo = (req: any, res: any) => {
        const dark = req.query.toggle_style === "true";

        if (dark) {
            req.userSettings.dark = !req.userSettings.dark;
            res.redirect(req.originalUrl.split("?")[0]);
        } else {
            res.render("new-todo", {
                data: "Hello todo",
                dark: req.userSettings.dark,
                title: "New Todo",
                today: this.getDay(),
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
}

export const todoController = new TodoController();
