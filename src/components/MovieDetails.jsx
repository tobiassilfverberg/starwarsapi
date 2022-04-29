import { Link } from "react-router-dom"
import swapi from "../services/swapi"

const MovieDetails = ({ movie, characters }) => {
	return (
		<div className="movie container mt-5">
			<div className="card col-12" key={movie.title}>
				<h2 className="card-header">{movie.title}</h2>
				<div className="card-body">
					<h4>Attributes</h4>
					<p>
						{" "}
						<span className="fw-bold">Episode:</span>{" "}
						{movie.episode_id}
					</p>
					<p>
						<span className="fw-bold">Director: </span>
						{movie.director}
					</p>
					<p>
						<span className="fw-bold">Producer: </span>
						{movie.producer}
					</p>
					<p>
						{" "}
						<span className="fw-bold">Released: </span>{" "}
						{movie.release_date}
					</p>
					<p>
						<span className="fw-bold"> Characters: </span>
					</p>
					<ul className="list-group">
						{characters.map((character) => (
							<Link
								key={swapi.getIdFromUrl(character)}
								to={`/person/${swapi.getIdFromUrl(character)}`}
							>
								<li className="list-group-item">
									Character {swapi.getIdFromUrl(character)}
								</li>
							</Link>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default MovieDetails
