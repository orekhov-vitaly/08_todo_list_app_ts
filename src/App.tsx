import { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
    type ITask,
    type IUser,
    type ITaskWithUser,
    type SortTypeTask,
    type SortTypeUser,
} from "./types";
import NewTask from "./components/newTask/NewTask";
import TaskList from "./components/taskList/TaskList";
import { NavLink, Route, Routes } from "react-router-dom";
import UserList from "./components/userList/UserList";
import NewUser from "./components/newUser/NewUser";

const TASKS_STORAGE_KEY = "tasks";
const USERS_STORAGE_KEY = "users";

function App() {
    const [tasks, setTasks] = useState<ITask[]>(
        () => JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)!) || [],
    );
    const [users, setUsers] = useState<IUser[]>(
        () => JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)!) || [],
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sortTypeTask, setSortTypeTask] = useState<SortTypeTask>("default");
    const [sortTypeUser, setSortTypeUser] = useState<SortTypeUser>("default");

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
        ])
            .then(([tasksData, usersData]) => {
                setTasks(
                    tasksData.map((e: { createDate: Date }) => ({
                        ...e,
                        createDate: new Date("01.01.2026 00:00"),
                    })),
                );
                setUsers(usersData);

                localStorage.setItem(
                    TASKS_STORAGE_KEY,
                    JSON.stringify(tasksData),
                );
                localStorage.setItem(
                    USERS_STORAGE_KEY,
                    JSON.stringify(usersData),
                );
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    // синхронизация задач
    useEffect(() => {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    // синхронизация пользователей (если они меняются)
    useEffect(() => {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }, [users]);

    const tasksWithUsers: ITaskWithUser[] = tasks.map((task) => {
        const user = users?.find((e) => e.id === task.userId);

        return {
            ...task,
            name: user ? user.name : "Unknown user",
            username: user ? user.username : "Unknown username",
        };
    });

    const sortedTasks = useMemo(() => {
        const tasksCopy = [...tasksWithUsers];
        switch (sortTypeTask) {
            case "completed":
                return tasksCopy.sort((a, b) => +a.completed - +b.completed);
            case "not-completed":
                return tasksCopy.sort((b, a) => +a.completed - +b.completed);
            case "created-asc":
                return tasksCopy.sort((a, b) => {
                    if (new Date(a.createDate).getTime() - new Date(b.createDate).getTime() === 0) {
                        return +a.completed - +b.completed;
                    }
                    return new Date(a.createDate).getTime() - new Date(b.createDate).getTime();
                });
            case "created-desc":
                return tasksCopy.sort(
                    (b, a) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
                );
            default:
                return tasksCopy;
        }
    }, [tasks, sortTypeTask]);

    const sortedUsers = useMemo(() => {
        const usersCopy = [...users];
        switch (sortTypeUser) {
            case "name asc":
                return usersCopy.sort((a, b) => a.name.localeCompare(b.name))
            case "name desc":
                return usersCopy.sort((b, a) => a.name.localeCompare(b.name))
            default:
                return usersCopy;
        }
    }, [users, sortTypeUser]);

    const addTask = (newTask: ITask) => {
        setLoading(true);
        try {
            setTasks((prev) => [newTask, ...prev]);
        } finally {
            setLoading(false);
        }
    };
    const editTask = (newTask: ITask) => {
        setLoading(true);
        try {
            setTasks(
                tasks.map((task) => (newTask.id === task.id ? newTask : task)),
            );
        } finally {
            setLoading(false);
        }
    };
    const deleteTask = (removeTask: ITask) => {
        setLoading(true);
        try {
            const index = tasks.findIndex((e) => e.id == removeTask.id);
            const tasksCopy = [...tasks];
            tasksCopy.splice(index, 1);
            setTasks(tasksCopy);
        } finally {
            setLoading(false);
        }
    };

    const addUser = (newUser: IUser) => {
        setLoading(true);
        try {
            setUsers((prev) => [newUser, ...prev]);
        } finally {
            setLoading(false);
        }
    };
    const editUser = (newUser: IUser) => {
        setLoading(true);
        try {
            setUsers(
                users.map((user) => (newUser.id === user.id ? newUser : user)),
            );
        } finally {
            setLoading(false);
        }
    };
    const deleteUser = (removeUser: IUser) => {
        setLoading(true);
        try {
            const index = users.findIndex((e) => e.id == removeUser.id);
            const usersCopy = [...users];
            usersCopy.splice(index, 1);
            setUsers(usersCopy);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="input-group mt-3">
                <NavLink to="/task_manager" className="btn btn-outline-primary">Task Manager</NavLink>
                <NavLink to="/phone_book" className="btn btn-outline-primary">Phone Book</NavLink>
            </div>

            <Routes>
                <Route
                    path="/task_manager"
                    element={
                        <>
                            <NewTask addTask={addTask} />
                            <TaskList
                                tasks={tasksWithUsers}
                                editTask={editTask}
                                deleteTask={deleteTask}
                                loading={loading}
                                sortedTasks={sortedTasks}
                                setSortTypeTask={setSortTypeTask}
                                sortTypeTask={sortTypeTask}
                            />
                        </>
                    }
                />
                <Route path="/phone_book" element={
                        <>
                            <NewUser addUser={addUser} />
                            <UserList
                                users={users}
                                editUser={editUser}
                                deleteUser={deleteUser}
                                loading={loading}
                                sortedUsers={sortedUsers}
                                setSortTypeUser={setSortTypeUser}
                                sortTypeUser={sortTypeUser}
                            />
                        </>
                    } />
            </Routes>
        </div>
    );
}

export default App;
