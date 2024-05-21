// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

import { Navigate, Outlet } from "react-router-dom";
import AuthUser from "./AuthUser";

// // import { Navigate, Outlet } from "react-router-dom";
// // import AuthUser from "./AuthUser";

// function RequireAuth() {
//   const {
//     data: authUser,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       try {
//         const res = await fetch("/api/auth/me");

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.error || "Failed to fetch auth user");
//         }
//         return data;
//       } catch (error) {
//         throw new Error(error);
//       }
//     },
//     retry: false,
//   });

//   if (isLoading) {
//     return <div>Loaing ...</div>;
//   }

//   if (isError || !authUser) {
//     return <Navigate to="/login" />;
//   }
//   return <Outlet />;
// }

// export default RequireAuth;

function RequireAuth() {
  const { data: authUser, isLoading } = AuthUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!authUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default RequireAuth;
