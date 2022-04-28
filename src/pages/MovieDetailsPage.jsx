import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Loading from "../components/Loading"
import swapi from "../services/swapi"

const MoviePage = () => {
	const [characters, setCharacters] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [movieDetails, setMovieDetails] = useState([])
	const navigate = useNavigate()
	const { id } = useParams()

	const getMovie = async () => {
		setLoading(true)

		try {
			const res = await swapi.getMovie(id)

			setMovieDetails(res)
			setCharacters(res.characters)
			setLoading(false)
		} catch (err) {
			setLoading(false)
			setError(err.message)
		}
	}

	useEffect(() => {
		getMovie()
	}, [])

	return (
		<>
			{loading && <Loading />}

			{error && { error }}

			{movieDetails && (
				<div className="movie container mt-5">
					<div className="card col-12" key={movieDetails.title}>
						<h2 className="card-header">{movieDetails.title}</h2>
						<div className="card-body">
							<h4>Attributes</h4>
							<p>
								{" "}
								<span className="fw-bold">Episode:</span>{" "}
								{movieDetails.episode_id}
							</p>
							<p>
								<span className="fw-bold">Director: </span>
								{movieDetails.director}
							</p>
							<p>
								<span className="fw-bold">Producer: </span>
								{movieDetails.producer}
							</p>
							<p>
								{" "}
								<span className="fw-bold">Released: </span>{" "}
								{movieDetails.release_date}
							</p>
							<p>
								<span className="fw-bold"> Characters: </span>
							</p>
							<ul className="list-group">
								{characters.map((character) => (
									<Link
										key={swapi.getIdFromUrl(character)}
										to={`/person/${swapi.getIdFromUrl(
											character
										)}`}
									>
										<li className="list-group-item">
											Character{" "}
											{swapi.getIdFromUrl(character)}
										</li>
									</Link>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
			<Button
				variant="primary"
				className="mt-3 mb-5"
				onClick={() => navigate(-1)}
			>
				{" "}
				Go back{" "}
			</Button>
		</>
	)
}

export default MoviePage
