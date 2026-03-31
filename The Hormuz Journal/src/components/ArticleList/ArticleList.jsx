import ArticleCard from "../ArticleCard/ArticleCard";
import EmptyState from "../EmptyState/EmptyState";
import "./ArticleList.css";

const CATEGORIES = ["All", "Travel", "Culture", "Art", "Technology", "History", "Opinion", "Politics", "Business", "Science", "Sports"];

function ArticleList({
  articles,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  onEdit,
  onDelete,
  onNewArticle,
}) {
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || article.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const hasActiveFilters = searchQuery || categoryFilter !== "All";

  function handleClearFilters() {
    onSearchChange("");
    onCategoryChange("All");
  }

  return (
    <div className="article-list-container">
      <div className="list-header">
        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={"filter-chip" + (categoryFilter === cat ? " filter-active" : "")}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {hasActiveFilters && filteredArticles.length > 0 && (
          <span className="results-info">
            {filteredArticles.length} of {articles.length} articles
          </span>
        )}
      </div>

      {filteredArticles.length === 0 ? (
        <EmptyState
          hasFilter={hasActiveFilters}
          onClearFilter={handleClearFilters}
          onNewArticle={onNewArticle}
        />
      ) : (
        <div className="article-grid">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleList;
