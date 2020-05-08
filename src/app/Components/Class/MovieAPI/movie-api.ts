import { Movie } from '../Movie/movie';

export abstract class MovieAPI {
  static readonly genres = [
    {
      id: 28,
      name: 'Action',
      movieID: 10431
    }, {
      id: 12,
      name: 'Adventure',
      movieID: 481848
    }, {
      id: 16,
      name: 'Animation',
      movieID: 920
    }, {
      id: 35,
      name: 'Comedy',
      movieID: 402582
    }, {
      id: 80,
      name: 'Crime',
      movieID: 38700
    }, {
      id: 99,
      name: 'Documentary',
      movieID: 250766
    }, {
      id: 18,
      name: 'Drama',
      movieID: 452000
    }, {
      id: 10751,
      name: 'Family',
      movieID: 19084
    }, {
      id: 14,
      name: 'Fantasy',
      movieID: 539537
    }, {
      id: 36,
      name: 'History',
      movieID: 530915
    }, {
      id: 27,
      name: 'Horror',
      movieID: 10065
    }, {
      id: 10402,
      name: 'Music',
      movieID: 34038
    }, {
      id: 9648,
      name: 'Mystery',
      movieID: 428045
    }, {
      id: 10749,
      name: 'Romance',
      movieID: 503403
    }, {
      id: 878,
      name: 'Science Fiction',
      movieID: 11
    }, {
      id: 10770,
      name: 'TV Movie'
    }, {
      id: 53,
      name: 'Thriller',
      movieID: 2263
    }, {
      id: 10752,
      name: 'War',
      movieID: 10592
    }, {
      id: 37,
      name: 'Western',
      movieID: 43804
    },
  ];

  static getMostPopular(): Promise<Movie[]> {
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
  static getMovie(movieID: number): Promise<Movie> {
    return fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=ed03eba5dc6628c738bb9d3a13e7a1e4&language=en-US`)
      .then(response => {
        return response.json();
      }).then(movie => {
        return new Movie(movie.id, movie.title, movie.overview,
          `http://image.tmdb.org/t/p/original${movie.poster_path}`,
          `http://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          movie.genres.map(genre => genre.name), movie.vote_average);
      });
  }
  static getUpcoming(): Promise<Movie[]> {
    const moviesToReturn = [];
    return fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=ed03eba5dc6628c738bb9d3a13e7a1e4&language=en-US&page=1&region=us')
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

  static async getMovieByIds(moviesIds: number[]): Promise<Movie[]> {
    const recommendedMovies: Movie[] = [];
    for (const id of moviesIds) {
      await this.getMovie(id).then( movie => {
        recommendedMovies.push(movie);
      });
    }
    return recommendedMovies;
  }

  static getMoviesOfGenre(genre: string): Promise<Movie[]> {
    const moviesToReturn = [];
    return fetch(`https://api.themoviedb.org/3/movie/${this.getIDFromGenre(genre)}/similar?api_key=ed03eba5dc6628c738bb9d3a13e7a1e4&language=en-US&page=1`)
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

  private static getIDFromGenre(genre: string): number {
    let result;
    switch (genre) {
      case 'Action':
        result = 10431;
        break;
      case 'Adventure':
        result = 481848;
        break;
      case 'Animation':
        result = 920;
        break;
      case 'Comedy':
        result = 402582;
        break;
      case 'Crime':
        result = 38700;
        break;
      case 'Documentary':
        result = 250766;
        break;
      case 'Drama':
        result = 452000;
        break;
      case 'Family':
        result = 19084;
        break;
      case 'Fantasy':
        result = 539537;
        break;
      case 'Romance':
        result = 503403;
        break;
      case 'History':
        result = 530915;
        break;
      case 'Horror':
        result = 539537;
        break;
      case 'Music':
        result = 34038;
        break;
      case 'Mystery':
        result = 428045;
        break;
      case 'Science Fiction':
        result = 11;
        break;
      case 'Thriller':
        result = 2263;
        break;
      case 'War':
        result = 10592;
        break;
      case 'Western':
        result = 43804;
        break;
    }
    return result;
  }

}
