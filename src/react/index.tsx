import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "../ui/theme-provider.js";

import Root from "./pages/Root";
import Home from "./pages/Home";

import "../js/app.js";
import "../scss/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<div>Contact DriveBrandStudio for support</div>,
    children: [
      {
        path: 'home',
        element: <Home />,
      }
    ]
  },
  // {
  //   path: "/some-path/:slug",
  //   element: () => <div>how to use the slug</div>,
  // },
]);

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
