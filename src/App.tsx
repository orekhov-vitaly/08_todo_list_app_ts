import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./components/newTask/NewTask";
import TaskList from "./components/taskList/TaskList";

export interface ITask {
    userId: number;
    id: string;
    title: string;
    completed: boolean;
}

export interface IUser {
    id: number;
    name: string;
    username: string;
}

function App() {
    const TASKS_STORAGE_KEY = "todos_app_tasks";
    const USERS_STORAGE_KEY = "todos_app_users";
    const [tasks, setTasks] = useState<ITask[]>(
        () => JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)!) || []
    );
    const [users, setUsers] = useState<IUser[] | undefined>(
        () => JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)!) || []
    );
    const [error, setError] = useState("");

    useEffect(() => {
        if (!localStorage.getItem(TASKS_STORAGE_KEY)) {
            fetch("https://jsonplaceholder.typicode.com/todos")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Error with fetch data");
                    }
                    return res.json();
                })
                .then((tasks) => {
                    // setTasks(tasks.slice(0, 10) || []);
                    setTasks(tasks || []);
                })
                .catch((error) => setError(error));
        } else {
            setTasks(JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)!));
        }

        if (!localStorage.getItem(USERS_STORAGE_KEY)) {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Error with fetch data");
                    }
                    return res.json();
                })
                .then((users) => {
                    setUsers(users || []);
                })
                .catch((error) => setError(error));
        } else {
            setUsers(JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)!));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }, [tasks]);

    const addTask = (newTask: ITask) => setTasks((prev) => [newTask, ...prev]);
    const editTask = (newTask: ITask) => {
        setTasks(
            tasks.map((task) => (newTask.id === task.id ? newTask : task))
        );
    };
    const deleteTask = (removeTask: ITask) => {
        const index = tasks.findIndex((e) => e.id == removeTask.id);
        const tasksCopy = [...tasks];
        tasksCopy.splice(index, 1);
        setTasks(tasksCopy);
    };
    const filterTaskList = (isFilter: boolean) => {
        const newTaskList: ITask[] = [];
        tasks.map((e) => {
            isFilter
                ? e.completed === false
                    ? newTaskList.unshift(e)
                    : newTaskList.push(e)
                : e.completed !== false
                ? newTaskList.unshift(e)
                : newTaskList.push(e);
        });
        setTasks(newTaskList);
    };

    return (
        <div className="container-fluid">
            <NewTask addTask={addTask} />
            <TaskList
                tasks={tasks}
                users={users}
                editTask={editTask}
                deleteTask={deleteTask}
                filterTaskList={filterTaskList}
            />
        </div>
    );
}

export default App;
