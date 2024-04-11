import ReactDOM from "react-dom/client";
import Search from "@/components/modules/search";
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
    element: <Search />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TrainingsProvider>
    <RouterProvider router={router} />
  </TrainingsProvider>
);
