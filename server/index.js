import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


//Search Route
app.get('/api/search', async function(req, res){
    try{
        const { query } = req.query;  //get search query from request
        if(!query){
            return res.status(400).json({ message: 'Search query is required '});

        }
    const tmdbResponse = await axios.get(
        'https://api.themoviedb.org/3/search/movie', {
            params:{
                api_key: process.env.TMDB_API_KEY,
                query: query,
            },
        }
    );


app.get('/api/movie/:id' , async function(req, res){
    try{
        const { id } = req.params;  //get movei id from url

        const tmdbResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}`, {
                params:{
                    api_key : proccess.env.TMDB_API_KEY,
                },
            }
        );

        res.json(tmdbResponse.data);
    } catch(error){
        console.error("Error fetching movie details from TMDB.", error.message);
        res.status(500).json( {message: "Error fetching movie details." });

    }
});

    
// Send data from external api back to our react client
    res.json(tmdbResponse.data);
    } catch (error){
        console.error("Error fetching from TMDB API:" , error.message);
        res.status(500).json({ message: "An error occured while fetching data,"});
    }
});

app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}`);
});