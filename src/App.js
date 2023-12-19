import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieName, setMovieName] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`)
      .then((res) => {
        setPopularMovies(res.data.results);
      });
  }, []);

  useEffect(() => {
    if (movieName.trim() !== '') {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=cfe422613b250f702980a3bbf9e90716`)
        .then((res) => {
          setPopularMovies(res.data.results);
        });
    }
  }, [movieName]);

  return (
    <>
      <div style={{ textAlign: 'center', backgroundColor:'paleturquoise' }}>
        <h1 style={{ color: 'teal', marginTop: 20, fontFamily: 'serif' }}>Movie Search Engine</h1>
        <input
          value={movieName}
          placeholder='Search for a Movie...🔍'
          style={{
            marginBottom: 15,
            padding: '10px',
            width: '30%',
            boxSizing: 'border-box',
            fontSize: '16px',
            '@media (max-width: 600px)': {
              fontSize: '14px',
            },
          }}
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />

      </div>
      <div id='movies-wrapper'>
        {popularMovies.map((item, i) => (
          <div className='movies-card' key={i}>
            <img className='movie-thumbnail' src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
            <p>
              <b>Title:</b> {item.title}
            </p>
            <p>
              <b>Rating:</b> {item.vote_average}
            </p>
            <p>
              <b>Release Date:</b> {item.release_date}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
