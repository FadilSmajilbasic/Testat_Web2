export type TaskType = {
    id: number;
    title: string;
    importance: number;
    description: string;
    creationDate: Date;
    dueDate: string;
    done: boolean;
};

export type Settings = {
    orderBy: string;
    orderDirection: boolean;
    dark: boolean;
    filterCompleted: boolean;
    errorMessage: string;
};
