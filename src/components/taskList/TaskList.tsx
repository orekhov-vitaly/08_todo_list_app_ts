import type { FC } from "react";
import type { ITask } from "../../App";
import Task from "../task/Task";
import "./TaskList.css";
import { v4 } from "uuid";
import Filter from "../filter/Filter";

interface IProps {
    tasks: ITask[];
    editTask: (newTask: ITask) => void;
    deleteTask: (newTask: ITask) => void;
    filterTaskList: (isFilter: boolean) => void;
}

const TaskList: FC<IProps> = ({
    tasks,
    editTask,
    deleteTask,
    filterTaskList,
}) => {
    const taskList = tasks.map((e) => (
        <Task key={v4()} task={e} editTask={editTask} deleteTask={deleteTask} />
    ));

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
