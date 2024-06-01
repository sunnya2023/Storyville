// src/components/Modal.js
import React, { useState } from "react";
import "./modal.css";

const Modal = ({ modalOpen, onConfirm, onCancel, actionType }) => {
  const [btnActive, setBtnActive] = useState("확인");

  const handleConfirm = () => {
    onConfirm();
    setBtnActive("확인");
  };

  const handleCancel = () => {
    setBtnActive("취소");
    onCancel();
  };

  const handleAction = () => {
    if (actionType === "delete") {
      handleConfirm(); // 삭제하기 작업 수행
    } else if (actionType === "report") {
      // 신고하기 작업 수행
      // 신고하기 작업에 대한 로직 추가
      handleConfirm();
    }
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-contents">
        <p>
          {actionType === "delete" ? "삭제하시겠습니까?" : "신고하시겠습니까?"}
        </p>
        <div className="modalBtn">
          <button
            onClick={handleConfirm}
            className={btnActive === "확인" ? "active" : ""}
          >
            확인
          </button>
          <button
            onClick={handleCancel}
            className={btnActive === "취소" ? "active" : ""}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
