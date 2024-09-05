import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkMode from "../hooks/useDarkMode";

const Switcher: React.FC = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState<boolean>(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch
        checked={darkSide}
        onChange={toggleDarkMode}
        size={24}
      />
    </>
  );
};

export default Switcher;
