import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TrainingTable from './components/elements/table';
import Header from "@/components/elements/header";
import Footer from "@/components/elements/footer";
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TrainingsProvider from './context/trainings-context.tsx';

/*

      <Footer />
    </div>
      <div>
        <h1>The Hacker Library</h1>
        <p>Library of hacking learning resources, not sponsored</p>
        <TrainingTable />
      </div>
*/

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <div>404 Not Found</div>
    ),
  },
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "/training",
    element: (
      <div className="w-full flex flex-col">
        <Header />

        <div className="h-full flex flex-col justify-center items-center">
          <h1>The Hacker Library</h1>
          <p>Library of hacking learning resources, not sponsored</p>
            <TrainingTable />
        </div>

        <Footer />
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TrainingsProvider><RouterProvider router={router} /></TrainingsProvider>
)
