import type { FC } from "react";
import type { ITask, IUser } from "../../App";
import Task from "../task/Task";
import "./TaskList.css";
import { v4 } from "uuid";
import Filter from "../filter/Filter";

interface IProps {
    tasks: ITask[];
    users: IUser[] | undefined;
    editTask: (newTask: ITask) => void;
    deleteTask: (newTask: ITask) => void;
    filterTaskList: (isFilter: boolean) => void;
}

const TaskList: FC<IProps> = ({
    tasks,
    users,
    editTask,
    deleteTask,
    filterTaskList,
}) => {
    const taskList = tasks.map((e) => {
        let user: IUser | undefined;
        if (users !== undefined) {
            const userIndex = users.findIndex((user) => user.id === e.userId);
            user = users.find((user) => user.id === userIndex);
        } else {
            user = { id: -1, name: "Unknown", username: "Unknown" };
        }

        return (
            <Task
                key={v4()}
                task={e}
                user={user}
                editTask={editTask}
                deleteTask={deleteTask}
            />
        );
    });

    return (
        <div className="task-list-form">
            {taskList.length ? (
                <>
                    <Filter filterTaskList={filterTaskList} />
                    {taskList}
                </>
            ) : (
                <h3 className="text-center">"List tasks is emty"</h3>
            )}
        </div>
    );
};

export default TaskList;
