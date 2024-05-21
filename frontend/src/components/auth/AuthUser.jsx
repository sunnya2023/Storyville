// import { useQuery } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";

// function AuthUser() {
//   return useQuery({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       try {
//         const res = await fetch("/api/auth/me");
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error("Failed fetch user data");
//         }
//         return data;
//       } catch (error) {
//         throw new Error(error);
//       }
//     },
//     retry: false,
//   });
// }

// export default AuthUser;

function AuthUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          throw new Error("Failed fetch user data");
        }
        return res.json();
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
}

export default AuthUser;
