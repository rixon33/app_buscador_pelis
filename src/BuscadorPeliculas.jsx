import { useState } from "react"

export const BuscadorPeliculas = () => {

    //Url
    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzcxZWE3NGQ3NDFlODk3ZjQ3ZWFjNjMwMTVkNTE1ZiIsIm5iZiI6MTcyMTY0MDMzNy4xODgsInN1YiI6IjY2OWUyNTkxYzg3NzhlY2IzZDdkMjUyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bunc0BhtPuE7bVBoy_AMRJCFvjDoIG1_UYmeUkqqdNk'

    //Use States, uno para buscar, otro para guardar las pelis
    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    //El handle para setear el valor a buscar
    const handleInputChange = (e) => {
        setBusqueda(e.target.value)
    }

    //El handle para activar el fetch
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    //Fetch de la API
    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${encodeURIComponent(busqueda)}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json()
            setPeliculas(data.results || []);
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="container">
            <h1>Buscador de peliculas</h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Ejemplo: La casa de papel"
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Buscar</button>

            </form>

            <div className="movie-list">
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                    </div>
                ))}
            </div>


        </div>
    )
}
