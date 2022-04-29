import { Link } from "react-router-dom"
import swapi from "../services/swapi"

const PersonDetails = ({ person, films }) => {
	return (
		<div className="movie container mt-5">
			<div className="card col-12" key={person.name}>
				<h2 className="card-header">{person.name}</h2>
				<div className="card-body">
					<h4>Attributes</h4>
					<p>
						{" "}
						<span className="fw-bold">Gender: </span>{" "}
						{person.gender}
					</p>
					<p>
						<span className="fw-bold">Birth year: </span>
						{person.birth_year}
					</p>
					<p>
						<span className="fw-bold">Height: </span>
						{person.height} cm
					</p>
					<p>
						{" "}
						<span className="fw-bold">Mass: </span>{" "}
						{person.mass} kg
					</p>
					<p>
						{" "}
						<span className="fw-bold">Hair color: </span>{" "}
						{person.hair_color}
					</p>
					<p>
						{" "}
						<span className="fw-bold">Skin color: </span>{" "}
						{person.skin_color}
					</p>
					<p>
						{" "}
						<span className="fw-bold">Eye color: </span>{" "}
						{person.eye_color}
					</p>
					<p>
						<span className="fw-bold"> Films: </span>
					</p>
					<ul className="list-group">
						{films.map((film) => (
							<Link
								key={swapi.getIdFromUrl(film)}
								to={`/movie/${swapi.getIdFromUrl(film)}`}
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
	)
}

export default PersonDetails
