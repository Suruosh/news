import { useState } from "react";
import "./Sidebar.css";

// REVIEW: When `collapsed` is true, the JSX uses `{!collapsed && ...}` to hide labels,
// badges, and brand text. On mobile, the CSS tries to override `.sidebar-collapsed` styles
// to show these elements (e.g. `.sidebar-collapsed .nav-label { display: flex }`), but
// since the elements are conditionally *not rendered* in JSX, the CSS overrides have no
// effect. The sidebar will appear broken on mobile if the user collapsed it on desktop
// before resizing. Either reset `collapsed` on mobile or always render the elements and
// use CSS-only visibility toggling.
function Sidebar({
  onNewArticle,
  articleCount,
  currentView,
  onViewChange,
  mobileOpen,
  onMobileClose,
}) {
  const [collapsed, setCollapsed] = useState(false);

  function handleNavClick(view) {
    onViewChange(view);
    if (onMobileClose) {
      onMobileClose();
    }
  }

  function handleNewClick() {
    onNewArticle();
    if (onMobileClose) {
      onMobileClose();
    }
  }

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onMobileClose} />
      )}
      <aside
        className={
          "sidebar" +
          (collapsed ? " sidebar-collapsed" : "") +
          (mobileOpen ? " sidebar-mobile-open" : "")
        }
      >
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">H</div>
            {!collapsed && (
              <div className="brand-text">
                <span className="brand-name">Hormuz</span>
                <span className="brand-label">Journal</span>
              </div>
            )}
          </div>
          <button
            className="sidebar-toggle desktop-only"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "▸" : "◂"}
          </button>
          <button
            className="sidebar-close mobile-only"
            onClick={onMobileClose}
            title="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            className={
              "nav-item" + (currentView === "dashboard" ? " nav-active" : "")
            }
            onClick={() => handleNavClick("dashboard")}
          >
            <span className="nav-icon">⊞</span>
            {!collapsed && <span className="nav-label">Dashboard</span>}
          </button>
          <button
            className={
              "nav-item" + (currentView === "articles" ? " nav-active" : "")
            }
            onClick={() => handleNavClick("articles")}
          >
            <span className="nav-icon">☰</span>
            {!collapsed && (
              <>
                <span className="nav-label">Articles</span>
                <span className="nav-badge">{articleCount}</span>
              </>
            )}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            className={
              "sidebar-new-btn" + (collapsed ? " sidebar-new-btn-icon" : "")
            }
            onClick={handleNewClick}
          >
            <span className="new-btn-icon">+</span>
            {!collapsed && <span>New Article</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
