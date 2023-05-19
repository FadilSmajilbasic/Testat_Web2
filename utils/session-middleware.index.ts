import { Settings } from "./types";

export const sessionUserSettings = (req: any, res: any, next: any): void => {
    const userSettings: Settings = req.session?.userSettings || { orderBy: "title", orderDirection: true, dark: false, filterCompleted: false };

    const { orderBy, orderDirection, toggleStyle, errorMessage } = req.query;
    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection;
    }

    userSettings.errorMessage = errorMessage?.toString().length > 0 ? errorMessage.toString() : "";

    req.userSettings = req.session.userSettings = userSettings;

    console.log("middleware");
    if (toggleStyle) {
        userSettings.dark = !userSettings.dark;
    }

    if (req.originalUrl.split("?").length > 1) {
        res.redirect(req.originalUrl.split("?")[0]);
    } else {
        next();
    }
};
