import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createRoot } from 'react-dom/client';

//<<<<<<< HEAD
ReactDOM.render(<App />, document.getElementById("root"));
//=======
//ReactDOM.render(<App />, document.getElementById("root"));

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
