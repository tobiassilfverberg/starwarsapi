import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import swapi from "../services/swapi"
import Loading from "../components/Loading"
import Pagination from "../components/Pagination"

const MoviesPage = () => {
	const [data, setData] = useState([])
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)

	// Get todos from api
	const getMovies = async (page) => {
		setLoading(true)

		const res = await swapi.getMovies()
		setData(res)
		setMovies(res.results)

		setLoading(false)
	}

	// Get todos from api when component is first mounted
	useEffect(() => {
		getMovies(page)
	}, [page])

	return (
		<>
			<h1 className="mt-2">Movies</h1>

			{loading && <Loading />}

			{movies && (
				<div className="people container d-flex flex-wrap gap-1">
					{movies.map((movie) => (
						<div className="card col-4" key={movie.title}>
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
								<Button
									as={Link}
									to={`/films/${movie.episode_id}`}
								>
									Read more
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
			{!loading && (
				<Pagination page={page} setPage={setPage} data={data} />
			)}
		</>
	)
}

export default MoviesPage
