import { Settings } from "./types";

export const sessionUserSettings = (req: any, res: any, next: any): void => {
    const userSettings: Settings = req.session?.userSettings || { orderBy: "title", orderDirection: false, dark: false, filterCompleted: false };

    const { orderBy, orderDirection, toggleStyle, errorMessage, filterCompleted } = req.query;
    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = !userSettings.orderDirection;
    }
    if (toggleStyle) {
        userSettings.dark = !userSettings.dark;
    }
    if (filterCompleted) {
        userSettings.filterCompleted = !userSettings.filterCompleted;
    }
    userSettings.errorMessage = errorMessage?.toString().length > 0 ? errorMessage.toString() : "";

    req.userSettings = req.session.userSettings = userSettings;

    if (req.originalUrl.split("?").length > 1) {
        res.redirect(req.originalUrl.split("?")[0]);
    } else {
        next();
    }
};
