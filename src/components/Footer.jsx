import { Film, Twitter, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 text-white">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">MovieFlix</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Discover and watch the best movies from around the world.
            </p>
            <div className="flex gap-4">
              <Twitter className="h-5 w-5 text-gray-400" />
              <Instagram className="h-5 w-5 text-gray-400" />
              <Facebook className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/watchlist" className="hover:text-white transition-colors">
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@movieflix.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Movie St, Hollywood, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} MovieFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
