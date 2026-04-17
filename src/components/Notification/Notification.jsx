import "./Notification.css";

// REVIEW: The notification z-index in Notification.css is 200, which is the same as
// the form-overlay z-index. Notifications will render behind modal forms/wizards.
// Increase the notification z-index (e.g. 400) so toasts always appear on top.
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
