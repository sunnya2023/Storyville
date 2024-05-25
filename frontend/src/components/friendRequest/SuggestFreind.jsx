import React from "react";
import "./friend.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const SuggestFreind = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  //   if (suggestedUsers.length === 0) return <div></div>;
  console.log(suggestedUsers);

  return (
    <>
      {!isLoading && suggestedUsers?.length > 0 && (
        <div className="Friend-Req">
          <h4>Recommend</h4>
          {suggestedUsers?.map((friend) => (
            <div className="suggest" key={friend._id}>
              <Link to={"/profile/${friend.username}"}>
                <div className="user">
                  <img
                    src={friend.profileImg || "/avatar.png"}
                    alt={friend.username}
                  />

                  <div className="user-info">
                    <h5>{friend.username}</h5>
                    <h6>{friend.email}</h6>
                  </div>
                </div>
              </Link>

              <div className="action">
                <button className="followBtn ">Follow</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SuggestFreind;
