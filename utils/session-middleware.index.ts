
export const sessionUserSettings = (req: any, res: any, next: any): void => {
    const userSettings = req.session?.userSettings || { orderBy: "title", orderDirection: -1, dark:false };
    const { orderBy, orderDirection } = req.query;

    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection;
    }
    req.userSettings = req.session.userSettings = userSettings;
    next();
};
export type Settings = {
    orderBy: string;
    orderDirection: number;
    dark: boolean;
}