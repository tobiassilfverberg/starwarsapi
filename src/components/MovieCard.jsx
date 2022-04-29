import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import swapi from "../services/swapi"

const MovieCard = ({ movies }) => {
	return (
		<>
			{movies.results.map((movie) => (
				<div className="col-4" key={movie.title}>
					<div className="card mb-3">
						<h2 className="card-header">{movie.title}</h2>
						<div className="card-body">
							<p>
								{" "}
								<span className="fw-bold">Episode:</span>{" "}
								{movie.episode_id}
							</p>
							<p>
								{" "}
								<span className="fw-bold">Released:</span>{" "}
								{movie.release_date}
							</p>
							<p>
								{" "}
								<span className="fw-bold">Characters</span>{" "}
								{movie.characters.length}
							</p>
							<Button
								as={Link}
								to={`/movie/${swapi.getIdFromUrl(movie.url)}`}
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

export default MovieCard
