import Button from "react-bootstrap/Button"
import { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loading from "../components/Loading"
import swapi from "../services/swapi"
import PersonDetails from "../components/PersonDetails"

const PersonDetailsPage = () => {
	const [error, setError] = useState(null)
	const [films, setFilms] = useState([])
	const [loading, setLoading] = useState(false)
	const [personDetails, setPersonDetails] = useState([])
	const { id } = useParams()
	const navigate = useNavigate()

	const getPerson = useCallback(async () => {
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
	}, [id])

	useEffect(() => {
		getPerson()
	}, [getPerson])

	return (
		<>
			{loading && <Loading />}

			{error && { error }}

			{personDetails && (
				<PersonDetails person={personDetails} films={films} />
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
