/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// 1. Імпортуємо HTTP-функцію
import { fetchArticlesWithTopic } from "./articles-api.js";
import PacmanLoader from "react-spinners/PacmanLoader";
import './App.css'

const ArticleList = ({ items }) => (
  <ul>
    {items.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
		// 2. Використовуємо HTTP-функцію
		const data = await fetchArticlesWithTopic("react");
        setArticles(data);
      } catch (error) {
        console.log(error);
        
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>
      {/* {loading && <p>Loading data, please wait...</p>} */}
      {loading && <PacmanLoader color="#3b19e3"cssOverride={{display: "inline-flex"}}/>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};


export default App
