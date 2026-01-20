export interface ITask {
    id: string;
    userId: string;
    title: string;
    completed: boolean;
    createDate: Date;
}

export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export interface ITaskWithUser extends ITask {
    name: string;
    username: string;
}

export type SortTypeTask =
    | "default"
    | "completed"
    | "not-completed"
    | "created-asc"
    | "created-desc";

export type SortTypeUser =
    | "default"
    | "name asc"
    | "name desc";
