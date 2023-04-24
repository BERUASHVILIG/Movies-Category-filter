import "./Movies.css";
import React, { useState, useEffect } from "react";
import Filter from "./Filter";

export type movieProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

function Products() {
  const [popular, setPopular] = useState<movieProps[]>([]);
  const [filtered, setFiltered] = useState<movieProps[]>([]);
  const [activeGenre, setActiveGenre] = useState(0);
  useEffect(() => {
    fetchPopular();
  }, []);
  const fetchPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=d5c35e51c81488b19da7c1f572507a3d&page=3"
    );
    const movies = await data.json();
    console.log(movies);
    setPopular(movies.results);
    setFiltered(movies.results);
  };
  return (
    <div>
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <div className="popular-movies">
        {filtered.map((movie) => {
          return (
            <div key={movie.id}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              />
              <h2>{movie.title}</h2>
              <p style={{ color: "#fff" }}>{movie.overview}</p>
              <p style={{ color: "#fff", marginTop: "0.4rem", float: "right" }}>
                {movie.popularity} IMDB
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
