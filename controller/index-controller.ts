class IndexController {
    index = (req: any, res: any) => {
        res.render("index", { data: "Hello World", dark: true });
    };
}

export const indexController = new IndexController();
