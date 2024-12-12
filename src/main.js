document.getElementsByClassName("uye-giris").onclick = function () {
  document.getElementById("signinpage").innerHTML = "signin.html";
};

// script.js
const movieList = document.getElementById("movie-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

function fetchMovies(query) {
  const apiUrl = `http://www.omdbapi.com/?s=${query}&apikey=490bf857`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      movieList.innerHTML = "";
      if (data.Response === "True") {
        const movies = data.Search;
        movies.forEach((movie) => {
          const li = document.createElement("li");

          li.addEventListener("click", () => {
            window.location.href = `details.html?id=${movie.imdbID}`;
          });

          li.innerHTML = `
            <img class="poster" src="${
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/200x300"
            }" alt="Poster">
            <div>
              <p class="movie-title">${movie.Title}</p>
              <p class="movie-year">Year: ${movie.Year}</p>
            </div>
          `;
          movieList.appendChild(li);
        });
      } else {
        movieList.innerHTML = `<li>Kunde inte hitta filmen "${query}"</li>`;
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      movieList.innerHTML = `<li>Ett fel uppstod när filmer skulle hämtas.</li>`;
    });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    movieList.innerHTML = `<li>Vänligen ange en sökterm.</li>`;
  }
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

window.addEventListener("load", () => {
  fetchMovies("Avengers");
});

const hamburger = document.getElementById("hamburger");
const navbarLinks = document.getElementById("navbar-links");

hamburger.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});
