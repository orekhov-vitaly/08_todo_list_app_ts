export interface ITask {
    id: string;
    userId: number;
    title: string;
    completed: boolean;
}

export interface IUser {
    id: number;
    name: string;
    username: string;
}

export interface ITaskWithUser extends ITask {
    name: string;
    username: string;
}