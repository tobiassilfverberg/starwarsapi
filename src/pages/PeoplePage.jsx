import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import swapi from "../services/swapi"

const PeoplePage = () => {
	const [people, setPeople] = useState([])

	// Get todos from api
	const getPeople = async () => {
		const data = await swapi.getPeople()
		setPeople(data.results)
	}

	// Get todos from api when component is first mounted
	useEffect(() => {
		getPeople()
	}, [])

	return (
		<>
			<h1 className="mt-2">Characters</h1>

			{people.length > 0 && (
				<div className="people container d-flex flex-wrap gap-1">
					{people.map((person) => (
						<div key={person.name} className="card col-4">
							<h2 className="card-header">{person.name}</h2>
							<div className="card-body">
								<p>
									<span className="fw-bold">Gender: </span>{" "}
									{person.gender}
								</p>
								<p>
									{" "}
									<span className="fw-bold">
										{" "}
										Born:{" "}
									</span>{" "}
									{person.birth_year}
								</p>
								<p>
									{" "}
									<span className="fw-bold">
										{" "}
										In films:{" "}
									</span>{" "}
									{person.films.length}
								</p>
								<Button as={Link} to={`/films/${person.id}`}>
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

export default PeoplePage
