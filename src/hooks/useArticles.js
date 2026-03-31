import { useState, useEffect } from "react";
import {
  fetchArticles,
  createArticle,
  updateArticle as updateArticleApi,
  deleteArticle as deleteArticleApi,
} from "../services/articleService";

function mapArticle(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    content: row.content,
    author: row.author,
    date: row.created_at ? row.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
    featured: row.featured,
    imageUrl: row.image_url || "",
  };
}

function useArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        const data = await fetchArticles();
        setArticles(data.map(mapArticle));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadArticles();
  }, []);

  async function addArticle(articleData) {
    const saved = await createArticle(articleData);
    setArticles([mapArticle(saved), ...articles]);
  }

  async function updateArticle(id, articleData) {
    const saved = await updateArticleApi(id, articleData);
    setArticles(
      articles.map((article) =>
        article.id === id ? mapArticle(saved) : article
      )
    );
  }

  async function deleteArticle(id) {
    await deleteArticleApi(id);
    setArticles(articles.filter((article) => article.id !== id));
  }

  return { articles, isLoading, error, addArticle, updateArticle, deleteArticle };
}

export default useArticles;
