import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Loading from "../components/Loading"
import swapi from "../services/swapi"

const PersonDetailsPage = () => {
	const [error, setError] = useState(null)
	const [films, setFilms] = useState([])
	const [loading, setLoading] = useState(false)
	const [personDetails, setPersonDetails] = useState([])
	const { id } = useParams()
	const navigate = useNavigate()

	const getPerson = async () => {
		setLoading(true)
		try {
			const res = await swapi.getPerson(id)
			setPersonDetails(res)
			setFilms(res.films)
			setLoading(false)
		} catch (err) {
			setPersonDetails(null)
			setLoading(false)
			setError(err.message)
		}
	}

	useEffect(() => {
		getPerson()
	}, [])

	return (
		<>
			{loading && <Loading />}

			{error && { error }}

			{personDetails && (
				<div className="movie container mt-5">
					<div className="card col-12" key={personDetails.name}>
						<h2 className="card-header">{personDetails.name}</h2>
						<div className="card-body">
							<h4>Attributes</h4>
							<p>
								{" "}
								<span className="fw-bold">Gender: </span>{" "}
								{personDetails.gender}
							</p>
							<p>
								<span className="fw-bold">Birth year: </span>
								{personDetails.birth_year}
							</p>
							<p>
								<span className="fw-bold">Height: </span>
								{personDetails.height} cm
							</p>
							<p>
								{" "}
								<span className="fw-bold">Mass: </span>{" "}
								{personDetails.mass} kg
							</p>
							<p>
								{" "}
								<span className="fw-bold">
									Hair color:{" "}
								</span>{" "}
								{personDetails.hair_color}
							</p>
							<p>
								{" "}
								<span className="fw-bold">
									Skin color:{" "}
								</span>{" "}
								{personDetails.skin_color}
							</p>
							<p>
								{" "}
								<span className="fw-bold">
									Eye color:{" "}
								</span>{" "}
								{personDetails.eye_color}
							</p>
							<p>
								<span className="fw-bold"> Films: </span>
							</p>
							<ul className="list-group">
								{films.map((film) => (
									<Link
										key={swapi.getIdFromUrl(film)}
										to={`/movie/${swapi.getIdFromUrl(
											film
										)}`}
									>
										<li className="list-group-item">
											Film {swapi.getIdFromUrl(film)}
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

export default PersonDetailsPage
