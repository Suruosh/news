import "./EmptyState.css";

function EmptyState({ hasFilter, onClearFilter, onNewArticle }) {
  if (hasFilter) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🔍</span>
        <h3 className="empty-title">No articles found</h3>
        <p className="empty-description">
          No articles match your current search or filter.
        </p>
        <button className="btn btn-secondary" onClick={onClearFilter}>
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <span className="empty-icon">📝</span>
      <h3 className="empty-title">No articles yet</h3>
      <p className="empty-description">
        Get started by creating your first article.
      </p>
      <button className="btn btn-primary" onClick={onNewArticle}>
        <span className="btn-icon">+</span>
        Create Article
      </button>
    </div>
  );
}

export default EmptyState;
