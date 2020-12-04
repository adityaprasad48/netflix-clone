export const API_KEY = '3c1aa316d203015f37c71170c83f6226'

 type Requests = {
  fetchTrending: string;
  fetchNetflixOriginals: string;
  fetchTopRated: string;
  fetchActionMovies: string;
  fetchComedyMovies: string;
  fetchHorrorMovies: string;
  fetchRomanceMovies: string;
  fetchDocumentaries: string;
 }

  const requests:Requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`
  };

  export default requests