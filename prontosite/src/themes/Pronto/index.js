// index.js
import React from "react";
import CMSDisplayTheme from "./CMSDisplayTheme";

const App = () => {
  return (
    <div className="App flex flex-col min-h-screen">
      <CMSDisplayTheme pageId="home" />
    </div>
  );
};

export default App;