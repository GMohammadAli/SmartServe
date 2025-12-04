import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import  { Home } from "./pages";

const Routes: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />,
    </div>
  );
};

export default Routes;
