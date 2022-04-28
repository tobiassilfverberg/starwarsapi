import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useSearchParams } from "react-router-dom"
import swapi from "../services/swapi"
import Pagination from "../components/Pagination"
import Loading from "../components/Loading"
import Search from "../components/Search"

const PeoplePage = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [people, setPeople] = useState([])
	const [searchInput, setSearchInput] = useState([])
	const [searchResult, setSearchResult] = useState(false)

	const [searchParams, setSearchParams] = useSearchParams()
	const query = searchParams.get("query")

	// Get characters from api
	const getPeople = async (searchQuery, page) => {
		setLoading(true)

		try {
			const res = await swapi.getPeople(searchQuery, page)
			setData(res)
			setPeople(res.results)

			setLoading(false)
		} catch (err) {
			setError(err.message)
		}
	}

	const searchSwapi = async (searchQuery, page) => {
		setPeople([])
		setLoading(true)

		try {
			const res = await swapi.searchApi("people", searchQuery, page)
			if (res.count === 0) {
				return
			}
			setPeople(res.results)
			setData(data)
			setSearchResult(true)

			setLoading(false)
		} catch (err) {
			setError(err.message)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setPeople([])

		if (!searchInput) {
			return
		}

		setPage(1)
		searchSwapi(searchInput, 1)
		setSearchParams({ query: searchInput })
	}

	// call function to get characters from api
	useEffect(() => {
		if (!query) {
			getPeople(page)
			return
		}
		searchSwapi(query, page)
	}, [query, page])

	return (
		<>
			<h1 className="mt-2">Characters</h1>

			<Search
				onHandleSubmit={handleSubmit}
				onSetSearchInput={setSearchInput}
				onSearchInput={searchInput}
			/>

			{loading && <Loading />}

			{!loading && (
				<>
					{" "}
					{searchResult && (
						<p>
							Showing {people.count} search results for {query}...
						</p>
					)}
				</>
			)}

			{error && { error }}

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
								<Button
									as={Link}
									to={`/person/${swapi.getIdFromUrl(
										person.url
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
				<Pagination
					page={page}
					setPage={setPage}
					data={data}
				/>
			)}
		</>
	)
}

export default PeoplePage
