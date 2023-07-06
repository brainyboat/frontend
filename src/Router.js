import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import DashboardPage from "./dashboard/Page";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "dashboard",
    element: <DashboardPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
