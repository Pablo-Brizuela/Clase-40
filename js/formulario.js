window.onload = () => {
    const title = document.querySelector("#title");
    const rating = document.querySelector("#rating");
    const awards = document.querySelector("#awards");
    const releaseDate = document.querySelector("#release_date");
    const length = document.querySelector("#length");
    const btnEditar = document.querySelector(".botonModificar");
  
    const qs = new URLSearchParams(location.search);
  
    const id = qs.get("peliculaId");
  
    fetch("http://localhost:3031/api/movies/" + id)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((pelicula) => {
        console.log(pelicula);
      });
  
    btnEditar.addEventListener("click", (e) => {
      e.preventDefault();
  
      const data = {
        title: "",
        rating: "",
        awards: "",
        release_date: "",
        length: "",
        genre_id: "",
      };
  
      const setting = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      };
  
      fetch("http://localhost:3031/api/movies/" + id, setting)
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((data) => {
          console.log(data);
          location.href = "home.html";
        });
    });
  };
  