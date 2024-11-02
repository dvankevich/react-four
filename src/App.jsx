/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from "axios";
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
        const response = await axios.get(
          "https://hn.algolia.com/api/v1/search?query=react"
        );
        setArticles(response.data.hits);
      } catch (error) {
        console.log(error);
        
				// Встановлюємо стан error в true
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
