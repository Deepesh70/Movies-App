const MovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: `https://via.placeholder.com/500x750?text=No+Image`;

    return(
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 tranisition-transform duration-300">
            <img src={ posterUrl } alt={ `${movie.title} poster`} className="w-full h-auto"/>
            <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
            <p className="text-gray-400">Release Date: {movie.release_date}</p>
            </div>
        </div>
    );
};

export default MovieCard;

