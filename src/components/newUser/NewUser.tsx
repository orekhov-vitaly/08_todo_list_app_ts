import { useRef, type FC } from "react";
import { type IUser } from '../../types';
import { v4 } from "uuid";
import "./NewUser.css";

interface IProps {
    addUser: (newUser: IUser) => void;
}

const NewUser: FC<IProps> = ({ addUser }) => {
    const inputName = useRef<HTMLInputElement>(null);
    const inputUserName = useRef<HTMLInputElement>(null);
    const inputEmail = useRef<HTMLInputElement>(null);
    const inputPhone = useRef<HTMLInputElement>(null);

    const saveUser = () => {
        addUser({
            id: v4(),
            name: inputName.current!.value,
            username: inputUserName.current!.value,
            email: inputEmail.current!.value,
            phone: inputPhone.current!.value,
        });
        inputName.current!.value = inputUserName.current!.value = inputEmail.current!.value = inputPhone.current!.value = "";
    };

    return (
        <div className="new-task-form">
            <div className="container">
                <div className="row mb-3">
                    <label className="col-md-auto col-form-label">
                        Введите имя и фамилию нового пользователя:
                    </label>
                    <div className="col-md">
                        <input
                            className="form-control"
                            ref={inputName}
                            type="text"
                            min={1}
                            max={10}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-md-auto col-form-label">
                        Введите логин нового пользователя:
                    </label>
                    <div className="col-md">
                        <input
                            className="form-control"
                            ref={inputUserName}
                            type="text"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-md-auto col-form-label">
                        Введите email нового пользователя:
                    </label>
                    <div className="col-md">
                        <input
                            className="form-control"
                            ref={inputEmail}
                            type="text"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-md-auto col-form-label">
                        Введите телефон нового пользователя:
                    </label>
                    <div className="col-md">
                        <input
                            className="form-control"
                            ref={inputPhone}
                            type="text"
                        />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={saveUser}>
                    Add user
                </button>
            </div>
        </div>
    );
};

export default NewUser;
