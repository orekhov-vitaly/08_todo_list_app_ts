import { useRef, type FC } from "react";
import { type ITask } from '../../types';
import { v4 } from "uuid";
import "./NewTask.css";

interface IProps {
    addTask: (newTask: ITask) => void;
}

const NewTask: FC<IProps> = ({ addTask }) => {
    const inputUserId = useRef<HTMLInputElement>(null);
    const inputNewTask = useRef<HTMLInputElement>(null);

    const saveTask = () => {
        addTask({
            id: v4(),
            completed: false,
            title: inputNewTask.current!.value,
            userId: +inputUserId.current!.value,
            createDate: new Date(),
        });
        inputNewTask.current!.value = inputUserId.current!.value = "";
    };

    return (
        <div className="new-task-form">
            <div className="container">
                <div className="row mb-3">
                    <label className="col-md-auto col-form-label">
                        Введите ID автора задачи:
                    </label>
                    <div className="col-md">
                        <input
                            className="form-control"
                            ref={inputUserId}
                            type="number"
                            min={1}
                            max={10}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-md-auto col-form-label">
                        Введите новую задачу:
                    </label>
                    <div className="col-md">
                        <input
                            className="form-control"
                            ref={inputNewTask}
                            type="text"
                        />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={saveTask}>
                    Add task
                </button>
            </div>
        </div>
    );
};

export default NewTask;
