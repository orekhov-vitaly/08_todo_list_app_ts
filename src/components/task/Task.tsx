import { useState, type FC } from "react";
import type { ITask, IUser } from "../../App";
import "./Task.css";

const Task: FC<{
    task: ITask;
    user: IUser | undefined;
    editTask: (newTask: ITask) => void;
    deleteTask: (newTask: ITask) => void;
}> = ({ task, user, editTask, deleteTask }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newTaskTitle, setNewTaskTitle] = useState(task.title);

    const saveNewTitleTask = () => {
        editTask({
            ...task,
            title: newTaskTitle,
        });
        setIsEdit(false);
    };

    const changeCompletedTask = () =>
        editTask({
            ...task,
            completed: !task.completed,
        });

    const cancelEditTask = () => {
        setIsEdit(!isEdit);
        setNewTaskTitle(task.title);
    };
    
    return (
        <div
            className={
                task.completed
                    ? "task-item task-completed"
                    : "task-item task-active"
            }
        >
            {!isEdit ? (
                <div className="row">
                    <div className="col">
                        <p>User: {user!==undefined && user.name}</p>
                        <h5
                            className="task-title m-0"
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            {task.title}
                        </h5>
                    </div>
                    <div className="col-auto text-end d-flex justify-content-end align-items-center actions">
                        <div className="form-check form-switch d-inline-block m-0">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={changeCompletedTask}
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
            ) : (
                <div className="row">
                    <div className="col">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={newTaskTitle}
                                onChange={(e) =>
                                    setNewTaskTitle(e.target.value)
                                }
                            />
                            <button
                                className="btn btn-success"
                                onClick={saveNewTitleTask}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={cancelEditTask}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
