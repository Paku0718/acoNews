import React from 'react';

const NewsCard = ({ article }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl mb-4">
      {article.image && (
        <img className="h-48 w-full object-cover" src={article.image} alt={article.title} />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{article.title}</h2>
        <p className="text-gray-700 mb-4">{article.description}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-medium hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
