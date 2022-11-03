window.onload = () => {
    const title = document.querySelector("#title");
    const rating = document.querySelector("#rating");
    const awards = document.querySelector("#awards");
    const releaseDate = document.querySelector("#release_date");
    const length = document.querySelector("#length");
    const btnEditar = document.querySelector(".botonModificar");
    const btnEliminar = document.querySelector(".botonBorrar");

    const qs = new URLSearchParams(location.search);
  
    let id = null
  
      if(qs.has("peliculaId")){
        id = qs.get("peliculaId");
        fetch("http://localhost:3031/api/movies/" + id)
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((pelicula) => {
          console.log(pelicula);
          title.value = pelicula.data.title
          rating.value = pelicula.data.rating
          awards.value = pelicula.data.awards
          releaseDate.value = new Date(pelicula.data.release_date)
          .toISOString()
          .split("T")[0]
          length.value = pelicula.data.length
        });
      }

    
        
     
  
    btnEditar.addEventListener("click", (e) => {
      e.preventDefault();
  
      const data = {
        title: title.value,
        rating: rating.value,
        awards: awards.value,
        release_date: release_date.value,
        length: length.value,
        /* genre_id: "", */
      };
  
      const setting = {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      };
  
      fetch("http://localhost:3031/api/movies/update/" + id, setting)
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((data) => {
          console.log(data);
          location.href = "home.html";
        });

        btnEliminar.addEventListener("click", (e) => {
          e.preventDefault();
      
        
      
          const setting = {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
            
          };
      
          fetch("http://localhost:3031/api/movies/delete/" + id)
            .then((respuesta) => {
              return respuesta.json();
            })
            .then((data) => {
              console.log(data);
              location.href = "home.html";
            });
        });
    });
  };
  