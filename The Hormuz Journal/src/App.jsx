import { useState } from "react";
import useArticles from "./hooks/useArticles";
import useNotification from "./hooks/useNotification";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ArticleList from "./components/ArticleList/ArticleList";
import ArticleForm from "./components/ArticleForm/ArticleForm";
import ArticleWizard from "./components/ArticleWizard/ArticleWizard";
import Notification from "./components/Notification/Notification";
import ConfirmDialog from "./components/ConfirmDialog/ConfirmDialog";
import "./App.css";

function App() {
  const { articles, isLoading, error, addArticle, updateArticle, deleteArticle } = useArticles();
  const { notification, showNotification, dismissNotification } = useNotification();

  const [currentView, setCurrentView] = useState("articles");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deletingArticle, setDeletingArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  function handleNewArticle() {
    setShowWizard(true);
  }

  async function handleWizardPublish(formData) {
    try {
      await addArticle(formData);
      showNotification('"' + formData.title + '" has been published');
      setShowWizard(false);
    } catch (err) {
      showNotification(err.message, "error");
    }
  }

  function handleWizardCancel() {
    setShowWizard(false);
  }

  function handleEdit(article) {
    setEditingArticle(article);
    setShowForm(true);
  }

  async function handleFormSubmit(formData) {
    try {
      await updateArticle(editingArticle.id, formData);
      showNotification('"' + formData.title + '" has been updated');
      setShowForm(false);
      setEditingArticle(null);
    } catch (err) {
      showNotification(err.message, "error");
    }
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditingArticle(null);
  }

  function handleDeleteRequest(article) {
    setDeletingArticle(article);
  }

  async function handleDeleteConfirm() {
    if (deletingArticle) {
      try {
        await deleteArticle(deletingArticle.id);
        showNotification('"' + deletingArticle.title + '" has been deleted', "error");
      } catch (err) {
        showNotification(err.message, "error");
      }
      setDeletingArticle(null);
    }
  }

  function handleDeleteCancel() {
    setDeletingArticle(null);
  }

  const featuredCount = articles.filter(function (a) { return a.featured; }).length;
  const categorySet = new Set(articles.map(function (a) { return a.category; }));

  function renderDashboard() {
    return (
      <div className="dashboard">
        <h2 className="page-title">Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">☰</span>
            <div className="stat-info">
              <span className="stat-value">{articles.length}</span>
              <span className="stat-label">Total Articles</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon stat-icon-featured">★</span>
            <div className="stat-info">
              <span className="stat-value">{featuredCount}</span>
              <span className="stat-label">Featured</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon stat-icon-categories">▦</span>
            <div className="stat-info">
              <span className="stat-value">{categorySet.size}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderContent() {
    if (isLoading) {
      return (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading articles...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-state">
          <span className="error-icon">⚠</span>
          <h3>Failed to load articles</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (currentView === "dashboard") {
      return renderDashboard();
    }

    return (
      <ArticleList
        articles={articles}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
        onNewArticle={handleNewArticle}
      />
    );
  }

  return (
    <div className="app">
      <Sidebar
        onNewArticle={handleNewArticle}
        articleCount={articles.length}
        currentView={currentView}
        onViewChange={setCurrentView}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="app-main">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentView={currentView}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        <main className="main-content">
          {renderContent()}
        </main>
      </div>

      {showWizard && (
        <ArticleWizard
          onPublish={handleWizardPublish}
          onCancel={handleWizardCancel}
        />
      )}

      {showForm && (
        <ArticleForm
          article={editingArticle}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {deletingArticle && (
        <ConfirmDialog
          title="Delete Article"
          message={'Are you sure you want to delete "' + deletingArticle.title + '"? This action cannot be undone.'}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={dismissNotification}
        />
      )}
    </div>
  );
}

export default App;
