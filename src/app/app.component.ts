import { Component } from '@angular/core';
import {Movie} from './Components/Class/Movie/movie';
import {MovieAPI} from './Components/Class/MovieAPI/movie-api';
import {setLines} from '@angular/material/core';
import TEST from '../assets/detaset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  count = 0;
  file;
  search(input: string) {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=ed03eba5dc6628c738bb9d3a13e7a1e4&language=en-US&query=${input}&page=1`)
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        if (responseJSON.results.length > 0) {
          return responseJSON.results[0].id;
        } else {
          return 0;
        }
      });
  }

  updateFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = reader.result.toString().trim();
      const lines = text.split('\r\n')
        .map(line => line.trim());
      // this.loop2(0, lines);
      for (const line of lines) {
        const splitted = line.split(';');
      //   console.log(splitted);

        if (splitted[1].startsWith('\"')) {
          splitted[1] = splitted[1].replace('\"', '');
        }

        this.search(splitted[1]).then(id => {
          console.log(`${splitted[0]};${id}`);
        });

        if (lines.indexOf(line) === 4500) {
          break;
        }
      }
      // console.log(lines);
      // lines.forEach(line => {
      //   const info =
      // });
    };
    reader.readAsText(file);
  }

  loop2(index: number, array: string[]) {
    setTimeout(() => {
      if (index < array.length) {
        const splitted = array[index].split(';');
        this.search(splitted[1]).then(movieID => {
          console.log(`${splitted[0]};${movieID}\r\n`);
          if (movieID > 0) {
            this.count += 1;
          }
          this.loop2(index + 1, array);
        });
      }
    }, 10);
  }

  constructor() {
    //console.log(TEST.split('\n'));
    // let popular;
    // MovieAPI.getUpcoming().then(movies => {
    //   popular = movies;
    //
    //   this.loop(0, popular);
      // popular.forEach(movie => {
      //   this.search(movie.id).then(movieID => {
      //     console.log(movieID);
      //   });
      // });
      // popular.forEach(movie => {
      //   this.search(movie.id).then(movieID => {
      //     console.log(`${movieID} => ${movie.id}`);
      //   });
      // });
    // });
  }

  loop(index: number, array) {
    setTimeout(() => {
      if (index < array.length) {
        this.search(array[index].title).then(movieID => {
          console.log(`${array[index].id} => ${movieID}`);
          if (array[index].id === movieID) {
            this.count += 1;
          }
          this.loop(index + 1, array);
        });
      }
      console.log(`${this.count}/${array.length}`);
    }, 10);
  }
}
