import { useState, useEffect } from "react";

type UseDarkModeReturn = [string, React.Dispatch<React.SetStateAction<string>>];

export default function useDarkMode(): UseDarkModeReturn {
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}
