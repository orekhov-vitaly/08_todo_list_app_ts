import type { FC } from "react";
import { type IUser, type SortTypeUser } from "../../types";
import User from "../user/User";
import "./UserList.css";
import Loader from "../loader/Loader";

interface IProps {
    users: IUser[];
    editUser: (newUser: IUser) => void;
    deleteUser: (newUser: IUser) => void;
    loading: boolean;
    sortedUsers: IUser[];
    setSortTypeUser: (newSort: SortTypeUser) => void;
    sortTypeUser: SortTypeUser;
}

const UserList: FC<IProps> = ({
    editUser,
    deleteUser,
    loading,
    sortedUsers,
    setSortTypeUser,
    sortTypeUser,
}) => {
    const userList = sortedUsers.map((e) => (
        <User key={e.id} user={e} editUser={editUser} deleteUser={deleteUser} />
    ));

    return (
        <div className="user-list-form">
            {loading && <Loader />}
            <select
                id="sortSelect"
                className="form-select mb-3"
                value={sortTypeUser}
                onChange={(e) => setSortTypeUser(e.target.value as SortTypeUser)}
            >
                <option value="">Выберите сортировку</option>
                <option value="name asc">A-Z</option>
                <option value="name desc">Z-A</option>
            </select>
            {userList.length ? (
                <>
                    {userList}
                </>
            ) : (
                <h3 className="text-center">"List users is empty"</h3>
            )}
        </div>
    );
};

export default UserList;
