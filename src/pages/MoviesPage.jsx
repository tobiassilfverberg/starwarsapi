import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Button from "react-bootstrap/Button"
import swapi from "../services/swapi"
import Loading from "../components/Loading"
import Pagination from "../components/Pagination"
import Search from "../components/Search"

const MoviesPage = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [movies, setMovies] = useState([])
	const [searchInput, setSearchInput] = useState([])
	const [searchResult, setSearchResult] = useState(false)

	const [searchParams, setSearchParams] = useSearchParams()
	const query = searchParams.get("query")

	// Get todos from api
	const getMovies = async (searchQuery, page) => {
		setLoading(true)

		try {
			const res = await swapi.getMovies(searchQuery, page)
			setData(res)
			setMovies(res.results)

			setLoading(false)
		} catch (err) {
			setError(err.message)
		}
	}

	const searchSwapi = async (searchQuery, page) => {
		setMovies([])
		setLoading(true)

		try {
			const res = await swapi.searchApi("films", searchQuery, page)
			if (res.count === 0) {
				return
			}
			setMovies(res.results)
			setData(data)
			setSearchResult(true)

			setLoading(false)
		} catch (err) {
			setError(err.message)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setMovies([])

		if (!searchInput) {
			return
		}

		setPage(1)
		searchSwapi(searchInput, 1)
		setSearchParams({ query: searchInput })
	}

	// Get todos from api when component is first mounted
	// call function to get characters from api
	useEffect(() => {
		if (!query) {
			getMovies(page)
			return
		}
		searchSwapi(query, page)
	}, [query, page])

	return (
		<>
			<h1 className="mt-2">Movies</h1>

			<Search
				onHandleSubmit={handleSubmit}
				onSetSearchInput={setSearchInput}
				onSearchInput={searchInput}
			/>

			{loading && <Loading />}

			{error && { error }}

			{!loading && (
				<>
					{" "}
					{searchResult && (
						<p>
							Showing {movies.length} search results for {query}...
						</p>
					)}
				</>
			)}

			{movies && (
				<div className="people container d-flex flex-wrap gap-1">
					{movies.map((movie) => (
						<div className="card col-4" key={movie.title}>
							<h2 className="card-header">{movie.title}</h2>
							<div className="card-body">
								<p>
									{" "}
									<span className="fw-bold">
										Episode:
									</span>{" "}
									{movie.episode_id}
								</p>
								<p>
									{" "}
									<span className="fw-bold">
										Released:
									</span>{" "}
									{movie.release_date}
								</p>
								<p>
									{" "}
									<span className="fw-bold">
										Characters
									</span>{" "}
									{movie.characters.length}
								</p>
								<Button
									as={Link}
									to={`/movie/${swapi.getIdFromUrl(
										movie.url
									)}`}
								>
									Read more
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
			{!loading && (
				<Pagination page={page} setPage={setPage} data={data} />
			)}
		</>
	)
}

export default MoviesPage
