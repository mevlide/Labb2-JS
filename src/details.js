const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (movieId) {
  const apiUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=490bf857`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("poster").src =
        data.Poster !== "N/A"
          ? data.Poster
          : "https://via.placeholder.com/400x600";
      document.getElementById("title").innerText = data.Title;
      document.getElementById(
        "info"
      ).innerText = `${data.Year} | ${data.Genre} | ${data.Runtime}`;
      document.getElementById("plot").innerText = data.Plot;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
} else {
  document.body.innerHTML = "<p>Film-ID tillhandahålls inte!</p>";
}

function goBack() {
  history.back();
}
