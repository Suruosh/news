import "./Notification.css";

function Notification({ message, type = "success", onDismiss }) {
  if (!message) return null;

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div className={`notification notification-${type}`}>
      <span className="notification-icon">{icons[type]}</span>
      <span className="notification-message">{message}</span>
      <button className="notification-dismiss" onClick={onDismiss}>
        ✕
      </button>
    </div>
  );
}

export default Notification;
