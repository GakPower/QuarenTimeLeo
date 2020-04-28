import {Movie} from '../Movie/movie';

export abstract class MovieAPI {
  static readonly genres = [
    {
      id: 28,
      name: 'Action'
    }, {
      id: 12,
      name: 'Adventure'
    }, {
      id: 16,
      name: 'Animation'
    }, {
      id: 35,
      name: 'Comedy'
    }, {
      id: 80,
      name: 'Crime'
    }, {
      id: 99,
      name: 'Documentary'
    }, {
      id: 18,
      name: 'Drama'
    }, {
      id: 10751,
      name: 'Family'
    }, {
      id: 14,
      name: 'Fantasy'
    }, {
      id: 36,
      name: 'History'
    }, {
      id: 27,
      name: 'Horror'
    }, {
      id: 10402,
      name: 'Music'
    }, {
      id: 9648,
      name: 'Mystery'
    }, {
      id: 10749,
      name: 'Romance'
    }, {
      id: 878,
      name: 'Science Fiction'
    }, {
      id: 10770,
      name: 'TV Movie'
    }, {
      id: 53,
      name: 'Thriller'
    }, {
      id: 10752,
      name: 'War'
    }, {
      id: 37,
      name: 'Western'
    },
  ];

  static getMostPopular(): Promise<any> {
    const moviesToReturn = [];
    return fetch('https://api.themoviedb.org/3/movie/popular?api_key=ed03eba5dc6628c738bb9d3a13e7a1e4&language=en-US&page=1')
      .then(response => {
        return response.json();
      })
      .then(movies => {
        const results = movies.results;
        results.forEach(movie => {
          moviesToReturn.push(new Movie(
              movie.id, movie.title, movie.overview,
            `http://image.tmdb.org/t/p/original${movie.poster_path}`,
            `http://image.tmdb.org/t/p/original${movie.backdrop_path}`,
              this.getGenres(movie.genre_ids), movie.vote_average
            )
          );
        });
        return moviesToReturn;
      });
  }
  static getTrailer(movieId: number): Promise<string> {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ed03eba5dc6628c738bb9d3a13e7a1e4&language=en-US`)
      .then(response => {
        return response.json();
      })
      .then(urls => {
        if (urls.results.length > 0) {
          return `https://www.youtube.com/watch?v=${urls.results[0].key}`;
        } else {
          return '';
        }
      });
  }
  static getGenres(genreIDs: number[]): string[] {
    const result = [];
    genreIDs.forEach(genreID => {
      for (const genre of this.genres) {
        if (genreID === genre.id) {
          result.push(genre.name);
          break;
        }
      }
    });
    return result;
  }
  static search(input: string) {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=ed03eba5dc6628c738bb9d3a13e7a1e4&language=en-US&query=${input}&page=1&include_adult=false`)
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        const results = responseJSON.results;
        const movies: Movie[] = [];
        results.forEach(movie => {
          movies.push(new Movie(movie.id, movie.title, movie.overview,
            `http://image.tmdb.org/t/p/original${movie.poster_path}`,
            `http://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            MovieAPI.getGenres(movie.genre_ids), movie.vote_average));
        });
        return movies;
      });
  }
}
