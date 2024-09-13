import React from 'react';
import NewsCard from './NewsCard';

const NewsFeed = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p className="text-center mt-4">No news articles found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsFeed;
