import { Star, Clock, Calendar, Film } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Loader from "../components/Loader.jsx";
import { addToWatchList, fetchTmdbId } from "../../app/movieHubSlice.js";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { movieDetails, loading, movieDetailsError } = useSelector(
    (state) => state.movieHub
  );
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //console.log(movieDetails);

  return (
    <>
      <Navbar />
      <div className="px-4 py-8 bg-black min-h-screen">
        {loading ? (
          <Loader />
        ) : movieDetailsError !== null ? (
          <div className="flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-400">
              {movieDetailsError}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
              <img
                src={movieDetails?.primaryImage}
                alt="img"
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                {movieDetails?.originalTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-yellow-400 mr-1" />
                  <span>{movieDetails?.averageRating}/10</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{movieDetails?.runtimeMinutes} min</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{movieDetails?.startYear}</span>
                </div>
                <div className="flex items-center">
                  <Film className="w-4 h-4 mr-1" />
                  {movieDetails?.genres.map((genre, ind) => {
                    return (
                      <span key={ind} className="mr-2">
                        {genre}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Overview
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {movieDetails?.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2.5 text-white">
                  Full Cast
                </h2>
                <div className="flex flex-wrap gap-6">
                  {movieDetails?.cast.map((actor, ind) => (
                    <div key={ind} className="flex items-center gap-2">
                      <div className="space-y-1.5">
                        <div className="font-medium text-white">
                          {actor?.fullName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {actor?.characters[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-5">
                <button 
                  className="px-4 py-2 bg-white rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  onClick={() => {
                      dispatch(fetchTmdbId(movieDetails?.id))
                      navigate("/watch-movie")
                    }
                  }
                >
                  Watch Now
                </button>
                <button className="px-4 py-2 rounded-lg font-semibold text-white border-2 border-gray-400 hover:bg-gray-800 transition-colors" onClick={() => dispatch(addToWatchList(movieDetails))}>
                  Add to Watchlist
                </button>
              </div>

              <div className="relative w-full aspect-video mt-8 max-w-3xl">
                <iframe
                  src={`https://www.youtube.com/embed/${movieDetails?.trailer?.slice(
                    movieDetails?.trailer?.indexOf("=") + 1
                  )}?autoplay=1`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MovieDetails;
