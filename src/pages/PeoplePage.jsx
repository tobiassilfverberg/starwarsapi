import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import swapi from "../services/swapi"

const PeoplePage = () => {
	const [people, setPeople] = useState([])

	// Get todos from api
	const getPeople = async () => {
		const data = await swapi.getPeople()
		setPeople(data)
	}

	// Get todos from api when component is first mounted
	useEffect(() => {
		getPeople()
	}, [])

	return (
		<>
			<h1 className="mt-2">Characters</h1>

			{people.length > 0 && (
				<ListGroup className="people">
					{people.map((person) => (
						<ListGroup.Item
							action
							key={person.id}
							className="d-flex justify-content-between"
						>
							<Link to={`/people/${person.id}`}>
								{" "}
								{person.title}{" "}
							</Link>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</>
	)
}

export default PeoplePage
