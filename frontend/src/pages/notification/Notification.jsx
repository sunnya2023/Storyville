import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./notification.css";
import { Link } from "react-router-dom";

import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";

const Notification = () => {
  const queryClient = useQueryClient();

  const { data: notifications, isLodaing } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notification");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notification", {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("전체 알림이 삭제되었습니다");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [openModal, setOpenModal] = useState(false);
  const onModalHandle = () => {
    setOpenModal(!openModal);
  };
  const onDeleteNotifications = () => {
    deleteNotifications();
    setOpenModal(!openModal);
  };
  return (
    <div className="notification">
      <div className="top">
        <h1>알림</h1>

        {notifications?.length !== 0 && (
          <IoSettingsOutline onClick={onModalHandle} className="icon" />
        )}
        {openModal && (
          <div className="modal" onClick={onDeleteNotifications}>
            삭제하기
          </div>
        )}
      </div>

      <hr />

      <div className="list">
        {!isLodaing && notifications?.length === 0 && (
          <h5>새로운 소식이 없습니다.</h5>
        )}

        {notifications?.map((notification) => (
          <Link to={`/profile/${notification.from.username}`}>
            <div className="user">
              <img
                src={notification.from.profileImg || "/avatar.png"}
                alt={notification.from.username}
              />
              {notification.type === "follow" ? (
                <div>
                  {notification.from.username}님이 회원님을 팔로우하기
                  시작했습니다.
                </div>
              ) : (
                <div>
                  {notification.from.username}님이 회원님의 게시물을 좋아합니다.
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Notification;
