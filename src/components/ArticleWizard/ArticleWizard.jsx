import { useState } from "react";
import { analyzeLinks } from "../../services/aiService";
import "./ArticleWizard.css";

var CATEGORIES = [
  "Travel", "Culture", "Art", "Technology", "History",
  "Opinion", "Politics", "Business", "Science", "Sports",
];

function ArticleWizard({ onPublish, onCancel }) {
  var [step, setStep] = useState(1);
  var [links, setLinks] = useState([""]);
  var [isAnalyzing, setIsAnalyzing] = useState(false);
  var [analysisError, setAnalysisError] = useState(null);
  var [analysis, setAnalysis] = useState(null);

  var [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    author: "The Hormuz Journal",
    imageUrl: "",
    featured: false,
  });
  var [errors, setErrors] = useState({});

  function handleLinkChange(index, value) {
    var updated = links.slice();
    updated[index] = value;
    setLinks(updated);
  }

  function addLink() {
    setLinks(links.concat(""));
  }

  function removeLink(index) {
    if (links.length === 1) return;
    setLinks(links.filter(function (_, i) { return i !== index; }));
  }

  function hasValidLinks() {
    return links.some(function (l) { return l.trim().length > 0; });
  }

  async function handleAnalyze() {
    var validLinks = links.filter(function (l) { return l.trim().length > 0; });
    if (validLinks.length === 0) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      var result = await analyzeLinks(validLinks);
      setAnalysis(result);
      setFormData({
        title: result.title || "",
        category: result.category || "",
        content: result.content || "",
        author: "The Hormuz Journal",
        imageUrl: "",
        featured: false,
      });
      setStep(2);
    } catch (err) {
      setAnalysisError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData(Object.assign({}, formData, { [name]: value }));
  }

  function validate(data) {
    var newErrors = {};
    if (!data.title.trim()) newErrors.title = "Title is required";
    else if (data.title.trim().length < 5) newErrors.title = "Title must be at least 5 characters";
    if (!data.category) newErrors.category = "Please select a category";
    if (!data.content.trim()) newErrors.content = "Content is required";
    else if (data.content.trim().length < 20) newErrors.content = "Content must be at least 20 characters";
    if (!data.author.trim()) newErrors.author = "Author is required";
    return newErrors;
  }

  function handlePublish(e) {
    e.preventDefault();
    var newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onPublish({
      title: formData.title.trim(),
      category: formData.category,
      content: formData.content.trim(),
      author: formData.author.trim(),
      imageUrl: formData.imageUrl.trim(),
      featured: formData.featured,
    });
  }

  function handleBack() {
    setStep(1);
  }

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="wizard-container" onClick={function (e) { e.stopPropagation(); }}>

        <div className="form-header">
          <h2 className="form-title">
            {step === 1 ? "Step 1 — Add Links" : "Step 2 — Review & Publish"}
          </h2>
          <div className="wizard-steps">
            <span className={"step-dot" + (step >= 1 ? " step-active" : "")}>1</span>
            <span className={"step-line" + (step === 2 ? " step-line-done" : "")}></span>
            <span className={"step-dot" + (step === 2 ? " step-active" : "")}>2</span>
          </div>
          <button className="form-close" onClick={onCancel}>✕</button>
        </div>

        {step === 1 && (
          <div className="wizard-body">
            <p className="wizard-desc">
              Paste one or more news article URLs below. Our AI will analyze them
              and generate an article draft for you to review.
            </p>

            <div className="links-list">
              {links.map(function (link, index) {
                return (
                  <div className="link-row" key={index}>
                    <span className="link-number">{index + 1}</span>
                    <input
                      type="url"
                      className="form-input link-input"
                      placeholder="https://example.com/article..."
                      value={link}
                      onChange={function (e) { handleLinkChange(index, e.target.value); }}
                    />
                    {links.length > 1 && (
                      <button
                        className="btn-icon-sm link-remove"
                        onClick={function () { removeLink(index); }}
                        title="Remove link"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button className="btn btn-ghost add-link-btn" onClick={addLink}>
              + Add another link
            </button>

            {analysisError && (
              <div className="analysis-error">
                <span className="error-icon">⚠</span> {analysisError}
              </div>
            )}

            <div className="form-actions">
              <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={handleAnalyze}
                disabled={!hasValidLinks() || isAnalyzing}
              >
                {isAnalyzing ? "Analyzing…" : "🔍 Send for Analysis"}
              </button>
            </div>

            {isAnalyzing && (
              <div className="analyzing-state">
                <div className="spinner"></div>
                <p>AI is analyzing your links…</p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <form className="wizard-body" onSubmit={handlePublish} noValidate>

            {analysis && analysis.keyPoints && (
              <div className="ai-summary">
                <h4 className="ai-summary-title">✦ AI Key Points</h4>
                <ul className="ai-points">
                  {analysis.keyPoints.map(function (point, i) {
                    return <li key={i}>{point}</li>;
                  })}
                </ul>
                {analysis.sources && analysis.sources.length > 0 && (
                  <p className="ai-sources">
                    Sources: {analysis.sources.join(", ")}
                  </p>
                )}
              </div>
            )}

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
                  {CATEGORIES.map(function (cat) {
                    return <option key={cat} value={cat}>{cat}</option>;
                  })}
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
                  onError={function (e) { e.target.style.display = "none"; }}
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
                rows={8}
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
              <button type="button" className="btn btn-ghost" onClick={handleBack}>
                ← Back
              </button>
              <button type="submit" className="btn btn-primary">
                Publish Article
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ArticleWizard;
