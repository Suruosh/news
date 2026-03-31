import "./Header.css";

function Header({ searchQuery, onSearchChange, currentView, onMenuToggle }) {
  const viewLabels = {
    dashboard: "Dashboard",
    articles: "Articles",
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle" onClick={onMenuToggle} title="Open menu">
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>
        <h2 className="topbar-title">{viewLabels[currentView] || "Articles"}</h2>
      </div>
      <div className="topbar-right">
        {currentView === "articles" && (
          <div className="topbar-search">
            <span className="topbar-search-icon">⌕</span>
            <input
              type="text"
              className="topbar-search-input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                className="topbar-search-clear"
                onClick={() => onSearchChange("")}
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div className="topbar-avatar">A</div>
      </div>
    </header>
  );
}

export default Header;
