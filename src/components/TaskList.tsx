import type { FC } from "react";
import type { ITask } from "../App";
import Task from "./Task";
import "./TaskList.css";

interface IProps {
    tasks: ITask[];
    editTask: (newTask: ITask) => void;
    deleteTask: (newTask: ITask) => void;
}

const TaskList: FC<IProps> = ({ tasks, editTask, deleteTask }) => {
    return (
        <div className="task-list-form">
            <div className="">
                {tasks.map((e) => (
                    <Task
                        key={e.id}
                        task={e}
                        editTask={editTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
