import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import swapi from "../services/swapi"

const MoviesPage = () => {
	const [movies, setMovies] = useState([])

	// Get todos from api
	const getMovies = async () => {
		const data = await swapi.getMovies()
		setMovies(data)
	}

	// Get todos from api when component is first mounted
	useEffect(() => {
		getMovies()
	}, [])

	return (
		<>
			<h1 className="mt-2">Movies</h1>

			{todos.length > 0 && (
				<ListGroup className="movies">
					{movies.map((movie) => (
						<ListGroup.Item
							action
							key={movie.id}
							className="d-flex justify-content-between"
						>
							<Link to={`/films/${movie.id}`}>
								{" "}
								{movie.title}{" "}
							</Link>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</>
	)
}

export default MoviesPage
