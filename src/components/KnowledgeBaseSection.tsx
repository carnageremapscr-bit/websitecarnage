"use client";
import React, { useEffect, useState } from "react";
import { Article } from "../types";

interface KnowledgeBaseSectionProps {
  isAdmin?: boolean;
}

const KnowledgeBaseSection: React.FC<KnowledgeBaseSectionProps> = ({ isAdmin = false }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/admin/knowledgeBase");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading knowledge base...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Knowledge Base</h2>
      {articles.length === 0 ? (
        <p className="text-center text-gray-400">No articles available.</p>
      ) : (
        <ul className="space-y-6">
          {articles.map((article) => (
            <li
              key={article.id}
              className="border border-gray-700 p-6 rounded-lg hover:shadow-lg hover:border-yellow-400 transition-all"
            >
              <h3 className="text-2xl font-semibold mb-2 text-yellow-300">
                {article.title}
              </h3>
              <p className="text-gray-300 mb-4">{article.summary}</p>
              <a
                href={article.link}
                className="text-yellow-400 underline hover:text-yellow-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
      {isAdmin && (
        <button className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all">
          Add New Article
        </button>
      )}
    </div>
  );
};

export default KnowledgeBaseSection;
