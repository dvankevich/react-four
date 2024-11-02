/* eslint-disable react/prop-types */
import { useState } from 'react';
// 1. Імпортуємо HTTP-функцію
import { fetchArticlesWithTopic } from "./articles-api.js";
import { SearchForm } from "./components/SearchForm.jsx"
import PacmanLoader from "react-spinners/PacmanLoader";
import './App.css'
import Player from './components/Player.jsx';

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

	const handleSearch = async (topic) => {
    try {
	  setArticles([]);
	  setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      console.log(error);
      
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div>
      <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />;
    </div>
    <div>
      <SearchForm onSearch={handleSearch} />
      {/* {loading && <p>Loading data, please wait...</p>} */}
      {loading && <PacmanLoader color="#3b19e3"cssOverride={{display: "inline-flex"}}/>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
    </>
  );
};


export default App
