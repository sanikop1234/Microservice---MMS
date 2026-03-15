import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AdminLogin from "./AdminLogin";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "./components/Dashboard";
import Machine from "./components/Machine";
import UpcomingTasks from "./components/UpcomingTasks";
import AddMachine from "./components/AddMachine";
import CompletedTasks from "./components/CompletedTasks";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      // LOGIN
      {
        index: true,
        element: <AdminLogin />,
      },

      // DASHBOARD
      {
        path: "records",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      // ADD MACHINE
      {
        path: "machine/new",
        element: (
          <ProtectedRoute>
            <AddMachine />
          </ProtectedRoute>
        ),
      },

      // MACHINE DETAILS
      {
        path: "machine/:machineName",
        element: (
          <ProtectedRoute>
            <Machine />
          </ProtectedRoute>
        ),
      },

      // UPCOMING TASKS
      {
        path: "upcoming",
        element: (
          <ProtectedRoute>
            <UpcomingTasks />
          </ProtectedRoute>
        ),
      },

      // COMPLETED TASKS  (ADD THIS)
      {
        path: "completed",
        element: (
          <ProtectedRoute>
            <CompletedTasks />
          </ProtectedRoute>
        ),
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);