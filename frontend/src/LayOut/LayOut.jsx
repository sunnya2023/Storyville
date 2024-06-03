import { useQuery } from "@tanstack/react-query";
import LeftBar from "../components/leftbar/LeftBar";
import Nav from "../components/nav/Nav";
import RightBar from "../components/rightbar/RightBar";
import ChatBox from "../pages/chatbox/ChatBox";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import SignUp from "../pages/signup/SignUp";
import Notification from "../pages/notification/Notification";
import "./layout.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import RequireAuth from "../components/auth/RequireAuth";
import UserProfile from "../pages/profile/userProfile";

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
              path: "/profile/:username",
              element: <UserProfile />,
            },
            {
              path: "/chatbox/:id",
              element: <ChatBox />,
            },
            {
              path: "/notification",
              element: <Notification />,
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
