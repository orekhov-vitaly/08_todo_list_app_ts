import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./components/newTask/NewTask";
import TaskList from "./components/taskList/TaskList";

export interface ITask {
    id: string;
    userId: number;
    title: string;
    completed: boolean;
}

export interface IUser {
    id: number;
    name: string;
    username: string;
}

export interface ITaskWithUser extends ITask {
    name: string;
    username: string;
}

const TASKS_STORAGE_KEY = "tasks";
const USERS_STORAGE_KEY = "users";
const LAST_USER_ID_KEY = "last_user_id";

function App() {
    // const [tasks, setTasks] = useState<ITask[]>(
    //     () => JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)!) || []
    // );
    // const [lastTaskId, setLastTaskId] = useState<number>();
    // const [users, setUsers] = useState<IUser[] | undefined>(
    //     () => JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)!) || []
    // );
    // const [error, setError] = useState("");

    const [tasks, setTasks] = useState<ITask[]>([]);
    const [lastTaskId, setLastTaskId] = useState<number>();
    const [users, setUsers] = useState<IUser[] | undefined>([]);
    const [loadin, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
        const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

        if (storedTasks && storedUsers) {
            setTasks(JSON.parse(storedTasks));
            setUsers(JSON.parse(storedUsers));
            setLoading(false);
            return;
        }

        Promise.all([
            fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
                res.json(),
            ),
            fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
                res.json(),
            ),
        ]).then(([tasksData, usersData]) => {
            setTasks(tasksData);
            setUsers(usersData);

            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksData));
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }, []);

    const tasksWithUsers: ITaskWithUser[] = tasks.map(task => {
        const user = users?.find(e => e.id === task.userId);

        return {
            ...task,
            name: user ? user.name : "Unknown user",
            username: user ? user.username : "Unknown username",
        }
    });

    const addTask = (newTask: ITask) => setTasks((prev) => [newTask, ...prev]);
    const editTask = (newTask: ITask) => {
        setTasks(
            tasks.map((task) => (newTask.id === task.id ? newTask : task)),
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
                tasks={tasksWithUsers}
                editTask={editTask}
                deleteTask={deleteTask}
                filterTaskList={filterTaskList}
            />
        </div>
    );
}

export default App;
