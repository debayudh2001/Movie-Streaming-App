import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { fetchMovieUrl } from "../../app/movieHubSlice";

const WatchMovie = () => {
  const { tmdbId, movieUrl, loading, watchMovieError } = useSelector((state) => state.movieHub);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieUrl(tmdbId));
  }, []);

  //console.log(movieUrl);

  return (
    <>
      <Navbar />
      <div className="px-4 py-4 bg-black min-h-screen">
        {loading ? (
          <Loader />
        ) : watchMovieError !== null ? (
          <div className="flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-400">
              {watchMovieError}
            </span>
          </div>
        ) : (
          <div className="relative w-full aspect-video my-auto max-w-6xl mx-auto">
            <iframe
              src={movieUrl}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WatchMovie;
