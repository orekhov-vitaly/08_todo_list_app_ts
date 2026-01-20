import { useState, type FC } from "react";
import { type IUser } from "../../types";
import "./User.css";

const User: FC<{
    user: IUser;
    editUser: (newUser: IUser) => void;
    deleteUser: (newUser: IUser) => void;
}> = ({ user, editUser, deleteUser }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newName, setNewName] = useState(user.name);
    const [newUserName, setNewUserName] = useState(user.username);

    const saveNewName = () => {
        editUser({
            ...user,
            name: newName,
            username: newUserName
        });
        setIsEdit(false);
    };

    const cancelEditName = () => {
        setIsEdit(!isEdit);
        setNewName(user.name);
    };

    return (
        <div
            className="user-item"
        >
            {!isEdit ? (
                <div className="row">
                    <div className="col">
                        <h5
                            className="user-title m-0"
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            {user.name} ({user.username})
                        </h5>
                    </div>
                    <div className="col-auto text-end d-flex justify-content-end align-items-center actions">
                        <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() => deleteUser(user)}
                        >
                            X
                        </button>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control mb-3"
                            value={newName}
                            onChange={(e) =>
                                setNewName(e.target.value)
                            }
                        />
                        <input
                            type="text"
                            className="form-control mb-3"
                            value={newUserName}
                            onChange={(e) =>
                                setNewUserName(e.target.value)
                            }
                        />
                        <div className="input-group">
                            <button
                                className="btn btn-success"
                                onClick={saveNewName}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={cancelEditName}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;
