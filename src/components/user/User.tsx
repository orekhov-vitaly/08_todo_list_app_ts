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
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPhone, setNewPhone] = useState(user.phone);

    const saveNewName = () => {
        editUser({
            ...user,
            name: newName,
            username: newUserName,
            email: newEmail,
            phone: newPhone,
        });
        setIsEdit(false);
    };

    const cancelEditName = () => {
        setIsEdit(!isEdit);
        setNewName(user.name);
        setNewUserName(user.username);
        setNewEmail(user.email);
        setNewPhone(user.phone);
    };

    return (
        <div className="user-item">
            {!isEdit ? (
                <div className="row">
                    <div
                        className="col user-title"
                        onClick={() => setIsEdit(!isEdit)}
                    >
                        <h5 className="m-0">
                            {user.name} ({user.username})
                        </h5>
                        <p className="mb-0">Email: {user.email}</p>
                        <p className="mb-0">Phone: {user.phone}</p>
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
                        <div className="form-group">
                            <label className="form-label">Full name:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Username:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone:</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                            />
                        </div>
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
