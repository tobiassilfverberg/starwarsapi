import { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Loading from "../components/Loading"
import swapi from "../services/swapi"
import MovieDetails from "../components/MovieDetails"

const MoviePage = () => {
	const [characters, setCharacters] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [movieDetails, setMovieDetails] = useState([])
	const navigate = useNavigate()
	const { id } = useParams()

	const getMovie = useCallback(async () => {
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
	}, [id])

	useEffect(() => {
		getMovie()
	}, [getMovie])

	return (
		<>
			{loading && <Loading />}

			{error && { error }}

			{movieDetails && (
				<MovieDetails movie={movieDetails} characters={characters} />
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
