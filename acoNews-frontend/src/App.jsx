//App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import NewsFeed from './components/NewsFeed';
import Pagination from './components/Pagination';
import Spinner from './components/Spinner';
import Footer from './components/Footer';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('latest');
  const [filters, setFilters] = useState({ category: '', country: '', lang: 'en' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    const { category, country, lang } = filters;
    const apiUrl = `http://localhost:5000/news?q=${encodeURIComponent(query)}&category=${category}&country=${country}&lang=${lang}&page=${currentPage}&max=9`;

    // console.log('Filters:', filters);
    // console.log('API URL:', apiUrl); // Log API URL


    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setArticles(data.articles);
      setTotalPages(Math.ceil(data.totalArticles / 9));
      setError(null);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, currentPage]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  };

  const handleFilterChange = (name, value) => {
    // console.log(`Filter changed: ${name} = ${value}`);
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
};


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col  bg-gray-100">
      <header className="sticky top-0 z-50">
        <Header onSearch={handleSearch} onCategorySelect={handleCategorySelect} />
      </header>
      <Filters onFilterChange={handleFilterChange} currentQuery={query} filters={filters}/>
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {loading ? (
        <Spinner />
      ) : (
        <NewsFeed articles={articles} />
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer/>
    </div>
  );
};

export default App;