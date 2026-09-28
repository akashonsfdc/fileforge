import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [openDropdown, setOpenDropdown] = useState<'pdf' | 'image' | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex">
            <div className="flex-shrink-0">
              <Link to="/" className="block lg:hidden">
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Open main menu"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </Link>
              <div className="hidden lg:block">
                <Link to="/" className="flex space-x-3 items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">FileForge</span>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <nav className="flex items-center gap-2">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700">
                  Home
                </Link>
                {/* PDF Tools Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={openDropdown === 'pdf'}
                    onClick={() => setOpenDropdown(openDropdown === 'pdf' ? null : 'pdf')}
                    className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700"
                  >
                    PDF Tools
                    <svg className="-mr-1 ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === 'pdf' && <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <div className="py-1">
                      <Link to="/pdf-to-word" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        PDF to Word
                      </Link>
                      <Link to="/compress-pdf" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Compress PDF
                      </Link>
                      {/* Add more PDF tools links as we implement them */}
                    </div>
                  </div>}
                </div>
                {/* Image Tools Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={openDropdown === 'image'}
                    onClick={() => setOpenDropdown(openDropdown === 'image' ? null : 'image')}
                    className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700"
                  >
                    Image Tools
                    <svg className="-mr-1 ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === 'image' && <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <div className="py-1">
                      <Link to="/image-compressor" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Image Compressor
                      </Link>
                      <Link to="/image-to-pdf" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Image to PDF
                      </Link>
                      {/* Add more image tools links as we implement them */}
                    </div>
                  </div>}
                </div>
                <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700">
                  About
                </Link>
              </nav>
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center">
            <div className="flex lg:flex-1 lg:justify-end">
              {/* Theme toggle */}
              <button
                onClick={() => setIsDarkMode((darkMode) => !darkMode)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile menu links go here */}
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700">
              Home
            </Link>
            {/* PDF Tools Dropdown for mobile */}
            <div className="relative">
              <button
                className="w-full flex justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700"
              >
                PDF Tools
                <svg className="-mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="hidden mt-2 space-y-1 pl-3">
                <Link to="/pdf-to-word" className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
                  PDF to Word
                </Link>
                <Link to="/compress-pdf" className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
                  Compress PDF
                </Link>
              </div>
            </div>
            {/* Image Tools Dropdown for mobile */}
            <div className="relative">
              <button
                className="w-full flex justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700"
              >
                Image Tools
                <svg className="-mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="hidden mt-2 space-y-1 pl-3">
                <Link to="/image-compressor" className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
                  Image Compressor
                </Link>
                <Link to="/image-to-pdf" className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 dark:hover:text-gray-100">
                  Image to PDF
                </Link>
              </div>
            </div>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700">
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;