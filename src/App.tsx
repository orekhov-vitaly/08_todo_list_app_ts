import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";

export interface ITask {
    userId: number;
    id: string;
    title: string;
    completed: boolean;
}

function App() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [error, setError] = useState("");

    useEffect(
        () => {
        return()=>{fetch("https://jsonplaceholder.typicode.com/todos")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error with fetch data");
                }
                return res.json();
            })
            .then((tasks) => {
                setTasks(tasks || []);
            })
            .catch((error) => setError(error))}}, []
    );

    return (
        <div className="container-fluid">
            <NewTask
                addTask={(newTask: ITask) =>
                    setTasks((prev) => [newTask, ...prev])
                }
            />
            <TaskList
                tasks={tasks}
                editTask={(newTask: ITask) =>
                    setTasks(
                        tasks.map((task) =>
                            newTask.id === task.id ? newTask : task
                        )
                    )
                }
            />
        </div>
    );
}

export default App;
