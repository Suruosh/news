import "./ConfirmDialog.css";

// REVIEW: The confirm button is hardcoded to say "Delete" with btn-danger styling,
// but the component accepts a generic `title` and `message`. Add a `confirmLabel`
// prop so this dialog can be reused for other confirmations (e.g. "Discard changes?").
// REVIEW: No keyboard accessibility — pressing Escape should close the dialog.
// Consider trapping focus inside the dialog while it's open.
function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
