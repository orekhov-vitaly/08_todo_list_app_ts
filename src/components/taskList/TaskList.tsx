import type { FC } from "react";
import { type ITaskWithUser, type SortTypeTask } from "../../types";
import Task from "../task/Task";
import "./TaskList.css";
import Loader from "../loader/Loader";

interface IProps {
    tasks: ITaskWithUser[];
    editTask: (newTask: ITaskWithUser) => void;
    deleteTask: (newTask: ITaskWithUser) => void;
    loading: boolean;
    sortedTasks: ITaskWithUser[];
    setSortTypeTask: (newSort: SortTypeTask) => void;
    sortTypeTask: SortTypeTask;
}

const TaskList: FC<IProps> = ({
    editTask,
    deleteTask,
    loading,
    sortedTasks,
    setSortTypeTask,
    sortTypeTask,
}) => {
    const taskList = sortedTasks.map((e) => (
        <Task key={e.id} task={e} editTask={editTask} deleteTask={deleteTask} />
    ));

    return (
        <div className="task-list-form">
            {loading && <Loader />}
            <div className="row mb-3">
                <label className="col-md-auto col-form-label">
                    Сортировать
                </label>
                <div className="col-md">
                    <select
                        id="sortSelect"
                        className="form-select"
                        value={sortTypeTask}
                        onChange={(e) =>
                            setSortTypeTask(e.target.value as SortTypeTask)
                        }
                    >
                        <option value="">по умолчанию</option>
                        <option value="completed">сначала выполненные</option>
                        <option value="not-completed">
                            сначала не выполненные
                        </option>
                        <option value="created-asc">
                            в хронологическом порядке
                        </option>
                        <option value="created-desc">
                            в обратном хронологическом порядке
                        </option>
                    </select>
                </div>
            </div>
            {taskList.length ? (
                <>{taskList}</>
            ) : (
                <h3 className="text-center">"List tasks is empty"</h3>
            )}
        </div>
    );
};

export default TaskList;
