import React, { createContext, useRef, useState } from "react";
import { generate } from "randomstring";

const SettingsContext = createContext(null);

const saveGameData = data =>
  localStorage.setItem("tombola", JSON.stringify(data));

const loadGameData = () => {
  let gameData = [];

  try {
    gameData = JSON.parse(localStorage.getItem("tombola") || "[]");
  } catch (error) {}

  return gameData;
};

const SettingsProvider = ({ children }) => {
  const [isSmorfiaEnabled, setIsSmorfiaEnabled] = useState(true);

  const resetCallbackRef = useRef();
  const fullScreenElementRef = useRef();

  const reset = () => {
    const gameData = loadGameData();

    if (gameData.length) {
      const backupName = generate(10);

      localStorage.setItem(backupName, JSON.stringify(gameData));
      localStorage.removeItem("tombola");

      if (typeof resetCallbackRef.current === "function") {
        resetCallbackRef.current();
      }
    }
  };

  const goFullscreen = () => {
    if (fullScreenElementRef.current) {
      fullScreenElementRef.current.requestFullscreen();
    }
  };

  const toggleSmorfiaEnabled = () => setIsSmorfiaEnabled(!isSmorfiaEnabled);

  const init = (fullScreenElement, resetCallback) => {
    fullScreenElementRef.current = fullScreenElement;
    resetCallbackRef.current = resetCallback;
  };

  const settings = {
    reset,
    goFullscreen,
    init,
    isSmorfiaEnabled,
    toggleSmorfiaEnabled,
    saveGameData,
    loadGameData
  };

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
