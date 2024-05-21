import { useQuery } from "@tanstack/react-query";
import LeftBar from "../components/leftbar/LeftBar";
import Nav from "../components/nav/Nav";
import RightBar from "../components/rightbar/RightBar";
import ChatBox from "../pages/chatbox/ChatBox";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import SignUp from "../pages/signup/SignUp";
import "./layout.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import RequireAuth from "../components/auth/RequireAuth";

function LayOut() {
  const Feed = () => {
    return (
      <>
        <Nav />
        <main>
          <LeftBar />
          <div className="container">
            <Outlet />
          </div>
          <RightBar />
        </main>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <Feed />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/profile/:id",
              element: <Profile />,
            },
            {
              path: "/chatbox/:id",
              element: <ChatBox />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default LayOut;
