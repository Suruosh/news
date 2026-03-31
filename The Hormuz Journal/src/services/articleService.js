var API_BASE = "/api";

export async function fetchArticles() {
  var response = await fetch(API_BASE + "/articles");

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

export async function createArticle(articleData) {
  var response = await fetch(API_BASE + "/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: articleData.title,
      category: articleData.category,
      content: articleData.content,
      author: articleData.author,
      featured: articleData.featured || false,
      image_url: articleData.imageUrl || "",
    }),
  });

  if (!response.ok) {
    var err = await response.json().catch(function () { return {}; });
    throw new Error(err.error || "Failed to create article");
  }

  return response.json();
}

export async function updateArticle(id, articleData) {
  var response = await fetch(API_BASE + "/articles/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: articleData.title,
      category: articleData.category,
      content: articleData.content,
      author: articleData.author,
      featured: articleData.featured || false,
      image_url: articleData.imageUrl || "",
    }),
  });

  if (!response.ok) {
    var err = await response.json().catch(function () { return {}; });
    throw new Error(err.error || "Failed to update article");
  }

  return response.json();
}

export async function deleteArticle(id) {
  var response = await fetch(API_BASE + "/articles/" + id, {
    method: "DELETE",
  });

  if (!response.ok) {
    var err = await response.json().catch(function () { return {}; });
    throw new Error(err.error || "Failed to delete article");
  }

  return response.json();
}
