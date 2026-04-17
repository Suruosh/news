import "./ArticleCard.css";

// REVIEW: No default props. If `article.content` is
// null/undefined, the `.length` check and `.substring()` call on line 13 will throw.
// Add a guard or default to an empty string.
function ArticleCard({ article, onEdit, onDelete }) {
  const { title, category, content, author, date, featured, imageUrl } =
    article;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const truncatedContent =
    content.length > 150 ? content.substring(0, 150) + "..." : content;

  return (
    <article className={`article-card ${featured ? "article-featured" : ""}`}>
      {featured && <span className="featured-badge">★ Featured</span>}

      {imageUrl && (
        <div className="card-image">
          <img src={imageUrl} alt={title} />
        </div>
      )}

      <div className="card-body">
        <div className="card-meta">
          <span className="category-tag">{category}</span>
          <span className="card-date">{formattedDate}</span>
        </div>

        <h3 className="card-title">{title}</h3>
        <p className="card-content">{truncatedContent}</p>

        <div className="card-footer">
          <span className="card-author">By {author}</span>
          <div className="card-actions">
            <button
              className="btn btn-icon btn-edit"
              onClick={() => onEdit(article)}
              title="Edit article"
            >
              ✎
            </button>
            <button
              className="btn btn-icon btn-delete"
              onClick={() => onDelete(article)}
              title="Delete article"
            >
              🗑
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
