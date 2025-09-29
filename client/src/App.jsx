import{ Route , Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';

function App(){
  return (
    <div className='min-h-screen bg-gray-900 text-white font-sans'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/movie/:id' element={<MovieDetailPage />}/>

      </Routes>

    </div>
  );
}

export default App;