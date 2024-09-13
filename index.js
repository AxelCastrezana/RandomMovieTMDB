// Inicializa runa funcion para hacer un fetch de una apelicula aleatoria de la base de datos de The Movie DB (usando una API)

async function fetchRandomMovie() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2M1MGVkNzJkY2YyNzJiNDcwMDIyM2UzYTUxZjliYyIsIm5iZiI6MTcyNjIzMzU1NC43OTI5Niwic3ViIjoiNjZlMTlhYWE2MzZmOWM3NTlmYWZlNWFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ISHui9l1x7WhXb_E9mhq5yAFNmQQHP79Jirt1QhvkH4'
}
  };

  try {

    // Recupera una lista de peliculas populares de las cuales accederemos para mostrar

    const response = await fetch('https://api.themoviedb.org/3/movie/popular', options);
    const data = await response.json();
    
    // Elegir una pelicula aleatoria de la lista
    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
    
    // Fetch para obtener detalles extras como director y el poster de la pelicula
    const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}?append_to_response=credits`, options);
    const movieData = await movieDetails.json();

    // Extraer el nombre del director de los creditos de la pelicula
    const director = movieData.credits.crew.find(crewMember => crewMember.job === 'Director');

    // Mostrar la información de la pelicula en el card
    displayMovie(movieData, director.name);

  } catch (error) {
    console.error("Error fetching the movie:", error);
  }
}

// Función para mostrar los detalles en el card

function displayMovie(movie, director) {
  const product = document.getElementById("product");

  // Limpia la informaxión actualmente mostrada

  product.innerHTML = '';

  // Se agregan los detalles de la nueva pelicula mostrada
  
  product.innerHTML += `
      <div class="product-card">
        <div class="image-container">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>
        <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-director"><strong>Director:</strong>  ${director}</p>
        <p class="movie-release"><strong>Release Date:</strong> ${movie.release_date}</p>
        <p class="movie-overview"><strong>Synopsis:</strong> ${movie.overview}</p>
        <br></br>
        <button class="reload" onclick="fetchRandomMovie()"><i class="fa-solid fa-rotate-right fa-lg" style="color: #ffffff;"></i></button>
      </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchRandomMovie();  // Automaticamente carga una nueva pelicula al recargar la pagina o hacer click
});