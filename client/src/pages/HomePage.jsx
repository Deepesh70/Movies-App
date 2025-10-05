import { useState } from 'react';
import axios from 'axios';
import MovieCard  from '../components/MovieCard';

function App() {
  const [query , setQuery ]= useState('');
  const [movies, setMovies ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState(null);


  const handleSearch = async(e) => {
    e.preventDefault();
    if(!query) return;

    setLoading(true);
    setError(null);
    setMovies([]);

    try{
      //api call to  backend server
      const response =await axios.get(`http://localhost:5000/api/search`,{
        params: {query},

      });
      setMovies(response.data.results);
    } catch(err){
      setError('Failed to fetch Movies. Please try again.');
      console.log(err);

    }finally{
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-900 text-white font-sans'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold text-center mb-8 text-yellow-400'>
          Movie Database Search

        </h1>
        <form onSubmit= {handleSearch } className='flex justify-center mb-12'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search a Movie...'
            className='w-full max-w-md p-3 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-400'
          />
          <button 
          type='submit'
          className='bg-yellow-400 text-gray-900 font-bold p-3 rounded-r-lg hover:bg-yellow-500 transition-colors cursor-pointer'
          >
            Search
          </button>
        </form>

        {loading && <p className='text-center'>Loading...</p>}
        {error && <p className='text-center text-red-500'> {error}</p>}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie= {movie}/>  // MovieCard component
          ))}

        </div>

      </div>

    </div>
  )
}

export default App;