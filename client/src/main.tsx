import ReactDOM from "react-dom/client";
import Latest from "@/components/elements/latest";
import Page404 from "@/components/modules/404";
import Resources from "./components/modules/resources";
import About from "@/components/modules/about";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TrainingsProvider from "@/context/trainings-context";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "/",
    element: (
      <TrainingsProvider>
        <Resources />,
      </TrainingsProvider>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/latest",
    element: <Latest />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
