import CurrentUser from "../../FackApis/CurrentUserData";
import "./leftBar.css";
import { Link, useNavigate } from "react-router-dom";

import Friend from "../../assets/icon/1.png";
import Groups from "../../assets/icon/2.png";
import Market from "../../assets/icon/3.png";
import Watch from "../../assets/icon/4.png";
import Gallery from "../../assets/icon/5.png";
import Videos from "../../assets/icon/6.png";
import Message from "../../assets/icon/7.png";
import Logout from "../../assets/icon/8.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AuthUser from "../auth/AuthUser";

function LeftBar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error() || "Something went wrong";
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("로그아웃 되었습니다.");
      navigate("/login");
    },
    onErro: () => {
      toast.error("로그아웃에 실패했습니다");
    },
  });

  const { data: authUser } = AuthUser();

  return (
    <div className="leftBar">
      <div className="leftContainer">
        <div className="menu">
          <Link to="/">
            <div className="user">
              {/* {CurrentUser.map((user) => (
                <>
                  <img src={user.ProfieImage} alt={user.name} />
                  <h4>{user.name}</h4>
                </>
              ))} */}

              {authUser && (
                <>
                  <img
                    src={authUser?.profileImg || "/avatar.png"}
                    alt={authUser?.name}
                  />
                  <h4>{authUser?.username}</h4>
                </>
              )}
            </div>
          </Link>
          <Link to={"/friend"}>
            <div className="item">
              <img src={Friend} />
              <h4>Friend</h4>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="item">
              <img src={Groups} />
              <h4>Groups</h4>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="item">
              <img src={Market} />
              <h4>Market</h4>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="item">
              <img src={Watch} />
              <h4>Watch</h4>
            </div>
          </Link>
        </div>

        <hr />

        <div className="menu">
          <h4 className="others">Your shortcuts</h4>
          <Link to={"/"}>
            <div className="item">
              <img src={Gallery} />
              <h4>Gallery</h4>
            </div>
          </Link>
          <Link to={"/"}>
            <div className="item">
              <img src={Videos} />
              <h4>Videos</h4>
            </div>
          </Link>
          <Link to={"/chatbox/id"}>
            <div className="item">
              <img src={Message} />
              <h4>Message</h4>
            </div>
          </Link>

          <div className="item" onClick={logout}>
            <img src={Logout} />
            <h4>로그아웃</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
