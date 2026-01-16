import type { FC } from "react";
import type { ITask } from "../App";
import "./Task.css";

const Task: FC<{ task: ITask; editTask: (newTask: ITask) => void }> = ({
    task,
    editTask,
}) => {
    return (
        <div
            className={
                task.completed
                    ? "task-item row task-completed"
                    : "task-item row task-active"
            }
        >
            <div className="col-11">
                <h5 className="task-title">
                    {task.title}
                </h5>
            </div>
            <div className="col-1">
                <input
                    type="checkbox"
                    onChange={() =>
                        editTask({ ...task, completed: !task.completed })
                    }
                    checked={task.completed}
                />
            </div>
        </div>
    );
};

export default Task;
