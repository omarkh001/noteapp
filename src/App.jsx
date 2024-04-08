import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Home/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoutes from "./Components/ProtuctedRoutes/ProductedRoutes";

const myRouter = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element:<ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: "/home", element:<ProtectedRoutes><Home /></ProtectedRoutes>},
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> }
    ]
  }])

function App() {
  return (<>
    <RouterProvider router={myRouter} />
  </>);
}


export default App;
