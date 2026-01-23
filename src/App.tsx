import { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
    type ITask,
    type IUser,
    type ITaskWithUser,
    type SortTypeTask,
    type SortTypeUser,
    type Theme,
} from "./types";
import NewTask from "./components/newTask/NewTask";
import TaskList from "./components/taskList/TaskList";
import { NavLink, Route, Routes } from "react-router-dom";
import UserList from "./components/userList/UserList";
import NewUser from "./components/newUser/NewUser";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import {
    createTask,
    deleteTask,
    editTask,
    fetchTask,
} from "./redux/taskAction";
import {
    createUser,
    deleteUser,
    editUser,
    fetchUser,
} from "./redux/userAction";
import ThemeSwitcher from "./components/themeSwitcher/ThemeSwitcher";


const TASKS_STORAGE_KEY = "tasks";
const USERS_STORAGE_KEY = "users";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    
    // const [tasks, setTasks] = useState<ITask[]>(
    //     () => JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)!) || [],
    // );
    const tasks: ITask[] = useSelector(
        (state: RootState) => state.taskManager!.tasks,
    );

    // const [users, setUsers] = useState<IUser[]>(
    //     () => JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)!) || [],
    // );
    const users: IUser[] = useSelector(
        (state: RootState) => state.userManager!.users,
    );

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sortTypeTask, setSortTypeTask] = useState<SortTypeTask>("default");
    const [sortTypeUser, setSortTypeUser] = useState<SortTypeUser>("default");

    useEffect(() => {
        const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
        const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

        if (storedTasks && storedUsers) {
            dispatch(fetchTask(JSON.parse(storedTasks)));
            dispatch(fetchUser(JSON.parse(storedUsers)));
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
                dispatch(
                    fetchTask(
                        tasksData.map((e: { createDate: Date }) => ({
                            ...e,
                            createDate: new Date("01.01.2026 00:00"),
                        })),
                    ),
                );
                dispatch(fetchUser(usersData));

                localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
                localStorage.setItem(
                    USERS_STORAGE_KEY,
                    JSON.stringify(usersData),
                );
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [dispatch]);

    // синхронизация задач
    useEffect(() => {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }, [dispatch, tasks]);

    // // синхронизация пользователей (если они меняются)
    useEffect(() => {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }, [dispatch, users]);

    const tasksWithUsers: ITaskWithUser[] = useMemo(() => {
        return tasks.map((task) => {
            const user = users?.find((e) => e.id === task.userId);

            return {
                ...task,
                name: user ? user.name : "Unknown user",
                username: user ? user.username : "Unknown username",
            };
        });
    }, [tasks, users]);

    const sortedTasks = useMemo(() => {
        const tasksCopy = [...tasksWithUsers];
        switch (sortTypeTask) {
            case "completed":
                return tasksCopy.sort((b, a) => +a.completed - +b.completed);
            case "not-completed":
                return tasksCopy.sort((a, b) => +a.completed - +b.completed);
            case "created-asc":
                return tasksCopy.sort((a, b) => {
                    if (
                        new Date(a.createDate).getTime() -
                            new Date(b.createDate).getTime() ===
                        0
                    ) {
                        return +a.completed - +b.completed;
                    }
                    return (
                        new Date(a.createDate).getTime() -
                        new Date(b.createDate).getTime()
                    );
                });
            case "created-desc":
                return tasksCopy.sort(
                    (b, a) =>
                        new Date(a.createDate).getTime() -
                        new Date(b.createDate).getTime(),
                );
            default:
                return tasksCopy;
        }
    }, [tasksWithUsers, sortTypeTask]);

    const sortedUsers = useMemo(() => {
        const usersCopy = [...users];
        switch (sortTypeUser) {
            case "name asc":
                return usersCopy.sort((a, b) => a.name.localeCompare(b.name));
            case "name desc":
                return usersCopy.sort((b, a) => a.name.localeCompare(b.name));
            default:
                return usersCopy;
        }
    }, [users, sortTypeUser]);

    const addTask = (newTask: ITask) => {
        setLoading(true);
        try {
            dispatch(createTask(newTask));
        } finally {
            setLoading(false);
        }
    };
    const editTask1 = (newTask: ITask) => {
        setLoading(true);
        try {
            dispatch(editTask(newTask));
        } finally {
            setLoading(false);
        }
    };
    const deleteTask1 = (removeTask: ITask) => {
        setLoading(true);
        try {
            const index = tasks.findIndex((e) => e.id == removeTask.id);
            const tasksCopy = [...tasks];
            tasksCopy.splice(index, 1);
            dispatch(deleteTask(removeTask.id));
        } finally {
            setLoading(false);
        }
    };

    const addUser = (newUser: IUser) => {
        setLoading(true);
        try {
            // setUsers((prev) => [newUser, ...prev]);
            dispatch(createUser(newUser));
        } finally {
            setLoading(false);
        }
    };
    const editUser1 = (newUser: IUser) => {
        setLoading(true);
        try {
            dispatch(editUser(newUser));
        } finally {
            setLoading(false);
        }
    };
    const deleteUser1 = (removeUser: IUser) => {
        setLoading(true);
        try {
            dispatch(deleteUser(removeUser.id));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="header">
                <div className="input-group">
                    <NavLink
                        to="/task_manager"
                        className="btn btn-outline-primary"
                    >
                        Task Manager
                    </NavLink>
                    <NavLink
                        to="/phone_book"
                        className="btn btn-outline-primary"
                    >
                        Phone Book
                    </NavLink>
                </div>
                <ThemeSwitcher />
            </div>

            <Routes>
                <Route
                    path="/task_manager"
                    element={
                        <>
                            <NewTask addTask={addTask} />
                            <TaskList
                                tasks={tasksWithUsers}
                                editTask={editTask1}
                                deleteTask={deleteTask1}
                                loading={loading}
                                sortedTasks={sortedTasks}
                                setSortTypeTask={setSortTypeTask}
                                sortTypeTask={sortTypeTask}
                            />
                        </>
                    }
                />
                <Route
                    path="/phone_book"
                    element={
                        <>
                            <NewUser addUser={addUser} />
                            <UserList
                                users={users}
                                editUser={editUser1}
                                deleteUser={deleteUser1}
                                loading={loading}
                                sortedUsers={sortedUsers}
                                setSortTypeUser={setSortTypeUser}
                                sortTypeUser={sortTypeUser}
                            />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
