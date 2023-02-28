// @ts-ignore
import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from 'react-youtube';
import styled from "styled-components";
import axios from "../helper/axios";
import { Movie } from "../helper/Types";

const Wrapper = styled.div`
  margin-left: 20px;
`;

const Title = styled.h2`
  margin-left: 20px;
  color: white;
`;

const PosterContainer = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Poster = styled.img<{ large?: boolean }>`
  width: 100%;
  object-fit: contain;
  /* if large then 200px else 100px */
  max-height: ${(props) => (props.large ? "200px" : "100px")};
  margin-right: 10px;
  transition: all 0.45ms;
  border-radius: 5px;

  &:hover {
    /* if large then 1.2 else 1.1 */
    transform: ${(props) => (props.large ? "scale(1.2)" : "scale(1.1)")};
  }
`;

const baseUrl = "https://image.tmdb.org/t/p/original/";

interface RowProps {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

const Row = ({ title, fetchUrl, isLargeRow }: RowProps) => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      // link/fetchUrl
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts: YouTubeProps['opts'] = {
    height: "390",
    width: "100%",
    playerVars: {
      //
      autoplay: 1,
    },
  };

  const handlerClick = (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log(movie);
      const movieName = movie?.original_title || movie?.name || movie.original_name
      movieTrailer(movieName)
        .then((url: string) => {
          const urlPrarams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlPrarams.get("v") as string);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  return (
    <Wrapper>
      <Title>{movies && title}</Title>
      <PosterContainer>
        {movies.map((movie) => (
          <Poster
            large={isLargeRow}
            key={movie.id}
            onClick={() => handlerClick(movie)}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name || "no-name"}
          />
        ))}
      </PosterContainer>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </Wrapper>
  );
};

export default Row;
