import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import MovieCard from "./components/MovieCard";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomePageData } from "../app/movieHubSlice.js";

const App = () => {
  const { loading, homePageData, error } = useSelector(
    (state) => state.movieHub
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomePageData());
  }, []);

  //console.log(error)

  return (
    <>
      <Navbar />
      <div className="px-4 py-8 bg-black min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-10">
          Top Box Office (US)
        </h1>
        {loading ? (
          <Loader />
        ) : error !== null ? (
          <div className="flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-400">
              {error}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pl-2">
            {homePageData?.map((movie) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
