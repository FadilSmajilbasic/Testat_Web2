class TodoController {
    
	newTodo = (req: any, res: any) => {
		const settings =  req.session.settings;
		res.render("new-todo", { data: "Hello todo", 
		dark: settings?.dark, 
		title: "New Todo"
		});
	}
}

export const todoController = new TodoController();
