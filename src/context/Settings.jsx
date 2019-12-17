import React, { createContext, useRef, useState } from "react";
import { generate } from "randomstring";

const SettingsContext = createContext(null);

const SettingsProvider = ({ children }) => {
  const [isSmorfiaEnabled, setIsSmorfiaEnabled] = useState(true);

  const resetCallbackRef = useRef();
  const fullScreenElementRef = useRef();

  const reset = () => {
    const gameData = localStorage.getItem("tombola");
    const backupName = generate(10);

    localStorage.setItem(backupName, gameData);
    localStorage.removeItem("tombola");

    if (typeof resetCallbackRef.current === "function") {
      resetCallbackRef.current();
    }
  };

  const goFullscreen = () => {
    if (fullScreenElementRef.current) {
      fullScreenElementRef.current.requestFullscreen();
    }
  };

  const toggleSmorfiaEnabled = () => setIsSmorfiaEnabled(!isSmorfiaEnabled);

  const saveBackup = data =>
    localStorage.setItem("tombola", JSON.stringify(data));

  const init = (fullScreenElement, resetCallback) => {
    fullScreenElementRef.current = fullScreenElement;
    resetCallbackRef.current = resetCallback;
  };

  let backup = [];

  try {
    backup = JSON.parse(localStorage.getItem("tombola") || "[]");
  } catch (error) {}

  const settings = {
    reset,
    goFullscreen,
    init,
    isSmorfiaEnabled,
    toggleSmorfiaEnabled,
    backup,
    saveBackup
  };

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
