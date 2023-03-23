export const helpers = {
    if_eq: function (a: number, b: number, opts: any): any {
        if (a === b) return opts.fn(this);
        else return opts.inverse(this);
    },
};
