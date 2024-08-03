const init = () => {
  const inputForm = document.querySelector("form");

  inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("input#searchByID");

    // Fetch movie data based on the input value
    fetchMovieData(input.value);
  });
};

document.addEventListener("DOMContentLoaded", init);

const fetchMovieData = (id) => {
  fetch(`http://localhost:3000/movies/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      renderMovieDetails(data);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      renderError();
    });
};

const renderMovieDetails = (data) => {
  const title = document.querySelector("section#movieDetails h4");
  const summary = document.querySelector("section#movieDetails p");

  title.innerText = data.title;
  summary.innerText = data.summary;
};

const renderError = () => {
  const title = document.querySelector("section#movieDetails h4");
  const summary = document.querySelector("section#movieDetails p");

  title.innerText = 'Movie not found';
  summary.innerText = 'Please enter a valid movie ID';
};
