import * as readline from 'readline';

interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  ratings: number[];
}

let movies: Movie[] = [];

const addMovie = (id: string, title: string, director: string, releaseYear: number, genre: string): void => {
  movies.push({ id, title, director, releaseYear, genre, ratings: [] });
  console.log(` Movie '${title}' added successfully!`);
};

const rateMovie = (id: string, rating: number): void => {
  if (rating < 1 || rating > 5) {
    console.log(" Rating must be between 1 and 5.");
    return;
  }
  const movie = movies.find(m => m.id === id);
  if (!movie) {
    console.log(" Movie not found.");
    return;
  }
  movie.ratings.push(rating);
  console.log(` Rated '${movie.title}' with ${rating} stars.`);
};

const getAverageRating = (id: string): number | undefined => {
  const movie = movies.find(m => m.id === id);
  if (!movie) {
    console.log(" Movie not found.");
    return undefined;
  }
  if (movie.ratings.length === 0) return 0;
  return movie.ratings.reduce((sum, r) => sum + r, 0) / movie.ratings.length;
};

const getTopRatedMovies = (): void => {
  if (movies.length === 0) {
    console.log(" No movies available.");
    return;
  }
  movies.sort((a, b) => (getAverageRating(b.id) || 0) - (getAverageRating(a.id) || 0));
  console.log("\n Top Rated Movies:");
  movies.forEach(m => console.log(` ${m.title} -  ${getAverageRating(m.id)?.toFixed(1) || "No Ratings"}`));
};

const getMoviesByGenre = (genre: string): void => {
  const filteredMovies = movies.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
  if (filteredMovies.length === 0) {
    console.log(" No movies found in this genre.");
    return;
  }
  console.log(`\n🎞️ Movies in Genre: ${genre}`);
  filteredMovies.forEach(m => console.log(` ${m.title} (${m.releaseYear})`));
};

const getMoviesByDirector = (director: string): void => {
  const filteredMovies = movies.filter(m => m.director.toLowerCase() === director.toLowerCase());
  if (filteredMovies.length === 0) {
    console.log(" No movies found by this director.");
    return;
  }
  console.log(`\n Movies by Director: ${director}`);
  filteredMovies.forEach(m => console.log(` ${m.title} (${m.releaseYear})`));
};

const searchMoviesBasedOnKeyword = (keyword: string): void => {
  const filteredMovies = movies.filter(m => m.title.toLowerCase().includes(keyword.toLowerCase()));
  if (filteredMovies.length === 0) {
    console.log("No movies found with this keyword.");
    return;
  }
  console.log(`\n🔍 Movies containing '${keyword}':`);
  filteredMovies.forEach(m => console.log(` ${m.title} (${m.releaseYear})`));
};

const getMovie = (id: string): void => {
  const movie = movies.find(m => m.id === id);
  if (!movie) {
    console.log(" Movie not found.");
    return;
  }
  console.log("\n 1.Movie Details:");
  console.log(` Title: ${movie.title}`);
  console.log(` Director: ${movie.director}`);
  console.log(` Year: ${movie.releaseYear}`);
  console.log(` Genre: ${movie.genre}`);
  console.log(` Average Rating: ${getAverageRating(movie.id)?.toFixed(1) || "No Ratings"}`);
};

const removeMovie = (id: string): void => {
  const index = movies.findIndex(m => m.id === id);
  if (index === -1) {
    console.log(" Movie not found.");
    return;
  }
  const removedMovie = movies.splice(index, 1);
  console.log(` Removed movie: '${removedMovie[0].title}'.`);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const showMenu = () => {
  console.log("\n Movie Management System");
  console.log(" Rate Movie");
  console.log(" Add Movie");
  console.log(" Search Movies by Genre");
  console.log(" Show Top Rated Movies");
  console.log(" Search Movies by Director");
  console.log(" Search Movies by Keyword");
  console.log(" Get Movie Details");
  console.log(" Remove Movie");
  console.log(" Exit");

  rl.question(" Choose an option: ", (option) => {
    switch (option) {
      case "1":
        rl.question(" Enter Movie ID: ", (id) => {
          rl.question(" Enter Title: ", (title) => {
            rl.question(" Enter Director: ", (director) => {
              rl.question(" Enter Release Year: ", (releaseYear) => {
                rl.question(" Enter Genre: ", (genre) => {
                  addMovie(id, title, director, parseInt(releaseYear), genre);
                  showMenu();
                });
              });
            });
          });
        });
        break;

      case "2":
        rl.question(" Enter Movie ID to Rate: ", (id) => {
          rl.question(" Enter Rating (1-5): ", (rating) => {
            rateMovie(id, parseInt(rating));
            showMenu();
          });
        });
        break;

      case "3":
        getTopRatedMovies();
        showMenu();
        break;

      case "4":
        rl.question("Enter Genre: ", (genre) => {
          getMoviesByGenre(genre);
          showMenu();
        });
        break;

      case "5":
        rl.question(" Enter Director's Name: ", (director) => {
          getMoviesByDirector(director);
          showMenu();
        });
        break;

      case "6":
        rl.question(" Enter Keyword: ", (keyword) => {
          searchMoviesBasedOnKeyword(keyword);
          showMenu();
        });
        break;

      case "7":
        rl.question(" Enter Movie ID: ", (id) => {
          getMovie(id);
          showMenu();
        });
        break;

      case "8":
        rl.question(" Enter Movie ID to Remove: ", (id) => {
          removeMovie(id);
          showMenu();
        });
        break;

      case "9":
        console.log(" Exiting... Have a great day!");
        rl.close();
        break;

      default:
        console.log(" Invalid option! Please try again.");
        showMenu();
        break;
    }
  });
};
showMenu();
