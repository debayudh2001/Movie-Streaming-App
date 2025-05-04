import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovieDetails, removeFromWatchList } from "../../app/movieHubSlice";
import { Trash2 } from "lucide-react"

const WatchListMovieCard = ({ data }) => {
  const dispatch = useDispatch()

  function handleClick(e){
    e.preventDefault()
    e.stopPropagation()
    dispatch(removeFromWatchList(data))
  }

  return (
    <Link
      to='/movie-details'
      onClick={() => dispatch(fetchMovieDetails(data?.id))}
      className="group bg-gray-900 rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative aspect-[2/3]">
        <img
          src={data?.primaryImage}
          alt="img"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-3 flex justify-between">
        <span className="font-semibold text-white line-clamp-1">{data?.originalTitle.slice(0,34)}</span>
        <Trash2 className="text-red-600" onClick={handleClick} />
      </div>
    </Link>
  );
};

export default WatchListMovieCard;
