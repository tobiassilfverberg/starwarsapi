import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { useParams } from "react-router-dom"
import swapi from "../services/swapi"
import { Link } from "react-router-dom"

const MoviePage = () => {
	const [movie, setMovie] = useState()
	const { id } = useParams()

	const getMovie = async (id) => {
		const data = await swapi.getMovie(id)
		setMovie(data)
	}

	useEffect(() => {
		getMovie(id)
	}, [id])

	if (!movie) {
		return <p>Loading....</p>
	}

	return (
		<div>
			<h3 className="mt-2"> {movie.title} </h3>
		</div>
	)
}

export default MoviePage
