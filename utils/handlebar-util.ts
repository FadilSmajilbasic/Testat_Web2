export const helpers = {
    if_eq: (a: number, b: number, opts: any): number  => {
        if (a === b) return opts.fn(this);
        else return opts.inverse(this);
    },
    getImportance(importance: number): string {
        switch (importance) {
            case 0:
                return "Low";
            case 1:
                return "Medium";
            case 2:
                return "High";
            case 3:
                return "Urgent";
        }
        return "Unknown";
    },
    ifDone(done: boolean): any {
        return done? "checked" : "";
    },
};
