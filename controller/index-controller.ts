class IndexController {
    index = (req: any, res: any) => {
        const settings =  req.session.settings;
        res.render("index", { data: "Hello Wddorlddd", 
        dark: settings.dark, 
        title: "Home page",
        });
    };
}

export const indexController = new IndexController();
