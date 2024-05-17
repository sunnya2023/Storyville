import { useState } from "react";
import "./darkmode.css";
import { GrSun } from "react-icons/gr";

function DarkMode() {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("darkmode", isDarkMode);
  };
  return (
    <div className="dark-moodi-icon">
      <GrSun onClick={toggleDarkMode} />
    </div>
  );
}

export default DarkMode;
