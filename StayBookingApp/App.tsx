import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "@/components/home";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Home />
      </div>
    </BrowserRouter>
  );
};

export default App;
