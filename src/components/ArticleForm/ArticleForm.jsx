import { useState, useEffect } from "react";
import "./ArticleForm.css";

const CATEGORIES = ["Travel", "Culture", "Art", "Technology", "History", "Opinion", "Politics", "Business", "Science", "Sports"];

const EMPTY_FORM = {
  title: "",
  category: "",
  content: "",
  author: "",
  imageUrl: "",
  featured: false,
};

function ArticleForm({ article, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(article);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        category: article.category,
        content: article.content,
        author: article.author,
        imageUrl: article.imageUrl || "",
        featured: article.featured,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
  }, [article]);

  function validate(data) {
    const newErrors = {};

    if (!data.title.trim()) {
      newErrors.title = "Title is required";
    } else if (data.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!data.category) {
      newErrors.category = "Please select a category";
    }

    if (!data.content.trim()) {
      newErrors.content = "Content is required";
    } else if (data.content.trim().length < 20) {
      newErrors.content = "Content must be at least 20 characters";
    }

    if (!data.author.trim()) {
      newErrors.author = "Author is required";
    }

    return newErrors;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      category: formData.category,
      content: formData.content.trim(),
      author: formData.author.trim(),
      imageUrl: formData.imageUrl.trim(),
      featured: formData.featured,
    });
  }

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div
        className="article-form-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-header">
          <h2 className="form-title">
            {isEditing ? "Edit Article" : "New Article"}
          </h2>
          <button className="form-close" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form className="article-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={"form-input" + (errors.title ? " input-error" : "")}
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter article title"
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category <span className="required">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={"form-input form-select" + (errors.category ? " input-error" : "")}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="author" className="form-label">
                Author <span className="required">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className={"form-input" + (errors.author ? " input-error" : "")}
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
              />
              {errors.author && <span className="error-text">{errors.author}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">
              Photo URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              className="form-input"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="image-preview"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content <span className="required">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              className={"form-input form-textarea" + (errors.content ? " input-error" : "")}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article content..."
              rows={6}
            />
            {errors.content && <span className="error-text">{errors.content}</span>}
            <span className="char-count">{formData.content.length} characters</span>
          </div>

          <div className="form-group form-checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span className="checkbox-text">Mark as featured article</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Save Changes" : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArticleForm;
