const Loader = () => {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="relative w-24 h-24">
          <div className="absolute w-full h-full border-8 border-white rounded-full"></div>
          <div className="absolute w-full h-full border-8 border-gray-700 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;