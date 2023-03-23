class IndexController {
    index = (req: any, res: any) => {
        res.render("index", { data: "Hello Wddorlddd", dark: true, title:"Home page" });
    };
}

export const indexController = new IndexController();
