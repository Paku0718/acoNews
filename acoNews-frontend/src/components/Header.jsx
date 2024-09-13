import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search } from "lucide-react";

const Header = ({ onSearch, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);
  const headerRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const openNavbarAndFocusSearch = () => {
    setIsOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const categories = [
    { name: 'Business', value: 'business' },
    { name: 'Technology', value: 'technology' },
    { name: 'Entertainment', value: 'entertainment' },
    { name: 'Sports', value: 'sports' },
    { name: 'Health', value: 'health' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategorySelect(category);
    setSearchValue(category);
    setIsOpen(false);
  };

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const headerElement = headerRef.current;
      if (headerElement) {
        if (prevScrollPos > currentScrollPos) {
          headerElement.style.transform = "translateY(0)";
        } else {
          headerElement.style.transform = "translateY(-100%)";
        }
        prevScrollPos = currentScrollPos;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-20 w-full transition-transform duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center justify-between w-full md:w-auto mb-3 md:mb-0">
            <a href="/" className="text-white text-3xl font-extrabold" style={{ fontFamily: '"Comfortaa", "sans-serif"' }}>
              aco<span className="text-yellow-300">News</span>
            </a>
            <div className="flex items-center md:hidden">
              <button onClick={openNavbarAndFocusSearch} className="text-white p-1 focus:outline-none mr-2 hover:bg-blue-700 rounded transition-colors duration-200">
                <Search size={24} />
              </button>
              <button onClick={toggleNavbar} className="text-white p-1 focus:outline-none hover:bg-blue-700 rounded transition-colors duration-200">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto`}>
            <nav className="mb-3 md:mb-0 md:mr-4">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryClick(category.value)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                      activeCategory === category.value
                        ? 'bg-white text-blue-600'
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </nav>
            
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <input
                ref={searchInputRef}
                type="text"
                name="search"
                placeholder="Search news..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full md:w-48 px-3 py-2 text-sm border border-transparent rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white text-blue-800 placeholder-blue-300 bg-white bg-opacity-90"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-blue-800 px-4 py-2 rounded-r-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors duration-200"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;