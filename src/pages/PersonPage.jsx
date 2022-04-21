import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { useParams } from "react-router-dom"
import swapi from "../services/swapi"
import { Link } from "react-router-dom"

const PersonPage = () => {
	const [person, setPerson] = useState()
	const { id } = useParams()

	const getPerson = async (id) => {
		const data = await TodosAPI.getPerson(id)
		setPerson(data)
	}

	useEffect(() => {
		getPerson(id)
	}, [id])

	if (!person) {
		return <p>Loading....</p>
	}

	return (
		<div>
			<h3 className="mt-2"> {person.title} </h3>
		</div>
	)
}

export default PersonPage
