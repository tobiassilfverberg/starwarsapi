import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import swapi from "../services/swapi"

const MoviesPage = () => {
	const [movies, setMovies] = useState([])

	// Get todos from api
	const getMovies = async () => {
		const data = await swapi.getMovies()
		setMovies(data.results)
	}

	// Get todos from api when component is first mounted
	useEffect(() => {
		getMovies()
	}, [])

	return (
		<>
			<h1 className="mt-2">Movies</h1>

			{movies && (
				<div className="people container d-flex flex-wrap gap-1">
					{movies.map((movie) => (
						<div className="card col-4" key={movie.name}>
							<h2 className="card-header">{movie.title}</h2>
							<div className="card-body">
								<p>
									{" "}
									<span className="fw-bold">
										Episode:
									</span>{" "}
									{movie.episode_id}
								</p>
								<p>
									{" "}
									<span className="fw-bold">
										Released: 
									</span>{" "}
									{movie.release_date}
								</p>
								<p>
									{" "}
									<span className="fw-bold">
										Characters
									</span>{" "}
									{movie.characters.length}
								</p>
								<Button as={Link} to={`/films/${movie.episode_id}`}>
									Read more
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	)
}

export default MoviesPage
