class IndexController {
    index = (req: any, res: any) => {
        const dark = req.query.toggle_style === "true";
        if (dark) {
            req.userSettings.dark = !req.userSettings.dark;
            res.redirect(req.originalUrl.split("?")[0]);
        } else {
            res.render("index", { data: "Hello Wddorlddd", dark: req.userSettings.dark, title: "Home page" });
        }
    };
}

export const indexController = new IndexController();
