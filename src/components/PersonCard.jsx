import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import swapi from "../services/swapi"

const PersonCard = ({ people }) => {
	return (
		<>
			{people.results.map((person) => (
				<div key={person.name} className="col-4">
					<div className="card mb-3">
						<h2 className="card-header">{person.name}</h2>
						<div className="card-body">
							<p>
								<span className="fw-bold">Gender: </span>{" "}
								{person.gender}
							</p>
							<p>
								{" "}
								<span className="fw-bold"> Born: </span>{" "}
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
							<Button
								as={Link}
								to={`/person/${swapi.getIdFromUrl(person.url)}`}
							>
								Read more
							</Button>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default PersonCard
