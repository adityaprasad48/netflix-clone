import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../helper/axios";
import requests from "../helper/Request";
import { Movie } from "../helper/Types";

const BannerWrapper = styled.header<{ movieImgUrl?: string }>`
  background-image: url(https://image.tmdb.org/t/p/original//${(props) =>
    props.movieImgUrl});
  background-size: cover;
  background-position: center center;
  color: white;
  object-fit: contain;
  height: 448px;
`;

const FadeBottom = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;

const BannerContent = styled.div`
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
`;

const Button = styled.button`
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  margin-right: 1rem;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);

  &:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;

const Des = styled.div`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 0.8rem;
  max-width: 360px;
  height: 80px;
`;

const Banner = () => {
  // know the shape of object don't need to pass { }
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(requests.fetchNetflixOriginals);
      const index = Math.floor(Math.random() * (req.data.results.length - 1));
      const randomMovie = req.data.results[index];
      setMovie(randomMovie);
    }
    fetchData();
  }, []);

  const truncate = (str: string | undefined = "", n: number): string => {
    return str?.length > n ? str.substr(0, n - 1) + "...." : str;
  };

  // console.log(movie);
  return (
    <>
      <BannerWrapper movieImgUrl={movie?.backdrop_path}>
        <BannerContent>
          <Title>{movie?.name || movie?.name || movie?.original_name}</Title>
          <div>
            <Button>Play</Button>
            <Button>My List</Button>
          </div>
          <Des>{truncate(movie?.overview, 150)}</Des>
        </BannerContent>
      </BannerWrapper>
      <FadeBottom />
    </>
  );
};

export default Banner;
