import type { FC } from "react";
import type { ITask } from "../App";
import "./Task.css";

const Task: FC<{
    task: ITask;
    editTask: (newTask: ITask) => void;
    deleteTask: (newTask: ITask) => void;
}> = ({ task, editTask, deleteTask }) => {
    return (
        <div
            className={
                task.completed
                    ? "task-item task-completed"
                    : "task-item task-active"
            }
        >
            <div className="row">
                <div className="col-9">
                    <h5 className="task-title">{task.title}</h5>
                </div>
                <div className="col-3 text-end d-flex justify-content-end align-items-center">
                    <div className="form-check form-switch d-inline-block m-0">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={() =>
                                editTask({
                                    ...task,
                                    completed: !task.completed,
                                })
                            }
                            checked={!task.completed}
                        />
                    </div>
                    <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => deleteTask(task)}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;
