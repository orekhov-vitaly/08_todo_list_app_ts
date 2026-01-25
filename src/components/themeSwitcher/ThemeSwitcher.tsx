import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ThemeSwitcher.css";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../redux/store";
import type { Theme } from "../../types";
import { useEffect } from "react";
// import { setTheme } from "../../redux/themeAction";
import type { AppDispatchRTK, RootStateRTK } from "../../reduxRTK/storeRTK";
import { setThemeAction } from "../../reduxRTK/themeSlice";

const THEME_STORAGE_KEY = "theme";

const ThemeSwitcher = () => {
    // const dispatch: AppDispatch = useDispatch();
    const dispatch: AppDispatchRTK = useDispatch();
    // const theme: Theme = useSelector(
    //     (state: RootState) => state.themeToggle.theme,
    // );
    const theme: Theme = useSelector(
        (state: RootStateRTK) => state.themeManager.theme,
    );

    useEffect(() => {
        document.body.classList.toggle("light", theme === "light");
        document.body.classList.toggle("dark", theme === "dark");
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        dispatch(setThemeAction(theme === "light" ? "dark" : "light"));
    };

    return (
        <label>
            <div className="theme-switcher">
                <FontAwesomeIcon icon={faMoon} />
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={theme === "light"}
                        onChange={toggleTheme}
                    />
                </div>
                <FontAwesomeIcon icon={faSun} />
            </div>
        </label>
    );
};

export default ThemeSwitcher;
