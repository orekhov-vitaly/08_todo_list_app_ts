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
            <select
                id="sortSelect"
                className="form-select mb-3"
                value={sortTypeTask}
                onChange={(e) => setSortTypeTask(e.target.value as SortTypeTask)}
            >
                <option value="">Выберите сортировку</option>
                <option value="completed">Выполнено/не выполнено</option>
                <option value="not-completed">Не выполнено/выполнено</option>
                <option value="created-asc">
                    По дате создания (в хронологическом порядке)
                </option>
                <option value="created-desc">
                    По дате создания (в порядке, обратном хронологическому)
                </option>
            </select>
            {taskList.length ? (
                <>
                    {taskList}
                </>
            ) : (
                <h3 className="text-center">"List tasks is empty"</h3>
            )}
        </div>
    );
};

export default TaskList;
