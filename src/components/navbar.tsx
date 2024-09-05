import React from "react";
import Switcher from "./switcher";
import { useScroll } from "../hooks/useScroll";

const Navbar: React.FC = () => {
  const { scrollDirection, isPassedThreshold } = useScroll(100); // 100px threshold

  interface NavbarStyles {
    active: React.CSSProperties;
    hidden: React.CSSProperties;
  }

  const styles: NavbarStyles = {
    active: {
      visibility: "visible",
      transition: "all 0.5s",
      transform: "translateY(0)",
    },
    hidden: {
      visibility: "hidden",
      transition: "all 0.5s",
      transform: "translateY(-100%)",
    },
  };

  const navbarStyle = isPassedThreshold
    ? scrollDirection === "up"
      ? styles.active
      : styles.hidden
    : styles.active;

  return (
    <nav
      className="bg-white/70 border-b fixed w-full top-0 right-0 left-0 border-gray-200 dark:bg-gray-900/70 backdrop-blur-sm  transition-all ease-out dark:border-gray-700"
      style={navbarStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="shrink-0 flex items-center">
            <a
              href="/"
              className="text-3xl font-medium flex items-center gap-2 text-gray-900 dark:text-white"
            >
              <img
                src="/assets/images/logo.png"
                className="w-10 aspect-auto"
                alt="logo"
              />
              <span>Refert</span>
            </a>
          </div>
          <div className="flex items-center">
            <Switcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
