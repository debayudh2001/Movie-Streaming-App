import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../../app/movieHubSlice";
import { useRef } from "react";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const { loading, searchResultsError, searchResults } = useSelector((state) => state.movieHub)
  const dispatch = useDispatch()
  const input = useRef(null)
  
  function handleSubmit(e){
    e.preventDefault()
    dispatch(fetchSearchResults(input.current.value.trim()))
    input.current.value = ""
  }
  
 //console.log(searchResults)

  return (
    <>
      <Navbar />
      <div className="px-4 py-8 bg-black min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-8">
          Search for Movies
        </h1>
        <form className="max-w-md mx-auto mb-8 flex flex-col" onSubmit={handleSubmit}>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              ref={input}
              type="text"
              placeholder="Enter movie name"
              className="py-2.5 pl-10 text-white bg-gray-800 border-none focus:border-gray-600 w-full rounded-lg"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-white rounded-lg font-semibold hover:bg-gray-400 transition-colors">Search</button>
        </form>
        {loading ? (
          <Loader />
        ) : searchResultsError !== null ? (
          <div className="flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-400">
              {searchResultsError}
            </span>
          </div>
        ) : searchResults.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pl-2">
            {searchResults?.map((movie) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
          </div>
        ) : (
          <span className="text-2xl font-semibold text-gray-400">No search results found</span>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
