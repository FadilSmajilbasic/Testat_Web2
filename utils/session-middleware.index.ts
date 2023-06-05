import { Settings } from "./types";

export const sessionUserSettings = (req: any, res: any, next: any): void => {
    const userSettings: Settings = req.session?.userSettings || { orderBy: "title", orderDirection: false, dark: false, filterCompleted: false };

    const { orderBy, toggleStyle, errorMessage, filterCompleted } = req.query;
    if (orderBy) {
        if (userSettings.orderBy === orderBy) {
            userSettings.orderDirection = !userSettings.orderDirection;
        }
        userSettings.orderBy = orderBy;
    }
    if (toggleStyle) {
        userSettings.dark = !userSettings.dark;
    }
    if (filterCompleted) {
        userSettings.filterCompleted = !userSettings.filterCompleted;
    }
    if(errorMessage){
        userSettings.errorMessage = errorMessage;
    }
    req.userSettings = req.session.userSettings = userSettings;

    if (req.originalUrl.split("?").length > 1) {
        res.redirect(req.originalUrl.split("?")[0]);
    } else {
        next();
    }
};
