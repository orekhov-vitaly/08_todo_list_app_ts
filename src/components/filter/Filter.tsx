import type { FC } from "react";
import "./Filter.css";

interface IProps {
    filterTaskList: (isFilter: boolean) => void;
}

const Filter: FC<IProps> = ({ filterTaskList }) => {
    return (
        <div className="text-end">
            <div className="filter-block btn-group mb-3">
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => filterTaskList(true)}
                >
                    Сначала невыполненные
                </button>
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => filterTaskList(false)}
                >
                    Сначала выполненные
                </button>
            </div>
        </div>
    );
};

export default Filter;
