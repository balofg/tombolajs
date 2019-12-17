/* eslint-disable jsx-a11y/anchor-is-valid  */

import React, { useContext } from "react";

import { SettingsContext } from "../context/Settings";

const Settings = () => {
  const settings = useContext(SettingsContext);

  return (
    <div className="settings">
      <h1 className="settings-title">Settings</h1>
      <ul className="settings-list">
        <li>
          Smorfia:{" "}
          <a
            className={`settings-action ${
              settings.isSmorfiaEnabled ? "settings-action--active" : ""
            }`}
            onClick={settings.toggleSmorfiaEnabled}
          >
            ON
          </a>
          {" / "}
          <a
            className={`settings-action ${
              !settings.isSmorfiaEnabled ? "settings-action--active" : ""
            }`}
            onClick={settings.toggleSmorfiaEnabled}
          >
            OFF
          </a>
        </li>
        <li>
          <a className="settings-action" onClick={settings.goFullscreen}>
            FULLSCREEN
          </a>
        </li>
        <li>
          <a className="settings-action" onClick={settings.reset}>
            RESET
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
