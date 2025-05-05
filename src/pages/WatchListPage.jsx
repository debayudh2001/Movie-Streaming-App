import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { clearWatchList } from "../../app/movieHubSlice";
import WatchListMovieCard from "../components/WatchListMovieCard";
import { useState } from "react";

const WatchListPage = () => {
  //const { watchListItems } = useSelector((state) => state.movieHub);
  const [watchListItems, setWatchListItems] = useState(JSON.parse(localStorage.getItem("WatchListData"))) 
  const dispatch = useDispatch()
  //console.log(watchListItems)

  return (
    <>
      <Navbar />
      <div className="px-4 py-8 bg-black min-h-screen">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Watchlist</h1>
          {watchListItems.length > 0 && (
            <button className="bg-red-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-between" onClick={() => dispatch(clearWatchList())}>
              <Trash2 className="mr-2 h-5 w-5" />
              Clear Watchlist
            </button>
          )}
        </div>

        {watchListItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Your watchlist is empty
            </h2>
            <p className="text-gray-400 mb-8">
              Start adding movies to your watchlist by clicking the bookmark
              icon on any movie card.
            </p>
            <button className="px-4 py-2 bg-white rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              <Link to="/search">Browse Movies</Link>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchListItems?.map((movie) => (
              <WatchListMovieCard key={movie.id} data={movie} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WatchListPage;
