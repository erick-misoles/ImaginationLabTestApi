import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onClose,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "12px 20px",
        backgroundColor: type === "success" ? "#4CAF50" : "#F44336",
        color: "#fff",
        borderRadius: 5,
        zIndex: 1000,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: 10,
          background: "none",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
