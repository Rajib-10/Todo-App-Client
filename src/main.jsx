import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Update from "./Update.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => fetch("https://todo-app-server-self.vercel.app/todo"),
  },
  {
    path: "/todo/:id",
    element: <Update />,
    loader: ({ params }) =>
      fetch(`https://todo-app-server-self.vercel.app/todo/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
