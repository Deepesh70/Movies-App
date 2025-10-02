import { useState , useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import axios from 'axios';

function MovieDetailPage(){
  const { id } = useParams();

  const [ movie, setMovie ] = useState(null);
  const [ loading , setLoading] = useState(true);
  const [ error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async() => {
      setLoading(true);
      setError(null);
      try{
        const response = await axios.get(`http://localhost:5000/api/movie/${id}`);
        setMovie(response.data);

      }catch(err){
        setError('Failed to fetch movie details.');
        console.error(err);

      }finally{
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);  //rerun effect if id changes

  if(loading) return <p className='text-center text-lg mt-8'>Loading details...</p>
  if(error) return <p className='text-center text-red-500 text-lg mt-8'>{error}</p>
  if(!movie) return null;

  const posterUrl = movie.poster_path
  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className='container mx-auto px-4 py-8'>
      <Link to="/" className='text-yellow-400 hover:text-yellow-500 mb-8 inline-block '>&larr;Back to Search</Link>
      <div className='flex flex-col md:flex-row gap-8'>
        
         <img src={posterUrl} alt={`${movie.title} poster`} className="w-full md:w-1/3 rounded-lg shadow-lg" />
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg text-gray-300 mb-6">{movie.overview}</p>
          <p className="text-gray-400"><strong>Release Date:</strong> {movie.release_date}</p>
          <p className="text-gray-400"><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
        </div>

      </div>

    </div>
  );
}

export default MovieDetailPage;
