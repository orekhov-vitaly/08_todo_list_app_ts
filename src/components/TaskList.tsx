import type { FC } from "react"
import type { ITask } from "../App"
import Task from "./Task"
import './TaskList.css';

interface IProps {
    tasks: ITask[];
    editTask: (newTask: ITask) => void;
}

const TaskList: FC<IProps> = ({ tasks, editTask }) => {
  return (
    <div className="task-list-form">
        {tasks.map(e => (
            <Task key={e.id} task={e} editTask={editTask} />
        ))}
    </div>
  )
}

export default TaskList