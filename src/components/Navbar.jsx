import { Link } from "react-router-dom";
import { X, Menu, Film } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-3.5">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white">
            <Film className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MovieHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-white">
            <Link
              to="/"
              className="text-sm font-medium hover:text-gray-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="text-sm font-medium hover:text-gray-400 transition-colors"
            >
              Search
            </Link>
            <Link
              to="/watchlist"
              className="text-sm font-medium hover:text-gray-400 transition-colors"
            >
              Watchlist
            </Link>
          </nav>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4 text-white">
              <Link
                to="/"
                className="text-sm font-medium hover:text-gray-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search"
                className="text-sm font-medium hover:text-gray-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                to="/watchlist"
                className="text-sm font-medium hover:text-gray-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Watchlist
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
